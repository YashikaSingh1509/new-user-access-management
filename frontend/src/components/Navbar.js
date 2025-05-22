// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> |{' '}
      {!token ? (
        <>
          <Link to="/signup">Sign Up</Link> |{' '}
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          {role === 'employee' && <Link to="/employee">Employee Dashboard</Link>}
          {role === 'manager' && <Link to="/manager">Manager Dashboard</Link>}
          {role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
          {' | '}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
