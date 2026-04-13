import React, { useState } from 'react';
import axios from 'axios';

// Receive props from Appointment.jsx
export default function BookingForm({ onClose, docInfo, selectedDate, selectedTime }) {

  // States for the form fields
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  // States for loading and errors
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Format the date for display
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if a time is selected
    if (!selectedTime) {
      setError('Please select a time slot before booking.');
      return;
    }

    setLoading(true);
    setError('');

    // This is the data object we will send to the new backend
    const bookingData = {
      doctorName: docInfo.name,
      patientName: patientName,
      patientEmail: email,
      gender: gender,
      address: address, // Added new field
      appointmentDate: formattedDate,
      appointmentTime: selectedTime
    };

    try {
      // THE FIX: Changed port from 8080 to 8081
      const response = await axios.post('http://localhost:8081/api/appointments/book', bookingData);
      
      console.log('Booking successful:', response.data);
      alert('Appointment booked successfully!');
      onClose(); // Close the modal

    } catch (err) {
      console.error('Booking failed:', err);
      let errorMsg = 'Booking failed. Please try again.';
      if (err.request) {
        errorMsg = 'Network error. Is the backend server running?';
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-3xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Book Your Appointment</h2>
        <div className='text-center text-gray-600 mb-6'>
          <p>with <strong>{docInfo.name}</strong></p>
          <p>on <strong>{formattedDate}</strong> at <strong>{selectedTime || '...'}</strong></p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Patient Name
            </label>
            <input
              type="text"
              id="name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
