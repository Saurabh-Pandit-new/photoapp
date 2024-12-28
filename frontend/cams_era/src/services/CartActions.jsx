export const updateProductQuantity = async (productId, newQuantity, token) => {
    try {
        const response = await fetch('http://localhost:5000/api/cart/update', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity: newQuantity }),
        });

        if (response.ok) {
            return await response.json(); // Return updated cart data
        } else {
            console.error('Failed to update product quantity');
        }
    } catch (error) {
        console.error('Error updating product quantity:', error);
    }
};


export const removeProductFromCart = async (productId, token) => {
    try {
        const response = await fetch('http://localhost:5000/api/cart/remove', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove product from cart');
        }

        // Return the response to indicate success
        return await response.json();
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error; // Propagate the error up for handling
    }
};
