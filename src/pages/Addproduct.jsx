import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Addproduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');   // keep as string, convert on submit
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProd = {
      name,
      description,
      price: parseInt(price, 10),  // convert to integer
      image
    };

    axios
      .post('http://localhost:8080/addProduct', newProd)
      .then(() => {
        alert('Product added!');
        navigate('/admin_page');
      })
      .catch(err => {
        console.error('Add product failed:', err);
        alert('Error adding product');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

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

      <button type="submit">Add Product</button>
    </form>
  );
}