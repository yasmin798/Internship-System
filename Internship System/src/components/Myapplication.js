import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const defaultJobTitles = {
        technova: "Full Stack Developer Intern",
        "medicare-ai": "ML Research Intern",
        greenbank: "Data Analyst Intern",
        educraft: "Content Developer Intern",
        techcorp: "Frontend Intern",
        healthplus: "Research Assistant",
        finovate: "Data Analyst",
        meditech: "Software Intern",
      };

      let storedApps =
        JSON.parse(localStorage.getItem("submittedApplications")) || [];

      const dummyApps = [
        {
          company: "TechNova",
          jobTitle: defaultJobTitles["technova"],
          date: "2024-06-01",
          status: "pending",
          isDummy: true,
        },
        {
          company: "HealthPlus",
          jobTitle: defaultJobTitles["healthplus"],
          date: "2024-05-20",
          status: "accepted",
          isDummy: true,
        },
        {
          company: "Finovate",
          jobTitle: defaultJobTitles["finovate"],
          date: "2024-04-15",
          status: "finalized",
          isDummy: true,
        },
        {
          company: "EduCraft",
          jobTitle: defaultJobTitles["educraft"],
          date: "2024-03-10",
          status: "rejected",
          isDummy: true,
        },
      ];

      const hasDummy = storedApps.some((a) => a.isDummy);
      if (!hasDummy) {
        storedApps = [...dummyApps, ...storedApps];
        localStorage.setItem(
          "submittedApplications",
          JSON.stringify(storedApps)
        );
      }

      storedApps = storedApps.map((app) => {
        if (
          (!app.jobTitle || app.jobTitle === "N/A") &&
          app.company &&
          typeof app.company === "string"
        ) {
          const normalized = app.company.toLowerCase().replace(/\s+/g, "-");
          return {
            ...app,
            jobTitle: defaultJobTitles[normalized] || app.jobTitle || "Intern",
          };
        }
        return app;
      });

      setApplications(storedApps);
    } catch (error) {
      console.error("Failed to load applications:", error);
      setApplications([]);
    }
  }, []);

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: "2px 10px", // Smaller vertical and horizontal padding
      borderRadius: "16px", // Slightly smaller pill shape
      fontSize: "0.75rem", // Slightly smaller text
      fontWeight: 600,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "72px", // Less width to avoid large empty space
      textAlign: "center",
    };

    switch ((status || "").toLowerCase()) {
      case "accepted":
        return {
          ...baseStyle,
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          border: "1px solid #a5d6a7",
        };
      case "rejected":
        return {
          ...baseStyle,
          backgroundColor: "#ffebee",
          color: "#c62828",
          border: "1px solid #ef9a9a",
        };
      case "finalized":
        return {
          ...baseStyle,
          backgroundColor: "#e3f2fd",
          color: "#1565c0",
          border: "1px solid #90caf9",
        };
      case "pending":
      default:
        return {
          ...baseStyle,
          backgroundColor: "#f5f5f5",
          color: "#616161",
          border: "1px solid #e0e0e0",
        };
    }
  };

  return (
    <div
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
      }}
    >
      <div style={{ display: "flex" }}>
        <Sidebar userRole={localStorage.getItem("userRole")} />

        <main style={{ flex: 1 }}>
          {/* Your main content already here */}
          <div style={styles.container}>
            <div style={styles.header}>
              <h1 style={styles.title}>My Applications</h1>
            </div>

            <div style={styles.content}>
              {applications.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📭</div>
                  <p style={styles.emptyText}>No applications submitted yet</p>
                  <p style={styles.emptySubText}>
                    Apply to internships from your dashboard
                  </p>
                </div>
              ) : (
                <div style={styles.grid}>
                  {applications.map((app, index) => (
                    <div key={index} style={styles.card}>
                      <div style={styles.cardHeader}>
                        <h3 style={styles.company}>{app.company}</h3>
                        <div style={getStatusStyle(app.status)}>
                          {app.status || "Pending"}
                        </div>
                      </div>
                      <div style={styles.details}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Position:</span>
                          <span style={styles.detailValue}>
                            {app.jobTitle || "N/A"}
                          </span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Applied:</span>
                          <span style={styles.detailValue}>{app.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
  },
  backButton: {
    backgroundColor: "#1A237E",
    color: "#FFFFFF",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#1A237E",
    margin: "1.5rem 0",
    paddingBottom: "1rem",
    borderBottom: "2px solid #E8EAF6",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    border: "1px solid #EEEEEE",
    transition: "all 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  company: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1A237E",
    margin: 0,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    color: "#616161",
    fontSize: "0.9rem",
  },
  detailValue: {
    color: "#212121",
    fontWeight: 500,
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: "#F8F9FF",
    borderRadius: "12px",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  emptyText: {
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "#1A237E",
    margin: "0.5rem 0",
  },
  emptySubText: {
    color: "#616161",
    fontSize: "0.95rem",
    margin: 0,
  },
};

export default MyApplication;