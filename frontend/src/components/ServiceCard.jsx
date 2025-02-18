import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, businessId }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
      <p className="text-gray-300 mb-4">{service.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-white font-medium">${service.price}</span>
        <span className="text-gray-400">{service.duration} mins</span>
      </div>
      <Link
        to={`/booking/${businessId}?service=${service._id}`}
        className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Book Now
      </Link>
    </motion.div>
  );
};

export default ServiceCard; 