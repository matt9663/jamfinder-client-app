import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import MemberList from '../../components/MemberList/MemberList'
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import './BandBioPage.css'
import UserContext from '../../context/UserContext'
import BandsApiService from '../../services/bands-api-service'
import UsersApiService from '../../services/users-api-service'


class BandBioPage extends Component {
  static contextType = UserContext
  state = {}
  componentDidMount() {
    const id= this.props.match.params.id
    BandsApiService.getBandById(id)
    .then(band => this.setState({ ...band }))
  }

  toggleJoinButton() {
    if (!this.state.new_members || (this.state.members && this.state.members.includes(this.context.user_id))) {
      return true
    } else return false
  }

  handleJoinBand = (e) => {
    const band_id = this.props.match.params.id
    let members = this.state.members
    members.push(this.context.user_id)
    let bands = this.context.bands
    bands.push(band_id)
    BandsApiService.updateBand(
      band_id,
      { members }
    )
    .then(res => this.setState({ members }))
    .catch(res => this.setState({ error: res.error }))
    UsersApiService.updateUser(
      this.context.user_id,
      { bands }
    )
    .then(res => {
      this.context.setBands(bands)
    })
    .catch(res => this.setState({ error: res.error }))
  }
    
    render() {
      return (
        <section className='band-bio-page'>
          <header className='band-bio-header header'>
            <h2>{this.state.band_name}</h2>
          </header>
          <div className='band-buttons'>
              {this.context.user_id === this.state.bandleader 
                ? <Link to={`/edit/band/${this.props.match.params.id}`}><button className='band-button button'>Edit Band</button></Link>
                : null}
              {' '}
              <button type='button' className='band-button button' disabled={this.toggleJoinButton()} onClick={this.handleJoinBand}>Join Band</button>
          </div>
          <section className='band-description'>
            <h3>Bio</h3>
            <p>{this.state.description}</p>
          </section>
          <section className='member-list'>
            <h3>Current Members</h3>
            {this.state.members && <MemberList band_id={this.props.match.params.id} />}
          </section>
          <section className='message-board-section'>
            {this.state.members && this.state.members.includes(this.context.user_id) ? <MessageBoard band_id={this.props.match.params.id} /> : <p>Must be a member of the band to view this message board</p>}       
          </section>
        </section>
      )
    }   
}

export default withRouter(BandBioPage);



