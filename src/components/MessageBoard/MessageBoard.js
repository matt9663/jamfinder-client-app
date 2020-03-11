import React, { Component } from 'react'
import MessageBoardMessage from '../MessageBoardMessage/MessageBoardMessage'
import './MessageBoard.css'
import UserContext from '../../context/UserContext'
import MessagesService from '../../services/messages-api-service'

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
    MessagesService.getBandMessages(this.props.band_id)
    .then(res => this.setState({ messages: res}))
  }
  renderMessages() {
    if (this.state.messages.length === 0) {
      return <li>No Messages To Display</li>
      
    } 
    else return this.state.messages.map(message => 
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
    const newMessage = this.state.new_message
    MessagesService.postBandMessage(this.props.band_id, newMessage)
    .then(res => 
      this.setState({
      messages: [res, ...this.state.messages]
    })
    )
    
  }
  render() {
    return (
      <div className='message-board'>
        <h3 className='message-board-header'>Message Board</h3>
        <div className='messages-holder'>
          <ul className='messages-list'>
            {this.renderMessages()}
          </ul>
        </div>
        <form className='new-message-entry form' onChange={this.handleChange} onSubmit={this.handleMessagePost}>
          <label htmlFor='message'>New Message: </label>
          <textarea name='message' placeholder='Write message here...'></textarea>
          <button type='submit'>Post Message</button>
        </form>
      </div>
    )
  }
}