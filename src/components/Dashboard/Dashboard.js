import React, { Component } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import BandsList from '../BandsList/BandsList';
import UserContext from '../../context/UserContext';
import BandsApiService from '../../services/bands-api-service';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
    };
  }

  componentDidMount() {
    // pulls in list of bands that the user is a current member of
    const { user_id } = this.context;
    BandsApiService.getBandByUserId(user_id)
      .then((res) => this.setState({ bands: res }));
  }

  renderBandsList() {
    const { bands } = this.state;
    return (
      <BandsList bands={bands} />
    );
  }

  render() {
    const { bands } = this.state;
    const { user_name } = this.context;
    return (
      <section className="user-dashboard">
        <header className="section-header header">
          <h2>
            {user_name}
            's Dashboard
          </h2>
        </header>
        <section className="functionality-buttons">
          <Link to="create/band">
            <button className="link-button button" type="button">+ Create Band</button>
          </Link>
          <Link to="edit/user">
            <button className="link-button button" type="button">Edit Profile</button>
          </Link>
        </section>
        <section className="user-bands-list">
          <h2>Your Bands</h2>
          {bands && <BandsList bands={bands} />}
        </section>
      </section>
    );
  }
}

Dashboard.contextType = UserContext;
