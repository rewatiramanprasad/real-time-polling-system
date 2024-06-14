import React from 'react';
import './App.css'; // Import CSS file for styling

const Navbar = ({ onLogout, onProfile }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><button onClick={onLogout} className="navbar-button">Logout</button></li>
        <li><button onClick={onProfile} className="navbar-button">Profile</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
