const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['booking', 'status'], // Different types of notifications
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Indicates whether the notification has been read
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled'], // Status of the notification
      default: 'pending', // Default status when created
    },
    metadata: {
      type: Object, // Store any additional details like bookingId, etc.
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
