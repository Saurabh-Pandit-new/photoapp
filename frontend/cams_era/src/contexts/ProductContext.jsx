import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]); // Store the fetched products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    // Function to fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ecom/products'); // Replace with your API endpoint
            setProducts(response.data); // Store products in state
            setLoading(false); // Loading complete
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
