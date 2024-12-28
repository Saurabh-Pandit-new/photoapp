import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    features: '',
    price: '',
    category: '',
    images: [],
    offer: {
      type: '',
      value: '',
      expiryDate: ''
    }
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      offer: {
        ...prevData.offer,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData((prevData) => ({
      ...prevData,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('features', productData.features);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('offer[type]', productData.offer.type);
      formData.append('offer[value]', productData.offer.value);
      formData.append('offer[expiryDate]', productData.offer.expiryDate);

      productData.images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/api/admin/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess('Product added successfully!');
      setError('');
      console.log('Response:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
      setSuccess('');
      console.error('Error adding product:', err);
    }
  };

  return (
    <div>
      <h3>Add New Product</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" value={productData.description} onChange={handleChange} required />
        <textarea name="features" placeholder="Product Features" value={productData.features} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={productData.price} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={productData.category} onChange={handleChange} required />

        <h4>Upload Images</h4>
        <input type="file" multiple onChange={handleImageUpload} />

        <h4>Offer</h4>
        <input type="text" name="type" placeholder="Offer Type" value={productData.offer.type} onChange={handleOfferChange} />
        <input type="text" name="value" placeholder="Offer Value" value={productData.offer.value} onChange={handleOfferChange} />
        <input type="date" name="expiryDate" value={productData.offer.expiryDate} onChange={handleOfferChange} />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
