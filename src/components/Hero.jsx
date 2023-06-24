import React from 'react';
import ShapeImg from '../assets/shape.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero bg-primary text-neutral" style={{ position: 'relative' }}>
      <div className="hero-content flex-col text-center py-20 md:py-24 md:min-h-[80vh]">

        <h1 className="text-4xl md:text-5xl max-w-5xl font-bold">
          <span className="text-secondary md:text-6xl">Connect</span> with your fellow{' '}
          <span className="text-secondary md:text-6xl">college mate</span> on this
          platform
        </h1>

        <p className="py-4 max-w-2xl mx-auto text-center">
          Join different channels and increase your networking in college.
          Get updates about the events and other activities happening in
          college. And joining the clubs is much easier with our application.
        </p>

        <Link to="/auth/login">
          <button className="btn btn-secondary">Get Started</button>
        </Link>
      </div>

      <div
        className="hero-image hidden md:block"
        style={{
          position: 'absolute',
          bottom: '-1em',
          left: '-1.2%',
        }}
      >
        <img src={ShapeImg} alt="Students" />
      </div>
    </div>
  );
}

export default Hero;
