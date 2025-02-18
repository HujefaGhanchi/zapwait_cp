import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Book Services with Ease
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Find and schedule appointments with the best service providers in your area
        </p>
        <Link
          to="/services"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Services
        </Link>
      </div>
    </div>
  );
};

export default LandingPage; 