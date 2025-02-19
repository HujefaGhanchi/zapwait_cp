import express from 'express';
import { login } from '../controllers/authController.js'; // Add .js extension
import { Signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/Signup', Signup);

export default router; // Use `export default` instead of `module.exports`
