const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../cloudinaryconfig'); // Assuming you have cloudinaryconfig.js setup properly

// Function to dynamically create Cloudinary storage for different folders
const createCloudinaryStorage = (folderName) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folderName,  // Folder where images will be uploaded in Cloudinary
            allowed_formats: ['jpg', 'png', 'webp'],  // Allowed image formats
        },
    });
};

// Generalized image upload function
const uploadImage = (folderName) => {
    const storage = createCloudinaryStorage(folderName);
    return multer({ storage: storage });
};

module.exports = uploadImage;  // export the function to be used in routes
