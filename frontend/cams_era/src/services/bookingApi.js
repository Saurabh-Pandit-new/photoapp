const API_BASE_URL = 'http://localhost:5000/api/bookings';

export const fetchPhotographerBookings = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photographer`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    const data = await response.json();
    console.log('API Response Data:', data);  // Log the response data to check its structure

    return data.bookings || [];  // Ensure that you're returning bookings from the response object
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw error;  // Re-throw the error to be caught in your component's catch block
  }
};




// Fetch user bookings
export const fetchUserBookings = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mybookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user bookings: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Bookings fetched successfully:', data);
    return data.bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error.message);
    throw error;
  }
};
