// src/contexts/ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <ModalContext.Provider value={{ 
            isAuthModalOpen, 
            openAuthModal, 
            closeAuthModal 
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
