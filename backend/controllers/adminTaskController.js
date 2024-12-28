const User = require('../models/userModel');
const Photographer = require('../models/photographerModel');
const Booking = require('../models/bookingModel');
const Order = require('../models/orderModel');


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        Object.assign(user, req.body);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all photographers
const getAllPhotographers = async (req, res) => {
    try {
        const photographers = await Photographer.find();
        res.status(200).json(photographers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a photographer
const deletePhotographer = async (req, res) => {
    try {
        const photographer = await Photographer.findByIdAndDelete(req.params.id);
        if (!photographer) {
            return res.status(404).json({ message: 'Photographer not found' });
        }
        res.status(200).json({ message: 'Photographer deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a photographer
const updatePhotographer = async (req, res) => {
    try {
        const photographer = await Photographer.findById(req.params.id);
        if (!photographer) {
            return res.status(404).json({ message: 'Photographer not found' });
        }

        Object.assign(photographer, req.body);
        await photographer.save();

        res.status(200).json(photographer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user photographer');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin can update booking status
const updateBookingStatusByAdmin = async (req, res) => {
    const { status } = req.body;

    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        const updatedBooking = await booking.save();

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get all orders for admin (with calculations)
const getAllOrdersForAdmin = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find({}).populate('user', 'name email'); // Populate user details if needed

        // If no orders are found
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Calculate total revenue and total orders
        let totalRevenue = 0;
        orders.forEach((order) => {
            totalRevenue += order.totalPrice; // Assuming each order has a 'totalPrice' field
        });

        // Return orders along with total revenue
        res.status(200).json({
            totalOrders: orders.length,
            totalRevenue: totalRevenue,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    getAllPhotographers,
    deletePhotographer,
    updatePhotographer,
    getAllBookings,
    deleteBooking,
    updateBookingStatusByAdmin,
    getAllOrdersForAdmin
};