const express = require('express');
const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
} = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure user is authenticated

const router = express.Router();

// Add product to cart
router.post('/add', protect, addToCart);

// Get user's cart
router.get('/cartitems', protect, getCart);

// Update product quantity in cart
router.post('/update', protect, updateCart);

// Remove product from cart
router.delete('/remove', protect, removeFromCart);

module.exports = router;
