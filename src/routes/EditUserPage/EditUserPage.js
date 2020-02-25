import React, {Component} from 'react'
import STORE from '../../STORE'
import './EditUserPage.css'

export default class EditUserPage extends Component {
  state = {
    instrument: '',
    genre: '',
    influences: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <section className='edit-user-page'>
        <header role="heading">
          <h2>Edit User Info</h2>
        </header>
        <form className='edit-user form' onChange={this.handleChange}>
          <label htmlFor="instrument">Instrument: </label>
          <input type="text" name="instrument" defaultValue={STORE.users[0].instrument}/>
          <label htmlFor='genre'>Prefered Genre: </label>
          <input type="text" name="genre" defaultValue={STORE.users[0].genres}/>
          <label htmlFor='influences'>Influences: </label>
          <textarea name='influences' defaultValue={STORE.users[0].influences}></textarea>    
          <button type="submit">Save Changes</button>
        </form>
      </section>
    )
  } 
}
