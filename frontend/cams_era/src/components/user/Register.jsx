// src/components/AuthModal.jsx
import React, { useState, useContext } from 'react';
import { loginUser, registerUser } from '../../services/userservices';
import { UserContext } from '../../contexts/UserContext';

const Register = ({ isOpen, onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and registration
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        username: '',
        phoneNumber: '',
        bio: '',
        profilePicture: null,
    });
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLoginMode) {
                const response = await loginUser({ email: formData.email, password: formData.password });
                login(response); // Log in the user
            } else {
                const userData = new FormData();
                Object.keys(formData).forEach((key) => userData.append(key, formData[key]));
                await registerUser(userData); // Register the user
            }
            onClose(); // Close modal on successful login or registration
            setError(''); // Reset error
        } catch (err) {
            setError(err.message || 'Operation failed');
        }
    };

    if (!isOpen) return null; // Don't render the modal if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 z-10 shadow-lg">
                <h2 className="text-xl mb-4">{isLoginMode ? 'Login' : 'Register'}</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border rounded p-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="border rounded p-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="border rounded p-2 mb-2 w-full"
                            />
                            <textarea
                                name="bio"
                                placeholder="Bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="border rounded p-2 mb-2 w-full"
                            ></textarea>
                            <input
                                type="file"
                                name="profilePicture"
                                onChange={handleFileChange}
                                className="mb-2"
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 mb-2 w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 mb-4 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
                        {isLoginMode ? 'Login' : 'Register'}
                    </button>
                </form>
                <button onClick={() => setIsLoginMode((prev) => !prev)} className="text-blue-500 mt-4">
                    {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
                </button>
                <button onClick={onClose} className="text-red-500 mt-4">Cancel</button>
            </div>
        </div>
    );
};

export default Register;
