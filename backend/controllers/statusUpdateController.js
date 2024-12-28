const Booking = require('../models/bookingModel');
const Photographer = require('../models/photographerModel');

// Function for photographer to update the status of a booking
const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;  // The ID of the booking from the URL parameters
    const { status } = req.body;       // The new status from the request body

    try {
        // Find the booking by its ID
        const booking = await Booking.findById(bookingId).populate('photographer');

        // If the booking is not found, return a 404 error
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Ensure the authenticated photographer is updating their own booking
        if (!req.photographer || req.photographer._id.toString() !== booking.photographer._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this booking' });
        }

        // Update the booking's status
        booking.status = status;
        await booking.save();

        // Respond with the updated booking details
        res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        // Catch and return any server errors
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { updateBookingStatus };
