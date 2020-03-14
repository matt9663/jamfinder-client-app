import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => (
  <section className="landing-page-area">
    <div className="hero-area">
      <div className="hero-text">
        <h1 className="hero-header-text">
          Create Bands.
          <br />
          Find Players.
          <br />
          Make Music.
        </h1>
        <p className="app-explanation">
          <span>JamFinder is a platform designed to help musicians form new bands and find others nearby to collaborate with.</span>
          <span>Communicate via your band's private message board to coordinate rehearsals, share song ideas, discuss merch designs, whatever!</span>
          <span>Click the button below to create an account below to get started and make the music you've always wanted to.</span>
        </p>
      </div>
      <div className="landing-button-area">
        <Link to="/register"><button className="landing-button" type="button">Get Started</button></Link>
        <Link to="login"><button className="landing-button" type="button">Login</button></Link>
      </div>
    </div>
  </section>
);


export default LandingPage;
