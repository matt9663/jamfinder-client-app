import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './EditUserPage.css';
import UserContext from '../../context/UserContext';
import UsersApiService from '../../services/users-api-service';

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrument: '',
      genres: '',
      influences: '',
      error: null,
    };
  }

  componentDidMount() {
    // pulls in current user info from the db for user to see before making edits
    const { user_id } = this.context;
    UsersApiService.getUser(user_id)
      .then((res) => this.setState({
        instrument: res.instrument,
        genres: res.genres,
        influences: res.influences,
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
    this.setState({ error: null});
    const { instrument, genres, influences } = this.state;
    const { user_id } = this.context;
    const { history } = this.props;
    const userUpdates = {
      instrument,
      genres,
      influences,
    };
    UsersApiService.updateUser(
      user_id,
      userUpdates,
    )
      .then((res) => {
        const destination = '/dashboard';
        history.push(destination);
      })
      .catch((res) => this.setState({ error: res.error }));
  }

  render() {
    const { error, influences, instrument, genres } = this.state;
    return (
      <section className="edit-user-page">
        <header role="heading" className="edit-user-header header">
          <h2>Edit User Info</h2>
        </header>
        {error && (
          <div className="form-error" role="alert">
            <i className="fas fa-exclamation-circle" />
            <p className="error-message">{error}</p>
          </div>
        )}
        <form className="edit-user form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="instrument">Instrument: </label>
          <input type="text" name="instrument" defaultValue={instrument} />
          <label htmlFor="genre">Prefered Genre: </label>
          <input type="text" name="genres" defaultValue={genres} />
          <label htmlFor="influences">Influences: </label>
          <textarea name="influences" defaultValue={influences} />
          <button type="submit">Save Changes</button>
        </form>
      </section>
    );
  }
}

EditUserPage.contextType = UserContext;

export default withRouter(EditUserPage);
