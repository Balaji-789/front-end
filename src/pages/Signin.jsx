import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };
    axios
      .post('http://localhost:8080/signIn', data)
      .then(res => {
        console.log('Sign in OK:', res.data);
        // **STORE** the username for later
        localStorage.setItem('username', username);

        const role = res.data;
        if (role === 'admin') {
          navigate('/admin_page');
        } else if (role === 'customer') {
          navigate('/customer_page');
        } else {
          alert('Unknown role: ' + role);
        }
      })
      .catch(err => {
        console.error('Signin failed:', err);
        alert('Error signing in – check console');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Sign In</button>
    </form>
  );
}