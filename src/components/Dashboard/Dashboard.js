import React, { Component } from 'react'
import './Dashboard.css'
import STORE from '../../STORE'
import { Link } from 'react-router-dom';
import BandsList from '../BandsList/BandsList'
import UserContext from '../../context/UserContext'

export default class Dashboard extends Component {
  static contextType = UserContext
  renderBandsList() {
    let bands = STORE.bands.filter(band => band.members.includes(this.context.user_id))
    return (
      <BandsList bands={bands} />
    )
  }
  render() {
    return (
      <section className='user-dashboard'>
        <header className='section-header dashboard-header'>
          <h1>{this.context.user_name}'s Dashboard</h1>
        </header>
        <section className='functionality-buttons'>
          <Link to='create/band'>
            <button className='link-button button' type='button'>+ Create Band</button>
          </Link>
          <Link to='edit/user'>
            <button className='link-button button' type='button'>Edit Profile</button>
          </Link>
        </section>
        <section className='bands-list'>
          {this.renderBandsList()}
        </section>
      </section>
    )
  }
}