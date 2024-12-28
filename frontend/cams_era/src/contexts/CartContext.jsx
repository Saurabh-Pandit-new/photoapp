import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(UserContext);

    const fetchCartItems = async () => {
        if (!token) {
            setError('No token available');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/cart/cartitems', {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                setCartItems(data.products || []);
                setError(null);
            } else {
                setError(data.message || 'Failed to load cart items.');
            }
        } catch (err) {
            console.error('Error fetching cart items:', err);
            setError('Failed to load cart items.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchCartItems();
    }, [token]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, loading, error, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
