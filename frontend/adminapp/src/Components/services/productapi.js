import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL of your backend API

// Add a new product
export const addProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/admin/addproduct`, productData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}` // Pass the admin token
        },
    });
    return response.data;
};

// Update a product
export const updateProduct = async (productId, updateData) => {
    const response = await axios.put(`${API_URL}/products/${productId}`, updateData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}` // Pass the admin token
        },
    });
    return response.data;
};

// Remove a product
export const removeProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}` // Pass the admin token
        },
    });
    return response.data;
};
