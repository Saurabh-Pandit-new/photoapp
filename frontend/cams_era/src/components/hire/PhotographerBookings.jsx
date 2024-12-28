import React, { useState, useEffect } from 'react';
import { fetchPhotographerBookings } from '../../services/bookingApi'; // Ensure this function is implemented and imported
import { Link } from 'react-router-dom';

const PhotographerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view your bookings.');
          setLoading(false);
          return;
        }

        const fetchedBookings = await fetchPhotographerBookings(token);
        setBookings(fetchedBookings);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
        console.error('Error fetching photographer bookings:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const renderBookingDetails = (booking) => {
    return (
      <div>
        <p>
          <strong>Venue:</strong> {booking.eventDetails.location.venueName || 'Not Provided'}
        </p>
        <p>
          <strong>Location:</strong> {booking.eventDetails.location.address || 'Not Provided'}
        </p>
        <p>
          <strong>Duration:</strong> {booking.eventDetails.duration  || 'N/A'} hours
        </p>
        <p>
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-center mb-8">Your Bookings</h2>

      {loading && <p className="text-center text-gray-500">Loading bookings...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-4"
            >
              <p className="text-gray-600 mb-1">
                <span
                  className={`${
                    booking.status === 'confirmed'
                      ? 'text-green-600'
                      : booking.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  } font-medium`}
                >
                  {booking.status}
                </span>
              </p>
              <p>
          <strong>event service:</strong> {booking.eventDetails.eventType || 'Not Provided'}
        </p>
              <span>requested by:</span>
              <span><h3 className="text-lg font-semibold text-green-700 mb-2">
                {booking.requestedBy?.username || 'User Name Unavailable'}
              </h3>
              </span>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(booking.eventDetails.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Start Time:</strong> {booking.eventDetails.time || 'N/A'}
              </p>
              <div className="mt-2">{renderBookingDetails(booking)}</div>
              <Link to={`/hire/bookings/${booking._id}`} state={{ booking }}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default PhotographerBookings;
