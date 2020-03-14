import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BandsList.css';

const BandsList = ({ bands }) => (
  <ul className="band-list">
    <li>
      <ul className="band-list-header">
        <li className="first-item">Band Name</li>
        <li className="second-item">Genre</li>
        <li className="third-item">Location</li>
      </ul>
    </li>
    {bands.map((band) => (
      <li className="band-list-item" key={band.id}>
        <Link to={`/band/${band.id}`}>
          <ul className="band-info">
            <li className="first-item band-name">{band.band_name}</li>
            <li className="second-item">{band.genre}</li>
            <li className="third-item">{band.location}</li>
          </ul>
        </Link>
      </li>
    ))}
  </ul>
);

BandsList.defaultProps = {
  bands: [{
    id: '',
    band_name: '',
    genre: '',
    location: '',
  }],
};

BandsList.propTypes = {
  bands: PropTypes.instanceOf(Array),
};

export default BandsList;
