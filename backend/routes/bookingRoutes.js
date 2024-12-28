const express = require('express');
const { createBooking,updateBookingStatus,getBookingsForPhotographer, getUserBookings,respondToBookingRequest } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure correct import
const router = express.Router();

// Create a booking
router.post('/request', protect, createBooking); 
router.put('/:bookingId/status', protect, updateBookingStatus);




// Get all bookings for a specific user
router.get('/photographer', protect, getBookingsForPhotographer);



// Get all bookings for the logged-in user
router.get('/mybookings', protect, getUserBookings);

router.put('/:bookingId/respond', protect,respondToBookingRequest);



module.exports = router;
