import React, { Component } from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import BandsList from '../BandsList/BandsList'
import UserContext from '../../context/UserContext'
import BandsApiService from '../../services/bands-api-service';

export default class Dashboard extends Component {
  static contextType = UserContext
  state = {
    bands: []
  }
  componentDidMount() {
    BandsApiService.getBandByUserId(this.context.user_id)
    .then(res => this.setState({ bands: res}))
  }
  renderBandsList() {
    return (
      <BandsList bands={this.state.bands} />
    )
  }
  render() {
    return (
      <section className='user-dashboard'>
        <header className='section-header header'>
          <h2>{this.context.user_name}'s Dashboard</h2>
        </header>
        <section className='functionality-buttons'>
          <Link to='create/band'>
            <button className='link-button button' type='button'>+ Create Band</button>
          </Link>
          <Link to='edit/user'>
            <button className='link-button button' type='button'>Edit Profile</button>
          </Link>
        </section>
        <section className='user-bands-list'>
          <h2>Your Bands</h2>
          {this.state.bands && <BandsList bands={this.state.bands}/>}
        </section>
      </section>
    )
  }
}