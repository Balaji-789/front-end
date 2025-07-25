import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Customer() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('username') || '';
    setUsername(stored);
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8080/getAllProducts')
      .then(res => {
        setProducts(res.data);
        // default qty = 1 for each
        const q = {};
        res.data.forEach(p => q[p.id] = 1);
        setQuantities(q);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  };

  const handleQuantityChange = (pid, val) => {
    const v = Math.max(1, parseInt(val, 10) || 1);
    setQuantities(q => ({ ...q, [pid]: v }));
  };

  const handleCart = (prod) => {
    const payload = {
      username,
      prod,
      quantity: quantities[prod.id] || 1
    };
    axios
      .post('http://localhost:8080/addToCart', payload)
      .then(() => alert('Added to cart!'))
      .catch(err => console.error('Add to cart failed:', err));
  };

  return (
    <div>
      <h2>Welcome {username}</h2>
      <button onClick={() => navigate('/view_cart_page')}>
        View Cart
      </button>

      <table border="1" cellPadding="5" style={{ marginTop: '1em' }}>
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Description</th>
            <th>Price</th><th>Qty</th><th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><img src={p.image} alt={p.name} width="80" /></td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={quantities[p.id] || 1}
                  onChange={e => handleQuantityChange(p.id, e.target.value)}
                  style={{ width: '3em' }}
                />
              </td>
              <td>
                <button onClick={() => handleCart(p)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}