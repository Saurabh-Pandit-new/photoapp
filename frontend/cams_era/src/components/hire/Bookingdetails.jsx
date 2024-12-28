import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Bookingdetails = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const { booking } = location.state || {};

  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(booking);

  // Fetch booking details
  useEffect(() => {
    if (!booking) {
      const fetchBookingDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setError('You must be logged in to view booking details.');
            setLoading(false);
            return;
          }
          
          const response = await axios.get(`/api/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Fetched booking details:', response.data);
          setCurrentBooking(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch booking details');
        } finally {
          setLoading(false);
        }
      };
      fetchBookingDetails();
    }
  }, [bookingId, booking]);

  // Handle status update
  const handleUpdateStatus = async (status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
           
      setCurrentBooking((prev) => ({ ...prev, status: response.data.booking.status }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking status');
    }
  };

  if (loading) return <p className="text-center mt-8 text-lg text-cyan-400">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-lg text-red-500">{error}</p>;

  console.log('Current Booking:', currentBooking); // Debug console log

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-800 my-10 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking Details</h2>
      <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-lg">
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={`${
              currentBooking.status === 'pending'
                ? 'text-yellow-600'
                : currentBooking.status === 'confirmed'
                ? 'text-green-600'
                : 'text-red-600'
            } font-semibold`}
          >
            {currentBooking.status}
          </span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Requested By:</span>{' '}
          {currentBooking.requestedBy?.username || 'Unknown'} (
          {currentBooking.requestedBy?.email || 'No email provided'})
        </p>
        <p className="text-lg">
          <span className="font-semibold">EventType:</span> {currentBooking.eventDetails.eventType}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Duratiomn:</span> {currentBooking.eventDetails.duration}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Date:</span> {currentBooking.eventDetails.date}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Start Time:</span> {currentBooking.eventDetails.time}
        </p>
        <p className="text-lg">
          <span className="font-semibold">venue:</span> {currentBooking.eventDetails.location.venueName}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">address:</span> {currentBooking.eventDetails.location.address}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">city:</span> {currentBooking.eventDetails.location.city}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">state:</span> {currentBooking.eventDetails.location.state}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">zipcode:</span> {currentBooking.eventDetails.location.zipCode}
        </p>
        <p className="text-lg">
          <span className="font-semibold">PhotographyRequirements:</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">Number of Peoples:</span> {currentBooking.photographyRequirements.numberOfPeople}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">Special Requirements:</span> {currentBooking.photographyRequirements.specialRequirements}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-semibold">Event Specific Details:</span> {currentBooking.additionalNotes}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>

        {currentBooking.status === 'pending' && (
          <div className="mt-6 flex justify-between">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => handleUpdateStatus('confirmed')}
            >
              Confirm
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={() => handleUpdateStatus('rejected')}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookingdetails;
