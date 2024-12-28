const Product = require('../models/productmodel');
const cloudinary = require('cloudinary').v2;

const addProduct = async (req, res) => {
    try {
        const { name, description, features, price, category, offer } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images were uploaded' });
        }

        const imageUploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
        const imageUploadResults = await Promise.all(imageUploadPromises);
        const imageUrls = imageUploadResults.map(result => result.secure_url);

        const product = new Product({
            name,
            description,
            features,
            price,
            category,
            images: imageUrls,
            offer,
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, features, price, category, images, offer } = req.body;

    try {
        const updateFields = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (features) updateFields.features = features;
        if (price) {
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ message: 'Invalid price. Price must be a positive number.' });
            }
            updateFields.price = price;
        }
        if (category) updateFields.category = category;
        if (images && Array.isArray(images) && images.length > 0) {
            updateFields.images = images;
        } else if (images) {
            return res.status(400).json({ message: 'Images should be an array with at least one image.' });
        }
        if (offer) updateFields.offer = offer;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const searchProducts = async (req, res) => {
    const { query } = req.query;

    try {
        const products = await Product.find({
            name: { $regex: query, $options: 'i' }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const removeProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    searchProducts,
    removeProduct,
};
