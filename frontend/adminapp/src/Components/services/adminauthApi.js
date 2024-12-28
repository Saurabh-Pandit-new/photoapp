// src/services/authService.js

const API_URL = "http://localhost:5000/api"; // Your backend API URL

export const registerAdmin = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/addadmin/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set content type to JSON
            },
            body: JSON.stringify(userData), // Convert the userData object to a JSON string
        });

        const data = await response.json();
        console.log('Response data:', data); // Log the response

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        console.error('Error:', error); // Log the full error
        throw error;
    }
};




// Login user
export const loginAdmin = async (loginData) => {
    try {
        const response = await fetch(`${API_URL}/addadmin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
