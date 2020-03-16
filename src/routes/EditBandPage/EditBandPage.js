import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './EditBandPage.css';
import BandsApiService from '../../services/bands-api-service';

class EditBandPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      band_name: '',
      genre: '',
      description: '',
      location: '',
      new_members: false,
      error: null,
    };
  }

  componentDidMount() {
    // pulls in all current data about the band from the db when component mounts
    const id = this.props.match.params.band_id
    BandsApiService.getBandById(id)
      .then((res) => this.setState({
        band_name: res.band_name,
        genre: res.genre,
        description: res.description,
        location: res.location,
        new_members: res.new_members,
      }))
      .catch((res) => this.setState({ error: res.error }));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { history } = this.props;
    const { band_name, genre, description, location, new_members } = this.state;
    const bandUpdates = {
      band_name,
      genre,
      description,
      location,
      new_members,
    };
    BandsApiService.updateBand(
      this.props.match.params.band_id,
      { ...bandUpdates },
    )
      .then((res) => {
        const destination = `/band/${this.props.match.params.band_id}`;
        history.push(destination);
      })
      .catch((res) => this.setState({ error: res.error }));
  }

  render() {
    const {
      error,
      band_name,
      genre,
      location,
      new_members,
      description,
    } = this.state;
    return (
      <section className="edit-band-page">
        <header role="heading" className="edit-band-page-header header">
          <h2>Edit Band Profile</h2>
        </header>
        <div className="edit-form-wrapper">
          <form className="edit-band-form form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
            {error && (
              <div className="form-error" role="alert">
                <i className="fas fa-exclamation-circle" />
                <p className="error-message">{error}</p>
              </div>
            )}
            <label htmlFor="band_name">Band Name: </label>
            <input type="text" name="name" defaultValue={band_name} />
            <label htmlFor="genre">Genre: </label>
            <input name="genre" type="text" defaultValue={genre} />
            <label htmlFor="location">Location: </label>
            <input name="location" type="text" defaultValue={location} />
            <label htmlFor="new_members">
              Looking for members:
              {' '}
              <select className="new_members-select" name="new_members" value={new_members} onChange={this.handleChange}>
                <option value={Boolean(0)}>No</option>
                <option value={Boolean(1)}>Yes</option>
              </select>
            </label>
            <label htmlFor="description">Band Bio:</label>
            <textarea name="description" defaultValue={description} />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(EditBandPage)