import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const touchStartY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  const isProStudentDashboard = role === "prostudent";
  const basePath = isProStudentDashboard
    ? "/pro-student-dashboard"
    : "/student-dashboard";
  const homePath = basePath;

  const appointmentsPath =
    role === "prostudent" ? "/appointmentsP" : "/appointmentsS";

  const menuItems = [
    { path: homePath, text: "Home" }, // 👈 HOME moved to top
    { path: "/edit-profile", text: "Edit Profile" },
    { path: "/internships", text: "Internships" },
    { path: "/my-application", text: "My Applications" },
    { path: "/My-internships", text: "My Internships" },
    { path: "/Evaluations", text: "Evaluations" },
    { path: "/Reports", text: "Reports" },
    { path: "/My-Reports", text: "My Reports" },
    { path: "/Assessments", text: "Assessments", roles: ["prostudent"] },
    { path: "/appointmentsP", text: "Appointments", roles: ["prostudent"] },
    { path: "/appointmentsS", text: "Appointments", roles: ["scad"] },
    { path: "/workshopbrowse", text: "Workshops", roles: ["prostudent"] },
    { path: "/feedback", text: "Feedback", roles: ["prostudent"] },
    { path: "/analytics", text: "Analytics", roles: ["prostudent"] },
    {
      path: "/NotificationsPage",
      text: "Notifications",
      roles: ["prostudent"],
    },
  ];

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!sidebarOpen || !sidebarRef.current) return;
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;
    const sidebar = sidebarRef.current;
    const maxScrollTop = sidebar.scrollHeight - sidebar.clientHeight;

    if (deltaY > 0) {
      sidebar.scrollTop = Math.max(0, sidebar.scrollTop - deltaY * 0.5);
    } else if (deltaY < 0) {
      sidebar.scrollTop = Math.min(
        maxScrollTop,
        sidebar.scrollTop - deltaY * 0.5
      );
    }
    touchStartY.current = touchY;

    if (sidebar.scrollTop >= maxScrollTop - 10) {
      const bottomSection = sidebar.querySelector("#sidebar-bottom");
      if (bottomSection) {
        bottomSection.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = 0;
  };

  useEffect(() => {
    if (sidebarOpen) {
      console.log("Sidebar is open. Log Out button should be at bottom.");
    }
  }, [sidebarOpen]);

  return (
    <>
      {/* Hamburger */}
      <div
        style={styles.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} style={styles.hamburgerLine}></div>
        ))}
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          ref={sidebarRef}
          style={{
            ...styles.sidebar,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={styles.sidebarContent}>
            <h2 style={styles.sidebarTitle}>Menu</h2>
            <ul style={styles.sidebarList}>
              {menuItems
                .filter(({ roles }) => !roles || roles.includes(role))
                .map(({ path, text }) => (
                  <li
                    key={path}
                    style={{
                      ...styles.sidebarItem,
                      ...(location.pathname === path && styles.activeMenuItem),
                    }}
                    onClick={() => {
                      navigate(path);
                      setSidebarOpen(false);
                    }}
                  >
                    <span style={styles.menuIcon}></span>
                    <span style={styles.menuText}>{text}</span>
                  </li>
                ))}

              {role === "prostudent" && (
                <li
                  style={{
                    ...styles.sidebarItem,
                    ...(location.pathname === "/viewed" &&
                      styles.activeMenuItem),
                  }}
                  onClick={() => {
                    navigate("/viewed");
                    setSidebarOpen(false);
                  }}
                >
                  <span style={styles.menuIcon}></span>
                  <span style={styles.menuText}>Viewed My Profile</span>
                </li>
              )}
            </ul>

            <div id="sidebar-bottom" style={styles.sidebarBottom}>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...styles.logoutItem,
                }}
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("userRole");
                  navigate("/login");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuIcon}></span>
                <span style={styles.menuText}>Log Out</span>
              </li>
            </div>

            <div style={styles.scrollSpacer}></div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  hamburger: {
    position: "fixed",
    top: "1.5rem",
    left: "1.5rem",
    cursor: "pointer",
    zIndex: 1003,
    backgroundColor: "#1d3557",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 0 15px rgba(26, 35, 126, 0.4)",
  },
  hamburgerLine: {
    width: "28px",
    height: "3px",
    backgroundColor: "#FFFFFF",
    margin: "5px 0",
    borderRadius: "2px",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "280px",
    height: "100vh",
    backgroundColor: "#1d3557",
    color: "#FFFFFF",
    zIndex: 1002,
    boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },
  sidebarContent: {
    padding: "4rem 1.5rem 2rem 1.5rem",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#FFFFFF",
    marginTop: "2rem",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 1rem 0",
    flex: "1 1 auto",
  },
  sidebarItem: {
    padding: "1rem 1.5rem",
    marginBottom: "0.75rem",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  activeMenuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderLeft: "4px solid #0D47A1",
  },
  logoutItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderLeft: "4px solid #0D47A1",
  },
  menuIcon: {
    fontSize: "1.2rem",
  },
  menuText: {
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.025em",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
  },
  sidebarBottom: {
    paddingTop: "2rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    marginTop: "auto",
    flexShrink: 0,
  },
  scrollSpacer: {
    height: "100px",
    flexShrink: 0,
  },
};

export default Sidebar;
