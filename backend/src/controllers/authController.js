  import { Request, Response } from 'express';
  import jwt from 'jsonwebtoken';
  import User from '../models/User';
  import bcrypt from 'bcryptjs';

  const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d'
    });
  };

  // Sample user for testing (replace with database later)
  const testUser = {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2a$10$YourHashedPasswordHere', // "password123"
    role: 'customer'
  };

  export const register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      if (email === testUser.email) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // For testing, return a success response
      const token = jwt.sign(
        { id: '2' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      res.status(201).json({
        token,
        user: {
          _id: '2',
          name,
          email,
          role: 'customer'
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // For testing purposes, use the test user
      // In production, you would fetch from database
      if (email === testUser.email) {
        // Check password (use a real hashed password comparison in production)
        const isMatch = true; // For testing only
        
        if (isMatch) {
          const token = jwt.sign(
            { id: testUser._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '30d' }
          );

          res.json({
            token,
            user: {
              _id: testUser._id,
              name: testUser.name,
              email: testUser.email,
              role: testUser.role
            }
          });
          return;
        }
      }

      res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }; 