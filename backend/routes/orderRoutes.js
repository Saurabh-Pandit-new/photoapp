const express = require('express');
const { updateOrderStatus,placeOrder } = require('../controllers/orderController'); // Import your controller
const { protect } = require('../middlewares/authMiddleware'); // Ensure user is authenticated

const router = express.Router();

// Route to update order status
router.put('/order/update-status', updateOrderStatus);


router.post('/placeorder', protect, placeOrder)

module.exports = router;
