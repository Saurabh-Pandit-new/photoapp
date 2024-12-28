import React, { createContext, useContext, useState } from 'react';

const BASE_URL = 'http://localhost:5000/api';
export const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const createBookingRequest = async (bookingData, token) => {
    try {
       response = await fetch(`${BASE_URL}/bookings/request`, {
        method: 'POST',
        headers: {
          'Conteconstnt-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData); // Log the error response
        setError(errorData.error || 'Failed to create booking request');
        throw new Error(errorData.error || 'Failed to create booking request');
      }

      return await response.json(); // Return the response from the API
    } catch (err) {
      console.error('Request Error:', err.message);
      setError(err.message || 'An unexpected error occurred');
      throw err;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        createBookingRequest,
        error, // Providing error to components
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
