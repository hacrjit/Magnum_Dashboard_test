import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa';
import logo from "./images/magnum1.png";
 // Adjust path as needed

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOverlayOpen(!isOverlayOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div>
      {/* Mobile Toggle */}
      {isMobile && (
        <div className="mobile-toggle" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      {/* Sidebar Container (Overlay on mobile when open) */}
      <div
        className={`sidebar ${
          isCollapsed ? 'collapsed' : ''
        } ${isOverlayOpen ? 'overlay-open' : ''}`}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          {!isMobile && !isCollapsed && (
            <img
              src={logo}
              alt="Logo"
              className="logo"
            />
          )}
          <FaBars className="toggle-btn" onClick={toggleSidebar} />
        </div>

        <Accordion className="menu">
          {/* Example Accordion Item */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {!isMobile && (
                <FaTachometerAlt
                  style={{ marginRight: '8px' }}
                />
              )}
              {!isMobile && !isCollapsed && (
                <span>Dashboard</span>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>
                  <Link to="/dashboard/admin">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/teacher">
                    Teacher
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/parent">
                    Parent
                  </Link>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* More accordion items if needed... */}

          {/* Logout Button */}
          <div className="logout-button-container">
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              {!isMobile && (
                <FaSignOutAlt className="logout-icon" />
              )}
              {!isCollapsed && !isMobile && (
                <span className="logout-title">
                  Logout
                </span>
              )}
            </button>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;