import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Updateproduct() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const prod = state?.product;

  // Initialize state from passed-in product
  const [id]          = useState(prod?.id || '');
  const [name, setName]          = useState(prod?.name || '');
  const [description, setDescription] = useState(prod?.description || '');
  const [price, setPrice]        = useState(prod?.price?.toString() || '');
  const [image, setImage]        = useState(prod?.image || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      id,
      name,
      description,
      price: parseInt(price, 10),
      image
    };

    axios
      .post('http://localhost:8080/updateProduct', updated)
      .then(() => {
        alert('Product updated!');
        navigate('/admin_page');
      })
      .catch(err => {
        console.error('Update failed:', err);
        alert('Error updating product');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>

      <label>Product Name:</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <label>Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        required
      />

      <button type="submit">Update Product</button>
    </form>
  );
}