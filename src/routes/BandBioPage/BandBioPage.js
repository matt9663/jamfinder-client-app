import React, { useContext } from 'react'
import STORE from '../../STORE'
import { useParams } from 'react-router-dom'
import MemberList from '../../components/MemberList/MemberList'
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import './BandBioPage.css'
import UserContext from '../../context/UserContext'

function BandBioPage() {
    const user = useContext(UserContext)
    let { id } = useParams()
    let band = STORE.bands.find(item => item.id === parseInt(id))
    let members = STORE.users.filter(user => band.members.includes(user.id))
    return (
      <section className='band-bio-page'>
        <header className='band-bio-header header'>
          <h2>{band.band_name}</h2>
        </header>
        <section className='member-list'>
          <h3>Current Members</h3>
          <MemberList members={members} />
        </section>
        <section className='band-description'>
          <h4>Description:</h4>
          <p>{band.description}</p>
        </section>
        <section className='message-board-section'>
          {band.members.includes(user.user_id) ? <MessageBoard band_id={band.id} /> : null}       
        </section>
      </section>
    )
}

export default BandBioPage;

