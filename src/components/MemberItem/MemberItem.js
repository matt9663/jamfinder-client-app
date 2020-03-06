import React, { Component } from 'react'

export default class MemberItem extends Component {
  static defaultProps = {
    member: {
      id: '',
      user_name: '',
      instrument: ''
    }
  }
  render() {
    return (
      <li key={this.props.member.id}>
          <ul className='member-row'>
            <li>{this.props.member.user_name}</li>
            <li>{this.props.member.instrument}</li>
          </ul>
        </li>
    )
  }
}
