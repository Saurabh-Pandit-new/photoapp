import React from 'react';
import { useEffect } from 'react';

const Payment = ({ order, onPaymentSuccess, onPaymentFailure }) => {
    useEffect(() => {
        if (order && order.razorpayOrder) {
            const loadRazorpay = () => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload = () => initiatePayment();
                document.body.appendChild(script);
            };

            const initiatePayment = () => {
                const options = {
                    key: 'YOUR_TEST_KEY_ID', // Replace with your Razorpay test key ID
                    amount: order.totalPrice * 100, // Amount in paise
                    currency: 'INR',
                    name: 'Your Shop Name',
                    description: 'Order Payment',
                    order_id: order.razorpayOrder.id, // Razorpay order ID from the backend
                    handler: (response) => {
                        console.log('Payment successful:', response);
                        onPaymentSuccess(response);
                    },
                    prefill: {
                        name: 'User Name',
                        email: 'user@example.com',
                        contact: '9999999999',
                    },
                    theme: {
                        color: '#3399cc'
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            };

            loadRazorpay();
        }
    }, [order]);

    return (
        <div>
            <h2>Processing Payment</h2>
            <p>Please wait while we redirect you to the payment gateway...</p>
        </div>
    );
};

export default Payment;
