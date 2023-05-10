import React from 'react';
import ShapeImg from '../assets/shape.png';

function Hero() {
  return (
    <>
      <div
        className="hero min-h-screen bg-primary text-neutral"
        style={{ position: 'relative' }}
      >
        <div className="hero-content text-center">
          <div className="max-w-3xl">
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
            <button className="btn btn-secondary">Get Started</button>
          </div>
        </div>

        <div
          className="hero-image hidden md:block"
          style={{
            position: 'absolute',
            bottom: '10%',
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
