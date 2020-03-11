import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './EditBandPage.css'
import BandsApiService from '../../services/bands-api-service'

class EditBandPage extends Component {
  state = {
    band_name: '',
    genre: '',
    description: '',
    location: '',
    new_members: false,
    error: null
  }

  componentDidMount() {
    const id = this.props.match.params.band_id
    BandsApiService.getBandById(id)
    .then(res => this.setState({
      band_name: res.band_name,
      genre: res.genre,
      description: res.description,
      location: res.location,
      new_members: res.new_members
    }))
    .catch(res => this.setState({ error: res.error}))
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: null })
    const { history } = this.props
    let bandUpdates = {
      band_name: this.state.band_name,
      genre: this.state.genre,
      description: this.state.description,
      location: this.state.location,
      new_members: this.state.new_members
    }
    BandsApiService.updateBand(
      this.props.match.params.band_id,
      { ...bandUpdates }
    )
    .then(res => {
      const destination = `/band/${this.props.match.params.band_id}`
      history.push(destination)
    })
    .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { error } = this.state
    return (
      <section className='edit-band-page'>
        <header role="heading" className='edit-band-page-header header'>
          <h2>Edit Band Profile</h2>
        </header>
        <div className='edit-form-wrapper'>
        {error && 
          <div className='form-error' role='alert'> 
            <i className="fas fa-exclamation-circle"></i>
            <p className='error-message'>{error}</p>
          </div>
        }
         <form className='edit-band-form form' onChange={this.handleChange} onSubmit={this.handleSubmit}>
           <label htmlFor='band_name'>Band Name: </label>
           <input type='text' name='name' defaultValue={this.state.band_name} />
           <label htmlFor='genre'>Genre: </label>
           <input name='genre' type='text' defaultValue={this.state.genre} />
           <label htmlFor='location'>Location: </label>
           <input name='location' type='text' defaultValue={this.state.location} />
           <label htmlFor='new_members'>Looking for members:  
            <select className='new_members-select' name='new_members' value={this.state.new_members} onChange={this.handleChange}>
              <option value={Boolean(0)}>No</option>
              <option value={Boolean(1)}>Yes</option>
            </select>
            </label>
            <label htmlFor='description'>Band Bio:</label>
            <textarea name='description' defaultValue={this.state.description}></textarea>
            <button type='submit'>Save Changes</button>
         </form>
         </div>
      </section>
    )
  }
}

export default withRouter(EditBandPage)