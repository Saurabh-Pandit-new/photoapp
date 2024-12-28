const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const isAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you're using the correct secret

            // Get admin from the token
            req.admin = await Admin.findById(decoded.id).select('-password');

            // Check if the admin exists
            if (req.admin) {
                next(); // Proceed if admin exists
            } else {
                res.status(403).json({ message: 'Not authorized' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


module.exports = { isAdmin };
