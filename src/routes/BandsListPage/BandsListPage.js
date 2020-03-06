import React, { Component } from 'react'
import './BandsListPage.css'
import BandsList from '../../components/BandsList/BandsList'
import BandsApiService from '../../services/bands-api-service'

export default class BandsListPage extends Component {
  state = {
    bands: [],
    error: null
  }

  componentDidMount() {
    BandsApiService.getBands()
      .then(res => this.setState({ bands: res }))
      .catch(res => this.setState({ error: res.error }))
  }


  render() {
    return (
      <section className='bands-list-page'>
        <header className='bands-list-header header'>
          <h2>Bands List</h2>
        </header>
        <section className='bands-list'>
          {this.state.bands && <BandsList bands={this.state.bands} />}
        </section>
      </section>
    )
  }
}