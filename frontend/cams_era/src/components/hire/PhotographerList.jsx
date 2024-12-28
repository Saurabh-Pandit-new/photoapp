import React, { useContext } from 'react';
import { PhotographerContext } from '../../contexts/PhotographerContext';
import { Link } from 'react-router-dom';

const PhotographerList = () => {
    const { photographers, loading, error } = useContext(PhotographerContext);

    if (loading) return <p>Loading photographers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {photographers?.map((photographer) => (
                <div
                    key={photographer._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-6 hover:shadow-xl transition-shadow"
                >
                    {/* Circular Profile Image */}
                    <div className="flex justify-center">
                        <img
                            src={photographer.profilePicture || '/default-profile.jpg'}
                            alt={photographer.name || 'Photographer'}
                            className="w-24 h-24 object-cover rounded-full border-4 border-blue-700"
                        />
                    </div>

                    <div className="text-center mt-4">
                        {/* Photographer Name */}
                        <h3 className="text-lg font-semibold text-gray-800">{photographer.name}</h3>

                        {/* Photographer Location */}
                        <p className="text-gray-600 text-sm mt-2">
                            {photographer.photographerInfo?.location || 'Location not available'}
                        </p>

                        {/* Stars */}
                        <div className="flex items-center justify-center mt-2 text-yellow-500">
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


                    {/* Book Now Button */}
                    <div className="mt-6">
                        <Link to={`/hire/photographers/${photographer._id}`}>
                            <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-00 transition">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotographerList;
