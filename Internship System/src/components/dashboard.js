import React from "react";
import { Link } from "react-router-dom";
//import "./dashboard.css";
//import "./Sidebar.css";

function Dashboard() {
  const userRole = localStorage.getItem("userRole") || "Guest";

  const sidebarLinks = {
    Student: [
      { label: "View Internships", path: "/dashboard/internships" },
      { label: "Apply for Internship", path: "/dashboard/apply" },
    ],
    "Pro Student": [
      { label: "View Internships", path: "/dashboard/internships" },
      { label: "Apply for Internship", path: "/dashboard/apply" },
      { label: "Pro Resources", path: "/dashboard/pro-resources" },
    ],
    "Faculty Member": [
      { label: "Manage Students", path: "/dashboard/manage-students" },
      { label: "Review Applications", path: "/dashboard/review-applications" },
    ],
    Company: [
      { label: "Post Internship", path: "/dashboard/post-internship" },
      { label: "View Applicants", path: "/dashboard/view-applicants" },
    ],
    Scad: [
      { label: "Admin Dashboard", path: "/dashboard/admin" },
      { label: "Reports", path: "/dashboard/reports" },
    ],
    Guest: [{ label: "Home", path: "/dashboard" }],
  };

  const links = sidebarLinks[userRole] || sidebarLinks["Guest"];

  return (
    <div className="dashboard-container">
      <div className="sidebar-trigger">
        <aside className="sidebar">
          <div className="hamburger-menu">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
          <div className="sidebar-header">
            <h3>{userRole} Menu</h3>
          </div>
          <ul className="sidebar-links">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <main className="dashboard-content">
        <h1>Welcome to your dashboard, {userRole}!</h1>
      </main>
    </div>
  );
}

export default Dashboard;
