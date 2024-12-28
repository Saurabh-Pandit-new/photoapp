const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            priceAtPurchase: { 
                type: Number, 
                required: true 
            },
            productName: { 
                type: String, 
                required: true 
            }
        }
    ],
    totalPrice: { 
        type: Number, 
        required: true 
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
        default: 'pending'
    },
    deliveryDate: { 
        type: Date, 
        required: true 
    },
    shippingAddress: { 
        type: String, 
        required: false 
    },
    orderReference: { 
        type: String, 
        unique: true, 
        default: function () { 
            return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        } 
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;

