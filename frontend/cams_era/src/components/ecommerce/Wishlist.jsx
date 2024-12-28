import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { products } = useContext(ProductContext);
    const { wishlist } = useWishlist();

    const wishlistedProducts = products.filter((product) => wishlist[product._id]);

    if (wishlistedProducts.length === 0) {
        return <p className="text-center text-gray-500">Your wishlist is empty.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {wishlistedProducts.map((product) => (
                <Link to={`/shop/products/${product._id}`} key={product._id}>
                    <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="relative">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            ) : (
                                <img
                                    src="default-image-url.jpg"
                                    alt="Default"
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-blue-600 font-bold text-lg">
                                Price: ₹{product.offer ? product.offer.value : product.price}
                            </p>
                            {product.offer && (
                                <p className="text-gray-500 line-through">₹{product.price}</p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Wishlist;
