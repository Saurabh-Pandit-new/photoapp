import React, { useState, useContext } from 'react';
import { AdminContext } from '../../Context/contextAdmin';
import { loginAdmin } from '../services/adminauthApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setAdmin } = useContext(AdminContext);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState(''); // Define the error state

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await loginAdmin({ email, password });
            // Store the token in localStorage
            localStorage.setItem('token', response.token);
            // Set token in AdminContext
            setToken(response.token);

            // If the response contains admin info, set it in the context
            if (response.admin) {
                setAdmin(response.admin);
            }

            setSuccess('Login successful!');
            setError(''); // Clear any previous errors
            console.log('Token:', response.token);
        } catch (err) {
            setError(err.message || 'Login failed'); // Set the error message
            setSuccess(''); // Clear success message
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
