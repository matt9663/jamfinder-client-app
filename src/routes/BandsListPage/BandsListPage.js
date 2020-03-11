import React, { Component } from 'react'
import './BandsListPage.css'
import BandsList from '../../components/BandsList/BandsList'
import BandsApiService from '../../services/bands-api-service'

export default class BandsListPage extends Component {
  state = {
    bands: [],
    searchTerm: '',
    searchField: 'band_name',
    error: null
  }

  componentDidMount() {
    BandsApiService.getBands()
      .then(res => this.setState({ bands: res }))
      .catch(res => this.setState({ error: res.error }))
  }

  onRadioChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  handleSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value })
  }



  render() {
    let filteredBands = this.state.bands.filter(
      band => band[this.state.searchField].toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
    return (
      <section className='bands-list-page'>
        <header className='bands-list-header header'>
          <h2>Bands List</h2>
        </header>
        <section className='bands-list-section'>
          <div className='filter-section'>
            <label htmlFor='search-field'>Search: </label>
            <input type='text' 
              name='search-field' 
              id='search-field' 
              placeholder='Search bands by...' 
              onChange={this.handleSearchTerm}/>
            <select className='filter-category' name='searchField' value={this.state.searchField} onChange={this.onRadioChange}>
              <option value='band_name'>Band Name</option>
              <option value='location'>Location</option>
              <option value='genre'>Genre</option>
            </select>
          </div>
          {this.state.bands && <BandsList bands={filteredBands} />}
        </section>
      </section>
    )
  }
}