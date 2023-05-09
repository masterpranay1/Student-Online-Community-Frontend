import React from 'react';

function Features() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Discussion Forums</h3>
            <p className="text-gray-600">
              Join the conversation and connect with other students in our discussion forums.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Study Groups</h3>
            <p className="text-gray-600">
              Join a study group to collaborate with other students and share resources.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Career Services</h3>
            <p className="text-gray-600">
              Get help with your job search and connect with employers through our career services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
