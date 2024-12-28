const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Admin Registration
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        

        // Create new admin
        const admin = new Admin({
            name,
            email,
            password, 
        });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin Login
// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Use the matchPassword method to compare passwords
        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Admin logged in successfully',
            token:token ,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    registerAdmin,
    loginAdmin,
};
