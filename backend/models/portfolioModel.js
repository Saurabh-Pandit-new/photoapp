const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    photographer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photographer',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
