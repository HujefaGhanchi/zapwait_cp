import React, { createContext, useContext, useState } from 'react';
import axios from '../utils/axios';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      setError('Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      setError('Failed to fetch bookings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/bookings/${bookingId}`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError('Failed to cancel booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        createBooking,
        getBookings,
        cancelBooking,
        loading,
        error
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 