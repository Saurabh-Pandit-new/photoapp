import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDefault from './Header';
import HeaderShop from './HeaderShop';
import HeaderHire from './HeaderHire';
import Footer from './Footer';
import { UserProvider } from '../../contexts/UserContext';
import { CartProvider } from '../../contexts/CartContext';

const Layout = ({ children }) => {
    const location = useLocation();

    // Determine which header to use based on the path
    const getHeaderComponent = () => {
        if (location.pathname.startsWith('/shop')) return <HeaderShop />;
        if (location.pathname.startsWith('/hire')) return <HeaderHire />;
        return <HeaderDefault />;
    };

    // List of routes where Header and Footer should be hidden
    const noHeaderFooterRoutes = ['/login', '/register'];

    // Check if the current path is in the noHeaderFooterRoutes
    const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

    return (
        <UserProvider> {/* User Context Provider */}
            <CartProvider>
                <div className="flex flex-col min-h-screen">
                    {!hideHeaderFooter && getHeaderComponent()}
                    <main className="flex-grow">
                        {children}
                    </main>
                    {!hideHeaderFooter && <Footer />}
                </div>
            </CartProvider>
        </UserProvider>
    );
};

export default Layout;
