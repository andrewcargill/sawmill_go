import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: username,
        password: password,
      });
      console.log('Login success:', response.data);
      // Store the token in local storage or state and handle the authenticated state
    } catch (error) {
      console.error('Login error:', error);
      // Handle the login error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api-auth/logout/');
      console.log('Logout success:', response.data);
      // Clear the stored token from local storage or state and handle the authenticated state
    } catch (error) {
      console.error('Logout error:', error);
      // Handle the logout error
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export { Login, Logout };
