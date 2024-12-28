import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext'; // Adjust the path as necessary

const PhotographerRegistrationForm = ({ onRegistrationSuccess }) => {
    const [location, setLocation] = useState('');
    const [services, setServices] = useState([{ name: '', priceRange: '', advancePayment: '', discount: '' }]);
    const [portfolio, setPortfolio] = useState([]);
    const [availability, setAvailability] = useState('');
    const [bannerImage, setBannerImage] = useState(null); // For banner image
    const [message, setMessage] = useState('');

    // Get user and token from UserContext
    const { user, token } = useContext(UserContext);

    const addService = () => {
        setServices([...services, { name: '', priceRange: '', advancePayment: '', discount: '' }]);
    };

    const handleServiceChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const handlePortfolioChange = (e) => {
        setPortfolio(e.target.value.split(',').map(item => item.trim()));
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('location', location);
        formData.append('services', JSON.stringify(services));  // Convert services array to string
        formData.append('portfolio', JSON.stringify(portfolio));  // Convert portfolio array to string
        formData.append('availability', availability);
    
        if (bannerImage) {
            formData.append('bannerImage', bannerImage); // Add image file if exists
        }
    
        try {
            const response = await axios.put(
                'http://localhost:5000/api/users/becomephoto',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            setMessage(response.data.message);
            if (onRegistrationSuccess) onRegistrationSuccess();
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };
    

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">Register as Photographer</h2>
            {message && <p className="text-center text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Services:</label>
                    {services.map((service, index) => (
                        <div key={index} className="space-y-2 mb-2">
                            <input
                                type="text"
                                placeholder="Service Name"
                                value={service.name}
                                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Price Range"
                                value={service.priceRange}
                                onChange={(e) => handleServiceChange(index, 'priceRange', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Advance Payment"
                                value={service.advancePayment}
                                onChange={(e) => handleServiceChange(index, 'advancePayment', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Discount"
                                value={service.discount}
                                onChange={(e) => handleServiceChange(index, 'discount', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addService}
                        className="mt-2 text-blue-500 hover:underline"
                    >
                        + Add Another Service
                    </button>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Portfolio (comma-separated URLs):</label>
                    <input
                        type="text"
                        value={portfolio.join(', ')}
                        onChange={handlePortfolioChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Availability:</label>
                    <input
                        type="text"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Banner Image (optional):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Register as Photographer
                </button>
            </form>
        </div>
    );
};

export default PhotographerRegistrationForm;
