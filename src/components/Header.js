import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaEnvelope,
  FaSearch,
  FaUser,
  FaTasks,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null); // React Hook
  const navigate = useNavigate();

  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear any authentication data (example: tokens, user session)
    localStorage.removeItem("authToken"); // Or any other method you are using
    sessionStorage.removeItem("authToken");

    // Redirect user to login page
    navigate("/login"); // Update this with your login page route
  };

  return (
    <div className="header-bar d-flex justify-content-between align-items-center px-3 py-2">
      {/* Search Bar */}
      <div className="header-search-bar d-flex align-items-center flex-grow-1">
        <span className="search-icon me-2">
          <FaSearch className="text-muted" size={18} />
        </span>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Find Something . . ."
        />
      </div>

      {/* Icons and Admin */}
      <div
        className="icons d-flex align-items-center position-relative"
        ref={dropdownRef}
      >
        {/* Message Icon */}
        <div
          className={`icon-wrapper me-4 position-relative ${activeDropdown === "message" ? "active" : ""}`}
          onClick={() => toggleDropdown("message")}
        >
          <FaEnvelope size={16} />
          {activeDropdown === "message" && (
            <div className="profile-dropdown-menu">
              <span className="profile-header">Messages</span>
              <div className="profile-options">
                <p>New Message from John: "Meeting at 3 PM"</p>
                <p>Reminder: Project Deadline Tomorrow</p>
              </div>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div
          className={`icon-wrapper me-4 position-relative ${activeDropdown === "notification" ? "active" : ""}`}
          onClick={() => toggleDropdown("notification")}
        >
          <FaBell size={16} />
          {activeDropdown === "notification" && (
            <div className="profile-dropdown-menu">
              <span className="profile-header">Notifications</span>
              <div className="profile-options">
                <p>You have 5 unread notifications.</p>
                <p>Task "Design Update" is overdue.</p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div
          className={`icon-wrapper me-4 position-relative ${activeDropdown === "profile" ? "active" : ""}`}
          onClick={() => toggleDropdown("profile")}
        >
          <div className="d-flex align-items-center">
            <img
              src="/Assets/images/TeachersImages/teacher.webp"
              alt="profile"
              className="rounded-circle me-2"
              width={24}
              height={24}
            />
            <div className="user-info">
              <span className="fw-bold">Avinash</span>
              <br />
              <small className="text-muted">Admin</small>
            </div>
          </div>
          {activeDropdown === "profile" && (
            <div className="profile-dropdown-menu">
              <span className="profile-header">Avinash</span>
              <div className="profile-options">
                <p onClick={() => navigate("/teachers/details")}>
                  <FaUser className="icon" /> My Profile
                </p>
                <p>
                  <FaTasks className="icon" /> Task
                </p>
                <p onClick={() => navigate("/message")}>
                  <FaEnvelope className="icon" /> Message
                </p>
                <p onClick={() => navigate("/account")}>
                  <FaCog className="icon" /> Account Settings
                </p>
                <p onClick={handleLogout}>
                  <FaSignOutAlt className="icon" /> Log Out
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div
          className={`language-dropdown ms-3 position-relative ${activeDropdown === "language" ? "active" : ""}`}
          onClick={() => toggleDropdown("language")}
        >
          <span className="fw-bold">🌐 EN ▼</span>
          {activeDropdown === "language" && (
            <div className="profile-dropdown-menu">
              <span className="profile-header">Language</span>
              <div className="profile-options">
                <p>English</p>
                <p>French</p>
                <p>Spanish</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
