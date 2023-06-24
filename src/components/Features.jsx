import React from 'react';
import NetworkingImage from '../assets/networking.png';
import ClubImage from '../assets/club.png';
import EventImage from '../assets/events.png';

const Card = ({ image, title, description }) => {
  return (
    <div className="card h-full w-fit max-w-[20em] bg-base-100 shadow-xl bordered">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-full rounded"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function Features() {

  const cards = [
    {
      image: NetworkingImage,
      title: 'Networking',
      description: 'Connect with student around the university and interact with each other different topics. Build connection, help others and learn from others'
    },
    {
      image: ClubImage,
      title: 'Clubs',
      description: 'No need to run here and there for clubs. Get all information about it like current lead or upcoming events all at one place and can even ask queries.'
    },
    {
      image: EventImage,
      title: 'Events',
      description: "Don't rely on whatsapp group for event information. Know about events and interact with other about the upcoming or past events."
    }
  ]

  return (
    <div className='py-20'>
      <h2 className='text-4xl md:text-5xl font-bold text-center text-secondary'>Features</h2>
      <section className="mt-16 px-8 sm:px-16 flex flex-col flex-wrap gap-8 justify-around items-center md:flex-row md:gap-16">

        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}

      </section>
    </div>
  );
}

export default Features;
