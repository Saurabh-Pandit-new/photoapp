import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useModal } from '../../contexts/ModalContext';
import Register from '../user/Register';
import { FaCaretDown } from 'react-icons/fa';

const HeaderShop = () => {
    const navigate = useNavigate(); // For navigation
    const { isAuthModalOpen, openAuthModal, closeAuthModal } = useModal();
    const { user, logout, isAuthenticating } = useContext(UserContext);
    const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCategoriesDropdown = () => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
    const closeCategoriesDropdown = () => setIsCategoriesDropdownOpen(false);
    const closeUserDropdown = () => setIsUserDropdownOpen(false);

    const handleCartClick = () => {
        navigate('/shop/cart'); // Removed { replace: true } to prevent unnecessary refresh
    };

    return (
        <header className="bg-blue-700 py-4 px-6 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-white text-2xl font-bold mr-4">Shop Logo</Link>

                {/* Search Bar */}
                <div className="flex-grow max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <nav className="flex space-x-4 relative">
                    <div className="relative" onMouseLeave={closeCategoriesDropdown}>
                        <button
                            onClick={toggleCategoriesDropdown}
                            className="text-white hover:text-gray-300 flex items-center"
                        >
                            Categories
                        </button>
                        <FaCaretDown className="text-white" />
                        {isCategoriesDropdownOpen && (
                            <div className="absolute top-full mt-2 w-48 bg-white text-blue-700 rounded shadow-lg">
                                <Link to="/shop/categories/cameras" className="block px-4 py-2 hover:bg-gray-100" onClick={closeCategoriesDropdown}>Cameras</Link>
                                <Link to="/shop/categories/lenses" className="block px-4 py-2 hover:bg-gray-100" onClick={closeCategoriesDropdown}>Lenses</Link>
                                <Link to="/shop/categories/accessories" className="block px-4 py-2 hover:bg-gray-100" onClick={closeCategoriesDropdown}>Accessories</Link>
                                <Link to="/shop/categories/lighting" className="block px-4 py-2 hover:bg-gray-100" onClick={closeCategoriesDropdown}>Lighting Equipment</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/shop/bestsellers" className="text-white hover:text-gray-300">Best Sellers</Link>
                    <Link to="/shop/offers" className="text-white hover:text-gray-300">Offers</Link>
                </nav>

                <div className="space-x-4 flex items-center">
                    {isAuthenticating ? (
                        <button className="text-white hover:underline">Loading...</button>
                    ) : !user ? (
                        <div>
                            <button onClick={openAuthModal} className="text-white hover:underline">Login</button>
                            <Register isOpen={isAuthModalOpen} onClose={closeAuthModal} />
                        </div>
                    ) : (
                        <div className="relative flex items-center cursor-pointer" onClick={toggleUserDropdown} onMouseLeave={closeUserDropdown}>
                            <span className="text-white font-semibold mr-1">{user.username}</span>
                            <FaCaretDown className="text-white" />
                            {isUserDropdownOpen && (
                                <div className="absolute top-full mt-2 w-48 bg-white text-blue-700 rounded shadow-lg">
                                    <Link to="/shop/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={closeUserDropdown}>Personal Information</Link>
                                    <Link to="/profile/address" className="block px-4 py-2 hover:bg-gray-100" onClick={closeUserDropdown}>Addresses</Link>
                                    <Link to="/shop/products/wishlist" className="block px-4 py-2 hover:bg-gray-100" onClick={closeUserDropdown}>Wishlist</Link>
                                    <Link to="/profile/liked" className="block px-4 py-2 hover:bg-gray-100" onClick={closeUserDropdown}>Liked Products</Link>
                                    <button onClick={() => { logout(); closeUserDropdown(); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        onClick={handleCartClick}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                    >
                        Cart
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderShop;
