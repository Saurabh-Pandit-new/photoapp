// src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    const location = useLocation();

    // List of routes where Header and Footer should be hidden
    const noHeaderFooterRoutes = ['/login', '/register'];

    // Check if the current path is in the noHeaderFooterRoutes
    const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

    return (
        <div>
            {!hideHeaderFooter && <Header />}
            <main>
                {children}
            </main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

export default Layout;
