import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  services: [{
    name: String,
    duration: Number,
    price: Number,
    description: String
  }],
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  workingHours: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String }
  },
  averageWaitTime: Number,
  rating: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Business', businessSchema); 