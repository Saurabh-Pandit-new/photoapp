import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { usePhotographerContext } from '../../contexts/PhotographerContext';
import CreateBookingForm from './CreateBookingForm';
import { toggleFollowPhotographer } from '../../services/photographerApi';

const PhotographerDetails = () => {
    const { id } = useParams();
    const { getPhotographerById, loading } = usePhotographerContext();
    const [photographer, setPhotographer] = useState(null);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        // Decode the token to get user ID
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setCurrentUserId(decodedToken.id); // Assuming id is the user ID in the token payload
            } catch (err) {
                console.error('Invalid token:', err);
            }
        }
    }, []);

    useEffect(() => {
        const fetchPhotographer = async () => {
            setError(null);
            try {
                const fetchedPhotographer = await getPhotographerById(id);
                if (!fetchedPhotographer) {
                    setError('Photographer not found.');
                    return;
                }
                setPhotographer(fetchedPhotographer);

                const followers = fetchedPhotographer.photographerInfo?.followers || [];
                setIsFollowing(followers.includes(currentUserId));
            } catch (err) {
                setError('Failed to fetch photographer data.');
                console.error(err);
            }
        };

        if (id) fetchPhotographer();
    }, [id, getPhotographerById, currentUserId]);

    const handleToggleFollow = async () => {
        if (!currentUserId) {
            console.error('User ID not found in token');
            return;
        }

        try {
            // Optimistic UI update - update the follow status immediately
            setIsFollowing(!isFollowing);

            const updatedPhotographer = await toggleFollowPhotographer(id, isFollowing);
            if (updatedPhotographer?.photographerInfo?.followers) {
                setPhotographer(updatedPhotographer); // Update photographer data
                
            }
            console.log(updatedPhotographer.message);
        } catch (err) {
            console.error('Failed to toggle follow:', err);
            // Revert the optimistic update if API call fails
            setIsFollowing(!isFollowing);
        }
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setShowBookingForm(true);
    };

    if (loading) return <p className="text-center mt-8 text-lg text-cyan-400">Loading...</p>;
    if (error) return <p className="text-center mt-8 text-lg text-red-500">{error}</p>;
    if (!photographer) return null;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 text-gray-800 my-10">
            {/* Photographer Banner */}
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <img
                    src={photographer.photographerInfo.bannerImage || '/default-banner.jpg'}
                    alt={`${photographer.name} banner`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold">{photographer.name}</h1>
                    <p className="mt-1 text-lg">{photographer.photographerInfo.location || 'Location not specified'}</p>
                </div>
            </div>

            {/* Photographer Details */}
            <div className="flex flex-col md:flex-row items-center mt-8 bg-white shadow-lg rounded-lg p-6 space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-500">
                    <img
                        src={photographer.profilePicture || '/default-profile.png'}
                        alt={photographer.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{photographer.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">{photographer.bio || 'No bio available.'}</p><br></br>
                    <div className="flex items-center mt-2 text-yellow-500">
  {[...Array(4)].map((_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path d="M12 .587l3.668 7.431L24 9.168l-6 5.841L19.336 24 12 19.771 4.664 24l1.336-8.991-6-5.841 8.332-1.15z" />
    </svg>
  ))}
</div>


                </div>
                <button
                    onClick={handleToggleFollow}
                    className={`px-4 py-2 rounded ${isFollowing ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </button>
            </div>

            {/* Services Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photographer.photographerInfo.services.map((service, index) => (
                        <div
                            key={index}
                            onClick={() => handleServiceSelect(service)}
                            className={`p-6 rounded-lg shadow-md space-y-4 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1 ${selectedService === service ? 'bg-cyan-50 border border-cyan-500' : 'bg-white'}`}
                        >
                            <h3 className="text-lg font-medium text-gray-700">{service.name}</h3>
                            <p className="text-sm text-gray-500">Price: {service.priceRange}</p>
                            {service.discount && (
                                <p className="text-sm text-green-600">Discount: {service.discount}</p>
                            )}
                            <p className="text-sm text-gray-500">Advance Payment: {service.advancePayment}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Form */}
            {showBookingForm && (
                <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Photographer</h2>
                    <CreateBookingForm
                        photographerId={id}
                        photographerName={photographer.name}
                        services={photographer.photographerInfo.services}
                        selectedService={selectedService}
                    />
                </div>
            )}
        </div>
    );
};

export default PhotographerDetails;
