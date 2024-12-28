const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to your actual backend URL

/**
 * Get followers for a specific photographer by ID
 * @param {string} userId - Photographer's ID
 * @returns {Promise<Array>} - List of followers
 */
export const getFollowers = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/followers`);
    if (!response.ok) {
      throw new Error('Failed to fetch followers');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};

/**
 * Get the list of users the current user is following
 * @returns {Promise<Array>} - List of following users
 */
export const getFollowing = async () => {
    try {
      // Ensure userId is available from the current authenticated user (e.g., from localStorage or context)
      const userId = localStorage.getItem('userId'); // This is just an example; replace with how you store the userId
  
      if (!userId) {
        throw new Error('User is not authenticated.');
      }
  
      const response = await fetch(`${API_BASE_URL}/users/${userId}/following`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies/token are sent with the request
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch following list');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching following list:', error);
      throw error;
    }
  };
  


export const toggleFollowPhotographer = async (photographerId, isFollowing) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('User is not authenticated.');
    }

    const endpoint = isFollowing ? 'unfollow' : 'follow';

    const response = await fetch(`${API_BASE_URL}/users/${photographerId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to ${endpoint} photographer.`);
    }

    const data = await response.json(); // Parse JSON response
    return data; // Return the response object
  } catch (error) {
    console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} photographer:`, error.message);
    throw error;
  }
};
