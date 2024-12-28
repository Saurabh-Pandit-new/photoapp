import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { useWishlist } from '../../contexts/WishlistContext';
import '../ecommerce/css/productList.css';

const ProductList = () => {
    const { products, loading, error } = useContext(ProductContext);
    const { wishlist, toggleWishlist } = useWishlist();

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product._id} className="product-card">
                    <button
                        onClick={() => toggleWishlist(product._id)}
                        className={`wishlist-icon ${wishlist[product._id] ? 'added' : ''}`}
                        title={wishlist[product._id] ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                        {wishlist[product._id] ? '♥' : '♡'}
                    </button>

                    <Link to={`/shop/products/${product._id}`}>
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="product-image"
                            />
                        ) : (
                            <img src="default-image-url.jpg" alt="Default" className="product-image" />
                        )}
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="font-bold text-lg">Price: ₹{product.offer ? product.offer.value : product.price}</p>
                            {product.offer && <p className="line-through text-gray-500">₹{product.price}</p>}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
