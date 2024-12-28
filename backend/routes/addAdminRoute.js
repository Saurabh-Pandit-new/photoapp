const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const router = express.Router();
const multer = require('multer');
const upload = multer();  // Use multer to handle form-data

// Admin Registration
router.post('/register', upload.none(), registerAdmin);

// Admin Login
router.post('/login', loginAdmin);

module.exports = router;
