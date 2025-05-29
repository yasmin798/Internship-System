import React, { useContext, useState } from "react";
import NotificationPanel from "../components/NotificationPanel";
import NotificationForm from "../components/NotificationForm";
import { WorkshopContext } from "../context/WorkshopContext";
import * as api from "../services/api";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const NotificationsPage = () => {
  const { notifications, setNotifications } = useContext(WorkshopContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSendNotification = async (notification) => {
    await api.addNotification(notification);
    setNotifications([...notifications, notification]);
  };

  return (
    <div style={styles.pageWrapper}>
      <Sidebar />
      <main style={styles.contentArea}>
        <div style={styles.rightAlignedContainer}>
          <header style={styles.header}>
            <h2 style={styles.heading}>Notifications</h2>
            <div style={styles.headerDivider} />
          </header>

          <div style={styles.card}>
            <NotificationForm onSubmit={handleSendNotification} />
          </div>

          <div style={styles.card}>
            <NotificationPanel notifications={notifications} />
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  contentArea: {
    flex: 1,
    padding: "48px",
    marginLeft: "0px",
    display: "flex",
    justifyContent: "flex-end", // Changed to push content to right
  },
  rightAlignedContainer: {
    width: "80%",
    maxWidth: "1000px",
    marginRight: "30%", // Added right margin to not stick to edge
  },
  header: {
    marginBottom: "48px",
    textAlign: "left",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 16px 0",
  },
  headerDivider: {
    height: "2px",
    background: "#e5e7eb",
    width: "100%",
    maxWidth: "600px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "48px",
    marginBottom: "36px",
    width: "100%",
  },
};

export default NotificationsPage;
