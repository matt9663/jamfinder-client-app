import React from 'react'
import './MemberList.css'

function MemberList(props) {
  return (
    <ul className='member-list'>
        {props.members.map(member => <li key={member.id}>
            <ul className='member-row'>
              <li>{member.user_name}</li>
              <li>{member.instrument}</li>
            </ul>
          </li>
      )}
    </ul>
  )
}

export default MemberList;