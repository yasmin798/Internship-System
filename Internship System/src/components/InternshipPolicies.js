import React, { useState } from "react";
import Sidebar from "./Sidebar";

const majorOptions = [
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

const videoUrls = {
  "Applied Arts & Design": "https://www.youtube.com/embed/9vuvWApltpA",
  Engineering: "https://www.youtube.com/embed/egKCVETnuNo",
  MET: "https://www.youtube.com/embed/c4IY3dFezRI",
  IET: "https://www.youtube.com/embed/W5l2XLGh1ig",
  Civil: "https://www.youtube.com/embed/CG_TPIJ3Q1w",
  Mechatronics: "https://www.youtube.com/embed/oSw7g-sxSYA",
  "Design & Production": "https://www.youtube.com/embed/yr2-oV2eitA",
  Management: "https://www.youtube.com/embed/5G2KOtdP_HA",
  "Business Informatics": "https://www.youtube.com/embed/YWeWSzjQheg",
};

const InternshipPolicies = () => {
  const [selectedMajor, setSelectedMajor] = useState("");

  return (
    <div style={{ display: "flex", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "3rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          marginTop: "2rem",
          marginBottom: "3rem",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <h1
            style={{
              color: "#1A365D",
              fontSize: "2.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
              letterSpacing: "-0.5px",
              position: "relative",
              display: "inline-block",
            }}
          >
            Internship Policies
            <span
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "0",
                width: "60px",
                height: "4px",
                backgroundColor: "#4299E1",
                borderRadius: "2px",
              }}
            ></span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#4A5568",
              lineHeight: "1.7",
              maxWidth: "800px",
              marginTop: "1.5rem",
            }}
          >
            Select your major to view specific internship requirements. Watch
            the short video to understand the types of internships that are
            considered valid toward fulfilling your internship requirement.
            Please note that internships unrelated to your major will not be
            counted.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#F8FAFC",
            padding: "2rem",
            borderRadius: "10px",
            border: "1px solid #EDF2F7",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#2D3748",
                fontSize: "1rem",
              }}
            >
              Select Your Major
            </label>
            <select
              onChange={(e) => setSelectedMajor(e.target.value)}
              value={selectedMajor}
              style={{
                padding: "0.85rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "1rem",
                width: "100%",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                backgroundImage:
                  'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231A365D%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem top 50%",
                backgroundSize: "0.65rem auto",
              }}
            >
              <option value="">-- Select your academic major --</option>
              {majorOptions.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          {selectedMajor && (
            <div
              style={{
                animation: "fadeIn 0.3s ease-out",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    backgroundColor: "#4299E1",
                    borderRadius: "2px",
                    marginRight: "12px",
                  }}
                ></div>
                <h3
                  style={{
                    color: "#2C5282",
                    fontWeight: "600",
                    fontSize: "1.35rem",
                    margin: "0",
                  }}
                >
                  {selectedMajor} Internship Guidelines
                </h3>
              </div>

              <div
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  aspectRatio: "16/9",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrls[selectedMajor]}
                  title={`Internship policy video for ${selectedMajor}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    display: "block",
                    border: "none",
                  }}
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </main>
    </div>
  );
};

export default InternshipPolicies;
