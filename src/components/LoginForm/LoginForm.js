import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../context/UserContext';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        const { loginSuccess, setUser } = this.context;
        const { onLoginSuccess } = this.props;
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        loginSuccess(res.user);
        setUser(res.user);
        onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.state;
    return (
      <form className="login-form form" onSubmit={this.handleSubmitJwtAuth}>
        {error && (
          <div className="form-error" role="alert">
            <i className="fas fa-exclamation-circle" />
            <p className="error-message">
              {error}
            </p>
          </div>
        )}
        <label htmlFor="user_name">User Name: </label>
        <input type="text" id="user_name" name="user_name" placeholder="Enter user name" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" placeholder="Enter password" required />
        <button type="submit">Login</button>
        <p>Demo credentials are UN: JamfinderEnthusiast, PW: Password1!</p>
      </form>
    );
  }
}

LoginForm.defaultProps = {
  onLoginSuccess: () => {},
};

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func,
};

LoginForm.contextType = UserContext;
