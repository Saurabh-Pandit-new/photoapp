import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const PhotographerDashboard = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-800">Please log in to access your dashboard</p>
        <Link to="/login">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-md rounded-lg mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Photographer Dashboard</h2>
        <Link to={`/hire/photographers/bookings`}>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Your Bookings
          </button>
        </Link>
      </div>

      {/* Followers & Following Buttons */}
      <div className="flex space-x-4 mb-6">
        <Link to={`/hire/users/followers`}>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Followers
          </button>
        </Link>
        <Link to={`/hire/users/following`}>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Following
          </button>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="flex items-start bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex-shrink-0 w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
          <img
            src={user.profilePicture || '/default-profile.png'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-6 space-y-3">
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Name:</span> {user.name}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Email:</span> {user.email}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Username:</span> {user.username}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Phone Number:</span> {user.phoneNumber}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Bio:</span> {user.bio || 'No bio added yet'}
          </p>
        </div>
      </div>

      {/* Photographer Info Section */}
      {user.role === 'photographer' && (
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900">Photographer Info</h3>
          <p className="text-lg">
            <span className="font-semibold text-gray-800">Location:</span> {user.photographerInfo.location || 'Not specified'}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-800">Availability:</span> {user.photographerInfo.availability || 'Not set'}
          </p>

          {/* Portfolio Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Portfolio</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {user.photographerInfo.portfolio.map((url, index) => (
                <li key={index} className="bg-gray-100 rounded-lg p-4 shadow">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Portfolio {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Services</h4>
            <ul className="divide-y divide-gray-200 mt-4">
              {user.photographerInfo.services.map((service, index) => (
                <li key={index} className="py-3">
                  <p className="text-lg font-medium text-gray-800">{service.name}</p>
                  <p className="text-sm text-gray-600">
                    Price Range: {service.priceRange} | Advance Payment: {service.advancePayment}
                  </p>
                  {service.discount && (
                    <p className="text-sm text-green-600">Discount: {service.discount}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Reviews</h4>
            <ul className="space-y-4 mt-4">
              {user.photographerInfo.reviews.map((review, index) => (
                <li key={index} className="bg-gray-100 rounded-lg p-4 shadow">
                  <p className="font-medium text-gray-800">{review.user}</p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-sm text-yellow-500">Rating: {review.rating} ⭐</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings Section */}
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-800">
              <span className="font-semibold text-gray-900">Ratings:</span> {user.photographerInfo.ratings} out of 5
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerDashboard;
