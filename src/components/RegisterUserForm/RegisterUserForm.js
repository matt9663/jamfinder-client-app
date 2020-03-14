import React, { Component } from 'react';
import './RegisterUserForm.css';
import PropTypes from 'prop-types';
import AuthApiService from '../../services/auth-api-service';

export default class RegisterUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      user_name, password, instrument, genre, influences,
    } = ev.target;
    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      instrument: instrument.value,
      genre: genre.value,
      influences: influences.value,
    })
      .then((user) => {
        const { onRegisterSuccess } = this.props;
        user_name.value = '';
        password.value = '';
        instrument.value = '';
        genre.value = '';
        influences.value = '';
        onRegisterSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.state;
    return (
      <form className="register-form form" onSubmit={this.handleSubmit}>
        {error && (
          <div className="form-error" role="alert">
            <i className="fas fa-exclamation-circle" />
            <p className="error-message">{error}</p>
          </div>
        )}
        <label htmlFor="user_name">User Name: </label>
        <input type="text" name="user_name" placeholder="User name" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" placeholder="At least 8 characters, with upper and lower case, number, and special character" required />
        <label htmlFor="instrument">Instrument: </label>
        <input type="text" name="instrument" placeholder="Guitar, bass, vocals, etc..." required />
        <label htmlFor="genre">Prefered Genre: </label>
        <input type="text" name="genre" placeholder="Rock, jazz, funk, etc..." />
        <label htmlFor="influences">Influences: </label>
        <textarea name="influences" placeholder="Who inspires you?" />
        <button type="submit">Create Account</button>
      </form>
    );
  }
}

RegisterUserForm.defaultProps = {
  onRegisterSuccess: () => {},
};

RegisterUserForm.propTypes = {
  onRegisterSuccess: PropTypes.func,
};
