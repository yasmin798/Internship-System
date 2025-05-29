import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
const EvaluationPage = () => {
  const [company, setCompany] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [recommend, setRecommend] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [submittedCompany, setSubmittedCompany] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEditBlockedPopup, setShowEditBlockedPopup] = useState(false);

  const normalizedKey = (name) => `evaluation_${name.trim().toLowerCase()}`;
  useEffect(() => {
    if (company && !editing) {
      const saved = localStorage.getItem(normalizedKey(company));
      if (saved) {
        const parsed = JSON.parse(saved);
        setSubmittedCompany(parsed.company);
        setEvaluation(parsed.evaluation);
        setRecommend(parsed.recommend);
      } else {
        setSubmittedCompany(null);
        setEvaluation("");
        setRecommend("");
      }
    }
  }, [editing]);

  const handleSubmit = () => {
    if (!company.trim() || !evaluation.trim() || !recommend) {
      setError("Please fill in all fields.");
      return;
    }

    const key = normalizedKey(company);
    const saved = localStorage.getItem(key);

    if (saved && !editing) {
      setError("You have already submitted an evaluation for this company.");
      return;
    }

    setError("");
    setConfirming(true);
  };

  const handleFinalSubmit = () => {
    const key = normalizedKey(company);
    const data = {
      company,
      evaluation,
      recommend,
      date: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(data));
    setSubmittedCompany(company.trim());
    setConfirming(false);
    setEditing(false);
  };

  const handleDelete = () => {
    localStorage.removeItem(normalizedKey(company));
    setSubmittedCompany(null);
    setEvaluation("");
    setRecommend("");
    setCompany("");
    setDeleting(false);
  };

  const displaySubmitted = submittedCompany && !editing;

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
            <div style={styles.header}>
              <h1 style={styles.title}>Internship Evaluation</h1>
              <p style={styles.subtitle}>Share your experience</p>
            </div>

            {displaySubmitted ? (
              <div style={styles.submittedBox}>
                <h2 style={styles.submittedTitle}>
                  <span>
                    <span style={styles.successIcon}>✓</span>
                    Evaluation Report: {submittedCompany}
                  </span>
                </h2>

                <div style={styles.evaluationDetails}>
                  <div style={styles.detailItem}>
                    <p style={styles.detailLabel}>Recommendation Status</p>
                    <div
                      style={
                        recommend === "yes"
                          ? styles.recommendYes
                          : styles.recommendNo
                      }
                    >
                      {recommend === "yes" ? (
                        <>
                          <svg
                            style={{ marginRight: "8px" }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                              fill="#10b981"
                            />
                          </svg>
                          Recommended
                        </>
                      ) : (
                        <>
                          <svg
                            style={{ marginRight: "8px" }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                              fill="#dc2626"
                            />
                          </svg>
                          Not Recommended
                        </>
                      )}
                    </div>
                  </div>

                  <div style={styles.detailItem}>
                    <p style={styles.detailLabel}>Detailed Evaluation</p>
                    <div
                      style={{
                        backgroundColor: "#fafafa",
                        padding: "24px",
                        borderRadius: "8px",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      <p style={styles.evaluationText}>{evaluation}</p>
                    </div>
                  </div>
                </div>

                <div style={styles.metaInfo}>
                  <div>
                    <strong>Submitted:</strong>{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    <strong>Last Updated:</strong>{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div style={styles.actionButtons}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => setDeleting(true)}
                  >
                    Delete
                  </button>
                  <button
                    style={styles.editButton}
                    onClick={() => {
                      const saved = localStorage.getItem(
                        normalizedKey(company)
                      );
                      if (saved) {
                        const parsed = JSON.parse(saved);
                        if (parsed.editedOnce) {
                          setShowEditBlockedPopup(true);
                        } else {
                          setEditing(true);
                        }
                      }
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <>
                {error && <div style={styles.errorBox}>{error}</div>}

                <div style={styles.formGroup}>
                  <input
                    style={styles.input}
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <textarea
                    style={styles.textarea}
                    placeholder="Write your evaluation..."
                    value={evaluation}
                    onChange={(e) => setEvaluation(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <p style={styles.radioLabel}>
                    Do you recommend this company to other students?
                  </p>
                  <div style={styles.radioGroup}>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        value="yes"
                        checked={recommend === "yes"}
                        onChange={() => setRecommend("yes")}
                        style={styles.radioInput}
                        required
                      />
                      <span style={styles.radioText}>
                        I recommend this company
                      </span>
                    </label>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        value="no"
                        checked={recommend === "no"}
                        onChange={() => setRecommend("no")}
                        style={styles.radioInput}
                        required
                      />
                      <span style={styles.radioText}>
                        I do not recommend this company
                      </span>
                    </label>
                  </div>
                </div>

                <button style={styles.submitBtn} onClick={handleSubmit}>
                  {editing ? "Update Evaluation" : "Submit Evaluation"}
                </button>
              </>
            )}

            {confirming && (
              <div style={styles.popupOverlay}>
                <div style={styles.popupCard}>
                  <h3 style={styles.popupTitle}>Are you sure?</h3>
                  <p style={styles.popupText}>
                    {editing ? (
                      <>
                        This <strong>update</strong> can only be done once for{" "}
                        <strong>{company}</strong>.
                      </>
                    ) : (
                      <>
                        You can evaluate <strong>{company} only once</strong>.
                      </>
                    )}
                  </p>
                  <div style={styles.popupActions}>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => setConfirming(false)}
                    >
                      Cancel
                    </button>
                    <button
                      style={styles.primaryButton}
                      onClick={() => {
                        if (editing) {
                          const saved = localStorage.getItem(
                            normalizedKey(company)
                          );
                          if (saved) {
                            const parsed = JSON.parse(saved);
                            parsed.editedOnce = true;
                            localStorage.setItem(
                              normalizedKey(company),
                              JSON.stringify({
                                ...parsed,
                                evaluation,
                                recommend,
                                date: new Date().toISOString(),
                              })
                            );
                            setConfirming(false);
                            setEditing(false);
                          }
                        } else {
                          handleFinalSubmit(); // <--- THIS was missing!
                        }
                      }}
                    >
                      {editing ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {deleting && (
              <div style={styles.popupOverlay}>
                <div style={styles.popupCard}>
                  <h3 style={styles.popupTitle}>Confirm Deletion</h3>
                  <p style={styles.popupText}>
                    This will <strong>permanently delete</strong> your
                    evaluation for <strong>{company}</strong>.
                  </p>
                  <div style={styles.popupActions}>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => setDeleting(false)}
                    >
                      Cancel
                    </button>
                    <button style={styles.deleteButton} onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showEditBlockedPopup && (
              <div style={styles.popupOverlay}>
                <div style={styles.popupCard}>
                  <h3 style={styles.popupTitle}></h3>
                  <p style={styles.popupText}>
                    You already updated this evaluation before.
                  </p>
                  <div style={styles.popupActions}>
                    <button
                      style={styles.primaryButton}
                      onClick={() => setShowEditBlockedPopup(false)}
                    >
                      OK
                    </button>
                  </div>
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
    maxWidth: "720px",
    margin: "40px auto",
    padding: "40px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    color: "#1a1a1a",
    lineHeight: "1.6",
  },
  header: {
    marginBottom: "32px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#718096",
    margin: 0,
    fontWeight: "400",
  },
  formGroup: {
    marginBottom: "24px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    color: "#1a1a1a",
    outline: "none",
  },
  textarea: {
    width: "100%",
    height: "180px",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    resize: "vertical",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    fontFamily: "inherit",
    color: "#1a1a1a",
    outline: "none",
    lineHeight: "1.6",
  },
  radioLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#2d3748",
    marginBottom: "12px",
    display: "block",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  radioInput: {
    marginRight: "12px",
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#4f46e5",
  },
  radioText: {
    fontSize: "15px",
    color: "#4a5568",
    fontWeight: "400",
  },
  submitBtn: {
    backgroundColor: "#457b9d",
    color: "#ffffff",
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 6px rgba(79, 70, 229, 0.3)",
    marginTop: "8px",
  },
  errorBox: {
    color: "#dc2626",
    fontSize: "15px",
    marginBottom: "20px",
    padding: "14px",
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #fecaca",
    fontWeight: "500",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
  popupCard: {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    textAlign: "center",
    maxWidth: "440px",
    width: "90%",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
  },
  popupTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "16px",
  },
  popupText: {
    fontSize: "16px",
    color: "#4a5568",
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  popupActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "16px",
  },
  primaryButton: {
    backgroundColor: "#457b9d",
    color: "white",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)",
    minWidth: "120px",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#4a5568",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "120px",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
    minWidth: "120px",
  },
  submittedBox: {
    padding: "40px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
    border: "1px solid #f0f0f0",
    maxWidth: "800px",
    margin: "0 auto",
  },
  submittedTitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "16px",
  },
  successIcon: {
    color: "#10b981",
    fontSize: "28px",
    marginRight: "12px",
  },
  evaluationDetails: {
    textAlign: "left",
    marginBottom: "32px",
    fontFamily: "'Georgia', serif",
    lineHeight: "1.8",
  },
  detailItem: {
    marginBottom: "24px",
  },
  detailLabel: {
    fontWeight: "500", // reduced from 600 to match other labels
    color: "#2d3748", // use the primary dark text color
    fontSize: "15px", // align with form field text
    marginBottom: "8px",
    letterSpacing: "normal",
    fontFamily: "'Inter', sans-serif",
  },

  evaluationText: {
    color: "#4a5568", // consistent secondary text color
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "1.7",
    whiteSpace: "pre-line",
    fontFamily: "'Inter', sans-serif",
  },

  recommendContainer: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "20px",
    marginTop: "8px",
  },
  recommendYes: {
    color: "#10b981",
    fontWeight: "500",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: "8px 16px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
  },

  recommendNo: {
    color: "#dc2626",
    fontWeight: "500",
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    padding: "8px 16px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
  },

  metaInfo: {
    display: "flex",
    flexDirection: "column", // 👈 this is the fix
    gap: "8px", // optional spacing between lines
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #f0f0f0",
    color: "#666",
    fontSize: "14px",
  },

  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "24px",
  },
  // Keep your original button styles
  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
    minWidth: "120px",
  },
  editButton: {
    backgroundColor: "#457b9d",
    color: "white",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)",
    minWidth: "120px",
  },
};

export default EvaluationPage;
