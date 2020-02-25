import React, { Component } from 'react'
import STORE from '../../STORE'
import MessageBoardMessage from '../MessageBoardMessage/MessageBoardMessage'
import './MessageBoard.css'
import UserContext from '../../context/UserContext'

export default class MessageBoard extends Component {
  static contextType = UserContext
  static defaultProps = {
    band_id: null
  }
  state = {
    messages: [],
    new_message: ''
  }
  componentDidMount() {
    this.setState({
      messages: STORE.band_messages
    })
  }
  renderMessages() {
    let filteredMessages = this.state.messages.filter(message => message.band === this.props.band_id)
    if (!filteredMessages[0]) {
      return <li>No Messages To Display</li>
      
    } 
    else return filteredMessages.map(message => 
      <MessageBoardMessage key={message.id} message={message}/>
    )
  }
  handleChange = e => {
    this.setState({
      new_message: e.target.value 
    })
  }
  handleMessagePost = e => {
    e.preventDefault()
    let newMessage = {}
    newMessage.id = this.state.messages.length + 1
    newMessage.message = this.state.new_message
    newMessage.author_user_name = this.context.user_name
    newMessage.band = this.props.band_id
    newMessage.author = this.context.user_id
    newMessage.date_published = new Date().toLocaleString()
    STORE.band_messages.push(newMessage)
    this.setState({
      messages: STORE.band_messages
    })
  }
  render() {
    return (
      <div className='message-board'>
        <div className='messages-holder'>
          <ul className='messages-list'>
            {this.renderMessages()}
          </ul>
        </div>
        <form className='new-message-entry form' onChange={this.handleChange} onSubmit={this.handleMessagePost}>
          <label htmlFor='message'>New Message: </label>
          <textarea name='message'></textarea>
          <button type='submit'>Post Message</button>
        </form>
      </div>
    )
  }
}