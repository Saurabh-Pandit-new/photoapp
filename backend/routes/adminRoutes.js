const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddlleware');  // Admin check middleware
const uploadImage = require('../middlewares/uploadMiddleware'); // Assuming multer config
const {
    getAllUsers,
    deleteUser,
    getAllPhotographers,
    deletePhotographer,
    getAllBookings,
    deleteBooking,
    getAllOrdersForAdmin
} = require('../controllers/adminTaskController');  // Ensure this path is correct
const { addProduct,removeProduct,updateProduct } = require('../controllers/productController');


const router = express.Router();

// Users management routes
router.get('/users', isAdmin, getAllUsers);
router.delete('/users/:id', isAdmin, deleteUser);

// Photographer management routes
router.get('/photographers', isAdmin, getAllPhotographers);
router.delete('/photographers/:id', isAdmin, deletePhotographer);

// Booking management routes
router.get('/bookings', isAdmin, getAllBookings);
router.delete('/bookings/:id', isAdmin, deleteBooking);


// add product
router.post('/addproduct',isAdmin,uploadImage('product-image').array('images', 10),addProduct);
router.post('/productupdate',isAdmin,updateProduct);
router.post('/productget',isAdmin,getAllOrdersForAdmin);
router.delete('/:id'  ,isAdmin,removeProduct);





module.exports = router;
