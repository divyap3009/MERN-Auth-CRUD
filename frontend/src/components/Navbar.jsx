import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css"; 

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <nav>
        <div className="nav-left">
          <h1>MERN</h1>
          <ul>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
            <li>
              <Link to="/all">All Post</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="profile-btn" onClick={toggleProfile}>
            Profile
          </button>
          <button className="logout-btn" onClick={LogOut}>
            LogOut
          </button>
        </div>
      </nav>

      {showProfile && user && (
        <div className="profile-card">
          <span className="close-btn" onClick={closeProfile}>&times;</span>
          <h2>Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
