import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaFileAlt,
  FaHome,
  FaSignOutAlt,
  FaDownload,
  FaTimesCircle,
  FaCheck,
  FaFlag,
  FaHourglassHalf,
  FaClock,
  FaSync,
  FaStar,
  FaBuilding,
  FaBook,
  FaChartBar,
  FaUser,
  FaCalendarAlt,
  FaComment,
  FaPaperclip,
} from "react-icons/fa";

const Faculty = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState("All");
  const [reportCategory, setReportCategory] = useState("all");
  const [selectedMajor, setSelectedMajor] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [reports, setReports] = useState([]);
  const [clarificationText, setClarificationText] = useState("");
  const [showClarificationForm, setShowClarificationForm] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [clarifications, setClarifications] = useState({});
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Initialize mock data with detailed evaluation reports
  useEffect(() => {
    const initialReports = [
      {
        id: 1,
        title: "CS 101 Midterm Evaluation",
        course: "CS 101 - Introduction to Programming",
        submissionDate: "2023-10-15",
        status: "Accepted",
        type: "grades",
        major: "CS",
        student: {
          name: "John Doe",
          id: "S12345",
          email: "john.doe@university.edu",
          program: "Computer Science BSc",
        },
        evaluationDetails: {
          grade: "A",
          creditsEarned: 3,
          evaluationDate: "2023-10-10",
          evaluator: "Dr. Smith",
        },
        internshipDetails: {
          companyName: "Tech Innovations Inc.",
          supervisor: "Sarah Johnson",
          position: "Software Development Intern",
          startDate: "2023-06-01",
          endDate: "2023-08-31",
          hoursCompleted: 320,
        },
        performanceEvaluation: {
          technicalSkills: "Excellent",
          problemSolving: "Very Good",
          teamwork: "Good",
          communication: "Excellent",
          overallAssessment:
            "The student demonstrated exceptional skills in programming and showed great potential for growth.",
        },
      },
      {
        id: 2,
        title: "EE 201 Final Evaluation",
        course: "EE 201 - Circuits",
        submissionDate: "2023-12-05",
        status: "Pending",
        type: "grades",
        major: "EE",
        student: {
          name: "Jane Smith",
          id: "S67890",
          email: "jane.smith@university.edu",
          program: "Electrical Engineering BSc",
        },
        evaluationDetails: {
          grade: "B+",
          creditsEarned: 4,
          evaluationDate: "2023-12-01",
          evaluator: "Dr. Brown",
        },
        internshipDetails: {
          companyName: "Electro Systems Ltd.",
          supervisor: "Michael Chen",
          position: "Electrical Engineering Intern",
          startDate: "2023-07-01",
          endDate: "2023-09-30",
          hoursCompleted: 400,
        },
        performanceEvaluation: {
          technicalSkills: "Very Good",
          problemSolving: "Good",
          teamwork: "Excellent",
          communication: "Good",
          overallAssessment:
            "The student showed strong technical abilities but needs to work on documentation skills.",
        },
      },
      {
        id: 3,
        title: "Internship Report - Tech Corp",
        course: "CS 301 - Data Structures",
        submissionDate: "2023-09-30",
        status: "Flagged",
        type: "research",
        major: "CS",
        company: "Tech Corp",
        studentName: "Alex Johnson",
        supervisor: "Dr. Williams",
        startDate: "2023-06-15",
        endDate: "2023-09-15",
        reportContent:
          "Worked on optimizing data structures for the company's core product...",
        learningOutcomes:
          "Gained practical experience with large-scale data processing.",
      },
    ];
    setReports(initialReports);
  }, []);

  const [realTimeStats, setRealTimeStats] = useState({
    reports: null,
    internshipStats: null,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Calculate statistics
  const calculateReportStats = useCallback(() => {
    return {
      Accepted: reports.filter((r) => r.status === "Accepted").length,
      Pending: reports.filter((r) => r.status === "Pending").length,
      Flagged: reports.filter((r) => r.status === "Flagged").length,
      Rejected: reports.filter((r) => r.status === "Rejected").length,
      averageReviewTime: "3 days",
    };
  }, [reports]);

  // Calculate internship statistics
  const calculateInternshipStats = useCallback(() => {
    const internshipReports = reports.filter((r) => r.type === "research");

    const courseCounts = {};
    internshipReports.forEach((report) => {
      courseCounts[report.course] = (courseCounts[report.course] || 0) + 1;
    });
    const frequentCourses = Object.entries(courseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([course, count]) => ({ course, count }));

    const companyRatings = {};
    const companyCounts = {};
    internshipReports.forEach((report) => {
      if (report.company) {
        const rating =
          report.status === "Accepted"
            ? 4.5
            : report.status === "Flagged"
            ? 3.0
            : report.status === "Pending"
            ? 2.5
            : 1.0;

        if (!companyRatings[report.company]) {
          companyRatings[report.company] = { sum: 0, count: 0 };
        }
        companyRatings[report.company].sum += rating;
        companyRatings[report.company].count += 1;

        companyCounts[report.company] =
          (companyCounts[report.company] || 0) + 1;
      }
    });

    const topRatedCompanies = Object.entries(companyRatings)
      .map(([company, data]) => ({
        company,
        averageRating: (data.sum / data.count).toFixed(1),
        count: data.count,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3);

    const topCompaniesByCount = Object.entries(companyCounts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      frequentCourses,
      topRatedCompanies,
      topCompaniesByCount,
    };
  }, [reports]);

  // Update stats
  const updateStats = useCallback(() => {
    const newStats = {
      reports: calculateReportStats(),
      internshipStats: calculateInternshipStats(),
    };
    setRealTimeStats(newStats);
    setStatsLoading(false);
    setLastUpdate(new Date().toLocaleTimeString());
  }, [calculateReportStats, calculateInternshipStats]);

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, [updateStats]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDownloadReport = async () => {
    try {
      if (!selectedReport) {
        alert("No report selected for download");
        return;
      }

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      doc.setProperties({
        title: selectedReport.title || "Report",
        subject: "Internship Evaluation Report",
        author: "Faculty Portal",
      });

      doc.setFont("helvetica");
      doc.setFontSize(20);
      doc.setTextColor(5, 68, 94);
      doc.text(selectedReport.title || "Report", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      let yPosition = 40;

      const addField = (label, value) => {
        if (value) {
          doc.text(`${label}: ${value}`, 14, yPosition);
          yPosition += 8;
        }
      };

      addField("Course", selectedReport.course);
      addField("Major", selectedReport.major);
      addField("Submitted", selectedReport.submissionDate);

      if (selectedReport.status) {
        const statusColor =
          selectedReport.status === "Accepted"
            ? [76, 175, 80]
            : selectedReport.status === "Pending"
            ? [255, 165, 0]
            : selectedReport.status === "Flagged"
            ? [255, 193, 7]
            : [244, 67, 53];

        doc.setTextColor(...statusColor);
        doc.text(`Status: ${selectedReport.status}`, 14, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 10;
      }

      if (selectedReport.student) {
        doc.setFontSize(14);
        doc.text("Student Details", 14, yPosition);
        yPosition += 10;
        doc.setFontSize(12);

        addField("Name", selectedReport.student.name);
        addField("ID", selectedReport.student.id);
        addField("Email", selectedReport.student.email);
        addField("Program", selectedReport.student.program);
        yPosition += 5;
      }

      if (selectedReport.internshipDetails) {
        doc.setFontSize(14);
        doc.text("Internship Details", 14, yPosition);
        yPosition += 10;
        doc.setFontSize(12);

        addField("Company", selectedReport.internshipDetails.companyName);
        addField("Position", selectedReport.internshipDetails.position);
        addField("Supervisor", selectedReport.internshipDetails.supervisor);
        addField(
          "Hours Completed",
          selectedReport.internshipDetails.hoursCompleted
        );
        addField("Start Date", selectedReport.internshipDetails.startDate);
        addField("End Date", selectedReport.internshipDetails.endDate);
        yPosition += 5;
      }

      if (selectedReport.performanceEvaluation) {
        doc.setFontSize(14);
        doc.text("Performance Evaluation", 14, yPosition);
        yPosition += 10;
        doc.setFontSize(12);

        const perf = selectedReport.performanceEvaluation;
        addField("Technical Skills", perf.technicalSkills);
        addField("Problem Solving", perf.problemSolving);
        addField("Teamwork", perf.teamwork);
        addField("Communication", perf.communication);

        if (perf.overallAssessment) {
          yPosition += 5;
          doc.setFontSize(14);
          doc.text("Overall Assessment:", 14, yPosition);
          yPosition += 8;
          doc.setFontSize(12);

          const splitText = doc.splitTextToSize(perf.overallAssessment, 180);
          doc.text(splitText, 14, yPosition);
          yPosition += splitText.length * 7;
        }
      }

      const reportClarification =
        clarifications[selectedReport.id] || selectedReport.clarification;
      if (reportClarification) {
        doc.setFontSize(14);
        doc.setTextColor(244, 67, 53);
        doc.text(
          `${
            selectedReport.status === "Flagged" ? "Flagged" : "Rejected"
          } Report Clarification`,
          14,
          yPosition
        );
        yPosition += 10;
        doc.setFontSize(12);

        doc.setTextColor(0, 0, 0);
        const clarificationLines = doc.splitTextToSize(
          reportClarification.text,
          180
        );
        doc.text(clarificationLines, 14, yPosition);
        yPosition += clarificationLines.length * 7;

        doc.text(
          `Date: ${new Date(reportClarification.date).toLocaleString()}`,
          14,
          yPosition
        );
        yPosition += 10;
      }

      doc.save(
        `${selectedReport.title.replace(/[^a-z0-9]/gi, "_") || "report"}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const submitClarification = () => {
    if (!clarificationText.trim()) {
      alert("Please enter a clarification before submitting");
      return;
    }
    updateReportStatus(selectedReport.status);
  };

  const generateReport = (type) => {
    setIsGeneratingReport(true);

    setTimeout(() => {
      let reportContent = "";
      const now = new Date();
      const dateString = now.toLocaleDateString();
      const timeString = now.toLocaleTimeString();

      reportContent += `Internship Evaluation Report\n`;
      reportContent += `Generated on: ${dateString} at ${timeString}\n\n`;

      reportContent += `=== REPORT STATISTICS ===\n`;
      reportContent += `Accepted: ${realTimeStats.reports?.Accepted || 0}\n`;
      reportContent += `Pending: ${realTimeStats.reports?.Pending || 0}\n`;
      reportContent += `Flagged: ${realTimeStats.reports?.Flagged || 0}\n`;
      reportContent += `Rejected: ${realTimeStats.reports?.Rejected || 0}\n`;
      reportContent += `Average Review Time: ${
        realTimeStats.reports?.averageReviewTime || "N/A"
      }\n\n`;

      if (realTimeStats.internshipStats) {
        reportContent += `=== INTERNSHIP INSIGHTS ===\n`;

        reportContent += `Most Frequent Courses:\n`;
        realTimeStats.internshipStats.frequentCourses.forEach(
          (course, index) => {
            reportContent += `${index + 1}. ${course.course}: ${
              course.count
            } reports\n`;
          }
        );
        reportContent += "\n";

        reportContent += `Top Rated Companies:\n`;
        realTimeStats.internshipStats.topRatedCompanies.forEach(
          (company, index) => {
            reportContent += `${index + 1}. ${company.company}: ${
              company.averageRating
            } stars (${company.count} reports)\n`;
          }
        );
        reportContent += "\n";

        reportContent += `Most Active Companies:\n`;
        realTimeStats.internshipStats.topCompaniesByCount.forEach(
          (company, index) => {
            reportContent += `${index + 1}. ${company.company}: ${
              company.count
            } internships\n`;
          }
        );
      }

      setGeneratedReport(reportContent);
      setIsGeneratingReport(false);

      const blob = new Blob([reportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `internship_report_${dateString.replace(/\//g, "-")}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  const updateReportStatus = (status) => {
    if (!selectedReport) return;

    if (
      (status === "Flagged" || status === "Rejected") &&
      !clarificationText.trim()
    ) {
      setShowClarificationForm(true);
      return;
    }

    const updatedReport = {
      ...selectedReport,
      status,
      ...((status === "Flagged" || status === "Rejected") && {
        clarification: {
          text: clarificationText,
          date: new Date().toISOString(),
          attachments: attachments,
          resolved: false,
        },
      }),
    };

    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === selectedReport.id ? updatedReport : report
      )
    );

    if (status === "Flagged" || status === "Rejected") {
      setClarifications((prev) => ({
        ...prev,
        [selectedReport.id]: updatedReport.clarification,
      }));
    }

    setSelectedReport(updatedReport);
    setClarificationText("");
    setAttachments([]);
    setShowClarificationForm(false);
  };

  const renderPdfPreview = () => {
    const reportClarification =
      clarifications[selectedReport.id] || selectedReport.clarification;

    return (
      <div style={styles.pdfPreview}>
        <div style={styles.pdfHeader}>
          <h2>{selectedReport?.title || "Report"}</h2>
          <button
            onClick={() => {
              setIsPdfPreviewOpen(false);
              setShowClarificationForm(false);
            }}
            style={styles.closePdfButton}
          >
            <FaTimesCircle size={24} />
          </button>
        </div>
        <div style={styles.pdfContent}>
          <div style={styles.pdfSection}>
            <h3>
              {selectedReport?.type === "research"
                ? "Internship"
                : "Evaluation"}
              Report Information
            </h3>
            <p>
              <strong>Course:</strong> {selectedReport?.course}
            </p>
            <p>
              <strong>Major:</strong> {selectedReport?.major}
            </p>
            <p>
              <strong>Submitted:</strong> {selectedReport?.submissionDate}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                style={{
                  color:
                    selectedReport?.status === "Accepted"
                      ? "#4CAF50"
                      : selectedReport?.status === "Pending"
                      ? "#FFA500"
                      : selectedReport?.status === "Flagged"
                      ? "#FFC107"
                      : "#f44336",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {selectedReport?.status}
              </span>
            </p>
          </div>

          {selectedReport?.student && (
            <div style={styles.pdfSection}>
              <h3>
                <FaUser style={{ marginRight: "10px" }} />
                Student Details
              </h3>
              <div style={styles.detailGrid}>
                <div>
                  <p>
                    <strong>Name:</strong> {selectedReport.student.name}
                  </p>
                  <p>
                    <strong>Student ID:</strong> {selectedReport.student.id}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Email:</strong> {selectedReport.student.email}
                  </p>
                  <p>
                    <strong>Program:</strong> {selectedReport.student.program}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedReport?.internshipDetails && (
            <div style={styles.pdfSection}>
              <h3>
                <FaBuilding style={{ marginRight: "10px" }} />
                Internship Details
              </h3>
              <div style={styles.detailGrid}>
                <div>
                  <p>
                    <strong>Company:</strong>{" "}
                    {selectedReport.internshipDetails.companyName}
                  </p>
                  <p>
                    <strong>Position:</strong>{" "}
                    {selectedReport.internshipDetails.position}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Supervisor:</strong>{" "}
                    {selectedReport.internshipDetails.supervisor}
                  </p>
                  <p>
                    <strong>Hours Completed:</strong>{" "}
                    {selectedReport.internshipDetails.hoursCompleted}
                  </p>
                </div>
              </div>
              <div style={styles.detailGrid}>
                <div>
                  <p>
                    <strong>
                      <FaCalendarAlt style={{ marginRight: "5px" }} />
                      Start Date:
                    </strong>{" "}
                    {selectedReport.internshipDetails.startDate}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>
                      <FaCalendarAlt style={{ marginRight: "5px" }} />
                      End Date:
                    </strong>{" "}
                    {selectedReport.internshipDetails.endDate}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedReport?.evaluationDetails && (
            <div style={styles.pdfSection}>
              <h3>Evaluation Details</h3>
              <div style={styles.detailGrid}>
                <div>
                  <p>
                    <strong>Grade:</strong>{" "}
                    {selectedReport.evaluationDetails.grade}
                  </p>
                  <p>
                    <strong>Credits Earned:</strong>{" "}
                    {selectedReport.evaluationDetails.creditsEarned}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Evaluator:</strong>{" "}
                    {selectedReport.evaluationDetails.evaluator}
                  </p>
                  <p>
                    <strong>Evaluation Date:</strong>{" "}
                    {selectedReport.evaluationDetails.evaluationDate}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedReport?.performanceEvaluation && (
            <div style={styles.pdfSection}>
              <h3>Performance Evaluation</h3>
              <div style={styles.detailGrid}>
                <div>
                  <p>
                    <strong>Technical Skills:</strong>{" "}
                    {selectedReport.performanceEvaluation.technicalSkills}
                  </p>
                  <p>
                    <strong>Problem Solving:</strong>{" "}
                    {selectedReport.performanceEvaluation.problemSolving}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Teamwork:</strong>{" "}
                    {selectedReport.performanceEvaluation.teamwork}
                  </p>
                  <p>
                    <strong>Communication:</strong>{" "}
                    {selectedReport.performanceEvaluation.communication}
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>
                <p>
                  <strong>Overall Assessment:</strong>
                </p>
                <p>{selectedReport.performanceEvaluation.overallAssessment}</p>
              </div>
            </div>
          )}

          {selectedReport?.type === "research" && (
            <>
              <div style={styles.pdfSection}>
                <h3>Report Content</h3>
                <p>
                  {selectedReport?.reportContent || "No content available."}
                </p>
              </div>

              <div style={styles.pdfSection}>
                <h3>Learning Outcomes</h3>
                <p>
                  {selectedReport?.learningOutcomes ||
                    "No learning outcomes provided."}
                </p>
              </div>
            </>
          )}

          {reportClarification && (
            <div style={styles.pdfSection}>
              <h3 style={{ color: "#f44336" }}>
                <FaComment style={{ marginRight: "10px" }} />
                {selectedReport.status === "Flagged"
                  ? "Flagged"
                  : "Rejected"}{" "}
                Report Clarification
              </h3>
              <p>
                <strong>Reason:</strong> {reportClarification.text}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(reportClarification.date).toLocaleString()}
              </p>

              {reportClarification.attachments?.length > 0 && (
                <div>
                  <p>
                    <strong>Attachments:</strong>
                  </p>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {reportClarification.attachments.map((file, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        <FaPaperclip style={{ marginRight: "5px" }} />
                        {file.name || file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {showClarificationForm && (
            <div style={styles.pdfSection}>
              <h3>
                <FaComment style={{ marginRight: "10px" }} />
                Provide Clarification for {selectedReport.status}
              </h3>
              <textarea
                value={clarificationText}
                onChange={(e) => setClarificationText(e.target.value)}
                placeholder="Explain why this report is being flagged or rejected..."
                style={styles.clarificationInput}
                rows={5}
                required
              />

              <div style={{ margin: "15px 0" }}>
                <label style={styles.fileUploadLabel}>
                  <FaPaperclip style={{ marginRight: "5px" }} />
                  Add Attachments
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    multiple
                  />
                </label>

                {attachments.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <p>
                      <strong>Attachments:</strong>
                    </p>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {attachments.map((file, index) => (
                        <li
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          <FaPaperclip style={{ marginRight: "5px" }} />
                          {file.name}
                          <button
                            onClick={() => removeAttachment(index)}
                            style={styles.removeAttachmentButton}
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => updateReportStatus(selectedReport.status)}
                  style={styles.submitClarificationButton}
                  disabled={!clarificationText.trim()}
                >
                  Submit Clarification
                </button>
                <button
                  onClick={() => {
                    setShowClarificationForm(false);
                    setClarificationText("");
                    setAttachments([]);
                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={styles.pdfFooter}>
          {selectedReport?.type === "research" && !showClarificationForm && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button
                onClick={() => {
                  setSelectedReport((prev) => ({
                    ...prev,
                    status: "Accepted",
                  }));
                  updateReportStatus("Accepted");
                }}
                style={{
                  ...styles.statusButton,
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                }}
              >
                <FaCheck style={{ marginRight: "5px" }} /> Accept
              </button>
              <button
                onClick={() => {
                  setSelectedReport((prev) => ({ ...prev, status: "Flagged" }));
                  setShowClarificationForm(true);
                }}
                style={{
                  ...styles.statusButton,
                  backgroundColor: "#FFC107",
                  borderColor: "#FFC107",
                }}
              >
                <FaFlag style={{ marginRight: "5px" }} /> Flag
              </button>
              <button
                onClick={() => {
                  setSelectedReport((prev) => ({
                    ...prev,
                    status: "Rejected",
                  }));
                  setShowClarificationForm(true);
                }}
                style={{
                  ...styles.statusButton,
                  backgroundColor: "#f44336",
                  borderColor: "#f44336",
                }}
              >
                <FaTimesCircle style={{ marginRight: "5px" }} /> Reject
              </button>
            </div>
          )}
          <button onClick={handleDownloadReport} style={styles.downloadButton}>
            <FaDownload style={{ marginRight: "8px" }} /> Download PDF
          </button>
        </div>
      </div>
    );
  };

  const renderReportsTab = () => {
    const reportTypeOptions = ["All", "grades", "research"];
    const majorOptions = ["All", "CS", "EE", "ME", "CE"];
    const statusOptions = ["All", "Pending", "Accepted", "Flagged", "Rejected"];

    const filteredReports = reports.filter((report) => {
      const typeMatch =
        selectedReportType === "All" || report.type === selectedReportType;
      const searchMatch = report.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const majorMatch =
        selectedMajor === "All" || report.major === selectedMajor;
      const statusMatch =
        selectedStatus === "All" || report.status === selectedStatus;

      return typeMatch && searchMatch && majorMatch && statusMatch;
    });

    return (
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>
          <FaFileAlt style={styles.titleIcon} /> Reports
        </h1>

        <div style={{ ...styles.filterContainer, marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              backgroundColor: "#f0f2f5",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            <button
              onClick={() => {
                setReportCategory("all");
                setSelectedReportType("All");
              }}
              style={{
                ...styles.categoryButton,
                backgroundColor:
                  reportCategory === "all" ? "#05445E" : "#f0f2f5",
                color: reportCategory === "all" ? "white" : "#05445E",
              }}
            >
              All Reports
            </button>
            <button
              onClick={() => {
                setReportCategory("evaluation");
                setSelectedReportType("grades");
              }}
              style={{
                ...styles.categoryButton,
                backgroundColor:
                  reportCategory === "evaluation" ? "#05445E" : "#f0f2f5",
                color: reportCategory === "evaluation" ? "white" : "#05445E",
              }}
            >
              Evaluation Reports
            </button>
            <button
              onClick={() => {
                setReportCategory("internship");
                setSelectedReportType("research");
              }}
              style={{
                ...styles.categoryButton,
                backgroundColor:
                  reportCategory === "internship" ? "#05445E" : "#f0f2f5",
                color: reportCategory === "internship" ? "white" : "#05445E",
              }}
            >
              Internship Reports
            </button>
          </div>
        </div>

        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search by report title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...styles.searchInput, flex: "2" }}
          />

          <select
            value={selectedReportType}
            onChange={(e) => {
              setSelectedReportType(e.target.value);
              setReportCategory(
                e.target.value === "grades"
                  ? "evaluation"
                  : e.target.value === "research"
                  ? "internship"
                  : "all"
              );
            }}
            style={styles.dropdown}
          >
            {reportTypeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type === "research"
                  ? "Internship"
                  : type === "grades"
                  ? "Evaluation"
                  : "All"}
              </option>
            ))}
          </select>

          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            style={styles.dropdown}
          >
            {majorOptions.map((major, index) => (
              <option key={index} value={major}>
                {major}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={styles.dropdown}
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.sectionContainer}>
          {filteredReports.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {filteredReports.map((report) => (
                <li
                  key={report.id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    marginBottom: "15px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    borderLeft: `4px solid ${
                      report.status === "Accepted"
                        ? "#4CAF50"
                        : report.status === "Pending"
                        ? "#FFA500"
                        : report.status === "Flagged"
                        ? "#FFC107"
                        : "#f44336"
                    }`,
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={() => {
                    setSelectedReport(report);
                    setIsPdfPreviewOpen(true);
                  }}
                >
                  <h3 style={{ marginTop: 0, color: "#05445E" }}>
                    {report.title}
                    <span
                      style={{
                        fontSize: "14px",
                        marginLeft: "10px",
                        backgroundColor:
                          report.type === "research" ? "#05445E" : "#189AB4",
                        color: "white",
                        padding: "3px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {report.type === "research" ? "Internship" : "Evaluation"}
                    </span>
                  </h3>
                  {report.course && (
                    <p>
                      <strong>Course:</strong> {report.course}
                    </p>
                  )}
                  {report.major && (
                    <p>
                      <strong>Major:</strong> {report.major}
                    </p>
                  )}
                  <p>
                    <strong>Submitted:</strong> {report.submissionDate}
                  </p>
                  <p
                    style={{
                      color:
                        report.status === "Accepted"
                          ? "#4CAF50"
                          : report.status === "Pending"
                          ? "#FFA500"
                          : report.status === "Flagged"
                          ? "#FFC107"
                          : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    Status: {report.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p>No reports found matching your criteria.</p>
            </div>
          )}
        </div>

        {isPdfPreviewOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.pdfModalContent}>{renderPdfPreview()}</div>
          </div>
        )}
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div style={styles.dashboardContent}>
        <div style={styles.welcomeBox}>
          <h1 style={styles.welcomeTitle}>Faculty Dashboard</h1>
          <p style={styles.welcomeText}>
            Welcome to your faculty dashboard. Here you can view reports and
            statistics.
          </p>
        </div>

        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={styles.sectionTitle}>Report Statistics</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {lastUpdate && (
                <small style={{ color: "#666" }}>
                  Last updated: {lastUpdate}
                </small>
              )}
              <button
                onClick={updateStats}
                style={{
                  backgroundColor: "#189AB4",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaSync size={14} /> Refresh
              </button>
            </div>
          </div>

          {statsLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <div>Loading statistics...</div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <StatCard
                  title="Accepted"
                  value={realTimeStats.reports?.Accepted || 0}
                  icon={<FaCheck size={24} />}
                  color="#4CAF50"
                />
                <StatCard
                  title="Pending"
                  value={realTimeStats.reports?.Pending || 0}
                  icon={<FaHourglassHalf size={24} />}
                  color="#FFA500"
                />
                <StatCard
                  title="Flagged"
                  value={realTimeStats.reports?.Flagged || 0}
                  icon={<FaFlag size={24} />}
                  color="#FFC107"
                />
                <StatCard
                  title="Rejected"
                  value={realTimeStats.reports?.Rejected || 0}
                  icon={<FaTimesCircle size={24} />}
                  color="#f44336"
                />
                <StatCard
                  title="Avg Review Time"
                  value={realTimeStats.reports?.averageReviewTime || "0 days"}
                  icon={<FaClock size={24} />}
                  color="#9C27B0"
                />
              </div>

              <div style={{ marginTop: "40px" }}>
                <h2 style={styles.sectionTitle}>Internship Insights</h2>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      flex: 1,
                      minWidth: "300px",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#05445E",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaBook color="#189AB4" /> Most Frequent Courses
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {realTimeStats.internshipStats?.frequentCourses.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{item.course}</span>
                            <span style={{ fontWeight: "bold" }}>
                              {item.count} reports
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      flex: 1,
                      minWidth: "300px",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#05445E",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaStar color="#FFD700" /> Top Rated Companies
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {realTimeStats.internshipStats?.topRatedCompanies.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{item.company}</span>
                            <span style={{ fontWeight: "bold" }}>
                              {item.averageRating} ★ ({item.count} reports)
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      flex: 1,
                      minWidth: "300px",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#05445E",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaBuilding color="#9C27B0" /> Most Active Companies
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {realTimeStats.internshipStats?.topCompaniesByCount.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{item.company}</span>
                            <span style={{ fontWeight: "bold" }}>
                              {item.count} internships
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              marginTop: "40px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#05445E" }}>Generate Reports</h2>
            <p>
              Generate comprehensive reports based on current statistics and
              data.
            </p>

            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              <button
                onClick={() => generateReport("summary")}
                disabled={isGeneratingReport}
                style={{
                  backgroundColor: "#05445E",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: isGeneratingReport ? 0.7 : 1,
                }}
              >
                <FaChartBar /> Generate Summary Report
              </button>

              {isGeneratingReport && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#666",
                  }}
                >
                  <FaSync
                    style={{
                      marginRight: "8px",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Generating report...
                </div>
              )}
            </div>

            {generatedReport && !isGeneratingReport && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              >
                <h4 style={{ marginTop: 0 }}>Last Generated Report Preview:</h4>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    maxHeight: "200px",
                    overflow: "auto",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  {generatedReport}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPageContent = () => {
    switch (activeTab) {
      case "reports":
        return renderReportsTab();
      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.hamburger} onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div style={{ ...styles.sidebar, width: sidebarOpen ? "250px" : "0px" }}>
        <div style={styles.sidebarContent}>
          <h2 style={styles.sidebarTitle}>Faculty Portal</h2>
          <ul style={styles.sidebarMenu}>
            <li
              style={
                activeTab === "dashboard"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("dashboard")}
            >
              <FaHome style={styles.menuIcon} /> Dashboard
            </li>
            <li
              style={
                activeTab === "reports"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("reports")}
            >
              <FaFileAlt style={styles.menuIcon} /> Reports
            </li>
          </ul>
          <button style={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </button>
        </div>
      </div>

      <div style={styles.mainContentBox}>
        <div
          style={{
            ...styles.mainContent,
            marginLeft: sidebarOpen ? "250px" : "0px",
          }}
        >
          {activeTab === "reports" ? renderReportsTab() : renderDashboard()}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    position: "relative",
    transition: "all 0.3s",
    backgroundColor: "#f0f2f5",
  },
  mainContentBox: {
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    margin: "20px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    minHeight: "calc(100vh - 40px)",
    overflow: "hidden",
    width: "calc(100% - 40px)",
    maxWidth: "none",
  },
  hamburger: {
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1001,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#05445E",
    fontSize: "24px",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "#1d3557",
    overflowX: "hidden",
    transition: "width 0.3s",
    zIndex: 1000,
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  sidebarContent: {
    padding: "20px",
    width: "250px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  sidebarTitle: {
    color: "white",
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
  },
  sidebarMenu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  menuItem: {
    color: "white",
    padding: "15px 20px",
    marginBottom: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  activeMenuItem: {
    color: "white",
    padding: "15px 20px",
    marginBottom: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#189AB4",
    fontWeight: "bold",
  },
  menuIcon: {
    marginRight: "10px",
  },
  logoutButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "auto",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: {
    padding: "40px",
    transition: "margin-left 0.3s",
    minHeight: "calc(100vh - 80px)",
  },
  dashboardContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  welcomeBox: {
    border: "2px solid #05445E",
    borderRadius: "8px",
    padding: "30px",
    marginBottom: "40px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  welcomeTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#05445E",
    marginBottom: "15px",
  },
  welcomeText: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.5",
    margin: 0,
  },
  pageContainer: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#05445E",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    paddingBottom: "15px",
    borderBottom: "2px solid #189AB4",
  },
  titleIcon: {
    marginRight: "15px",
    color: "#189AB4",
    fontSize: "36px",
  },
  sectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    width: "100%",
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#05445E",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    margin: 0,
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  dropdown: {
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  modalOverlay: {
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
  pdfModalContent: {
    backgroundColor: "white",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  pdfPreview: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  pdfHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #05445E",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  closePdfButton: {
    background: "none",
    border: "none",
    color: "#f44336",
    cursor: "pointer",
    fontSize: "16px",
  },
  pdfContent: {
    lineHeight: "1.6",
  },
  pdfSection: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  },
  pdfFooter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
  },
  downloadButton: {
    backgroundColor: "#05445E",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#189AB4",
    },
  },
  categoryButton: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "1px solid #05445E",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s",
    flex: 1,
    textAlign: "center",
    ":hover": {
      backgroundColor: "#05445E",
      color: "white",
    },
  },
  statusButton: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "1px solid",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
    ":hover": {
      opacity: 0.9,
      transform: "translateY(-1px)",
    },
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "10px",
  },
  clarificationInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginBottom: "10px",
  },
  fileUploadLabel: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    backgroundColor: "#189AB4",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  removeAttachmentButton: {
    marginLeft: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "#f44336",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 5px",
  },
  submitClarificationButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#388E3C",
    },
  },
  cancelButton: {
    padding: "10px 15px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#D32F2F",
    },
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
};

const StatCard = ({ title, value, icon, color }) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      flex: 1,
      minWidth: "200px",
    }}
  >
    <div
      style={{
        backgroundColor: color,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "15px",
        color: "white",
      }}
    >
      {icon}
    </div>
    <h3 style={{ margin: "0 0 5px 0", color: "#05445E" }}>{title}</h3>
    <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>{value}</p>
  </div>
);

export default Faculty;
