import React, { Component } from 'react';
import './CreateBandPage.css';
import { withRouter } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import UsersApiService from '../../services/users-api-service';
import BandsApiService from '../../services/bands-api-service';

class CreateBandPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      band_name: '',
      genre: '',
      location: '',
      new_members: 0,
      description: '',
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const {
      band_name,
      genre,
      location,
      new_members,
      description,
    } = this.state;
    const { user_id } = this.context;
    const { history } = this.props;
    const newBand = {};
    newBand.band_name = band_name;
    newBand.genre = genre;
    newBand.location = location;
    newBand.new_members = Boolean(new_members);
    newBand.description = description;
    newBand.bandleader = user_id;
    newBand.members = [user_id];
    BandsApiService.postBand(newBand)
      .then((res) => {
        let bands = this.context.bands
        bands.push(res.id);
        this.context.setBands(bands);
        const userUpdate = { bands };
        UsersApiService.updateUser(
          user_id,
          userUpdate,
        )
          .then((res) => {
            const destination = ('/dashboard');
            history.push(destination);
          });
      })
      .catch((res) => this.setState({ error: res.error }));
  }

  render() {
    const { error } = this.state;
    return (
      <section className="create-band-page">
        <header className="create-band-page-header header">
          <h2>Create New Band</h2>
        </header>
        {error && (
          <div className="form-error" role="alert">
            <i className="fas fa-exclamation-circle" />
            <p className="error-message">{error}</p>
          </div>
        )}
        <section className="form-area">
          <form className="create-band form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <label htmlFor="band_name">Band Name:</label>
            <input type="text" name="band_name" placeholder="Band name" required />
            <label htmlFor="genre">Genre:</label>
            <input type="text" name="genre" placeholder="Genre" required />
            <label htmlFor="location">Location:</label>
            <input type="text" name="location" placeholder="Location" required />
            <label htmlFor="new_members">
              Looking for members:
              {' '}
              <select defaultValue={0} className="new_members-select" name="new_members">
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <label htmlFor="description">Band Bio:</label>
            <textarea name="description" placeholder="Band bio" />
            <button type="submit">Create Band</button>
          </form>
        </section>
      </section>
    );
  }
}

CreateBandPage.contextType = UserContext;

export default withRouter(CreateBandPage);
