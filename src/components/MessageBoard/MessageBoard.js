import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageBoardMessage from '../MessageBoardMessage/MessageBoardMessage';
import './MessageBoard.css';
import UserContext from '../../context/UserContext';
import MessagesService from '../../services/messages-api-service';

export default class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      new_message: '',
    };
  }

  componentDidMount() {
    // pulls the messages for this band from the db and sets them in state
    const { band_id } = this.props;
    MessagesService.getBandMessages(band_id)
      .then((res) => this.setState({ messages: res }));
  }

  handleChange = (e) => {
    this.setState({
      new_message: e.target.value,
    });
  }

  handleMessagePost = (e) => {
    e.preventDefault();
    const { messages, new_message } = this.state;
    const { band_id } = this.props;
    MessagesService.postBandMessage(band_id, new_message)
      .then((res) => this.setState({
        messages: [res, ...messages],
      }));
  }

  renderMessages() {
    const { messages } = this.state;
    if (messages.length === 0) {
      return <li>No Messages To Display</li>;
    }
    return messages.map((message) => <MessageBoardMessage key={message.id} message={message} />);
  }

  render() {
    return (
      <div className="message-board">
        <h3 className="message-board-header">Message Board</h3>
        <div className="messages-holder">
          <ul className="messages-list">
            {this.renderMessages()}
          </ul>
        </div>
        <form className="new-message-entry form" onChange={this.handleChange} onSubmit={this.handleMessagePost}>
          <label htmlFor="message">New Message: </label>
          <textarea name="message" placeholder="Write message here..."></textarea>
          <button className="submit-message-button" type="submit">Post Message</button>
        </form>
      </div>
    );
  }
}

MessageBoard.contextType = UserContext;

MessageBoard.defaultProps = {
  band_id: null,
};

MessageBoard.propTypes = {
  band_id: PropTypes.string,
};
