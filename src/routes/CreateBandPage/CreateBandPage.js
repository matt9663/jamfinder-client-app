import React, { Component } from 'react'
import './CreateBandPage.css'
import UserContext from '../../context/UserContext'
import STORE from '../../STORE'

export default class CreateBandPage extends Component {
  static contextType = UserContext
  state = {
    band_name: '',
    genre: '',
    location: '',
    new_members: false,
    description: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault()
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    let newBand = {}
    newBand.band_name = this.state.band_name
    newBand.genre = this.state.genre
    newBand.location = this.state.location
    newBand.new_members = this.state.new_members
    newBand.description = this.state.description
    newBand.bandleader = this.context.user_id
    newBand.id = STORE.bands.length + 1
    newBand.members = [this.context.user_id]
    STORE.bands.push(newBand)
    history.push(destination)
  }
  render() {
    return (
      <section className='create-band-page'>
        <header className='header'>
          <h2>Create New Band</h2>
        </header>
        <section className='form-area'>
            <form className='create-band form' onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <label>Band Name: <input type='text' name='band_name' /></label>
              <label>Genre: <input type='text' name='genre' /></label>
              <label>Location: <input type='text' name='location' /></label>
              <label>Looking for members: <input type='checkbox' name='new_members' /></label>
              <label>Band Bio: <textarea name='description'></textarea></label>
              <button type="submit">Create Band</button>
            </form>
          </section>
      </section>
    )
  }
}