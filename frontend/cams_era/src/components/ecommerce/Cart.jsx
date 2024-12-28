import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { updateProductQuantity, removeProductFromCart } from '../../services/CartActions';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, setCartItems, loading, error, fetchCartItems } = useContext(CartContext);
    const { token } = useContext(UserContext);
    const [activeItemLoading, setActiveItemLoading] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (token) {
            fetchCartItems();
        }
    }, [token]);

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setActiveItemLoading(productId);
        try {
            await updateProductQuantity(productId, newQuantity, token);
            await fetchCartItems(); // Sync cart after quantity update
        } catch (err) {
            console.error('Error updating quantity:', err);
        } finally {
            setActiveItemLoading(null);
        }
    };

    const handleRemoveProduct = async (productId) => {
        setActiveItemLoading(productId);
        try {
            await removeProductFromCart(productId, token);
            await fetchCartItems(); // Sync cart after product removal
        } catch (err) {
            console.error('Error removing product:', err);
        } finally {
            setActiveItemLoading(null);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = item.product.offer ? item.product.offer.value : item.product.price;
            return total + price * item.quantity;
        }, 0);
    };

    const filteredCartItems = cartItems.filter((item) =>
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!token) return <p className="text-center text-gray-500">Please log in to view your cart.</p>;
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (cartItems.length === 0) return <p className="text-center text-gray-500">Your cart is empty.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                />
            </div>
            {filteredCartItems.map((item) => (
                <div key={item.product._id} className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-md">
                    <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">
                            Price: ₹{item.product.offer ? item.product.offer.value : item.product.price}
                        </p>
                        <p className="text-gray-600 font-bold">
                            Total: ₹{(item.product.offer ? item.product.offer.value : item.product.price) * item.quantity}
                        </p>
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
                                disabled={activeItemLoading === item.product._id}
                            >
                                -
                            </button>
                            <button
                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
                                disabled={activeItemLoading === item.product._id}
                            >
                                +
                            </button>
                            <button
                                onClick={() => handleRemoveProduct(item.product._id)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                disabled={activeItemLoading === item.product._id}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center mt-8">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold">₹{calculateTotalPrice()}</span>
            </div>
        </div>
    );
};

export default Cart;
