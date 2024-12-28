const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Offer Schema
const offerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: [String],
    reviews: [reviewSchema],
    offer: offerSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Avoid model overwrite
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
