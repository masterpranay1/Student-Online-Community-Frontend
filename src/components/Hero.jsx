import React from 'react';
import ShapeImg from '../assets/shape.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      <div
        className="hero bg-primary text-neutral min-h-[90vh]"
        style={{ position: 'relative' }}
      >
        <div className="hero-content text-center">
          <div className="max-w-3xl my-28">
            <h1 className="text-5xl font-bold max-w-3xl">
              <span className="text-secondary">Connect</span> with your fellow{' '}
              <span className="text-secondary">college mate</span> on this
              platform
            </h1>
            <p className="py-12 max-w-2xl mx-auto text-center">
              Join different channels and increase your networking in college.
              Get updates about the events and other activities happening in
              college. And joining the clubs is much easir with our application.
            </p>
            <Link to="/auth/login">
              <button className="btn btn-secondary">Get Started</button>
            </Link>
          </div>
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
    </>
  );
}

export default Hero;
