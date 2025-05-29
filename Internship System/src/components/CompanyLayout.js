import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaClipboardList,
  FaBriefcase,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./2ndCompanyDashboard.css";

const CompanyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Determine active link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-container">
      {/* Fixed Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          {/* Spacer for button */}
          <div className="sidebar-spacer"></div>

          {/* Navigation Links with Icons */}
          <Link
            to="/company"
            className={`sidebar-link ${isActive("/company") ? "active" : ""}`}
          >
            <FaBuilding className="icon" />
            <span>Home</span>
          </Link>
          <Link
            to="/company/my-internships"
            className={`sidebar-link ${
              isActive("/company/my-internships") ? "active" : ""
            }`}
          >
            <FaClipboardList className="icon" />
            <span>My Posts</span>
          </Link>
          <Link
            to="/company/all-internships"
            className={`sidebar-link ${
              isActive("/company/all-internships") ? "active" : ""
            }`}
          >
            <FaBriefcase className="icon" />
            <span>SCAD Internships</span>
          </Link>
          <Link
            to="/company/notifications"
            className={`sidebar-link ${
              isActive("/company/notifications") ? "active" : ""
            }`}
          >
            <FaBell className="icon" />
            <span>Notifications</span>
          </Link>

          {/* Logout at bottom */}
          <div className="sidebar-footer">
            <div className="logout-container">
              <Link to="/" className="logout-link">
                <FaSignOutAlt className="icon" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
        <div className="content-wrapper">
          {" "}
          {/* New wrapper */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CompanyLayout;