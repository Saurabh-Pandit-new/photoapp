const express = require('express');
const { searchPhotographers } = require('../controllers/searchController');
const router = express.Router();
const { searchProducts } = require('../controllers/productController');

// Route for searching products
router.get('/searchproducts', searchProducts);


router.get('/searchphotographers', searchPhotographers);

module.exports = router;
