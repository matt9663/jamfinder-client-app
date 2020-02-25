import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import UserContext from '../../context/UserContext'
import STORE from '../../STORE'

export default class Header extends Component {
  static contextType = UserContext
  componentDidMount() {
    this.context.setUser(STORE.users[0])
  }
  render() {
    return (
      <nav className='Header'>
        <h2 className='app-title'>
          <Link to='/dashboard'>
            JamFinder
          </Link>
        </h2>
        <div className='nav-functions'>
          {' '}
          <Link to='/bands'>
            Find Bands
          </Link>
          {' '}
          <Link to='/dashboard'>
            Your Bands
          </Link>
          <Link to='/'>
            Logout
          </Link>
        </div>
      </nav>
    )
  }
}