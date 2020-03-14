import React, { Component } from 'react';
import './BandsListPage.css';
import BandsList from '../../components/BandsList/BandsList';
import BandsApiService from '../../services/bands-api-service';

export default class BandsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      searchTerm: '',
      searchField: 'band_name',
      error: null,
    };
  }

  componentDidMount() {
    // pulls all bands from the db to populate the list
    BandsApiService.getBands()
      .then((res) => this.setState({ bands: res }))
      .catch((res) => this.setState({ error: res.error }));
  }

  onRadioChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  handleSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { bands, searchField, searchTerm } = this.state;
    // filters the list of all bands into a smaller list, which is then rendered
    // filtered list based on the search input from the user and whichever filter radio is selected
    const filteredBands = bands.filter(
      (band) => band[searchField].toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return (
      <section className="bands-list-page">
        <header className="bands-list-header header">
          <h2>Bands List</h2>
        </header>
        <section className="bands-list-section">
          <div className="filter-section">
            <label htmlFor="search-field">Search: </label>
            <input
              type="text"
              name="search-field"
              id="search-field"
              placeholder="Search bands by..."
              onChange={this.handleSearchTerm}
            />
            <select className="filter-category" name="searchField" value={searchField} onChange={this.onRadioChange}>
              <option value="band_name">Band Name</option>
              <option value="location">Location</option>
              <option value="genre">Genre</option>
            </select>
          </div>
          {bands && <BandsList bands={filteredBands} />}
        </section>
      </section>
    );
  }
}
