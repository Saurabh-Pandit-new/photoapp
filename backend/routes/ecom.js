const express = require('express');
const { getAllProducts,getProductById } = require ('../controllers/userController'); // Import the controller function

const router = express.Router();

// Route to get all products
router.get('/products', getAllProducts); // This will call the controller function to get all products

router.get('/products/:id', getProductById);  // Route to get product by ID

module.exports = router;
