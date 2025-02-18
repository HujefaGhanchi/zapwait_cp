import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">ServiceBook</h3>
            <p className="text-sm">
              Book local services with ease. Find and schedule appointments with the best service providers in your area.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Facebook</span>
                {/* Add Facebook Icon */}
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Twitter</span>
                {/* Add Twitter Icon */}
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Instagram</span>
                {/* Add Instagram Icon */}
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ServiceBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 