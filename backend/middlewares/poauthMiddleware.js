// const jwt = require('jsonwebtoken');
// const Photographer = require('../models/photographerModel');

// // Middleware to check if the user is authorized to access a photographer's portfolio
// const authorizePhotographer = async (req, res, next) => {
//     try {
//         // Extract the token from the Authorization header
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'No token provided or invalid format' });
//         }

//         const token = authHeader.split(' ')[1];

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Find the photographer by the ID stored in the token
//         const photographer = await Photographer.findById(decoded.id);
//         if (!photographer) {
//             return res.status(404).json({ message: 'Photographer not found' });
//         }

//         // Attach the photographer to the request object for use in subsequent middleware/routes
//         req.photographer = photographer;
        
//         // Proceed to the next middleware or route
//         next();
//     } catch (error) {
//         // Differentiate between token expiration and other errors
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ message: 'Token expired, please log in again' });
//         }
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ message: 'Invalid token, authorization denied' });
//         }

//         // Generic error response
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// module.exports = { authorizePhotographer };
