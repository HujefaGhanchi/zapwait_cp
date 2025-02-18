import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            ServiceBook
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition"
                >
                  Services
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>
                <motion.div className="relative group">
                  <button className="text-gray-300 hover:text-white transition">
                    {user.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 