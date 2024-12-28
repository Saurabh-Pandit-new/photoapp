import React, { useState, useEffect } from 'react';
import { fetchUserBookings } from '../../services/bookingApi'; // Ensure this function is implemented and imported

const UserBookings = () => {
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

        const fetchedBookings = await fetchUserBookings(token);
        setBookings(fetchedBookings);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
        console.error('Error fetching bookings:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-center mb-8">Your Bookings</h2>

      {loading && <p className="text-center text-gray-500">Loading bookings...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-4"
            >
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                {booking.photographer?.name || 'Photographer Name Unavailable'}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(booking.eventDetails.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Time:</strong> {booking.eventDetails.time || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Status:</strong>{' '}
                <span
                  className={`${
                    booking.status === 'confirmed'
                      ? 'text-green-600 font-bold'
                      : booking.status === 'pending'
                      ? 'text-orange-500 font-bold'
                      : 'text-red-600 font-bold'
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <button
                className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
                onClick={() => alert(`Details for booking #${index + 1}`)}
              >
                View Details
              </button>
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

export default UserBookings;
