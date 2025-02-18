import React from 'react';
import ServiceCard from '../components/ServiceCard';

const ServiceBrowser = () => {
  // Example service data
  const services = [
    {
      _id: '1',
      name: 'Haircut',
      description: 'Professional haircut service',
      price: 30,
      duration: 30
    },
    // Add more sample services
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Available Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard 
            key={service._id} 
            service={service} 
            businessId="sample-business"
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceBrowser; 