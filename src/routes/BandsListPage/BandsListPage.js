import React, { Component } from 'react'
import './BandsListPage.css'
import STORE from '../../STORE'
import BandsList from '../../components/BandsList/BandsList'

export default class BandsListPage extends Component {
  state = {
    bands: []
  }

  componentDidMount() {
    this.setState({
      bands: STORE.bands
    })
  }

  render() {
    return (
      <section className='bands-list-page'>
        <header className='bands-list-header header'>
          <h2>Bands List</h2>
        </header>
        <section className='bands-list'>
          <BandsList bands={this.state.bands} />
        </section>
      </section>
    )
  }
}