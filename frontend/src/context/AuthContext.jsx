import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/me', {  // Changed endpoint
            headers: { Authorization: `Bearer ${token}` } // Fixed syntax
          });
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error.response?.data?.message || error.message);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const register = async (name, email, password, role) => {
    try {
      console.log('Sending Signup Request:', { name, email, password, role }); // ✅ Log request data
  
      const response = await axios.post('/api/auth/Signup', {
        name,
        email,
        password,
        role
      });
  
      console.log('Signup Successful:', response.data); // ✅ Log success response
  
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : error.message); // ✅ Log exact error
      alert(error.response?.data?.message || 'Registration failed'); // ✅ Show actual error to user
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
