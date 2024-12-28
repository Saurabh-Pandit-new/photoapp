// src/components/LoginModal.jsx
import React, { useState, useContext } from 'react';
import { loginUser } from '../../services/userservices';
import { UserContext } from '../../contexts/UserContext';
import { ModalContext } from '../../contexts/ModalContext'; // Import the ModalContext

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useContext(UserContext);
    const { closeAuthModal } = useContext(ModalContext); // Get close function from ModalContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            login(response); // Set user and token globally
            setSuccess('Login successful!');
            setError('');
            console.log('Token:', response.token);
            closeAuthModal(); // Close modal on successful login
        } catch (err) {
            setError(err.message || 'Login failed');
            setSuccess('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeAuthModal}></div>
            <div className="bg-white rounded-lg p-6 z-10 shadow-lg">
                <h2 className="text-xl mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border rounded p-2 mb-2 w-full text-black bg-white" // Ensure background is white
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded p-2 mb-4 w-full text-black bg-white" // Ensure background is white
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
                        Login
                    </button>
                </form>
                <button onClick={closeAuthModal} className="text-red-500 mt-4">Cancel</button>
            </div>
        </div>
    );
};

export default Login;
