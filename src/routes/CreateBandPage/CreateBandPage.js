import React, { Component } from 'react'
import './CreateBandPage.css'
import UserContext from '../../context/UserContext'
import UsersApiService from '../../services/users-api-service'
import { withRouter } from 'react-router-dom'
import BandsApiService from '../../services/bands-api-service'

class CreateBandPage extends Component {
  static contextType = UserContext
  state = {
    band_name: '',
    genre: '',
    location: '',
    new_members: 0,
    description: '',
    error: null
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ error: null })
    const { history } = this.props
    let newBand = {}
    newBand.band_name = this.state.band_name
    newBand.genre = this.state.genre
    newBand.location = this.state.location
    newBand.new_members = Boolean(this.state.new_members)
    newBand.description = this.state.description
    newBand.bandleader = this.context.user_id
    newBand.members = [this.context.user_id]
    BandsApiService.postBand(newBand)
      .then(res => {
        let bands = this.context.bands
        bands.push(res.id)
        this.context.setBands(bands)
        const userUpdate = { bands }
        UsersApiService.updateUser(
          this.context.user_id,
          userUpdate
        )
        .then(res => {
            const destination = ('/dashboard')
            history.push(destination)
          })
        })
      .catch(res => this.setState({ error: res.error }))
  }
  render() {
    const { error } = this.state
    return (
      <section className='create-band-page'>
        <header className='header'>
          <h2>Create New Band</h2>
        </header>
        {error && 
          <div className='form-error' role='alert'> 
            <i className="fas fa-exclamation-circle"></i>
            <p className='error-message'>{error}</p>
          </div>
        }
        <section className='form-area'>
            <form className='create-band form' onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <label>Band Name: <input type='text' name='band_name' /></label>
              <label>Genre: <input type='text' name='genre' /></label>
              <label>Location: <input type='text' name='location' /></label>
              <label>Looking for members: 
                <select defaultValue={0} name='new_members'>
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </label>
              <label>Band Bio: <textarea name='description'></textarea></label>
              <button type="submit">Create Band</button>
            </form>
          </section>
      </section>
    )
  }
}

export default withRouter(CreateBandPage);