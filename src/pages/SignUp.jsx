import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  // 1. State for each field
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob]         = useState('');
  const [gender, setGender]   = useState('');
  const [role, setRole]       = useState('');

  const navigate = useNavigate();

  // 2. Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();   // prevent page reload

    const user = { username, email, password, dob, gender, role };

    axios
      .post('http://localhost:8080/signUp', user)
      .then(res => {
        console.log('Signup OK:', res.data);
        alert('Signed up: ' + res.data);

        navigate('/sign_in_page')
      })
      .catch(err => {
        console.error('Signup failed:', err);
        alert('Error signing up – check console');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up below:</h2>

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <br></br><br></br>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <br></br><br></br>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <br></br><br></br>
      <label>Gender:</label>
      <label>
        <input
          type="radio"
          name="gender"
          value="MALE"
          onChange={e => setGender(e.target.value)}
          required
        /> Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="FEMALE"
          onChange={e => setGender(e.target.value)}
        /> Female
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="OTHER"
          onChange={e => setGender(e.target.value)}
        /> Other
      </label>
      <br></br><br></br>
      <label>Date of Birth:</label>
      <input
        type="date"
        value={dob}
        onChange={e => setDob(e.target.value)}
        required
      />
      <br></br><br></br>
      <label>Role:</label>
      <label>
        <input
          type="radio"
          name="role"
          value="ADMIN"
          onChange={e => setRole(e.target.value)}
          required
        /> Admin
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="CUSTOMER"
          onChange={e => setRole(e.target.value)}
        /> Customer
      </label>
      <br></br><br></br>
      <button type="submit">Sign Up</button>
    </form>
  );
}