// src/components/CheckoutPage.js

import React, { useState } from 'react';
import Payment from './Payment';
import axios from 'axios';

const CheckoutPage = () => {
    const [order, setOrder] = useState(null);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const placeOrder = async () => {
        try {
            const response = await axios.post('/api/orders/place', {
                deliveryDate: '2024-11-10',
                shippingAddress: '123 Main Street, City, Country'
            });
            setOrder(response.data.order);
            setIsPaymentProcessing(true);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handlePaymentSuccess = (paymentResponse) => {
        console.log('Payment successful:', paymentResponse);
        setIsPaymentProcessing(false);
        alert('Payment successful! Your order has been placed.');
    };

    const handlePaymentFailure = (error) => {
        console.error('Payment failed:', error);
        setIsPaymentProcessing(false);
        alert('Payment failed. Please try again.');
    };

    return (
        <div>
            <h1>Checkout Page</h1>
            {!isPaymentProcessing && (
                <button onClick={placeOrder}>Place Order & Pay</button>
            )}
            {isPaymentProcessing && order && (
                <Payment
                    order={order}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                />
            )}
        </div>
    );
};

export default CheckoutPage;
