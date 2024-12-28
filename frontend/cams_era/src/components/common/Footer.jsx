// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-10 text-gray-300">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Tagline */}
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <Link to="/" className="flex items-center space-x-2 text-cyan-400">
                        <img src="/Cams_Era.png" alt="Logo" className="h-8 w-auto" />
                        <span className="text-lg font-semibold">CamsEra</span>
                    </Link>
                    <p className="mt-2 text-sm text-gray-400">Capture moments that last forever.</p>
                </div>
                
                {/* Quick Links */}
                <div className="flex space-x-6 text-sm mb-6 md:mb-0">
                    <Link to="/about" className="hover:text-cyan-400">About</Link>
                    <Link to="/contactus" className="hover:text-cyan-400">Contact</Link>
                    <Link to="/portfolio" className="hover:text-cyan-400">Portfolio</Link>
                    <Link to="/gallery" className="hover:text-cyan-400">Gallery</Link>
                </div>
                
                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-cyan-400 transition duration-200"><FaFacebookF /></a>
                    <a href="#" className="hover:text-cyan-400 transition duration-200"><FaInstagram /></a>
                    <a href="#" className="hover:text-cyan-400 transition duration-200"><FaTwitter /></a>
                    <a href="#" className="hover:text-cyan-400 transition duration-200"><FaLinkedinIn /></a>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-8">
                <p>© 2024 CamsEra. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
