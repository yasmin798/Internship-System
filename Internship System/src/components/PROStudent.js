import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const ProStudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultProfile = {
    jobInterest: "Frontend Development",
    selectedMajor: "Computer Science",
    selectedSemester: "Semester 6",
    activities: "Student Union, Hackathons",
    internships: [
      {
        company: "Google",
        role: "Software Intern",
        duration: "3 months",
        responsibilities: "Worked on UI components using React.js",
      },
      {
        company: "IBM",
        role: "Data Analyst Intern",
        duration: "2 months",
        responsibilities: "Analyzed financial datasets using Python",
      },
    ],
  };

  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const internships = [
    {
      company: "TechCorp",
      job: "Frontend Intern",
      duration: "3 months",
      paid: "Paid",
      salary: "$900/month",
      industry: "Technology",
    },
    {
      company: "HealthPlus",
      job: "Research Assistant",
      duration: "1 month",
      paid: "Unpaid",
      industry: "Healthcare",
    },
    {
      company: "Finovate",
      job: "Data Analyst",
      duration: "6 months",
      paid: "Paid",
      industry: "Finance",
    },
    {
      company: "MediTech",
      job: "Software Intern",
      duration: "3 months",
      paid: "Unpaid",
      industry: "Technology",
    },
  ];

  const filteredInternships = internships.filter((item) => {
    return (
      (!searchTerm ||
        item.job.toLowerCase().includes(searchTerm) ||
        item.company.toLowerCase().includes(searchTerm)) &&
      (!industryFilter || item.industry === industryFilter)
    );
  });

  useEffect(() => {
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile(defaultProfile);
    }

    toast.success(
      "📃 Your internship report status has been set successfully.",
      {
        position: "top-right",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    );

    toast.warning(
      "⚠️ A new internship cycle will start in 2 days, Stay Tuned!",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    );

    setTimeout(() => {
      toast.info(
        "🕒 A new internship cycle has begun. Explore fresh opportunities!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    }, 1500);
  }, []);

  useEffect(() => {
    const callTimeout = setTimeout(() => {
      const callToast = document.createElement("div");
      callToast.id = "custom-call-toast";
      callToast.style.position = "fixed";
      callToast.style.bottom = "20px";
      callToast.style.right = "20px";
      callToast.style.zIndex = "9999";

      callToast.innerHTML = `
  <div style="
    background: #1d3557;
    padding: 16px 20px;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    width: 255px;
    color: white;
    font-family: 'Inter', sans-serif;
  ">
    <div style="display: flex; align-items: center; margin-bottom: 18px;">
      <img src="/scadlogoo.png" alt="SCAD Logo"
           style="width: 52px; height: 52px; border-radius: 50%; margin-right: 14px;" />
      <div>
        <div style="font-weight: 600; font-size: 17px;">SCAD Office</div>
        <div style="font-size: 14px; color: #d1d5db;">Calling...</div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 12px;">
      <button id="accept-call" style="
        flex: 1;
        background: #4CAF50;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24">
          <path d="M6.6 10.8C8 13.6 10.4 15.9 13.2 17.4L15.4 15.2C15.6 15 15.8 14.9 16.1 14.9C16.2 14.9 16.3 14.9 16.4 14.9C17.5 15.3 18.8 15.5 20 15.5C20.6 15.5 21 15.9 21 16.5V20C21 20.6 20.6 21 20 21C10.6 21 3 13.4 3 4C3 3.4 3.4 3 4 3H7.5C8.1 3 8.5 3.4 8.5 4C8.5 5.2 8.7 6.5 9 7.6C9.2 7.9 9.1 8.3 9 8.6L6.6 10.8Z"/>
        </svg>
        Accept
      </button>
      <button id="decline-call" style="
        flex: 1;
        background: #F44336;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24">
          <path d="M21.1 4.3C21.5 4.7 21.5 5.3 21.1 5.7L5.7 21.1C5.3 21.5 4.7 21.5 4.3 21.1C3.9 20.7 3.9 20.1 4.3 19.7L19.7 4.3C20.1 3.9 20.7 3.9 21.1 4.3Z"/>
        </svg>
        Decline
      </button>
    </div>
  </div>
`;

      document.body.appendChild(callToast);

      document.getElementById("accept-call").addEventListener("click", () => {
        callToast.remove();

        navigate("/appointments?startCall=true");
      });

      document.getElementById("decline-call").addEventListener("click", () => {
        callToast.remove();
      });
    }, 4000);

    return () => {
      clearTimeout(callTimeout);
      const existingToast = document.getElementById("custom-call-toast");
      if (existingToast) {
        existingToast.remove();
      }
    };
  }, [navigate]);

  const InfoItem = ({ label, value }) => (
    <p style={styles.infoItem}>
      <strong style={styles.infoLabel}>{label}:</strong>
      <span style={styles.infoValue}>{value || "—"}</span>
    </p>
  );

  return (
    <div style={styles.pageContainer}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>PRO Student Dashboard 🌟</h1>
      </div>
      <div
        style={styles.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} style={styles.hamburgerLine}></div>
        ))}
      </div>
      {sidebarOpen && (
        <div
          style={{
            ...styles.sidebar,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={styles.sidebarContent}>
            <h2 style={styles.sidebarTitle}>Menu</h2>
            <ul style={styles.sidebarList}>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/pro-student-dashboard" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/pro-student-dashboard");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Home</span>
              </li>

              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/edit-profile" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/edit-profile");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Edit Profile</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/internships" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/internships");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Internships</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/my-application" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/my-application");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>My Applications</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/My-internships" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/My-internships");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>My Internships</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/Evaluations" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/Evaluations");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Evaluations</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/Reports" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/Reports");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Reports</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/My-Reports" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/My-Reports");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>My Reports</span>
              </li>

              {localStorage.getItem("userRole") === "prostudent" && (
                <li
                  style={{
                    ...styles.sidebarItem,
                    ...(location.pathname === "/appointments" &&
                      styles.activeMenuItem),
                  }}
                  onClick={() => {
                    navigate("/appointmentsP");
                    setSidebarOpen(false);
                  }}
                >
                  <span style={styles.menuText}>Book Appointments</span>
                </li>
              )}
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/assessments" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/assessments");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Assessments</span>
              </li>

              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname.includes("/workshopbrowse") &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/workshopbrowse");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Workshops</span>
              </li>

              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "NotificationsPage" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/NotificationsPage");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Notifications</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "Analytics" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/analytics");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Analytics</span>
              </li>
              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "Feedback" &&
                    styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/feedback");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Feedback</span>
              </li>

              <li
                style={{
                  ...styles.sidebarItem,
                  ...(location.pathname === "/viewed" && styles.activeMenuItem),
                }}
                onClick={() => {
                  navigate("/viewed");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Viewed My Profile</span>
              </li>
            </ul>
            <div style={styles.sidebarBottom}>
              <li
                style={styles.sidebarItem}
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuText}>Log Out</span>
              </li>
            </div>
          </div>
        </div>
      )}
      <div style={styles.contentWrapper}>
        <div style={styles.leftPanel}>
          <div style={styles.sectionHeader}>Student Information</div>
          <div style={styles.infoBox}>
            <div style={styles.profileContainer}>
              <img
                src="/profile2.png"
                alt="Profile"
                style={styles.profileImage}
              />
              <p style={styles.profileName}>Warren Graham</p>
            </div>
            <InfoItem label="Job Interest" value={profile?.jobInterest} />
            <InfoItem label="Major" value={profile?.selectedMajor} />
            <InfoItem label="Semester" value={profile?.selectedSemester} />
            <InfoItem label="College Activities" value={profile?.activities} />
            {localStorage.getItem("assessmentScore") && (
              <InfoItem
                label="Assessment Score"
                value={localStorage.getItem("assessmentScore")}
              />
            )}

            <div style={styles.internshipSection}>
              <strong style={styles.subHeader}>
                Internships/Part-time Jobs:
              </strong>
              {profile?.internships?.length > 0 ? (
                <ul style={styles.internshipList}>
                  {profile.internships.map((job, idx) => (
                    <li key={idx} style={styles.internshipItem}>
                      <InfoItem label="Company" value={job.company} />
                      <InfoItem label="Role" value={job.role} />
                      <InfoItem label="Duration" value={job.duration} />
                      <InfoItem
                        label="Responsibilities"
                        value={job.responsibilities}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={styles.emptyState}>(empty)</p>
              )}
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <h2 style={styles.sectionHeader}>
            Recommended Opportunities Based On You
          </h2>
          <input
            type="text"
            placeholder="Search by job title or company name"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            style={styles.searchInput}
          />
          <div style={styles.filterGroup}>
            <select
              onChange={(e) => setIndustryFilter(e.target.value)}
              style={styles.filterDropdown}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
            </select>
            <select
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              style={styles.filterDropdown}
            >
              <option value="">All Job Interests</option>
              <option value="frontend">Frontend</option>
              <option value="data">Data</option>
              <option value="research">Research</option>
              <option value="software">Software</option>
            </select>
          </div>
          <div style={styles.gridContainer}>
            {filteredInternships.length === 0 ? (
              <p style={styles.emptyState}>No matching opportunities found</p>
            ) : (
              filteredInternships.map((internship, idx) => (
                <div key={idx} style={styles.card}>
                  <InfoItem label="Company" value={internship.company} />
                  <InfoItem label="Job Title" value={internship.job} />
                  <InfoItem label="Industry" value={internship.industry} />
                  <button
                    onClick={() => setSelectedInternship(internship)}
                    style={styles.primaryButton}
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {selectedInternship && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedInternship(null)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{selectedInternship.company}</h2>
            <InfoItem label="Job Title" value={selectedInternship.job} />
            <InfoItem label="Duration" value={selectedInternship.duration} />
            <InfoItem label="Industry" value={selectedInternship.industry} />
            <InfoItem label="Type" value={selectedInternship.paid} />
            <InfoItem
              label="Expected Salary"
              value={selectedInternship.salary || "$900/month"}
            />
            <div style={styles.skillList}>
              <h3 style={styles.subHeader}>Requirements:</h3>
              <ul>
                <li style={styles.skillItem}>Proficiency in HTML, CSS, JS</li>
                <li style={styles.skillItem}>Familiarity with Git</li>
                <li style={styles.skillItem}>Team collaboration skills</li>
              </ul>
            </div>
            <div style={styles.modalActions}>
              <button
                onClick={() =>
                  navigate(
                    `/apply/${encodeURIComponent(selectedInternship.company)}`
                  )
                }
                style={styles.successButton}
              >
                Apply Now
              </button>
              <button
                onClick={() => setSelectedInternship(null)}
                style={styles.secondaryButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Outlet /> {/* This renders nested routes */}
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
  },
  banner: {
    background: "linear-gradient(135deg, #1d3557 0%, #457b9d 100%)",
    padding: "2.5rem 0",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    margin: "-2rem -2rem 2rem -2rem",
  },

  bannerTitle: {
    margin: 0,
    fontSize: "2.25rem",
    color: "#FFFFFF",
    fontWeight: 600,
    letterSpacing: "-0.025em",
  },
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
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  hamburgerLine: {
    width: "28px",
    height: "3px",
    backgroundColor: "#FFFFFF",
    margin: "5px 0",
    borderRadius: "2px",
    transition: "all 0.3s ease",
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
    margin: 0,
    flex: 1,
  },
  sidebarItem: {
    display: "block",
    width: "100%",
    padding: "1rem 1.5rem",
    marginBottom: "0.75rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
  },
  activeMenuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderLeft: "4px solid #0D47A1",
  },
  menuText: {
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.025em",
  },
  sidebarBottom: {
    paddingTop: "2rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
  },
  contentWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "2rem",
    maxWidth: "1440px",
    margin: "0 auto",
  },
  leftPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  rightPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  sectionHeader: {
    fontSize: "1.375rem",
    fontWeight: 600,
    color: "#1d3557",
    marginBottom: "1.5rem",
    paddingBottom: "0.5rem",
    borderBottom: "2px solid #E8EAF6",
  },
  infoBox: {
    backgroundColor: "#F8F9FF",
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  profileContainer: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #1A237E",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  profileName: {
    marginTop: "0.75rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1A237E",
  },
  infoItem: {
    margin: "0.5rem 0",
    fontSize: "0.95rem",
  },
  infoLabel: {
    color: "#616161",
    marginRight: "0.5rem",
  },
  infoValue: {
    color: "#212121",
    fontWeight: 500,
  },
  internshipSection: {
    marginTop: "1.5rem",
  },
  subHeader: {
    display: "block",
    marginBottom: "0.5rem",
  },
  internshipList: {
    listStyle: "none",
    padding: 0,
  },
  internshipItem: {
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #eee",
  },
  searchInput: {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    fontSize: "0.95rem",
    marginBottom: "1.5rem",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#1A237E",
      boxShadow: "0 0 0 3px rgba(26, 35, 126, 0.1)",
    },
  },
  filterGroup: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  filterDropdown: {
    flex: 1,
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      borderColor: "#1A237E",
    },
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #EEEEEE",
    transition: "all 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  },
  primaryButton: {
    backgroundColor: "#457b9d",
    color: "#FFFFFF",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
    marginTop: "1rem",
    width: "100%",
    ":hover": {
      backgroundColor: "#a8dadc",
    },
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "600px",
    width: "90%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    border: "1px solid #E8EAF6",
  },
  modalTitle: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#1A237E",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #E8EAF6",
  },
  skillList: {
    margin: "2rem 0 1.5rem 0",
    padding: "1.5rem",
    backgroundColor: "#F8F9FF",
    borderRadius: "8px",
  },
  skillItem: {
    margin: "0.75rem 0",
    color: "#616161",
    fontSize: "0.95rem",
    paddingLeft: "1.5rem",
    position: "relative",
    ":before": {
      content: "'▹'",
      position: "absolute",
      left: 0,
      color: "#1A237E",
    },
  },
  modalActions: {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
    "& button": {
      flex: 1,
      padding: "0.875rem 1.5rem",
      fontSize: "1rem",
      fontWeight: 500,
      borderRadius: "8px",
      transition: "all 0.2s ease",
    },
  },
  successButton: {
    backgroundColor: "#457b9d",
    color: "#FFFFFF",
    ":hover": {
      backgroundColor: "#a8dadc",
    },
  },
  secondaryButton: {
    backgroundColor: "#F0F4F8",
    color: "#1A237E",
    border: "1px solid #E0E0E0",
    ":hover": {
      backgroundColor: "#E8ECF0",
    },
  },
  emptyState: {
    color: "#9E9E9E",
    textAlign: "center",
    padding: "2rem",
  },
};

export default ProStudentDashboard;
