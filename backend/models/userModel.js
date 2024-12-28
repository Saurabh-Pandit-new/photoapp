const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
        type: String,
        default: 'default-profile.png',
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    bio: {
        type: String,
        default: '',
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    role: {
        type: String,
        enum: ['user', 'photographer'],
        default: 'user',
    },
    photographerInfo: {
        location: {
            type: String,
        },
        services: [{
            name: {
                type: String,
                required: true,
            },
            priceRange: {
                type: String,
                required: true,
            },
            advancePayment: {
                type: String,
                required: true,
            },
            discount: {
                type: String,
                default: '',
            },
        }],
        portfolio: [String],
        availability: {
            type: String,
            default: '',
        },
        ratings: {
            type: Number,
            default: 0,
        },
        reviews: [{
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
            },
        }],
        socialMediaLinks: {
            instagram: {
                type: String,
                default: '',
            },
            facebook: {
                type: String,
                default: '',
            },
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        bannerImage: {
            type: String, // Path or URL for the banner image
            default: 'default-banner.png',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Password hashing middleware before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Accessing fields conditionally based on role
userSchema.virtual('isPhotographer').get(function () {
    return this.role === 'photographer';
});

const User = mongoose.model('User', userSchema);
module.exports = User;
