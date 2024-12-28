// src/components/HireBusinessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HireBusinessPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Join Our Photographer Network</h1>
                <p className="text-gray-700 text-center mb-8">
                    Discover how you can grow your photography business with us. Benefit from more visibility, client leads, and resources designed for your success.
                </p>

                {/* Steps Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <span className="font-semibold">Create Your Profile:</span> Set up a profile showcasing your best work, services, and experience.
                        </li>
                        <li>
                            <span className="font-semibold">Get Verified:</span> Complete the verification process to gain trust with potential clients.
                        </li>
                        <li>
                            <span className="font-semibold">Receive Client Leads:</span> We match you with clients looking for photographers with your skills.
                        </li>
                        <li>
                            <span className="font-semibold">Start Earning:</span> Accept jobs and grow your reputation through our platform.
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Benefits of Joining</h2>
                    <ul className="list-disc list-inside space-y-4">
                        <li>Increased visibility and access to a larger client base.</li>
                        <li>Tools and resources to enhance your profile and portfolio.</li>
                        <li>Secure and simplified payment system.</li>
                        <li>Opportunities to showcase your work through featured stories.</li>
                        <li>Dedicated support to help you succeed.</li>
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <Link to='/hire/photoregister'>
                    <button className="bg-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition duration-300">
                        Get Started as a Photographer
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HireBusinessPage;
