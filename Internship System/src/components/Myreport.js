import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // destructure from the module

const MyReports = () => {
  const navigate = useNavigate();
  const doc = new jsPDF();

  const [appealSuccess, setAppealSuccess] = useState(false);
  const [viewedComment, setViewedComment] = useState(null); // For popup
  const [viewedText, setViewedText] = useState(""); // For the comment content

  const [appealMessage, setAppealMessage] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [appealError, setAppealError] = useState(false);
  const handleDownloadPDF = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Internship Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Title: ${report.title}`, 20, 35);
    doc.text(`Status: ${report.status}`, 20, 45);
    if (report.comments) {
      doc.text(`Reviewer Comments:`, 20, 60);
      doc.text(doc.splitTextToSize(report.comments, 170), 20, 70);
    }
    doc.save(`${report.title.replace(/\s+/g, "_")}_Report.pdf`);
  };

  const reports = [
    {
      title: "TechNova Internship",
      status: "flagged",
      comments: "Your report lacked detailed explanation of tasks.",
    },

    {
      title: "MediCare AI Internship",
      status: "accepted",
      comments: "",
    },
    {
      title: "Finovate Internship",
      status: "rejected",
      comments: "The submission was missing the introduction section.",
    },
  ];

  const handleAppealSubmit = () => {
    if (!appealMessage.trim()) {
      setAppealError(true);
      return;
    }

    setAppealSuccess(true);
    setAppealMessage("");
    setAppealError(false);
  };

  const getStatusStyle = (status) => {
    const base = {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      textTransform: "capitalize",
      display: "inline-block",
      border: "1px solid transparent",
    };

    switch (status) {
      case "accepted":
        return {
          ...base,
          color: "#2e7d32",
          backgroundColor: "#e8f5e9",
          borderColor: "#a5d6a7",
        };
      case "rejected":
        return {
          ...base,
          color: "#c62828",
          backgroundColor: "#ffebee",
          borderColor: "#ef9a9a",
        };
      case "flagged":
        return {
          ...base,
          color: "#f57c00",
          backgroundColor: "#fff3e0",
          borderColor: "#ffb74d",
        };
      default:
        return base;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            marginBottom: "2rem",
            color: "#1A237E",
          }}
        >
          My Internship Reports
        </h1>

        {reports.map((report, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              borderLeft: `6px solid ${
                report.status === "accepted"
                  ? "#2e7d32"
                  : report.status === "rejected"
                  ? "#c62828"
                  : "#f57c00"
              }`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>{report.title}</h3>
              <span style={getStatusStyle(report.status)}>{report.status}</span>
            </div>

            {(report.status === "flagged" || report.status === "rejected") && (
              <div style={{ marginTop: "1rem" }}>
                <button
                  style={{
                    marginBottom: "0.75rem",
                    padding: "0.5rem 1rem",
                    backgroundColor:
                      report.status === "rejected"
                        ? "#c62828" // red for rejected
                        : "#f57c00", // orange for flagged
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setViewedComment(index);
                    setViewedText(report.comments);
                  }}
                >
                  View Reviewer Comments
                </button>
                <button
                  style={{
                    marginBottom: "0.75rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#457b9d", // Changed to 1A237E
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                    cursor: "pointer",
                    marginLeft: "0.1rem",
                  }}
                  onClick={() => handleDownloadPDF(report)}
                >
                  Download Report
                </button>

                <textarea
                  placeholder="Write your appeal message..."
                  value={selectedReport === index ? appealMessage : ""}
                  onChange={(e) => {
                    setSelectedReport(index);
                    setAppealMessage(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontFamily: "inherit",
                    marginBottom: "0.75rem",
                  }}
                />
                {appealError && (
                  <div
                    style={{
                      backgroundColor: "#fff5f5",
                      color: "#e53935",
                      border: "1px solid #ffcdd2",
                      padding: "12px",
                      borderRadius: "8px",
                      textAlign: "center",
                      marginBottom: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    Please provide a message explaining your appeal before
                    submitting.
                  </div>
                )}

                <button
                  onClick={handleAppealSubmit}
                  style={{
                    backgroundColor: "#457b9d",
                    color: "#fff",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Submit Appeal
                </button>
              </div>
            )}
          </div>
        ))}

        {appealSuccess && (
          <div style={styles.popupOverlay}>
            <div style={styles.popupCard}>
              <div style={styles.popupIcon}>✓</div>
              <h2 style={styles.popupTitle}>Appeal Submitted Successfully</h2>
              <p style={styles.popupText}>
                Your message has been sent. We will review your appeal shortly.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <button
                  style={styles.popupButton}
                  onClick={() => {
                    const role = localStorage.getItem("userRole");
                    const homePath =
                      role === "prostudent"
                        ? "/pro-student-dashboard"
                        : "/student-dashboard";
                    navigate(homePath);
                  }}
                >
                  Back to Dashboard
                </button>

                <button
                  style={{ ...styles.popupButton, backgroundColor: "#718096" }}
                  onClick={() => setAppealSuccess(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {viewedComment !== null && (
          <div style={styles.popupOverlay}>
            <div style={styles.popupCard}>
              <h2 style={styles.popupTitle}>Reviewer Comment</h2>
              <p style={styles.popupText}>{viewedText}</p>
              <button
                style={{ ...styles.popupButton, marginTop: "1rem" }}
                onClick={() => setViewedComment(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  popupCard: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "16px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
  },

  popupIcon: {
    fontSize: "3rem",
    color: "#22c55e", // green
    marginBottom: "1rem",
  },

  popupTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1A237E",
    marginBottom: "0.75rem",
  },

  popupText: {
    fontSize: "1rem",
    color: "#4a5568",
    marginBottom: "1.5rem",
  },

  popupButton: {
    backgroundColor: "#457b9d",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

export default MyReports;
