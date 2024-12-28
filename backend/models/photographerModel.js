const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema for the Photographer/ User
const photographerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,  // URL or path to the user's profile picture
        default: 'default-profile.png',  // Default profile picture if none uploaded
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,  // Sparse allows some users not to have phone numbers
    },
    bio: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        required: true,  // Location where the photographer operates
    },
    services: [
        {
            name: {
                type: String,
                required: true,  // Name of the service, like "Wedding Photography"
            },
            priceRange: {
                type: String,
                required: true,  // Price range for the service
            },
            advancePayment: {
                type: String,
                required: true,  // Percentage of advance payment required
            },
            discount: {
                type: String,  // Discount, if any
                default: '',
            }
        }
    ],
    portfolio: [
        {
            type: String,  // URL or path to portfolio images
            required: false,  // Portfolio may be added later
        }
    ],
    availability: {
        type: String,
        default: '',
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                default: '',
            },
            rating: {
                type: Number,
                required: true,
            }
        }
    ],
    socialMediaLinks: {
        instagram: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        }
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Password hashing middleware before saving
photographerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Photographer = mongoose.model('photographer', photographerSchema);
module.exports = Photographer;
