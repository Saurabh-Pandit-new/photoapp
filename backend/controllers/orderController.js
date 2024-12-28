const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Admin = require('../models/adminModel'); // Assuming you have an Admin model
const mongoose = require('mongoose');
const {  } = require('../utils/sendMail'); // Y
const { sendEmailToAdmin } = require('../utils/sendMail');
const { generateInvoice } = require('../utils/invoiceGenerator'); // Import invoice generator





// Update order status
const updateOrderStatus = async (req, res) => {
    const { orderId, newStatus } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the status
        order.status = newStatus;

        // Optionally set delivery date
        if (newStatus === 'delivered') {
            order.deliveryDate = new Date(); // Set delivery date to now or calculate accordingly
        }

        await order.save();

        // Notify user of the status change
        await sendEmailToUser(order.user, order); // Send email notification to the user

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Reduce stock for each product in the order
const reduceProductStock = async (products) => {
    for (const item of products) {
        const product = await Product.findById(item.product._id);
        if (product.stock < item.quantity) {
            throw new Error(`Product ${product.name} is out of stock`);
        }
        product.stock -= item.quantity;
        await product.save();
    }
};
const placeOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product').session(session);
        if (!cart) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Cart not found' });
        }

        const totalPrice = cart.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        // Create a Razorpay order
        // const razorpayOrder = await createRazorpayOrder(totalPrice);
        
        const deliveryDate = req.body.deliveryDate || new Date();

        const newOrder = new Order({
            user: req.user.id,
            products: cart.products.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                priceAtPurchase: item.product.price,
                productName: item.product.name
            })),
            totalPrice,
            orderStatus: 'pending',
            deliveryDate,
            shippingAddress: req.body.shippingAddress || 'N/A'
        });

        await newOrder.save({ session });

        await Cart.deleteOne({ user: req.user.id }, { session });

        await session.commitTransaction();
        session.endSession();

        const adminEmail = 'saurabhpandit1499@gmail.com';
        const subject = 'New Order Placed';
        const message = `A new order has been placed:\n\nOrder Details:\n${JSON.stringify(newOrder, null, 2)}`;

        await sendEmailToAdmin(adminEmail, subject, message);

        res.status(201).json({ message: 'Order placed successfully', order: newOrder, razorpayOrder });
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};







module.exports = { placeOrder,reduceProductStock,updateOrderStatus };
