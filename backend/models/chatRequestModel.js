// models/chatRequestModel.js
const mongoose = require('mongoose');

const chatRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photographer',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChatRequest', chatRequestSchema);
