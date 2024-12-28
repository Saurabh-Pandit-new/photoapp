import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const PhotographerContext = createContext();

export const PhotographerProvider = ({ children }) => {
    const [photographers, setPhotographers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotographers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/getphotographers');
                setPhotographers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch photographers');
                setLoading(false);
            }
        };

        fetchPhotographers();
    }, []);

    // Function to get a specific photographer by ID
    const getPhotographerById = (id) => {
        return photographers.find(photographer => photographer._id === id);
    };

    return (
        <PhotographerContext.Provider value={{ photographers, getPhotographerById, loading, error }}>
            {children}
        </PhotographerContext.Provider>
    );
};

// Custom hook for using the PhotographerContext
export const usePhotographerContext = () => useContext(PhotographerContext);
