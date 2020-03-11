import React, { Component } from 'react'
import './RegisterUserForm.css'
import AuthApiService from '../../services/auth-api-service'

export default class RegisterUserForm extends Component {
  static defaultProps = {
    onRegisterSuccess: () => {}
  }

  state = {
    error: null
  }
  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password, instrument,  genre, influences } = ev.target
    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      instrument: instrument.value,
      genre: genre.value,
      influences: influences.value
    })
      .then(user => {
      user_name.value=  ''
      password.value = ''
      instrument.value = ''
      genre.value = ''
      influences.value = ''
      this.props.onRegisterSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    const { error } = this.state
    return (
      <form className="register-form form" onSubmit={this.handleSubmit}>
        {error && 
          <div className='form-error' role='alert'> 
            <i className="fas fa-exclamation-circle"></i>
            <p className='error-message'>{error}</p>
          </div>
        }
        <label htmlFor="user_name">User Name: </label>
        <input type="text" name='user_name' placeholder='User name'/>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' placeholder='At least 8 characters, with upper and lower case, number, and special character'/>   
        <label htmlFor="instrument">Instrument: </label>
        <input type="text" name="instrument" placeholder='Guitar, bass, vocals, etc...'/>
        <label htmlFor='genre'>Prefered Genre: </label>
        <input type="text" name="genre" placeholder='Rock, jazz, funk, etc...'/>
        <label htmlFor='influences'>Influences: </label>
        <textarea name='influences' placeholder='Who inspires you?'></textarea>    
        <button type="submit">Create Account</button>
      </form>
    )
  }
}