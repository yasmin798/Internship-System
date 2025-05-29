import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Sidebar from "./Sidebar";

const Reports = () => {
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [body, setBody] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editing, setEditing] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text(title || "Internship Report", 10, y);
    y += 12;

    doc.setFontSize(14);
    doc.text("Introduction:", 10, y);
    y += 8;
    doc.setFontSize(12);
    const introLines = doc.splitTextToSize(introduction, 180);
    doc.text(introLines, 10, y);
    y += introLines.length * 7 + 5;

    doc.setFontSize(14);
    doc.text("Body:", 10, y);
    y += 8;
    doc.setFontSize(12);
    const bodyLines = doc.splitTextToSize(body, 180);
    doc.text(bodyLines, 10, y);
    y += bodyLines.length * 7 + 5;

    doc.setFontSize(14);
    doc.text("Helpful Courses:", 10, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(selectedCourses.join(", ") || "None", 10, y);

    doc.save("Internship_Report.pdf");
  };

  const navigate = useNavigate();

  const courses = [
    "Computer Organization",
    "Databases I",
    "Operating Systems",
    "Software Engineering",
    "Databases II",
    "Computer Architecture",
  ];

  const handleCourseToggle = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSave = () => {
    if (!title.trim() || !introduction.trim() || !body.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEditing(false);
    setViewMode(true);
  };

  const handleSubmitFinal = () => {
    setShowPopup(true);
  };

  return (
    <div
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
      }}
    >
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1 }}>
          {/* Your main content already here */}
          <div style={styles.container}>
            <h1 style={styles.header}>Internship Report</h1>
            {error && <div style={styles.errorBox}>{error}</div>}

            {viewMode ? (
              <div style={styles.reportView}>
                <h2 style={styles.reportTitle}>{title}</h2>
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Introduction</h3>
                  <p style={styles.sectionContent}>{introduction}</p>
                </div>
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Body</h3>
                  <p style={styles.sectionContent}>{body}</p>
                </div>
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Helpful Courses</h3>
                  <p style={styles.sectionContent}>
                    {selectedCourses.join(", ") || "None"}
                  </p>
                </div>
                <div style={styles.buttonRow}>
                  <button
                    style={styles.secondaryBtn}
                    onClick={() => {
                      setViewMode(false);
                      setEditing(true);
                    }}
                  >
                    Edit Report
                  </button>
                  <button style={styles.submitBtn} onClick={handleSubmitFinal}>
                    Submit Final Report
                  </button>
                  <button
                    style={styles.downloadBtn}
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title</label>
                  <input
                    placeholder="Enter report title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Introduction</label>
                  <textarea
                    placeholder="Write your introduction here..."
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    style={styles.textarea}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Body</label>
                  <textarea
                    placeholder="Write your report body here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ ...styles.textarea, minHeight: "180px" }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Courses that helped during internship
                  </label>
                  <div style={styles.courseGrid}>
                    {courses.map((course, i) => (
                      <div key={i} style={styles.courseItem}>
                        <input
                          type="checkbox"
                          id={`course-${i}`}
                          checked={selectedCourses.includes(course)}
                          onChange={() => handleCourseToggle(course)}
                          style={styles.checkbox}
                        />
                        <label
                          htmlFor={`course-${i}`}
                          style={styles.courseLabel}
                        >
                          {course}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.buttonRow}>
                  {!submitted ? (
                    <button style={styles.submitBtn} onClick={handleSave}>
                      Save Report
                    </button>
                  ) : editing ? (
                    <>
                      <button
                        style={styles.secondaryBtn}
                        onClick={() => setViewMode(true)}
                      >
                        Preview Report
                      </button>
                      <button style={styles.submitBtn} onClick={handleSave}>
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={styles.secondaryBtn}
                        onClick={() => setViewMode(true)}
                      >
                        Preview Report
                      </button>
                      <button
                        style={styles.submitBtn}
                        onClick={() => setEditing(true)}
                      >
                        Edit Report
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Success Popup */}
            {showPopup && (
              <div style={styles.popupOverlay}>
                <div style={styles.popupCard}>
                  <div style={styles.popupIcon}>✓</div>
                  <h2 style={styles.popupTitle}>
                    Report Submitted Successfully
                  </h2>
                  <p style={styles.popupText}>
                    Your internship report has been successfully submitted.
                  </p>
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
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px", // Wider than before
    width: "90%", // Responsive to screen size
    margin: "40px auto", // Adds spacing from top
    padding: "2.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", // Slightly deeper shadow for depth
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  },
  header: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "1.5rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #e5e7eb",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.9375rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.9375rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    transition: "border-color 0.2s, box-shadow 0.2s",
    resize: "vertical",
    minHeight: "120px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "0.75rem",
  },
  courseItem: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "0.75rem",
    width: "1.125rem",
    height: "1.125rem",
    accentColor: "#4f46e5",
  },
  courseLabel: {
    fontSize: "0.9375rem",
    color: "#374151",
    cursor: "pointer",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    marginTop: "2rem",
    flexWrap: "wrap",
  },
  submitBtn: {
    backgroundColor: "#457b9d",
    color: "#ffffff",
    padding: "0.625rem 1.25rem",
    fontSize: "0.9375rem",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
  },
  secondaryBtn: {
    backgroundColor: "#ffffff",
    color: "#374151",
    padding: "0.625rem 1.25rem",
    fontSize: "0.9375rem",
    fontWeight: "500",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
  },
  downloadBtn: {
    backgroundColor: "#111827",
    color: "#ffffff",
    padding: "0.625rem 1.25rem",
    fontSize: "0.9375rem",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    fontSize: "0.9375rem",
    borderLeft: "4px solid #dc2626",
  },
  reportView: {
    padding: "0.5rem",
  },
  reportTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "1.5rem",
  },
  section: {
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "0.5rem",
  },
  sectionContent: {
    fontSize: "0.9375rem",
    color: "#4b5563",
    lineHeight: "1.6",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupCard: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  popupIcon: {
    fontSize: "3rem",
    color: "#10b981",
    marginBottom: "1rem",
  },
  popupTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "0.5rem",
  },
  popupText: {
    fontSize: "0.9375rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  popupButton: {
    backgroundColor: "#457b9d",
    color: "#ffffff",
    padding: "0.625rem 1.25rem",
    fontSize: "0.9375rem",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
    width: "100%",
  },
};

export default Reports;
