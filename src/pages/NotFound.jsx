import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className='container-not-found' href="" target="_blank">
        <header className="top-header"></header>

        {/* Dust particel */}
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>
        {/* Dust particle end */}

        <div className="lamp__wrap">
          <div className="light-container">
            <div className="lamp">
              <div className="cable"></div>
              <div className="cover"></div>
              <div className="in-cover">
                <div className="bulb"></div>
              </div>
              <div className="light"></div>
            </div>
          </div>
        </div>
        {/* END Lamp */}

        <section className="error">
          {/* Content */}
          <div className="error__content">
            <div className="error__message message text">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">We're sorry, the page you were looking for doesn't exist.</p>
            </div>
            <div className="error__nav e-nav">
              <Link
                to="/"
                className="btn btn-outline mb-[12rem]"
              >
                Homepage
              </Link>
            </div>
          </div>
          {/* END Content */}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
