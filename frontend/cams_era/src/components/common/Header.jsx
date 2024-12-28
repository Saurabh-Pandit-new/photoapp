import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext';
import { UserContext } from '../../contexts/UserContext'; // Assuming UserContext is used for user authentication
import Register from '../user/Register';

const Header = () => {
    const { isAuthModalOpen, openAuthModal, closeAuthModal } = useModal();
    const { user, logout } = useContext(UserContext); // Access user data and logout function from UserContext

    return (
        <header className="bg-gradient-to-r from-black via-blue-900 to-black py-6 shadow-lg">
            <div className="container mx-auto flex justify-between items-center pr-2
            ">
                {/* Logo and Site Name */}
                <Link to="/" className="flex items-center space-x-3 text-white">
                    <img src="/logoimg-new.png" alt="Logo" className="h-16 w-auto pl-7" />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    <Link 
                        to="/about" 
                        className="text-blue-200 hover:text-blue-400 text-lg font-medium transition duration-200"
                    >
                        About
                    </Link>
                    <Link 
                        to="/contactus" 
                        className="text-blue-200 hover:text-blue-400 text-lg font-medium transition duration-200"
                    >
                        Contact
                    </Link>
                    <Link 
                        to="/portfolio" 
                        className="text-blue-200 hover:text-blue-400 text-lg font-medium transition duration-200"
                    >
                        Portfolio
                    </Link>
                    <Link 
                        to="/gallery" 
                        className="text-blue-200 hover:text-blue-400 text-lg font-medium transition duration-200"
                    >
                        Gallery
                    </Link>
                </nav>

                {/* Conditional Rendering: Login/Register Button or User Dropdown */}
                <div className="flex items-center space-x-6">
                    {user ? (
                        <div className="relative group">
                            <button 
                                className="text-blue-200 text-lg font-medium flex items-center space-x-2 hover:text-blue-400 pr-4"
                            >
                                <span>{user.username}</span>
                                <svg 
                                    className="w-5 h-5" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M19 9l-7 7-7-7" 
                                    />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
                                <button 
                                    onClick={logout} 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={openAuthModal} 
                            className="bg-blue-700 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-xl"
                        >
                            Login / Register
                        </button>
                    )}
                    <Register isOpen={isAuthModalOpen} onClose={closeAuthModal} />
                </div>
            </div>
        </header>
    );
};

export default Header;
