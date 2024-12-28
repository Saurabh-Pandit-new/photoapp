// src/services/authService.js

const API_URL = "http://localhost:5000/api"; // Your backend API URL

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            body: userData, // FormData contains file data
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

// Login user
export const loginUser = async (loginData) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        console.log("Response from backend:", data);  
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
