const User = require('../models/userModel');
const Photographer = require('../models/photographerModel');
const Product = require('../models/productmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register User
const registerUser = async (req, res) => {
    const { name, email, password, username, phoneNumber, bio } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create new user with role set as 'user' by default
        const user = new User({
            name,
            email,
            password,  // This will be hashed automatically by the pre-save hook in the schema
            username,
            phoneNumber,
            bio,
            profilePicture: req.file ? req.file.path : 'uploads/default-profile.png',  // If no image is uploaded, set default
            role: 'user',  // Default role
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const registerAsPhotographer = async (req, res) => {
  const { userId, location, services, portfolio, availability } = req.body;

  try {
      // Validate if the userId exists
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if user is already a photographer
      if (user.role === 'photographer') {
          return res.status(400).json({ message: 'User is already a photographer' });
      }

      // Validate that required fields are present
      if (!location || !services || !portfolio || !availability) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Update user role to photographer
      user.role = 'photographer';
      user.photographerInfo = {
          location,
          services: JSON.parse(services),  // Ensure services is correctly parsed
          portfolio: JSON.parse(portfolio), // Ensure portfolio is correctly parsed
          availability,
          bannerImage: req.file ? req.file.path : 'uploads/default-profile.png', // If using Cloudinary, req.file.path should be the URL
      };

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'Registered as photographer successfully', user });
  } catch (error) {
      console.error('Error registering as photographer:', error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};








const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate request payload
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Remove password before sending response
        user.password = undefined;

        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const updateUserProfile = async (req, res) => {
    const { name, username, phoneNumber, profilePicture, bio } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.name = name || user.name;
        user.username = username || user.username;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profilePicture = profilePicture || user.profilePicture;
        user.bio = bio || user.bio;

        // Save updated user
        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                phoneNumber: user.phoneNumber,
                bio: user.bio,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};





// Follow a photographer
const followPhotographer = async (req, res) => {
  try {
    const photographerId = req.params.id;
    const userId = req.user._id;
    console.log('Request Params:', photographerId); // Should show { id: 'photographerIdValue' }
    console.log('Request User:', userId);    // Should show user details


    if (userId.toString() === photographerId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const photographer = await User.findById(photographerId);
    const user = await User.findById(userId);

    if (!photographer || !user) {
      return res.status(404).json({ message: "User or Photographer not found." });
    }

    if (photographer.role !== 'photographer') {
      return res.status(400).json({ message: "User is not a photographer." });
    }

    photographer.photographerInfo = photographer.photographerInfo || {};
    photographer.photographerInfo.followers = photographer.photographerInfo.followers || [];

    if (photographer.photographerInfo.followers.includes(userId)) {
      return res.status(400).json({ message: "You are already following this photographer." });
    }

    photographer.photographerInfo.followers.push(userId);
    await photographer.save();

    user.following = user.following || [];
    if (!user.following.includes(photographerId)) {
      user.following.push(photographerId);
      await user.save();
    }

    res.status(200).json({
      message: `You are now following ${photographer.name}.`,
      followersCount: photographer.photographerInfo.followers.length,
    });
  } catch (error) {
    console.error('Error while following photographer:', error);
    res.status(500).json({ message: "Server error. Could not follow photographer.", error: error.message });
  }
};

// Unfollow a photographer
const unfollowPhotographer = async (req, res) => {
  try {
    const photographerId = req.params.id;
    const userId = req.user._id;
    console.log('Request Params:', req.params); // Should show { id: 'photographerIdValue' }


    const photographer = await User.findById(photographerId);
    const user = await User.findById(userId);

    if (!photographer || !user) {
      return res.status(404).json({ message: "User or Photographer not found." });
    }

    if (!photographer.photographerInfo?.followers.includes(userId)) {
      return res.status(400).json({ message: "You are not following this photographer." });
    }

    photographer.photographerInfo.followers = photographer.photographerInfo.followers.filter(
      (follower) => follower.toString() !== userId.toString()
    );
    await photographer.save();

    user.following = user.following.filter(
      (followedPhotographer) => followedPhotographer.toString() !== photographerId.toString()
    );
    await user.save();

    res.status(200).json({
      message: "Unfollowed successfully.",
      followersCount: photographer.photographerInfo.followers.length,
    });
  } catch (error) {
    console.error('Error while unfollowing photographer:', error);
    res.status(500).json({ message: "Server error. Could not unfollow photographer.", error: error.message });
  }
};

  
  
  
  




const getAllProducts = async (req, res) => {  // Removed 'req' since it's not being used
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.json(products); // Send the fetched products as a response
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error, could not fetch products.' });
    }
};

// Get product details by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Find product by ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);  // Send product details as response
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get all photographers
const getPhotographers = async (req, res) => {
    try {
        const photographers = await User.find({ role: 'photographer' })
            .select('name username bio profilePicture photographerInfo'); // Specify fields to retrieve
        res.status(200).json(photographers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

// Get list of followers for a specific user
const getFollowers = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate('followers', 'name profilePicture');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.followers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get followers', error });
    }
  };
  
  // Get list of users the current user is following
  const getFollowing = async (req, res) => {
    try {
      const userId = req.user.id; // Currently authenticated user
      const user = await User.findById(userId).populate('following', 'name profilePicture');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.following);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get following list', error });
    }
  };







module.exports = { registerUser,registerAsPhotographer, loginUser,updateUserProfile,followPhotographer,unfollowPhotographer,getAllProducts,getProductById,getPhotographers,getFollowers,getFollowing };
