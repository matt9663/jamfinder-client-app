import React from 'react'
import { Link } from 'react-router-dom'
import './BandsList.css'

function BandsList(props) {
  return (
  <ul className='band-list'>  
  {props.bands.map(band => (
    <li className='band-list-item' key={band.id}>
      <Link to={`/band/${band.id}`} >
        <ul className='band-info'>
          <li>{band.band_name}</li>
          <li>{band.genre}</li>
          <li>{band.location}</li>
        </ul>
      </Link>
    </li>))}
  </ul>
  );
}

export default BandsList