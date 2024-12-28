const Booking = require('../models/bookingModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const { sendEmailToUser } = require('../utils/sendMail');
const { createNotification } = require('./notificationController');
// In bookingController.js
const { getIO,onlineUsers } = require('../utils/socketManager');




// @desc    Create a new booking
// @route   POST /api/bookings/create
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { 
      userInfo, 
      eventDetails, 
      photographyRequirements, 
      additionalNotes,
      photographer 
    } = req.body;

    const newBooking = new Booking({
      userInfo,
      eventDetails,
      photographyRequirements,
      additionalNotes,
      photographer,
      requestedBy: req.user._id, // User making the request
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ requestedBy: req.user._id }).populate('photographer', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};










// @desc    Update booking status and send email notification
// @route   PUT /api/bookings/:bookingId/status
// @access  Private
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const { bookingId } = req.params;

  try {
    // Validate booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }

    // Validate status value
    const validStatuses = ['pending', 'confirmed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Find and update the booking with populated photographer details
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )
    .populate('requestedBy', 'name email') // Populate requester details
    .populate('photographer', 'name phoneNumber'); // Populate photographer details
    console.log(booking.photographer);
    console.log(booking.photographer.name);
    console.log(booking.eventDetails.date);



    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Send email to the user who made the booking
    const userEmail = booking.userInfo?.email || booking.requestedBy?.email;
    console.log(userEmail);
    const subject = `Booking Status Updated: ${status}`;
    let message = '';

    if (status === 'confirmed') {
      message = `
        Dear ${booking.requestedBy.name},
    
        We are pleased to inform you that your booking has been confirmed. Here are the details of your booking:
    
        **Booking ID**: ${bookingId}
        **Photographer Name**: ${booking.photographer.name}
        **Photographer Contact**: ${booking.photographer.phoneNumber}
        **Event Date**: ${booking.eventDetails.date}
        **Event Location**: ${booking.eventDetails.location}
    
        Please contact the photographer to discuss further details and arrangements. If you have any questions, feel free to reply to this email.
    
        Best regards,  
        The camsEra Team
      `;
    } else if (status === 'rejected') {
      message = `
        Dear ${booking.requestedBy.name},
    
        We regret to inform you that your booking has been rejected. Below are the details of your booking request:
    
        **Booking ID**: ${bookingId}
        **Event Date**: ${booking.eventDetails.eventDate}
        **Event Location**: ${booking.eventDetails.location}
    
        We recommend exploring other photographers on our platform to meet your event needs. Feel free to reply to this email if you have any questions.
    
        Sincerely,  
        The camsEra Team
      `;
    } else if (status === 'pending') {
      message = `
        Dear ${booking.requestedBy.name},
    
        Your booking request is currently pending. Here are the details of your booking:
    
        **Booking ID**: ${bookingId}
        **Photographer Name**: ${booking.photographer.name}
        **Event Date**: ${booking.eventDetails.eventDate}
        **Event Location**: ${booking.eventDetails.location}
    
        We will notify you as soon as there is an update on your booking status. Thank you for your patience.
    
        Best regards,  
        The camsEra Team
      `;
    }

    // Send the email to the user
    await sendEmailToUser(userEmail, subject, message);

    // Respond with the updated booking details
    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Error updating booking status:', error.message);
    return res.status(500).json({ error: 'Failed to update booking status' });
  }
};




const getBookingsForPhotographer = async (req, res) => {
  try {
    const photographerId = req.user._id;

    if (req.user.role !== 'photographer') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const bookings = await Booking.find({ photographer: photographerId })
      .populate('requestedBy', 'username email')
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};



const getUserBookings = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(400).json({ error: 'User ID missing from request' });
    }

    const bookings = await Booking.find({ requestedBy: req.user._id })
      .populate('photographer', 'name photographerInfo.location')
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching user bookings:', error.message);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};

const respondToBookingRequest = async (req, res) => {
  try {
    const { confirmationStatus } = req.body;
    const bookingId = req.params.bookingId;

    // Ensure valid status
    if (!['accepted', 'rejected'].includes(confirmationStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find and update the booking status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: confirmationStatus },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json({ message: `Booking ${confirmationStatus}`, booking });
  } catch (error) {
    console.error('Error updating booking status:', error.message);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getBookingsForPhotographer,
  getUserBookings,
  respondToBookingRequest,
};
