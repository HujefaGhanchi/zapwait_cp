import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ServiceBrowser from './pages/ServiceBrowser';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<ServiceBrowser />} />
            <Route path="/booking/:businessId" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 