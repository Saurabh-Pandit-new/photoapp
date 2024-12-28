import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useModal } from '../../contexts/ModalContext';
import Register from '../user/Register';
import { FaCaretDown, FaBell } from 'react-icons/fa';
import io from 'socket.io-client';

const HeaderHire = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useModal();
  const { user, logout, isAuthenticating } = useContext(UserContext);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'user') return;

    const socket = io('http://localhost:5000', { query: { userId: user._id } });

    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const handleNotificationClick = () => navigate('/hire/users/bookings');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !notificationRef.current?.contains(event.target) &&
        !userDropdownRef.current?.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotificationDropdown = () => setIsNotificationDropdownOpen((prev) => !prev);
  const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-700 to-blue-800 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logoimg-new.png" alt="Logo" className="h-16 w-auto pl-7" />
        </Link>

        <div className="flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search photographers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <nav className="flex space-x-4">
          <Link to="/hire/photographers" className="hover:text-gray-300">
            Photographers
          </Link>
          <Link to="/hire/packages" className="hover:text-gray-300">
            Packages
          </Link>
          <Link to="/hire/reviews" className="hover:text-gray-300">
            Reviews
          </Link>
          <Link to="/hire/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
        </nav>

        <div className="space-x-4 flex items-center">
          {isAuthenticating ? (
            <button className="hover:underline">Loading...</button>
          ) : !user ? (
            <>
              <button
                onClick={openAuthModal}
                className="bg-white text-blue-700 rounded p-2 shadow hover:bg-gray-200"
              >
                Login / Register
              </button>
              <Register isOpen={isAuthModalOpen} onClose={closeAuthModal} />
            </>
          ) : (
            <>
              {user.role === 'user' && (
                <div ref={notificationRef} className="relative">
                  <FaBell
                    className="cursor-pointer text-xl"
                    onClick={toggleNotificationDropdown}
                  />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
                      {notifications.length}
                    </span>
                  )}
                  {isNotificationDropdownOpen && (
                    <div className="absolute top-full mt-2 w-64 bg-white text-blue-700 rounded shadow-lg">
                      <div className="p-4 border-b">
                        <h4 className="font-bold">Notifications</h4>
                      </div>
                      <div className="p-4 max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                          <ul>
                            {notifications.map((notif, index) => (
                              <li key={index} className="mb-2">
                                {notif.message}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No new notifications</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div ref={userDropdownRef} className="relative flex items-center cursor-pointer">
                <span
                  className="font-semibold mr-1"
                  onClick={toggleUserDropdown}
                >
                  {user.username}
                </span>
                <FaCaretDown className="text-white" />
                {isUserDropdownOpen && (
                  <div className="absolute top-full mt-2 w-48 bg-white text-blue-700 rounded shadow-lg">
                    <Link
                      to="/profile/info"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Personal Information
                    </Link>
                    <Link
                      to="/profile/address"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Addresses
                    </Link>
                    <Link
                      to="/hire/wishlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <button
                      onClick={handleNotificationClick}
                      className="block px-4 py-2 w-full hover:bg-gray-100"
                    >
                      Bookings
                    </button>
                  </div>
                )}
              </div>

              {user.role === 'photographer' ? (
                <Link
                  to="/hire/photographerdashboard"
                  className="bg-white text-blue-700 rounded p-2 shadow hover:bg-gray-200"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/hire/bussiness"
                  className="bg-white text-blue-700 rounded p-2 shadow hover:bg-gray-200"
                >
                  Become a Photographer
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderHire;
