import React, { Component } from 'react'
import './LoginForm.css'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../context/UserContext'

export default class LoginForm extends Component {
  static contextType = UserContext
  state = {
    error: null
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
    .then(res => {
      user_name.value = ''
      password.value = ''
      TokenService.saveAuthToken(res.authToken)
      this.context.loginSuccess()
      this.context.setUser(res.user)
      this.props.onLoginSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  render() {
    const { error } = this.state
    return (
      <form className="login-form form" onSubmit={this.handleSubmitJwtAuth}>
        {error && 
          <div className='form-error' role='alert'> 
            <i className="fas fa-exclamation-circle"></i>
            <p className='error-message'>{error}</p>
          </div>
        }
        <label htmlFor="user_name">User Name: </label>
        <input type="text" name='user_name' placeholder='Enter user name'/>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' placeholder='Enter password' />       
        <button type="submit">Login</button>
      </form>
    )
  }
}