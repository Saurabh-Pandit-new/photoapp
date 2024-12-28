import axios from 'axios';

const API_URL = "http://localhost:5000/api"; // Your backend API base URL

// Get the stored token from localStorage
export const getUserProfile = async () => {
    const token = localStorage.getItem('token'); // Automatically get token from localStorage

    if (!token) {
        throw new Error('No token found, please log in again');
    }

    try {
        // Use full API URL for the profile endpoint
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`, // Automatically include token in Authorization header
            },
        });
        return response.data; // Return user data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
};
