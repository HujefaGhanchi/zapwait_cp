import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { businessId, serviceDetails, dateTime } = req.body;
    const customerId = req.user._id; // Assuming we have auth middleware

    const booking = await Booking.create({
      customer: customerId,
      business: businessId,
      service: serviceDetails,
      dateTime
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

export const getCustomerBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('business')
      .sort('-dateTime');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking' });
  }
}; 