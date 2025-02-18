import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface BookingFormData {
  date: string;
  time: string;
  service: string;
  notes: string;
}

const BookingPage: React.FC = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', {
        businessId,
        dateTime: `${formData.date}T${formData.time}`,
        serviceId: formData.service,
        notes: formData.notes
      });

      if (response.data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-2xl mx-auto"
    >
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Book Appointment</h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span className="text-white">{num}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Service</label>
                <select
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">Select a service</option>
                  {/* Service options will be populated from API */}
                </select>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Additional Notes</label>
                <textarea
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default BookingPage; 