import React from 'react';

function Hero() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Join Our Student Community</h1>
        <p className="text-lg mb-8">
          Connect with other students, share your experiences, and get help with your studies.
        </p>
        <a
          href="#"
          className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out"
        >
          Join Now
        </a>
      </div>
    </section>
  );
}

export default Hero;
