import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import UserContext from '../../context/UserContext'
import TokenService from '../../services/token-service'

export default class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.context.logOut()
  }
  renderUnloggedHeader() {
    return (
      <div className='nav-functions unlogged'>
        {' '}
        <Link to='/bands'>
          Find Bands
        </Link>
        {' '}
        <Link to='/register'>
          Join
        </Link>
        {' '}
        <Link to='/login'>
          Login
        </Link>
      </div>
    )
  }

  renderLoggedHeader() {
    return (
      <div className='nav-functions logged'>
        {' '}
        <Link to='/dashboard'>
          Dashboard
        </Link>
        {' '}
        <Link to='/bands'>
          Find Bands
        </Link>
        {' '}
        <Link onClick={this.handleLogoutClick} to='/'>
          Logout
        </Link>
      </div>
    )
  }
  render() {
    return (
      <nav className='Header'>
        <h2 className='app-title'>
          <Link to='/dashboard'>
            JamFinder
          </Link>
        </h2>
        {this.context.loggedInStatus
          ? this.renderLoggedHeader()
          : this.renderUnloggedHeader()
        }
      </nav>
    )
  }
}