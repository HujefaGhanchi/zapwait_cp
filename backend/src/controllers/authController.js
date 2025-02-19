import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Sample user for testing (replace with database later)
const testUser = {
  _id: "1",
  name: "Test User",
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 10), // Hashed password
  role: "customer",
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    if (email === testUser.email) {
      return res.status(400).json({ message: "User already exists" });
    }

    // For testing, return a success response
    const token = generateToken("2");

    res.status(201).json({
      token,
      user: {
        _id: "2",
        name,
        email,
        role: "customer",
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // For testing purposes, use the test user
    // In production, you would fetch from database
    if (email === testUser.email) {
      // Check password
      const isMatch = await bcrypt.compare(password, testUser.password);

      if (isMatch) {
        const token = generateToken(testUser._id);

        res.json({
          token,
          user: {
            _id: testUser._id,
            name: testUser.name,
            email: testUser.email,
            role: testUser.role,
          },
        });
        return;
      }
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
