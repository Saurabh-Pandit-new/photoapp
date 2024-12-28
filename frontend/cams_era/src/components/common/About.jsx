import React from 'react';

const About = () => {
    return (
        <div className="bg-black text-gray-100 min-h-screen py-12 px-6 md:px-20 lg:px-32">
            <h2 className="text-4xl font-bold text-green-500 mb-6">About Us</h2>
            <p className="text-lg mb-8">
                Welcome to <span className="text-green-500">[AppName]</span>, your one-stop platform for hiring professional photographers and finding high-quality photography-related products. Whether you're looking to capture life's precious moments or elevate your own photography, we’ve got you covered.
            </p>

            <h3 className="text-2xl font-semibold text-green-400 mb-4">Our Mission</h3>
            <p className="text-lg mb-8">
                We aim to make professional photography accessible and provide exceptional products for photography enthusiasts. By connecting users with skilled photographers and offering a curated collection of photography gear, we strive to enhance every photographic experience.
            </p>

            <h3 className="text-2xl font-semibold text-green-400 mb-4">Hire the Best Photographers</h3>
            <p className="text-lg mb-8">
                Our platform features a wide range of professional photographers with expertise across genres—wedding, portrait, event, and more. Browse through portfolios, compare rates, and find the perfect photographer for your occasion. We make it easy for you to capture beautiful memories with the help of top-rated professionals.
            </p>

            <h3 className="text-2xl font-semibold text-green-400 mb-4">Shop Premium Photography Products</h3>
            <p className="text-lg mb-8">
                Discover a curated selection of products designed for photographers of all levels. From high-quality cameras and lenses to accessories like tripods, lighting, and editing tools, we offer a variety of gear to help you create your best work. All products are carefully selected to ensure quality and value.
            </p>

            <h3 className="text-2xl font-semibold text-green-400 mb-4">Why Choose Us?</h3>
            <ul className="text-lg space-y-2 mb-8">
                <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Professional photographers with verified reviews
                </li>
                <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Curated, high-quality photography products
                </li>
                <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Easy booking and secure transactions
                </li>
                <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Customer support to assist with any questions or concerns
                </li>
            </ul>

            <p className="text-lg">
                Join our community of photography lovers and let us help you create and capture stunning images. We’re passionate about photography and committed to supporting photographers and enthusiasts alike.
            </p>
        </div>
    );
};

export default About;
