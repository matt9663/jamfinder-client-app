import React from 'react';
import PropTypes from 'prop-types';
import './MessageBoardMessage.css';

function MessageBoardMessage({ id, message }) {
  return (
    <li className="message" key={id}>
      <div className="message-details">
        <span className="message-author">
          Posted by:
          <br />
          <br />
          {message.author_user_name}
        </span>
        <span className="message-date">
          Posted at:
          {' '}
          {message.date_published}
        </span>
      </div>
      <div className="message-content">
        {message.message}
      </div>
    </li>
  );
}

MessageBoardMessage.propTypes = {
  id: PropTypes.number,
  message: PropTypes.instanceOf(Object),
};

MessageBoardMessage.defaultProps = {
  id: null,
  message: {},
};

export default MessageBoardMessage;
