import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { UserContext } from '../../contexts/UserContext';
import '../ecommerce/css/productList.css';
import { Link } from 'react-router-dom'; // To enable navigation

const Features = ({ features }) => {
  // Regular expression to capture key-value pairs
  const featureLines = features.match(/([A-Za-z\s]+):\s*([^:]+)/g);

  return (
    <div className="my-2 text-base md:text-lg">
      <p className="font-bold">Features:</p>
      <ul className="ml-4 mt-2">
        {featureLines?.map((feature, index) => {
          const [key, value] = feature.split(/:\s*/);
          return (
            <li key={index} className="mb-1">
              <span className="font-semibold">{key}:</span> {value.trim()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { token } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((prod) => prod._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddToCart = async () => {
    if (!product) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification('Product added to cart!');
      } else {
        setNotification(`Error: ${data.message}`);
      }
    } catch (error) {
      setNotification('Failed to add product to cart.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Product not found or loading...</p>;

  return (
    <div className="mx-4 md:mx-10 lg:mx-14">
      <div className="flex flex-col md:flex-row border border-gray-400">
        <div className="w-full md:w-1/2 p-4">
          <img 
            className="w-full md:max-w-md lg:max-w-lg mx-auto border shadow-lg" 
            src={product.images[0]} 
            alt={product.name} 
          />
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5 w-full mt-5 mx-auto">
            <button 
              className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out" 
              onClick={handleAddToCart} 
              disabled={loading || !token}
            >
              {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
            <Link to="/shop/order" className='w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out'>
            <button 
              className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
              Buy Now
            </button>
            </Link>
          </div>

          {notification && (
            <div className="fixed top-4 right-4 z-50 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform">
              <p>{notification}</p>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="font-bold text-2xl md:text-3xl">{product.name}</h1>
          <p className="my-2 text-base md:text-lg">{product.description}</p>

          {/* Use the Features component here */}
          <Features features={product.features} />

          <div className="flex gap-x-4 items-baseline">
            <p className="font-bold text-lg">Price: ₹{product.offer ? product.offer.value : product.price}</p>
            {product.offer && <p className="line-through text-gray-500">₹{product.price}</p>}
          </div>
          <p className="my-2 text-base md:text-lg">Category: {product.category}</p>

          {/* Display Offer Information */}
          {product.offer && (
            <div className="mt-4 p-4 border border-yellow-500 rounded-md bg-yellow-100">
              <h3 className="text-lg font-semibold text-yellow-800">Special Offer</h3>
              <p className="text-yellow-700">Type: {product.offer.type}</p>
              <p className="text-yellow-700">Value: {product.offer.value}</p>
              <p className="text-yellow-700">Expiry Date: {new Date(product.offer.expiryDate).toLocaleDateString()}</p>
            </div>
          )}

          {product.attributes && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Product Attributes</h3>
              {Object.entries(product.attributes).map(([key, value]) => (
                <p key={key} className="text-base md:text-lg">{key}: {value}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
