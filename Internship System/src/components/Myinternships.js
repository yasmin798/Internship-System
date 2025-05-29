import React, { useState, useEffect } from "react";
import Select from "react-select";
import Sidebar from "./Sidebar";

const MyInternships = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  useEffect(() => {
    // Always display fixed dummy internships (1 current, 3 completed)
    setInternships([
      {
        company: "TechNova",
        role: "Frontend Intern",
        duration: "Jun 2024 - Present",
        responsibilities: "Building UI components using React and Tailwind.",
        status: "current",
        startDate: "2024-06-01",
        endDate: "2024-12-01",
      },
      {
        company: "HealthPlus",
        role: "Data Analyst Intern",
        duration: "Feb 2024 - Mar 2024",
        responsibilities:
          "Analyzed clinical trial data using Python and Pandas.",
        status: "complete",
        startDate: "2024-02-01",
        endDate: "2024-03-31",
      },
      {
        company: "Finovate",
        role: "Backend Developer Intern",
        duration: "Nov 2023 - Dec 2023",
        responsibilities: "Developed APIs using Node.js and MongoDB.",
        status: "complete",
        startDate: "2023-11-01",
        endDate: "2023-12-20",
      },
      {
        company: "EduCraft",
        role: "Content Developer",
        duration: "July 2023 - Aug 2023",
        responsibilities: "Created interactive course modules for STEM topics.",
        status: "complete",
        startDate: "2023-07-01",
        endDate: "2023-08-30",
      },
    ]);
  }, []);

  const filtered = internships.filter((item) => {
    const matchesSearch =
      searchTerm.length === 0 ||
      searchTerm.some((term) =>
        `${item.company.toLowerCase()}|${item.role.toLowerCase()}`.includes(
          term
        )
      );

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "current" && item.status === "current") ||
      (statusFilter === "complete" && item.status === "complete");

    const matchesDateRange =
      (!filterStartDate ||
        new Date(item.startDate) >= new Date(filterStartDate)) &&
      (!filterEndDate || new Date(item.endDate) <= new Date(filterEndDate));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const searchOptions = internships.map((item) => ({
    label: `${item.company} - ${item.role} (${
      item.status === "current" ? "Current" : "Completed"
    })`,
    value: `${item.company.toLowerCase()}|${item.role.toLowerCase()}`,
  }));

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
              <h1 style={styles.title}>My Internships</h1>
              <p style={styles.subtitle}></p>
            </div>

            {/* Search Bar - Top Level */}
            <div style={styles.searchContainer}>
              <svg
                style={styles.searchIcon}
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>

              <Select
                isMulti
                name="search"
                options={searchOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Search by company or role..."
                onChange={(selectedOptions) =>
                  setSearchTerm(
                    selectedOptions.map((o) => o.value.toLowerCase())
                  )
                }
              />
            </div>

            {/* Filter Row - Below Search */}
            <div style={styles.filterRow}>
              <select
                onChange={(e) => setStatusFilter(e.target.value)}
                style={styles.filterDropdown}
                value={statusFilter}
              >
                <option value="All">All Internships</option>
                <option value="current">Current</option>
                <option value="complete">Completed</option>
              </select>

              <div style={styles.dateInputContainer}>
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  style={styles.dateInput}
                  placeholder="Start date"
                />
              </div>

              <div style={styles.dateInputContainer}>
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  style={styles.dateInput}
                  placeholder="End date"
                />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={styles.emptyState}>
                <svg
                  style={styles.emptyIcon}
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                >
                  <path
                    fill="currentColor"
                    d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"
                  />
                </svg>
                <p style={styles.emptyText}>
                  No internships match your criteria
                </p>
                {searchTerm ||
                statusFilter !== "All" ||
                filterStartDate ||
                filterEndDate ? (
                  <button
                    style={styles.clearButton}
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("All");
                      setFilterStartDate("");
                      setFilterEndDate("");
                    }}
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : (
              <div style={styles.grid}>
                {filtered.map((job, idx) => (
                  <div key={idx} style={styles.card}>
                    <div style={styles.cardHeader}>
                      <h3 style={styles.company}>{job.company}</h3>
                      <span
                        style={{
                          ...styles.statusBadge,
                          ...(job.status === "current"
                            ? styles.currentBadge
                            : styles.completeBadge),
                        }}
                      >
                        {job.status === "current" ? "Current" : "Completed"}
                      </span>
                    </div>
                    <h4 style={styles.role}>{job.role}</h4>

                    <div style={styles.details}>
                      <div style={styles.detailItem}>
                        <svg
                          style={styles.detailIcon}
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                        >
                          <path
                            fill="currentColor"
                            d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"
                          />
                        </svg>
                        <span>{job.duration}</span>
                      </div>
                    </div>

                    {job.responsibilities && (
                      <div style={styles.responsibilities}>
                        <h5 style={styles.responsibilitiesTitle}>
                          Key Responsibilities
                        </h5>
                        <p style={styles.responsibilitiesText}>
                          {job.responsibilities}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    color: "#1A1A1A",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#1A1A1A",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
    fontWeight: "400",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "16px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    fontSize: "16px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    outline: "none",
    height: "48px",
    boxSizing: "border-box",
    ":focus": {
      borderColor: "#4F46E5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
    },
  },
  filterRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  filterDropdown: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "200px",
    height: "48px",
    boxSizing: "border-box",
    outline: "none",
    flex: "1",
    ":focus": {
      borderColor: "#4F46E5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
    },
  },
  dateInputContainer: {
    flex: "1",
    minWidth: "180px",
  },
  dateInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    fontSize: "16px",
    transition: "all 0.2s ease",
    outline: "none",
    height: "48px",
    boxSizing: "border-box",
    ":focus": {
      borderColor: "#4F46E5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    padding: "24px",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  company: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0",
    color: "#1A1A1A",
  },
  role: {
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 16px 0",
    color: "#4F46E5",
  },
  statusBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  currentBadge: {
    backgroundColor: "#E0E7FF",
    color: "#4F46E5",
  },
  completeBadge: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#666",
  },
  detailIcon: {
    color: "#666",
  },
  responsibilities: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #F0F0F0",
  },
  responsibilitiesTitle: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#333",
  },
  responsibilitiesText: {
    fontSize: "14px",
    margin: "0",
    color: "#666",
    lineHeight: "1.5",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    backgroundColor: "#FAFAFA",
    borderRadius: "12px",
    textAlign: "center",
  },
  emptyIcon: {
    color: "#E0E0E0",
    marginBottom: "16px",
  },
  emptyText: {
    fontSize: "18px",
    color: "#666",
    margin: "0 0 16px 0",
  },
  clearButton: {
    padding: "8px 16px",
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#4338CA",
    },
  },
};

export default MyInternships;