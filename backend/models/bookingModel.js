const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
  },
  eventDetails: {
    eventType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    location: {
      venueName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  },
  photographyRequirements: {
    package: { type: String, required: true },
    specialRequirements: { type: String },
    numberOfPeople: { type: Number },
  },
  additionalNotes: { type: String },
  photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending',
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

