import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  service: {
    name: String,
    price: Number,
    duration: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  dateTime: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Booking', bookingSchema); 