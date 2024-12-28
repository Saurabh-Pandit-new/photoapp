// src/contexts/WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState({});

    const toggleWishlist = (productId) => {
        setWishlist((prevWishlist) => ({
            ...prevWishlist,
            [productId]: !prevWishlist[productId],
        }));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
