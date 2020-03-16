import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import UserContext from '../../context/UserContext';
import TokenService from '../../services/token-service';

export default class Header extends Component {
  handleLogoutClick = () => {
    const { logOut } = this.context;
    TokenService.clearAuthToken();
    logOut();
  }

  renderUnloggedHeader = () => (
    <div className="nav-functions unlogged">
      {' '}
      <Link to="/bands">
        Find Bands
      </Link>
      {' '}
      <Link to="/register">
        Join
      </Link>
      {' '}
      <Link to="/login">
        Login
      </Link>
    </div>
  );

  renderLoggedHeader = () => (
    <div className="nav-functions logged">
      {' '}
      <Link to="/dashboard">
        Dashboard
      </Link>
      {' '}
      <Link to="/bands">
        Find Bands
      </Link>
      {' '}
      <Link onClick={this.handleLogoutClick} to="/">
        Logout
      </Link>
    </div>
  );

  render() {
    const loggedInStatus = !!window.localStorage.getItem('user_id');
    return (
      <nav className="Header">
        <h2 className="app-title">
          <Link to="/">
            JamFinder
          </Link>
        </h2>
        {loggedInStatus
          ? this.renderLoggedHeader()
          : this.renderUnloggedHeader()}
      </nav>
    );
  }
}

Header.contextType = UserContext;
