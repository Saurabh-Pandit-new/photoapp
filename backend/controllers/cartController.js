const Cart = require('../models/cartModel');
const Product = require('../models/productmodel');

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product is in stock
        if (product.quantity === 0) {
            return res.status(400).json({ message: 'This product is out of stock' });
        }

        // Check if the cart exists
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ user: req.user.id, products: [] });
        }

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(item => item.product.toString() === productId);

        if (existingProduct) {
            // Update the quantity if the product already exists
            existingProduct.quantity += quantity;
        } else {
            // Add the new product to the cart
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get user's cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update product quantity in cart
const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = cart.products.find(item => item.product.toString() === productId);

        if (product) {
            product.quantity = quantity; // Update the quantity
            await cart.save();
            res.status(200).json({ message: 'Cart updated', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};





module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
};
