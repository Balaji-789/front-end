// src/pages/ViewCart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewCart() {
  const [username] = useState(localStorage.getItem('username') || '');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get('http://localhost:8080/viewCart', { params: { username } })
      .then(res => setItems(res.data))
      .catch(err => console.error('Fetch cart failed:', err));
  };

  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return;
    const payload = { username, prod: { id: item.productId }, quantity: newQty };
    axios
      .post('http://localhost:8080/updateCartItem', payload)
      .then(() => fetchCart())
      .catch(err => console.error('Update cart failed:', err));
  };

  return (
    <div>
      <h2>{username}'s Cart</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th>
            <th>Qty</th><th>Subtotal</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.productId}>
              <td>
                <img src={it.image} alt={it.name} width="80" />
              </td>
              <td>{it.name}</td>
              <td>{it.price}</td>
              <td>{it.quantity}</td>
              <td>{it.price * it.quantity}</td>
              <td>
                <button onClick={() => updateQuantity(it, it.quantity + 1)}>+</button>
                <button onClick={() => updateQuantity(it, it.quantity - 1)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}