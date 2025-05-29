import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const majors = [
  "Applied Arts & Design",
  "Engineering",
  "MET",
  "IET",
  "Civil",
  "Mechatronics",
  "Design & Production",
  "Management",
  "Business Informatics",
];

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
  "9th Semester",
  "10th Semester",
];

const EditProfile = () => {
  const [jobInterest, setJobInterest] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [internships, setInternships] = useState([
    { company: "", role: "", duration: "", responsibilities: "" },
  ]);
  const [activities, setActivities] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleAddInternship = () => {
    setInternships([
      ...internships,
      { company: "", role: "", duration: "", responsibilities: "" },
    ]);
  };

  const handleInternshipChange = (index, field, value) => {
    const updated = [...internships];
    updated[index][field] = value;
    setInternships(updated);
  };

  const handleSave = () => {
    const profile = {
      jobInterest,
      selectedMajor,
      selectedSemester,
      internships,
      activities,
    };
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.pageContainer}>
      <Sidebar />

      <div style={styles.content}>
        <h1 style={styles.title}>Update Profile</h1>

        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Interest</label>
            <input
              type="text"
              placeholder="e.g. Frontend Development, Data Science"
              value={jobInterest}
              onChange={(e) => setJobInterest(e.target.value)}
              style={styles.textInput}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Major</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              style={styles.selectInput}
            >
              <option value="">Select your major</option>
              {majors.map((major, idx) => (
                <option key={idx} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={styles.selectInput}
            >
              <option value="">Select current semester</option>
              {semesters.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Work Experience</h3>
            <p style={styles.sectionSubtitle}>
              Add internships or part-time jobs
            </p>
          </div>

          {internships.map((entry, index) => (
            <div key={index} style={styles.experienceCard}>
              <div style={styles.cardHeader}>
                <span style={styles.cardNumber}>#{index + 1}</span>
                {index > 0 && (
                  <button
                    onClick={() =>
                      setInternships(internships.filter((_, i) => i !== index))
                    }
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div style={styles.inputRow}>
                <div style={styles.inputColumn}>
                  <label style={styles.smallLabel}>Company</label>
                  <input
                    type="text"
                    value={entry.company}
                    onChange={(e) =>
                      handleInternshipChange(index, "company", e.target.value)
                    }
                    style={styles.smallInput}
                  />
                </div>
                <div style={styles.inputColumn}>
                  <label style={styles.smallLabel}>Role</label>
                  <input
                    type="text"
                    value={entry.role}
                    onChange={(e) =>
                      handleInternshipChange(index, "role", e.target.value)
                    }
                    style={styles.smallInput}
                  />
                </div>
              </div>
              <div style={styles.inputRow}>
                <div style={styles.inputColumn}>
                  <label style={styles.smallLabel}>Duration</label>
                  <input
                    type="text"
                    value={entry.duration}
                    onChange={(e) =>
                      handleInternshipChange(index, "duration", e.target.value)
                    }
                    style={styles.smallInput}
                  />
                </div>
              </div>
              <div style={styles.inputColumn}>
                <label style={styles.smallLabel}>Responsibilities</label>
                <textarea
                  value={entry.responsibilities}
                  onChange={(e) =>
                    handleInternshipChange(
                      index,
                      "responsibilities",
                      e.target.value
                    )
                  }
                  style={styles.textarea}
                />
              </div>
            </div>
          ))}

          <button onClick={handleAddInternship} style={styles.addButton}>
            + Add Another Position
          </button>

          <div style={styles.inputGroup}>
            <label style={styles.label}>College Activities</label>
            <input
              type="text"
              placeholder="e.g. Clubs, organizations, competitions"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              style={styles.textInput}
            />
          </div>

          <button
            onClick={handleSave}
            style={{
              ...styles.saveButton,
              backgroundColor: saved ? "#2E7D32" : "#457b9d",
            }}
          >
            {saved ? "✓ Profile Saved!" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};
function ReportsPage() {
  return (
    <>
      <Sidebar />
      <div>Your page content here...</div>
    </>
  );
}
const styles = {
  pageContainer: {
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
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
    marginBottom: "1.5rem",
    ":hover": {
      backgroundColor: "#0D47A1",
      transform: "translateY(-1px)",
    },
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#1A237E",
    margin: "0 0 2rem 0",
    paddingBottom: "1rem",
    borderBottom: "2px solid #E8EAF6",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    color: "#1A237E",
    fontWeight: 500,
    fontSize: "1rem",
  },
  smallLabel: {
    color: "#616161",
    fontSize: "0.9rem",
    marginBottom: "0.25rem",
  },
  textInput: {
    padding: "0.875rem 1rem",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#1A237E",
      boxShadow: "0 0 0 3px rgba(26, 35, 126, 0.1)",
    },
  },
  selectInput: {
    padding: "0.875rem 1rem",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      borderColor: "#1A237E",
    },
  },
  sectionHeader: {
    margin: "2rem 0 1rem 0",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1A237E",
    margin: 0,
  },
  sectionSubtitle: {
    color: "#616161",
    margin: "0.25rem 0 0 0",
    fontSize: "0.95rem",
  },
  experienceCard: {
    backgroundColor: "#F8F9FF",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    border: "1px solid #E8EAF6",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  cardNumber: {
    color: "#616161",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  removeButton: {
    backgroundColor: "transparent",
    color: "#C62828",
    border: "none",
    padding: "0.25rem 0.5rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 500,
    ":hover": {
      textDecoration: "underline",
    },
  },
  inputRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
  inputColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  smallInput: {
    padding: "0.75rem 1rem",
    border: "1px solid #E0E0E0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#1A237E",
      boxShadow: "0 0 0 2px rgba(26, 35, 126, 0.1)",
    },
  },
  textarea: {
    padding: "0.75rem 1rem",
    border: "1px solid #E0E0E0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    height: "80px",
    resize: "vertical",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#1A237E",
      boxShadow: "0 0 0 2px rgba(26, 35, 126, 0.1)",
    },
  },
  addButton: {
    backgroundColor: "#457b9d",
    color: "#FFFFFF",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
    width: "100%",
    margin: "1rem 0",
    ":hover": {
      backgroundColor: "#a8dadc",
    },
  },
  saveButton: {
    backgroundColor: "#457b9d",
    color: "#FFFFFF",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    transition: "all 0.3s ease",
    width: "100%",
    marginTop: "1rem",
    ":hover": {
      backgroundColor: "#a8dadc",
    },
  },
};

export default EditProfile;
