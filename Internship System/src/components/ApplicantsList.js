import React, { useState } from "react";
import { toast } from "react-toastify";
import { addCompanyNotification } from "./utils/notifications";
import jsPDF from "jspdf";
import "./applicantsStyles.css";

const dummyApplicants = [
  {
    id: 1,
    name: "Mohamed Salah",
    email: "msalah@guc.edu.eg",
    internshipTitle: "Frontend Developer Intern",
    major: "Computer Science",
    semester: "Spring 2025",
    status: "Pending",
  },
  {
    id: 2,
    name: "Nour El Sherif",
    email: "nour.sherif@eng.guc.edu.eg",
    internshipTitle: "Data Analyst Intern",
    major: "Data Science",
    semester: "Fall 2024",
    status: "Finalized",
  },
  {
    id: 3,
    name: "Laila Saad",
    email: "laila@guc.edu.eg",
    internshipTitle: "Content Developer Intern",
    major: "Media Engineering",
    semester: "Spring 2025",
    status: "Current Intern",
  },
];

const statusClass = {
  Pending: "status-pending",
  Accepted: "status-accepted",
  Rejected: "status-rejected",
  Finalized: "badge-success",
  "Current Intern": "badge-primary",
  "Internship Complete": "badge-secondary",
};

const ApplicantsList = () => {
  const [applicants, setApplicants] = useState(dummyApplicants);
  const [selectedTitle, setSelectedTitle] = useState("");
  const internshipTitles = [
    ...new Set(applicants.map((a) => a.internshipTitle)),
  ];

  const handleDownloadCV = (applicant) => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.setTextColor(33, 37, 41);
    doc.text(applicant.name, 10, y);
    y += 8;

    doc.setFontSize(12);
    doc.text(`Email: ${applicant.email}`, 10, y);
    y += 6;
    doc.text(`Phone: +20 1X XXX XXXX`, 10, y);
    y += 6;
    doc.text(
      `LinkedIn: linkedin.com/in/${applicant.name
        .toLowerCase()
        .replace(" ", "")}`,
      10,
      y
    );
    y += 10;

    doc.setFontSize(14);
    doc.text("Objective", 10, y);
    y += 6;
    doc.setFontSize(12);
    doc.text(
      `Seeking an opportunity as a ${applicant.internshipTitle} to apply my knowledge in ${applicant.major}.`,
      10,
      y
    );
    y += 10;

    doc.setFontSize(14);
    doc.text("Education", 10, y);
    y += 6;
    doc.setFontSize(12);
    doc.text(`Bachelor of ${applicant.major}`, 10, y);
    y += 6;
    doc.text(`German University in Cairo`, 10, y);
    y += 6;
    doc.text(`Expected Graduation: ${applicant.semester}`, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.text("Skills", 10, y);
    y += 6;
    doc.setFontSize(12);
    doc.text(`• Problem Solving`, 10, y);
    doc.text(`• Teamwork`, 70, y);
    doc.text(`• Time Management`, 130, y);
    y += 8;
    doc.text(`• React, JavaScript, Python`, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.text("Experience", 10, y);
    y += 6;
    doc.setFontSize(12);
    doc.text(`Student Assistant - GUC (2023 – Present)`, 10, y);
    y += 6;
    doc.text(`- Assisted in organizing academic workshops.`, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.text("Projects", 10, y);
    y += 6;
    doc.setFontSize(12);
    doc.text(`• GUC Club Portal – React App to manage clubs`, 10, y);
    y += 6;
    doc.text(`• Data Analysis of COVID-19 Trends using Python`, 10, y);

    doc.save(`${applicant.name.replace(" ", "_")}_CV.pdf`);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = applicants.map((a) => {
      if (a.id === id) {
        toast.info(`✉️ Email sent to ${a.name} (${a.email}): ${newStatus}`);
        addCompanyNotification(
          "success",
          `Applicant ${a.name} was marked as "${newStatus}" for ${a.internshipTitle}`
        );
        return { ...a, status: newStatus };
      }
      return a;
    });
    setApplicants(updated);
  };

  const promoteStatus = (applicant) => {
    const { id, status } = applicant;
    let nextStatus = "";
    if (status === "Accepted") nextStatus = "Finalized";
    else if (status === "Finalized") nextStatus = "Current Intern";
    else if (status === "Current Intern") nextStatus = "Internship Complete";
    if (nextStatus) handleStatusChange(id, nextStatus);
  };

  const filteredApplicants = selectedTitle
    ? applicants.filter((a) => a.internshipTitle === selectedTitle)
    : applicants;

  return (
    <div className="applicants-container">
      <h1 className="applicants-title">Applicants</h1>

      {internshipTitles.length > 1 && (
        <div className="filter-section">
          <label className="filter-label">Filter by Internship Post</label>
          <select
            className="filter-select"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            <option value="">All Posts</option>
            {internshipTitles.map((title, i) => (
              <option key={i} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredApplicants.length === 0 ? (
        <p className="no-applicants">
          No applicants found for the selected post.
        </p>
      ) : (
        <div className="applicants-list">
          {filteredApplicants.map((applicant) => (
            <div key={applicant.id} className="applicant-card">
              <div className="applicant-header">
                <h2 className="applicant-name">{applicant.name}</h2>
                <div className="applicant-status">
                  <span className="status-label">Status:</span>
                  <span
                    className={`status-badge ${statusClass[applicant.status]}`}
                  >
                    {applicant.status}
                  </span>
                </div>
              </div>

              <div className="applicant-details">
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{applicant.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Major:</span>
                  <span className="detail-value">{applicant.major}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Semester:</span>
                  <span className="detail-value">{applicant.semester}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Internship:</span>
                  <span className="detail-value">
                    {applicant.internshipTitle}
                  </span>
                </div>
              </div>

              <div className="applicant-actions">
                <div className="status-control">
                  <span className="action-label">Set Status:</span>
                  <select
                    className="status-select"
                    value={applicant.status}
                    onChange={(e) =>
                      handleStatusChange(applicant.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Finalized">Finalized</option>
                    <option value="Current Intern">Current Intern</option>
                    <option value="Internship Complete">
                      Internship Complete
                    </option>
                  </select>
                </div>

                <div className="action-buttons">
                  {applicant.status === "Finalized" ||
                  applicant.status === "Current Intern" ? (
                    <button
                      className="action-btn promote-btn"
                      onClick={() => promoteStatus(applicant)}
                    >
                      Promote to Next
                    </button>
                  ) : null}

                  <button
                    className="action-btn download-btn"
                    onClick={() => handleDownloadCV(applicant)}
                  >
                    Download CV
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsList;
