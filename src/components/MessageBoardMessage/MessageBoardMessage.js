import React from 'react'
import './MessageBoardMessage.css'

function MessageBoardMessage(props) {
  return (
    <li className='message' key={props.id}>
        <div className='message-details'>
          <span className='message-author'>Posted by: <br></br>{props.message.author_user_name}</span>
          <span className='message-date'>Posted at: {props.message.date_published}</span>
        </div>
        <div className='message-content'>
          {props.message.message}
        </div>       
    </li>
  )
}

MessageBoardMessage.defaultProps = {
  id: '',
  message: '',
  date_published:'',
  author_user_name: ''
}

export default MessageBoardMessage;