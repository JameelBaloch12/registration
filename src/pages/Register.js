import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authcontext'; // ✅ use your context
import '../styles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth(); // ✅ check login status

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      alert("You are already logged in.");
      navigate('/'); // 👈 Redirect to home or dashboard
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.email === email)) {
      alert("❌ Email already registered. Please login.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("✅ Registered successfully! You can now login.");
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register Yourself</button>
      </form>
    </div>
  );
};

export default Register;
