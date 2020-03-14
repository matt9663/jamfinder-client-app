import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  handleLoginSuccess = () => {
    const { history } = this.props;
    const destination = ('/dashboard');
    history.push(destination);
  }

  render() {
    return (
      <section className="login-page">
        <div className="login-wrapper">
          <h2>Account Login</h2>
          <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
        </div>
        <div className="signup-wrapper">
          <p>
            Don't have an account?
            {' '}
            <span className="register-link">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </section>
    );
  }
}

export default withRouter(LoginPage)