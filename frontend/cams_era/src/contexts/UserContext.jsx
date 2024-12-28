// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        if (token && !user) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, [token]);

    const login = async (responseData) => {
        if (responseData && responseData.token && responseData.user) {
            setIsAuthenticating(true);
            setToken(responseData.token);
            setUser(responseData.user);
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            setIsAuthenticating(false);
        } else {
            console.warn("Response data is missing required fields:", responseData);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout, isAuthenticating }}>
            {children}
        </UserContext.Provider>
    );
};
