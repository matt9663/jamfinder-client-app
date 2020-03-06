import './MemberList.css'
import React, { Component } from 'react';
import UsersApiService from '../../services/users-api-service';
import MemberItem from '../MemberItem/MemberItem'

export default class MemberList extends Component {
  static defaultProps = {
    band_id: null
  }
  state = {
    members: null,
    error: null
  }
  componentDidMount() {
    UsersApiService.getUsersByBand(this.props.band_id)
    .then(res => this.setState({ members: res}))
  }
  renderMembers() {
    if (!this.state.members) {
      return <></>
    } else return this.state.members.map(member =>
      <MemberItem key={member.id} member={member} />
    )
  }
  render() {
    return (
      <ul className='member-list'>
        {this.renderMembers()}
      </ul>
    )
  }
}