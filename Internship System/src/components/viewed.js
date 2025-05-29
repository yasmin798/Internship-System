import React from "react";
import Sidebar from "./Sidebar";

const Viewed = () => {
  const companies = [
    "Meta Platforms",
    "Amazon Web Services",
    "Netflix Inc.",
    "Tesla Engineering",
    "Google DeepMind",
  ];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#101828",
            marginBottom: "1.5rem",
          }}
        >
          Companies That Viewed Your Profile
        </h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {companies.map((company, idx) => (
            <li
              key={idx}
              style={{
                backgroundColor: "#fff",
                padding: "1rem 1.5rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                fontSize: "1rem",
                color: "#1A237E",
                fontWeight: 500,
              }}
            >
              👀 {company}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Viewed;
