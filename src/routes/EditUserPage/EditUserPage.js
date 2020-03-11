import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import './EditUserPage.css'
import UserContext from '../../context/UserContext'
import UsersApiService from '../../services/users-api-service'

class EditUserPage extends Component {
  static contextType = UserContext
  state = {
    instrument: '',
    genres: '',
    influences: '',
    error: null
  }

  componentDidMount() {
    UsersApiService.getUser(this.context.user_id)
    .then(res => this.setState({
      instrument: res.instrument,
      genres: res.genres,
      influences: res.influences
    }))
    .catch(res => this.setState({ error: res.error }))
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: null})
    const { history } = this.props
    let userUpdates = {
      instrument: this.state.instrument,
      genres: this.state.genres,
      influences: this.state.influences
    }
    UsersApiService.updateUser(
      this.context.user_id,
      userUpdates
    )
    .then(res => {
      const destination = '/dashboard'
      history.push(destination)
    })
    .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { error } = this.state
    return (
      <section className='edit-user-page'>
        <header role="heading" className='edit-user-header header'>
          <h2>Edit User Info</h2>
        </header>
        {error && 
          <div className='form-error' role='alert'> 
            <i className="fas fa-exclamation-circle"></i>
            <p className='error-message'>{error}</p>
          </div>
        }
        <form className='edit-user form' onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="instrument">Instrument: </label>
          <input type="text" name="instrument" defaultValue={this.state.instrument}/>
          <label htmlFor='genre'>Prefered Genre: </label>
          <input type="text" name="genres" defaultValue={this.state.genres}/>
          <label htmlFor='influences'>Influences: </label>
          <textarea name='influences' defaultValue={this.state.influences}></textarea>    
          <button type="submit">Save Changes</button>
        </form>
      </section>
    )
  } 
}

export default withRouter(EditUserPage)