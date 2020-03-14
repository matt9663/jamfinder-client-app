import './MemberList.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersApiService from '../../services/users-api-service';
import MemberItem from '../MemberItem/MemberItem';

export default class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
    };
  }

  componentDidMount() {
    // pull list of band members from the db in order to populate the roster components
    const { band_id } = this.props;
    UsersApiService.getUsersByBand(band_id)
      .then((res) => this.setState({ members: res }));
  }

  renderMembers() {
    const { members } = this.state;
    if (!members) {
      return <></>;
    }
    return members.map((member) => <MemberItem key={member.id} member={member} />);
  }

  render() {
    return (
      <ul className="member-list">
        {this.renderMembers()}
      </ul>
    );
  }
}

MemberList.propTypes = {
  band_id: PropTypes.string,
};

MemberList.defaultProps = {
  band_id: null,
};
