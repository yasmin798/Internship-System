import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const InternshipsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [paidFilter, setPaidFilter] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const internships = [
    {
      company: "TechNova",
      job: "Full Stack Developer Intern",
      duration: "3 months",
      paid: "Paid",
      salary: "$1000/month",
      remote: true,
      industry: "Technology",
      description:
        "As a full stack intern, you’ll build scalable APIs and UI components.\n\nYou May Be a Good Fit If You Have:\n- Experience with React & Node.js\n- Familiarity with REST APIs and MongoDB\n- Strong communication skills.",
    },
    {
      company: "MediCare AI",
      job: "ML Research Intern",
      duration: "6 months",
      paid: "Unpaid",
      salary: null,
      remote: false,
      industry: "Healthcare",
      description:
        "Join our research lab and help analyze medical data.\n\nYou May Be a Good Fit If You Have:\n- Python + NumPy + Pandas\n- Interest in healthcare data\n- Ability to read academic papers.",
    },
    {
      company: "GreenBank",
      job: "Data Analyst Intern",
      duration: "6 months",
      paid: "Paid",
      salary: "$800/month",
      remote: true,
      industry: "Finance",
      description:
        "Develop dashboards and analyze KPIs with our insights team.\n\nYou May Be a Good Fit If You Have:\n- Excel, Tableau, or Power BI\n- Financial performance concepts\n- Detail-oriented mindset.",
    },
    {
      company: "EduCraft",
      job: "Content Developer Intern",
      duration: "3 months",
      paid: "Unpaid",
      salary: null,
      remote: true,
      industry: "Education",
      description:
        "Create engaging content for math and science e-learning.\n\nYou May Be a Good Fit If You Have:\n- Experience teaching/tutoring\n- Interest in educational design\n- Creativity with visuals.",
    },
    {
      company: "TechCorp",
      job: "Frontend Intern",
      duration: "3 months",
      paid: "Paid",
      salary: "$900/month",
      remote: true,
      industry: "Technology",
      description:
        "Assist our UI team in developing responsive web applications using React.\n\nYou May Be a Good Fit If You Have:\n- Proficiency in HTML, CSS, JS\n- Familiarity with Git\n- Team collaboration skills.",
    },
    {
      company: "HealthPlus",
      job: "Research Assistant",
      duration: "1 month",
      paid: "Unpaid",
      salary: null,
      remote: false,
      industry: "Healthcare",
      description:
        "Support medical research by collecting and organizing patient data.\n\nYou May Be a Good Fit If You Have:\n- Biology or Health Sciences background\n- Organized and detail-oriented\n- Comfortable in lab settings.",
    },
    {
      company: "Finovate",
      job: "Data Analyst",
      duration: "6 months",
      paid: "Paid",
      salary: "$1200/month",
      remote: true,
      industry: "Finance",
      description:
        "Analyze large datasets to uncover business insights and financial trends.\n\nYou May Be a Good Fit If You Have:\n- SQL and Excel skills\n- Financial modeling knowledge\n- Analytical mindset.",
    },
    {
      company: "MediTech",
      job: "Software Intern",
      duration: "3 months",
      paid: "Unpaid",
      salary: null,
      remote: false,
      industry: "Technology",
      description:
        "Support the engineering team in building digital health tools.\n\nYou May Be a Good Fit If You Have:\n- Interest in mobile or web development\n- Open to learning new frameworks\n- Basic programming experience.",
    },
  ];

  const filteredInternships = internships.filter((item) => {
    return (
      (!searchTerm ||
        item.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!industryFilter || item.industry === industryFilter) &&
      (!durationFilter || item.duration === durationFilter) &&
      (!paidFilter || item.paid === paidFilter)
    );
  });

  const matchingSuggestions = internships
    .filter(
      (i) =>
        i.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);
  const [selectedInternship, setSelectedInternship] = useState(null);

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
              <h1 style={styles.title}>Browse Internships</h1>
            </div>
            <div style={styles.searchSection}>
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search by job or company"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  style={styles.searchInput}
                />
                {showSuggestions &&
                  searchTerm &&
                  matchingSuggestions.length > 0 && (
                    <ul style={styles.suggestionsList}>
                      {matchingSuggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setSearchTerm(`${s.job}`);
                            setShowSuggestions(false);
                          }}
                          style={styles.suggestionItem}
                        >
                          <span style={styles.suggestionText}>
                            {s.job} at {s.company}
                          </span>
                          <span style={styles.suggestionIndustry}>
                            {s.industry}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              <div style={styles.filters}>
                <select
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  style={styles.filterDropdown}
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                </select>

                <select
                  onChange={(e) => setDurationFilter(e.target.value)}
                  style={styles.filterDropdown}
                >
                  <option value="">All Durations</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>

                <select
                  onChange={(e) => setPaidFilter(e.target.value)}
                  style={styles.filterDropdown}
                >
                  <option value="">Paid or Unpaid</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>{" "}
            {/* end of searchSection */}
            <div style={styles.policiesWrapper}>
              <button
                style={styles.policiesButton}
                onClick={() => navigate("/internship-policies")}
              >
                Internship Policies
              </button>
            </div>
            <div style={styles.resultsContainer}>
              {filteredInternships.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🔍</div>
                  <p style={styles.emptyText}>
                    No internships match your search
                  </p>
                  <p style={styles.emptySubText}>Try adjusting your filters</p>
                </div>
              ) : (
                filteredInternships.map((intern, idx) => (
                  <div key={idx} style={styles.card}>
                    <div style={styles.cardHeader}>
                      <div>
                        <h3 style={styles.company}>{intern.company}</h3>
                        <p style={styles.jobTitle}>{intern.job}</p>
                      </div>
                      <div style={styles.statusPill(intern.paid)}>
                        {intern.paid}
                      </div>
                    </div>

                    <div style={styles.detailsGrid}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Duration</span>
                        <span style={styles.detailValue}>
                          {intern.duration}
                        </span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Industry</span>
                        <span style={styles.detailValue}>
                          {intern.industry}
                        </span>
                      </div>
                    </div>

                    <button
                      style={styles.applyButton}
                      onClick={() => setSelectedInternship(intern)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          {selectedInternship && (
            <div
              style={{
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
              }}
              onClick={() => setSelectedInternship(null)}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "2rem",
                  borderRadius: "12px",
                  maxWidth: "600px",
                  width: "90%",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2
                  style={{
                    fontSize: "1.75rem",
                    color: "#1A237E",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedInternship.company}
                </h2>
                <InfoItem label="Job Title" value={selectedInternship.job} />
                <InfoItem
                  label="Duration"
                  value={selectedInternship.duration}
                />
                <InfoItem
                  label="Industry"
                  value={selectedInternship.industry}
                />
                <InfoItem label="Type" value={selectedInternship.paid} />
                <InfoItem
                  label="Remote"
                  value={selectedInternship.remote ? "Yes" : "No"}
                />
                <InfoItem
                  label="Salary"
                  value={selectedInternship.salary || "Unpaid"}
                />
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#F8F9FF",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#424242",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedInternship.description}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <button
                    onClick={() =>
                      navigate(
                        `/apply/${selectedInternship.company
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                    style={{
                      backgroundColor: " #457b9d",
                      color: "#fff",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSelectedInternship(null)}
                    style={{
                      backgroundColor: "#F0F4F8",
                      color: "#1A237E",
                      border: "1px solid #E0E0E0",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
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
    marginTop: "2rem", // spacing from top
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
    marginBottom: "1.5rem",
    ":hover": {
      backgroundColor: "#0D47A1",
      transform: "translateY(-1px)",
    },
  },

  policiesWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
  },

  policiesButton: {
    backgroundColor: "#457b9d",
    color: "#FFFFFF",
    border: "1px solid #BBDEFB",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    fontSize: "1 rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  title: {
    fontSize: "1.75rem", // match size
    fontWeight: 600, // match weight
    color: "#1A237E", // same dark blue
    margin: "0 0 2rem 0", // add spacing below
    paddingBottom: "1rem", // bottom padding
    borderBottom: "2px solid #E8EAF6", // underline line
  },

  searchSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: "2rem",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "1.5rem",
  },
  searchInput: {
    width: "100%",
    padding: "1rem 1.25rem",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#1A237E",
      boxShadow: "0 0 0 3px rgba(26, 35, 126, 0.1)",
    },
  },
  suggestionsList: {
    listStyle: "none",
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "100%",
    border: "1px solid #E0E0E0",
    borderRadius: "0 0 8px 8px",
    zIndex: 100,
    maxHeight: "240px",
    overflowY: "auto",
    margin: 0,
    padding: 0,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  suggestionItem: {
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #EEE",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#F8F9FF",
    },
  },
  suggestionText: {
    color: "#212121",
    fontWeight: 500,
  },
  suggestionIndustry: {
    color: "#616161",
    fontSize: "0.9rem",
    backgroundColor: "#F5F5F5",
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
  },
  filters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1rem",
  },
  filterDropdown: {
    padding: "0.875rem 1rem",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      borderColor: "#1A237E",
    },
  },
  resultsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
    gap: "1rem",
  },
  company: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1A237E",
    margin: 0,
  },
  jobTitle: {
    color: "#616161",
    margin: "0.25rem 0 0 0",
    fontSize: "1rem",
  },
  statusPill: (status) => ({
    padding: "0.375rem 1rem",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: 600,
    backgroundColor: status === "Paid" ? "#E8F5E9" : "#FFF3E0",
    color: status === "Paid" ? "#2E7D32" : "#EF6C00",
    border: `1px solid ${status === "Paid" ? "#A5D6A7" : "#FFCC80"}`,
    whiteSpace: "nowrap",
  }),
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    backgroundColor: "#F8F9FF",
    borderRadius: "8px",
    gap: "1rem", // 👈 ADD THIS
  },

  detailLabel: {
    color: "#616161",
    fontSize: "0.9rem",
  },
  detailValue: {
    color: "#212121",
    fontWeight: 500,
  },
  salary: {
    color: "#2E7D32",
    fontWeight: 600,
  },
  descriptionBox: {
    backgroundColor: "#F8F9FF",
    borderRadius: "8px",
    padding: "1.5rem",
    margin: "1.5rem 0",
  },
  description: {
    color: "#424242",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    margin: 0,
    fontSize: "0.95rem",
  },
  applyButton: {
    backgroundColor: "#457b9d",
    color: "#FFFFFF",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
    width: "100%",
    ":hover": {
      backgroundColor: " #a8dadc",
    },
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "4rem 2rem",
    textAlign: "center",
    gridColumn: "1 / -1",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#1A237E",
  },
  emptyText: {
    color: "#1A237E",
    fontSize: "1.25rem",
    fontWeight: 500,
    margin: "0.5rem 0",
  },
  emptySubText: {
    color: "#616161",
    fontSize: "1rem",
    margin: 0,
  },
};
const InfoItem = ({ label, value }) => (
  <p style={{ margin: "0.5rem 0", fontSize: "0.95rem" }}>
    <strong style={{ color: "#616161", marginRight: "0.5rem" }}>
      {label}:
    </strong>
    <span style={{ color: "#212121", fontWeight: 500 }}>{value || "—"}</span>
  </p>
);

export default InternshipsPage;
