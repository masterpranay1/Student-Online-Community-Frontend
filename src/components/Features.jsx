import React from 'react';
import NetworkingImage from '../assets/networking.png';
import ClubImage from '../assets/club.png';
import EventImage from '../assets/events.png';

function Features() {
  return (
    <div className='pb-16'>
      <h2 className='text-5xl m-16 font-bold text-center text-secondary'>Features</h2>
      <section className="features flex flex-col gap-8 min-h-screen justify-around items-center md:flex-row md:gap-2">
        <div className="card h-fit w-96 bg-base-100 shadow-xl py-8 border">
          <figure>
            <img
              src={NetworkingImage}
              alt="Networking"
              className="w-64 h-64 rounded"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Networking</h2>
            <p>Connect with student around the university and interact with each other different topics. Build connection and learn from others.</p>
          </div>
        </div>

        <div className="card h-fit w-96 bg-base-100 shadow-xl py-8 border">
          <figure>
            <img
              src={ClubImage}
              alt="Clubs"
              className="w-64 h-64 rounded"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Clubs</h2>
            <p>No need to run here and there for clubs. Get all information about it like current lead or upcoming events all at one place and can even ask queries.</p>
          </div>
        </div>

        <div className="card h-fit w-96 bg-base-100 shadow-xl py-8 border">
          <figure>
            <img
              src={EventImage}
              alt="Events"
              className="w-64 h-64 rounded"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Events</h2>
            <p>Don't rely on whatsapp group for event information. Know about events and interact with other about the upcoming or past events.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
