import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <p className="text-white">{user?.name}</p>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <p className="text-white">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 