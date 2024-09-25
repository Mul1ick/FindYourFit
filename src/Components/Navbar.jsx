import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Assuming you have the user's name to display
  const userName = "John Doe"; // Example user name
  const userInitials = userName.split(' ').map(name => name[0]).join('');

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-start vh-100 d-flex flex-column align-items-start p-3" style={{ width: '250px', backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid d-flex flex-column justify-content-between h-100">
          {/* Navbar brand */}
          <Link to="/" className="navbar-brand mb-5">FindYourFit</Link>

          {/* Navbar items */}
          <ul className="navbar-nav flex-column w-100">
            <li className="nav-item mb-2 mt-5">
              <Link to="/home" className="nav-link text-center" aria-current="page">Home</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/profile" className="nav-link text-center">Profile</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-center">Swipe</Link>
            </li>

          </ul>

          {/* User section */}
          <div className="user-section mt-auto d-flex align-items-center p-2">
            <div className="user-icon d-flex align-items-center justify-content-center me-2">
              {userInitials}
            </div>
            <span className="user-name">{userName}</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;