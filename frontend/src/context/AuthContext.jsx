import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:9000/api/auth/check', {
            headers: { Authorization: `Bearer ${token}` }
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

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', {
        username,
        password
      });
      // Handle successful login
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle login error
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      console.log('Sending Signup Request:', { name, email, password, role });

      const response = await axios.post('http://localhost:9000/api/auth/Signup', {
        name,
        email,
        password,
        role
      });

      console.log('Signup Successful:', response.data);

      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Registration failed');
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
