import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { WorkshopContext } from "../context/WorkshopContext";
import Sidebar from "../components/Sidebar"; // ✅ import the shared Sidebar

const AnalyticsPage = () => {
  const { workshops = [], feedback = [] } = useContext(WorkshopContext); // fallback safety
  const navigate = useNavigate();

  return (
    <div style={styles.pageWrapper}>
      <Sidebar />
      <div style={styles.contentArea}>
        <h2 style={styles.heading}>📊 Analytics Dashboard</h2>
        <AnalyticsDashboard workshops={workshops} feedback={feedback} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
  },
  contentArea: {
    flex: 1,
    padding: "2rem",
    marginLeft: "0px", // match sidebar width
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#1A237E",
    marginBottom: "1.5rem",
  },
  backButton: {
    backgroundColor: "#1A237E",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "0.95rem",
    cursor: "pointer",
    marginBottom: "1.5rem",
  },
};

export default AnalyticsPage;
