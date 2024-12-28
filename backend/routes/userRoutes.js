const express = require('express');
const router = express.Router();
const { registerUser,registerAsPhotographer, loginUser, getUserProfile, updateUserProfile, followPhotographer, unfollowPhotographer,getPhotographers,getFollowers,getFollowing } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); // Assumes you have an auth middleware for authentication
const uploadImage = require('../middlewares/uploadMiddleware');

// Route to register user with profile picture upload
router.post('/register', uploadImage('user-profile').single('profilePicture'), registerUser);

// Route for registering as a photographer with banner image upload
router.put(
    '/becomephoto',
    protect, // Protect route (user must be logged in)
    uploadImage('user-profile').single('bannerImage'), // Upload middleware
    registerAsPhotographer
);




// Login a user
router.post('/login', loginUser);


// Update user profile (can also allow profile picture upload here)
router.put('/profile', protect, uploadImage('user-profiles').single('profilePicture'), updateUserProfile);

// Follow a photographer
router.post('/:id/follow', protect, followPhotographer);

// Unfollow a photographer
router.post('/:id/unfollow', protect, unfollowPhotographer);


router.get('/getphotographers',getPhotographers);
router.get('/:id/followers', protect, getFollowers);
router.get('/:id/following',protect, getFollowing);





module.exports = router;
