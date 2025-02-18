import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { loading } = useBooking();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        Welcome, {user?.name}
      </h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Your Dashboard
        </h2>
        {/* Add dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard; 