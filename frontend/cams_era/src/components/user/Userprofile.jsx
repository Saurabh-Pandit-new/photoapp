import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext'; // Adjust import to point to your UserContext
import { getUserProfile } from '../../services/getUserProfile'; // Import the function to get user profile
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { user, token } = useContext(UserContext); // Use UserContext to get user and token
    const [profileData, setProfileData] = useState(null); // State to store user profile data
    const [error, setError] = useState(''); // State to store error message

    const { logout } = useContext(UserContext);  // Access logout function from UserContext

    const handleLogout = () => {
        logout();  // Call logout function to clear user data and token
    };

    useEffect(() => {
        // Fetch user profile when component mounts
        const fetchUserProfile = async () => {
            try {
                if (token) { // Ensure the token is available
                    const userData = await getUserProfile(token); // Pass the token to getUserProfile
                    setProfileData(userData); // Set user profile data in state
                }
            } catch (err) {
                setError(err.message); // Handle any error
            }
        };

        fetchUserProfile(); // Call the function when component mounts
    }, [token]); // Dependency array includes token to re-fetch if it changes

    if (error) {
        return <p className="text-red-500">Error: {error}</p>; // Show error message if there is an error
    }

    if (!profileData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg">Please log in</p>
                <Link to="/login">
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>  {/* Login button */}
                </Link>
            </div>
        ); // Show loading message while fetching data
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <div className="flex items-center mb-6">
                <img src={profileData.profilePicture} alt="Profile" className="rounded-full w-32 h-32 mr-4" />
                <div>
                    <p className="text-lg font-medium">Name: {profileData.name}</p>
                    <p className="text-md">Email: {profileData.email}</p>
                    <p className="text-md">Username: {profileData.username}</p>
                    <p className="text-md">Phone Number: {profileData.phoneNumber}</p>
                    <p className="text-md">Bio: {profileData.bio}</p>
                </div>
            </div>

            {/* Display photographer-specific information if user is a photographer */}
            {profileData.role === 'photographer' && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Photographer Info</h3>
                    <p className="text-md">Location: {profileData.photographerInfo.location}</p>
                    <p className="text-md">Availability: {profileData.photographerInfo.availability}</p>
                    <h4 className="text-lg font-semibold">Portfolio:</h4>
                    <ul className="list-disc ml-6">
                        {profileData.photographerInfo.portfolio.map((url, index) => (
                            <li key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{url}</a>
                            </li>
                        ))}
                    </ul>
                    <h4 className="text-lg font-semibold mt-4">Services:</h4>
                    <ul className="list-disc ml-6">
                        {profileData.photographerInfo.services.map((service, index) => (
                            <li key={index} className="text-md">
                                <strong>{service.name}</strong>: {service.priceRange}, Advance Payment: {service.advancePayment}, Discount: {service.discount}
                            </li>
                        ))}
                    </ul>
                    <h4 className="text-lg font-semibold mt-4">Ratings:</h4>
                    <p className="text-md">{profileData.photographerInfo.ratings} out of 5</p>
                    <h4 className="text-lg font-semibold mt-4">Reviews:</h4>
                    <ul className="list-disc ml-6">
                        {profileData.photographerInfo.reviews.map((review, index) => (
                            <li key={index} className="text-md">
                                <strong>{review.user}</strong>: {review.comment} (Rating: {review.rating})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-6">
                <Link to="/">
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>  {/* Logout button */}
                </Link>
            </div>
        </div>
    );
};

export default UserProfile;
