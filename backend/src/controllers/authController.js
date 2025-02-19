import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d'
  });
};

// 🚀 Register User (Fixed)
export const Signup = async (req, res) => {
  try {
    console.log('Incoming Signup Request:', req.body); // ✅ Log received data

    const { name, email, password, role = 'customer' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' }); // ✅ Handle missing fields
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email); // ✅ Log duplicate email
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    console.log('New User Created:', newUser); // ✅ Log successful creation

    const token = generateToken(newUser._id);

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// 🚀 Login User (Fixed)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
