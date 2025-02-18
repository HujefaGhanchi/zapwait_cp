import express from 'express';
import {
  createBooking,
  getCustomerBookings,
  updateBookingStatus
} from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getCustomerBookings);

router.route('/:id')
  .put(protect, updateBookingStatus);

export default router; 