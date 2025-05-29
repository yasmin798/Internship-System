import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Sidebar from "./Sidebar"; // ✅ Ensure this component is correctly defined and imported

const internshipDetails = {
  technova: {
    department: "Full Stack Development",
    location: "Remote",
    number: "+1 555 123 4567",
    email: "hr@technova.com",
  },
  "medicare-ai": {
    department: "AI Research",
    location: "123 Medical Ave, Boston, MA",
    number: "+1 555 654 3210",
    email: "recruit@medicareai.org",
  },
  greenbank: {
    department: "Data Analytics",
    location: "Remote",
    number: "+1 555 777 8888",
    email: "jobs@greenbank.com",
  },
  educraft: {
    department: "Content Development",
    location: "Remote",
    number: "+1 555 333 2222",
    email: "contact@educraft.io",
  },
  techcorp: {
    department: "Frontend Engineering",
    location: "Remote",
    number: "+1 555 101 2020",
    email: "apply@techcorp.com",
  },
  healthplus: {
    department: "Clinical Research",
    location: "22 Wellness Rd, Chicago, IL",
    number: "+1 555 111 2222",
    email: "research@healthplus.org",
  },
  finovate: {
    department: "Finance Data",
    location: "Remote",
    number: "+1 555 555 4444",
    email: "careers@finovate.com",
  },
  meditech: {
    department: "Software Development",
    location: "101 Health Blvd, San Jose, CA",
    number: "+1 555 999 0000",
    email: "info@meditech.io",
  },
};

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

const ApplyPage = () => {
  const rawCompany = useParams().company;
  const normalizedCompany = rawCompany?.toLowerCase().replace(/\s+/g, "-");
  const details = internshipDetails[normalizedCompany] || {};
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formattedCompany = normalizedCompany
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newApp = {
      company: formattedCompany,
      jobTitle:
        defaultJobTitles[normalizedCompany] || details.department || "Intern",
      date: new Date().toLocaleDateString(),
      status: "pending",
    };

    const prevApps =
      JSON.parse(localStorage.getItem("submittedApplications")) || [];
    localStorage.setItem(
      "submittedApplications",
      JSON.stringify([...prevApps, newApp])
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <div style={pageContainer}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#033e53",
            }}
          >
            Application Form
          </h1>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {/* === FORM START === */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "12px",
                width: "60%",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Apply Now</h2>
              <p style={{ marginBottom: "1.5rem", color: "#555" }}>
                Please fill in your details below to apply for a position at{" "}
                <strong>{rawCompany.replace(/-/g, " ")}</strong>.
              </p>

              <input style={inputStyle} placeholder="Full Name*" required />
              <input
                style={inputStyle}
                placeholder="Email*"
                type="email"
                required
              />

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PhoneInput
                    country={"us"}
                    onChange={(value, country) =>
                      setPhone("+" + country.dialCode)
                    }
                    inputStyle={{
                      width: "40px",
                      height: "38px",
                      paddingLeft: "38px",
                      borderRadius: "6px 0 0 6px",
                    }}
                    buttonStyle={{
                      borderRadius: "6px 0 0 6px",
                    }}
                    containerStyle={{
                      width: "40px",
                      borderRadius: "6px 0 0 6px",
                    }}
                    disableDropdown={false}
                    enableSearch
                  />
                  <input
                    value={phone}
                    readOnly
                    style={{
                      width: "70px",
                      borderRadius: "0 6px 6px 0",
                      padding: "0.6rem",
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Your Phone Number"
                  style={{
                    flex: 1,
                    borderRadius: "6px",
                    padding: "0.8rem",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <input style={inputStyle} placeholder="Address, City, Zip Code" />
              <select style={inputStyle} required>
                <option value="">Select Country</option>
                <option>Egypt</option>
                <option>United States</option>
                <option>Germany</option>
                <option>Other...</option>
              </select>

              <select style={inputStyle}>
                <option value="">Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>

              <label
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Upload any extra documents (CV, certificates, cover letter):
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg"
                style={{ marginBottom: "1rem" }}
              />

              <button
                type="submit"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#457b9d",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: "100%",
                }}
              >
                Submit Application
              </button>
            </form>

            {/* === DETAILS SECTION === */}
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                width: "30%",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                height: "fit-content",
              }}
            >
              <h3
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "0.5rem",
                }}
              >
                Details
              </h3>
              <p>
                <strong>Department:</strong> {details.department}
              </p>
              <p>
                <strong>Location:</strong> {details.location}
              </p>
              <p>
                <strong>Number:</strong> {details.number}
              </p>
              <p>
                <strong>Email:</strong> {details.email}
              </p>
            </div>
          </div>

          {/* === POPUP === */}
          {submitted && (
            <div style={popupOverlay}>
              <div style={popupBox}>
                <h2>Your application is confirmed!</h2>
                <p>
                  Nice work! You successfully applied to{" "}
                  <strong>{rawCompany.replace(/-/g, " ")}</strong>.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  You can track your application status{" "}
                  <span
                    onClick={() => navigate("/my-application")}
                    style={{
                      color: "#0056b3",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    here
                  </span>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const pageContainer = {
  padding: "2rem",
  background: "#f4f4f4",
  minHeight: "100vh",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
};

const backButton = {
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
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};

const popupOverlay = {
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
};

const popupBox = {
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
};

export default ApplyPage;
