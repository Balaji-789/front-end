import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 1. Load all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8080/getAllProducts')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  };

  // 2. Delete by ID, then refresh
  const handleDelete = (id) => {
    axios
      .get('http://localhost:8080/deleteProduct', { params: { id } })
      .then(() => fetchProducts())
      .catch(err => console.error('Delete failed:', err));
  };

  // 3. Go to update page with product in state
  const handleUpdate = (product) => {
    navigate('/update_prod_page', { state: { product } });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate('/add_prod_page')}>
        Add New Product
      </button>

      <table border="1" >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} width="80" />
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => handleUpdate(p)}>Update</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}