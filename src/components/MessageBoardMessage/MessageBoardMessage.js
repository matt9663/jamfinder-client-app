import React from 'react'
import './MessageBoardMessage.css'

function MessageBoardMessage(props) {
  return (
    <li className='message' key={props.id}>
        <div className='message-details'>
          <span>Posted by: {props.message.author_user_name}</span>
          <span>Posted at: {props.message.date_published}</span>
        </div>
        <div className='message-content'>
          {props.message.message}
        </div>       
    </li>
  )
}

export default MessageBoardMessage;