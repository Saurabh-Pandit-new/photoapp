import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div
        >
            {/* Overlay for Gradient and Content */}
            <div className="relative bg-gradient-to-b from-gray-900 to-black p-8  min-h-screen text-blue-300 bg-cover bg-center"
            style={{ backgroundImage: "url('/outerbackground4.jpg')" }}>
                {/* Hero Section */}
                <section
                    className="text-center py-16 bg-cover bg-center text-white rounded-lg shadow-lg mb-12"
                    style={{ backgroundImage: "url('/homebackground.jpg')" }}
                >
                    <div className="p-8 bg-cover bg-center rounded-lg">
                        <h1 className="text-5xl font-bold mb-4">Capture Every Moment</h1>
                        <p className="text-lg mb-8 max-w-xl mx-auto text-blue-200">
                            Whether you're looking to hire professional photographers for your events or shop for top-notch photography gear, we've got you covered.
                        </p>
                    </div>
                    <div className="flex justify-center space-x-6">
                        <Link to="/hire/photographers">
                            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-lg">
                                Find a Photographer
                            </button>
                        </Link>
                        <Link to="/shop/products">
                            <button className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-200 text-white shadow-lg">
                                Shop Premium Gear
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Why Hire a Photographer Section */}
                <section
                    className="bg-gray-800 p-8 rounded-lg shadow-lg mb-16 text-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/homebackground1.jpg')" }}
                >
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">Why Hire a Professional Photographer?</h2>
                    <p className="text-blue-300 mb-6">
                        Professional photographers capture moments that last forever. From weddings to corporate events, their expertise ensures beautiful memories.
                    </p>
                    <img src="/hr1.jpg" alt="Professional Photographer" className="w-full h-auto rounded-lg mb-6 shadow-md" />
                    <Link to="/hire/photographers">
                        <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-lg">
                            Hire the Best
                        </button>
                    </Link>
                </section>

                {/* Top-Quality Photography Gear Section */}
                <section className="bg-gray-800 p-8 rounded-lg shadow-lg mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">Top-Quality Photography Gear</h2>
                    <p className="text-blue-300 mb-6">
                        Our photography gear is handpicked to meet the highest standards, ensuring durability and performance. Whether you're a pro or a hobbyist, we have the gear you need.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-md w-1/3">
                            <h3 className="text-xl font-bold text-blue-400 mb-4">Cameras</h3>
                            <p className="text-blue-300">Capture every detail with our high-quality cameras designed for professionals.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg shadow-md w-1/3">
                            <h3 className="text-xl font-bold text-blue-400 mb-4">Lenses</h3>
                            <p className="text-blue-300">Achieve stunning shots with a variety of lenses for different needs and preferences.</p>
                        </div>
                    </div>
                    <Link to="/shop/products">
                        <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-lg">
                            Browse Gear
                        </button>
                    </Link>
                </section>

                {/* Become a Photographer Section */}
                <section
                    className="p-8 rounded-lg shadow-lg text-center mb-16 bg-cover bg-center"
                    style={{ backgroundImage: "url('/become-bg.jpg')" }}
                >
                    <h2 className="text-3xl font-bold mb-4 text-white">Become a Photographer</h2>
                    <p className="mb-6 text-blue-200">
                        Start your own photography business today. Set your own rates, build your portfolio, and connect with clients.
                    </p>
                    <img src="/hr2-removebg-preview.png" alt="Photographer" className="w-full h-auto rounded-lg mb-6 shadow-md" />
                    <Link to="/hire/register">
                        <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg">
                            Join Our Platform
                        </button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Home;
