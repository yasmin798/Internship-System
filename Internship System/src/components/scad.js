import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  FaBars,
  FaTimes,
  FaBuilding,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBriefcase,
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
  FaCalendar,
  FaChartBar,
  FaCheckCircle,
  FaTimes as FaReject,
} from "react-icons/fa";

function Scad() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportStatusFilter, setReportStatusFilter] = useState("All");
  const [reportMajorFilter, setReportMajorFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("internship");
  const [selectedInternshipStatus, setSelectedInternshipStatus] =
    useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [internshipSearchTerm, setInternshipSearchTerm] = useState("");
  const [selectedInternshipIndustry, setSelectedInternshipIndustry] =
    useState("All");
  const [selectedInternshipDuration, setSelectedInternshipDuration] =
    useState("All");
  const [selectedInternshipPayment, setSelectedInternshipPayment] =
    useState("All");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [activeWorkshopTab, setActiveWorkshopTab] = useState("available");
  const [userRole, setUserRole] = useState("admin"); // Changed to admin to see all features

  // Clarifications state
  const [clarificationText, setClarificationText] = useState("");
  const [clarifications, setClarifications] = useState({});
  const [adminResponse, setAdminResponse] = useState("");
  const [activeReportId, setActiveReportId] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Real-time stats state
  const [realTimeStats, setRealTimeStats] = useState({
    reports: null,
    courses: null,
    companies: null,
    cycles: null,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connected");

  // Internship cycle state
  const [internshipCycle, setInternshipCycle] = useState({
    startDate: "",
    endDate: "",
    announcement: "",
    isAnnounced: false,
  });

  // Sample data
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "TechNova Solutions",
      title: "Software Development Intern",
      duration: "3 months",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      description:
        "Work on cutting-edge web applications using React and Node.js.",
      requirements:
        "Knowledge of JavaScript, HTML/CSS. React experience preferred.",
      location: "Remote",
      paid: true,
      stipend: "$2000/month",
    },
    {
      id: 2,
      company: "GreenCore Industries",
      title: "Environmental Engineering Intern",
      duration: "4 months",
      startDate: "2023-05-15",
      endDate: "2023-09-15",
      description: "Assist in developing sustainable energy solutions.",
      requirements: "Engineering background, interest in environmental tech.",
      location: "On-site (456 Green Street)",
      paid: true,
      stipend: "$1800/month",
    },
    {
      id: 3,
      company: "EduBridge Academy",
      title: "Educational Content Developer",
      duration: "3 months",
      startDate: "2023-06-10",
      endDate: "2023-09-10",
      description: "Create online learning materials and interactive courses.",
      requirements: "Strong writing skills, education background preferred.",
      location: "Hybrid",
      paid: false,
      stipend: "Unpaid (academic credit available)",
    },
    {
      id: 4,
      company: "CodeHive",
      title: "Cybersecurity Intern",
      duration: "6 months",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      description:
        "Learn and implement security best practices in real projects.",
      requirements: "Basic networking knowledge, cybersecurity interest.",
      location: "Remote",
      paid: true,
      stipend: "$2200/month",
    },
    {
      id: 5,
      company: "BioGen Labs",
      title: "Biotech Research Intern",
      duration: "3 months",
      startDate: "2023-06-05",
      endDate: "2023-09-05",
      description: "Assist in laboratory research for health innovations.",
      requirements: "Biology/Chemistry background, lab experience preferred.",
      location: "On-site (202 Bio Rd)",
      paid: true,
      stipend: "$1900/month",
    },
  ]);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechNova Solutions",
      industry: "Software",
      status: "Pending",
      description: "Leading software solutions for businesses.",
      address: "123 Tech Lane",
    },
    {
      id: 2,
      name: "GreenCore Industries",
      industry: "Environmental Tech",
      status: "Pending",
      description: "Innovative environmental technology solutions.",
      address: "456 Green Street",
    },
    {
      id: 3,
      name: "EduBridge Academy",
      industry: "Education",
      status: "Pending",
      description: "Education platform for bridging learning gaps.",
      address: "789 Bridge Blvd",
    },
    {
      id: 4,
      name: "CodeHive",
      industry: "Software",
      status: "Pending",
      description: "Coding community for aspiring developers.",
      address: "101 Code Ave",
    },
    {
      id: 5,
      name: "BioGen Labs",
      industry: "Biotech",
      status: "Pending",
      description: "Biotech research for health innovations.",
      address: "202 Bio Rd",
    },
  ]);

  const students = [
    {
      id: 1,
      name: "John Doe",
      course: "Computer Science",
      internshipStatus: "Accepted",
      email: "john.doe@university.edu",
      phone: "(123) 456-7890",
      gpa: "3.8",
      year: "Senior",
      internshipCompany: "TechNova Solutions",
      internshipSupervisor: "Jane Smith",
      internshipStartDate: "2023-06-01",
      internshipEndDate: "2023-08-31",
      skills: ["JavaScript", "React", "Node.js", "Python"],
      bio: "Passionate about web development and AI technologies. Seeking opportunities to apply my skills in real-world projects.",
    },
    {
      id: 2,
      name: "Jane Smith",
      course: "Mechanical Engineering",
      internshipStatus: "Rejected",
      email: "jane.smith@university.edu",
      phone: "(234) 567-8901",
      gpa: "3.6",
      year: "Junior",
      skills: ["CAD", "SolidWorks", "Thermodynamics", "Fluid Mechanics"],
      bio: "Interested in sustainable energy solutions and mechanical design. Looking for hands-on experience in the engineering field.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      course: "Electrical Engineering",
      internshipStatus: "Accepted",
      email: "mike.johnson@university.edu",
      phone: "(345) 678-9012",
      gpa: "3.9",
      year: "Senior",
      internshipCompany: "GreenCore Industries",
      internshipSupervisor: "Michael Brown",
      internshipStartDate: "2023-05-15",
      internshipEndDate: "2023-08-15",
      skills: ["Circuit Design", "Embedded Systems", "Power Systems", "MATLAB"],
      bio: "Focused on renewable energy systems and smart grid technologies. Eager to contribute to innovative electrical solutions.",
    },
    {
      id: 4,
      name: "Emma Williams",
      course: "Media Engineering",
      internshipStatus: "Pending",
      email: "emma.williams@university.edu",
      phone: "(456) 789-0123",
      gpa: "3.7",
      year: "Sophomore",
      skills: [
        "Video Editing",
        "3D Animation",
        "Graphic Design",
        "VR Development",
      ],
      bio: "Creative media professional with a passion for immersive storytelling and digital experiences.",
    },
    {
      id: 5,
      name: "Olivia Brown",
      course: "Software Engineering",
      internshipStatus: "Rejected",
      email: "olivia.brown@university.edu",
      phone: "(567) 890-1234",
      gpa: "3.5",
      year: "Junior",
      skills: ["Java", "C++", "Database Design", "Algorithms"],
      bio: "Software enthusiast with strong problem-solving skills and interest in backend systems development.",
    },
    {
      id: 6,
      name: "William Davis",
      course: "Data Science",
      internshipStatus: "Flagged",
      email: "william.davis@university.edu",
      phone: "(678) 901-2345",
      gpa: "3.4",
      year: "Senior",
      skills: ["Python", "Machine Learning", "Data Visualization", "SQL"],
      bio: "Data scientist with experience in predictive modeling and analytics. Looking to apply skills in industry settings.",
    },
    {
      id: 7,
      name: "Sophia Miller",
      course: "Cybersecurity",
      internshipStatus: "Accepted",
      email: "sophia.miller@university.edu",
      phone: "(789) 012-3456",
      gpa: "3.9",
      year: "Senior",
      internshipCompany: "CodeHive",
      internshipSupervisor: "David Miller",
      internshipStartDate: "2023-06-10",
      internshipEndDate: "2023-09-10",
      skills: [
        "Network Security",
        "Ethical Hacking",
        "Cryptography",
        "Incident Response",
      ],
      bio: "Cybersecurity specialist passionate about protecting digital assets and educating others about security best practices.",
    },
  ];

  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      name: "React Fundamentals",
      description: "Learn the core concepts of React",
      startDate: "2023-11-15",
      endDate: "2023-11-15",
      startTime: "14:00",
      endTime: "16:00",
      speaker: "Jane Smith",
      speakerBio: "Senior React Developer with 5 years experience",
      agenda: "1. Introduction\n2. Components\n3. State Management\n4. Q&A",
      status: "available",
    },
    {
      id: 2,
      name: "Advanced CSS",
      description: "Master modern CSS techniques",
      startDate: "2023-11-20",
      endDate: "2023-11-20",
      startTime: "10:00",
      endTime: "12:00",
      speaker: "John Doe",
      speakerBio: "CSS expert and frontend architect",
      agenda: "1. Flexbox\n2. Grid\n3. Animations\n4. Best Practices",
      status: "available",
    },
    {
      id: 3,
      name: "Future AI Workshop",
      description: "Exploring AI technologies",
      startDate: "2024-01-15",
      endDate: "2024-01-15",
      startTime: "13:00",
      endTime: "15:00",
      speaker: "Dr. Sarah Johnson",
      speakerBio: "AI researcher with 10 years experience",
      agenda: "1. AI Basics\n2. Machine Learning\n3. Deep Learning\n4. Q&A",
      status: "upcoming",
    },
  ]);
  // Define this at the top of your file, outside the Scad component
  const submittedReports = [
    {
      id: 1,
      title: "Internship Report",
      studentName: "John Doe",
      status: "Rejected",
      major: "Computer Science",
      type: "internship",
      company: "TechNova Solutions",
      supervisor: "Jane Smith",
      submissionDate: "2023-08-31",
      reviewDate: "2023-09-05",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
    },
    {
      id: 2,
      title: "Internship Report",
      studentName: "Jane Smith",
      status: "Pending",
      major: "Mechanical Engineering",
      type: "internship",
      company: "GreenCore Industries",
      supervisor: "Michael Brown",
      submissionDate: "2023-09-15",
      reviewDate: null,
      startDate: "2023-06-15",
      endDate: "2023-09-15",
    },
    {
      id: 3,
      title: "Evaluation Report",
      studentName: "Mike Johnson",
      status: "Flagged",
      major: "Electrical Engineering",
      type: "evaluation",
      company: "EduBridge Academy",
      supervisor: "Sarah Wilson",
      submissionDate: "2023-07-31",
      reviewDate: "2023-08-10",
      startDate: "2023-05-01",
      endDate: "2023-07-31",
      evaluator: "Dr. Robert Chen",
      evaluationDate: "2023-08-15",
      technicalSkills: 4.5,
      problemSolving: 4,
      teamwork: 5,
      communication: 4.5,
      professionalism: 5,
    },
    {
      id: 4,
      title: "Evaluation Report",
      studentName: "Emma Williams",
      status: "Rejected",
      major: "Media Engineering",
      type: "evaluation",
      company: "CodeHive",
      supervisor: "David Miller",
      submissionDate: "2023-09-30",
      reviewDate: "2023-10-03",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      evaluator: "Dr. Lisa Park",
      evaluationDate: "2023-10-05",
      technicalSkills: 3,
      problemSolving: 3.5,
      teamwork: 4,
      communication: 4,
      professionalism: 4.5,
    },
  ];

  const [newWorkshop, setNewWorkshop] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    speaker: "",
    speakerBio: "",
    agenda: "",
  });

  // Debounce utility
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Calculate average review time
  const calculateAverageReviewTime = (reports) => {
    const validReports = reports.filter(
      (report) => report.submissionDate && report.reviewDate
    );

    if (validReports.length === 0) {
      return "0 days";
    }

    const totalReviewTime = validReports.reduce((sum, report) => {
      const submissionDate = new Date(report.submissionDate);
      const reviewDate = new Date(report.reviewDate);
      if (isNaN(submissionDate) || isNaN(reviewDate)) {
        return sum;
      }
      const timeDiff = reviewDate - submissionDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      return sum + daysDiff;
    }, 0);

    const averageDays = totalReviewTime / validReports.length;
    return `${Math.round(averageDays)} days`;
  };

  // Calculate report statistics
  const calculateReportStats = useCallback(() => {
    return {
      accepted: submittedReports.filter((r) => r.status === "Accepted").length,
      rejected: submittedReports.filter((r) => r.status === "Rejected").length,
      flagged: submittedReports.filter((r) => r.status === "Flagged").length,
      pending: submittedReports.filter((r) => r.status === "Pending").length,
      averageReviewTime: calculateAverageReviewTime(submittedReports),
      total: submittedReports.length,
    };
  }, []);

  // Calculate course statistics
  const calculateCourseStats = useCallback(() => {
    const courseCounts = {};
    students.forEach((student) => {
      if (student.internshipStatus === "Accepted") {
        courseCounts[student.course] = (courseCounts[student.course] || 0) + 1;
      }
    });

    const allCourses = [...new Set(students.map((s) => s.course))];
    allCourses.forEach((course) => {
      if (!courseCounts[course]) courseCounts[course] = 0;
    });

    const sortedCourses = Object.entries(courseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      mostFrequent: sortedCourses.map(([course]) => course),
      distribution: Object.fromEntries(sortedCourses),
      totalCourses: allCourses.length,
    };
  }, [students]);

  // Calculate company statistics
  const calculateCompanyStats = useCallback(() => {
    const acceptedCompanies = companies.filter((c) => c.status === "Accepted");

    const companyCounts = {};
    internships.forEach((internship) => {
      if (acceptedCompanies.some((c) => c.name === internship.company)) {
        companyCounts[internship.company] =
          (companyCounts[internship.company] || 0) + 1;
      }
    });

    const topByCount = Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count: Math.max(1, count) }));

    const ratings = {};
    students.forEach((student) => {
      if (
        student.internshipStatus === "Accepted" &&
        student.internshipCompany
      ) {
        if (!ratings[student.internshipCompany]) {
          ratings[student.internshipCompany] = {
            sum: 0,
            count: 0,
          };
        }
        ratings[student.internshipCompany].sum += 4.0;
        ratings[student.internshipCompany].count++;
      }
    });

    const topRated = Object.entries(ratings)
      .map(([name, data]) => ({
        name,
        rating: parseFloat((data.sum / data.count).toFixed(1)),
      }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    while (topByCount.length < 3 && acceptedCompanies[topByCount.length]) {
      topByCount.push({
        name: acceptedCompanies[topByCount.length].name,
        count: 1,
      });
    }
    while (topRated.length < 3 && acceptedCompanies[topRated.length]) {
      topRated.push({
        name: acceptedCompanies[topRated.length].name,
        rating: 4.0,
      });
    }

    return {
      topRated,
      topByCount,
      totalCompanies: acceptedCompanies.length,
    };
  }, [companies, internships, students]);

  // Calculate cycle statistics
  const calculateCycleStats = useCallback(() => {
    if (!internshipCycle.isAnnounced) {
      return {
        currentCycle: null,
        daysRemaining: 0,
        studentsInCycle: 0,
        completionPercentage: 0,
      };
    }

    const studentsInCycle = students.filter(
      (student) =>
        student.internshipStatus === "Accepted" &&
        student.internshipStartDate >= internshipCycle.startDate &&
        student.internshipEndDate <= internshipCycle.endDate
    ).length;

    const today = new Date();
    const endDate = new Date(internshipCycle.endDate);
    const startDate = new Date(internshipCycle.startDate);

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    const completionPercentage = Math.min(
      100,
      Math.max(0, Math.round((daysPassed / totalDays) * 100))
    );

    return {
      currentCycle: {
        startDate: internshipCycle.startDate,
        endDate: internshipCycle.endDate,
        announcement: internshipCycle.announcement,
      },
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      studentsInCycle,
      completionPercentage,
    };
  }, [internshipCycle, students]);

  // Update all statistics
  const updateStats = useCallback(() => {
    const newStats = {
      reports: calculateReportStats(),
      courses: calculateCourseStats(),
      companies: calculateCompanyStats(),
      cycles: calculateCycleStats(),
    };

    setRealTimeStats((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newStats)) {
        return prev;
      }
      return newStats;
    });
    setStatsLoading(false);
    setLastUpdate(new Date().toLocaleTimeString());
  }, [
    calculateReportStats,
    calculateCourseStats,
    calculateCompanyStats,
    calculateCycleStats,
  ]);

  const debouncedUpdateStats = debounce(updateStats, 300);

  // Initialize and update stats
  useEffect(() => {
    debouncedUpdateStats();
  }, [debouncedUpdateStats]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Updating statistics...");
      debouncedUpdateStats();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [debouncedUpdateStats]);

  // Internship cycle handlers
  const handleInternshipCycleSubmit = () => {
    if (!internshipCycle.startDate || !internshipCycle.endDate) {
      alert("Please select both start and end dates");
      return;
    }

    if (
      new Date(internshipCycle.startDate) >= new Date(internshipCycle.endDate)
    ) {
      alert("End date must be after start date");
      return;
    }

    setInternshipCycle({
      ...internshipCycle,
      isAnnounced: true,
    });
    alert("Internship cycle dates set and announced successfully!");
    updateStats();
  };

  const handleAnnouncementChange = (e) => {
    setInternshipCycle({
      ...internshipCycle,
      announcement: e.target.value,
    });
  };
  const CallNotification = ({ navigate }) => {
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
            background: #1A237E;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            width: 255px;
            color: white;
            font-family: 'Inter', sans-serif;
          ">
            
                <div style="font-weight: 600; font-size: 17px;">Student</div>
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
                  <path d="M6.6 10.8C8 13.6 10.4 15.9 13.2 17.4L15.4 15.2C15.6 15 15.8 14.9 16.1 14.9C16.2 14.9 16.3 14.9 16.4 14.9C17.5 15.3 18.8 15.5 20 15.5C20.6 15.5 21 15.9 21 16.5V20C21 20.6 20.6 21 20 21C10.6 21 3 13.4 3 4C3 3.4 3.4 3 4 3H7.5C8.1 3 8.5 3.4 8.5 4C8.5 5.2 8.7 6.5 9 7.6C9.2 7.9 9.1 8.3 9.8 8.6L6.6 10.8Z"/>
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
          navigate("/appointmentsS?startCall=true");
        });

        document
          .getElementById("decline-call")
          .addEventListener("click", () => {
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

    return null;
  };

  // Workshop handlers
  const handleCreateWorkshop = () => {
    const workshop = {
      ...newWorkshop,
      id:
        workshops.length > 0 ? Math.max(...workshops.map((w) => w.id)) + 1 : 1,
      status: activeWorkshopTab,
    };
    setWorkshops([...workshops, workshop]);
    setNewWorkshop({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      speaker: "",
      speakerBio: "",
      agenda: "",
    });
    setIsWorkshopModalOpen(false);
  };

  const handleUpdateWorkshop = () => {
    setWorkshops(
      workshops.map((w) => (w.id === editingWorkshop.id ? editingWorkshop : w))
    );
    setIsWorkshopModalOpen(false);
    setEditingWorkshop(null);
  };

  const handleDeleteWorkshop = (id) => {
    setWorkshops(workshops.filter((w) => w.id !== id));
  };

  const handleEditWorkshop = (workshop) => {
    setEditingWorkshop(workshop);
    setIsWorkshopModalOpen(true);
  };

  // Company handlers
  const handleDownloadCompanyDocument = (company) => {
    const doc = new jsPDF();

    doc.setProperties({
      title: `${company.name} - Legitimacy Proof`,
      subject: "Company Verification Document",
      author: company.name,
      keywords: "company, tax, legitimacy",
      creator: "SCAD System",
    });

    doc.setFontSize(16);
    doc.text(`${company.name} - Legitimacy Certificate`, 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`This document certifies that ${company.name}`, 20, 40);
    doc.text(`operating in the ${company.industry} industry,`, 20, 48);
    doc.text(`with address: ${company.address}`, 20, 56);
    doc.text(`is a legitimate company registered in the system.`, 20, 64);

    doc.text(`Verified by SCAD Authority`, 20, 80);
    doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 20, 88);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("SCAD System - Company Verification", 105, 285, {
      align: "center",
    });

    doc.save(`${company.name}_Verification.pdf`);
  };

  const handleAcceptCompany = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, status: "Accepted" } : company
      )
    );
    setIsModalOpen(false);
    updateStats();
    alert(`Company has been accepted and is now part of our network.`);
  };

  const handleRejectCompany = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, status: "Rejected" } : company
      )
    );
    setIsModalOpen(false);
    updateStats();
    alert(`Company has been rejected.`);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  // Report handlers
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    doc.setProperties({
      title: selectedReport?.title || "Internship Report",
      subject: "Internship Documentation",
      author: selectedReport?.studentName || "Student",
      keywords: "internship, report, evaluation",
      creator: "SCAD System",
    });

    doc.setFontSize(18);
    doc.setTextColor(5, 68, 94);
    doc.text(selectedReport?.title || "Internship Report", 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Student Information", 15, 40);
    doc.line(15, 42, 60, 42);

    doc.text(`Name: ${selectedReport?.studentName || "John Doe"}`, 15, 50);
    doc.text(`Major: ${selectedReport?.major || "Computer Science"}`, 15, 58);
    doc.text(`Student ID: ${selectedReport?.id || "CS-001"}`, 15, 66);

    doc.text("Internship Details", 15, 80);
    doc.line(15, 82, 60, 82);

    doc.text(
      `Company: ${selectedReport?.company || "TechNova Solutions"}`,
      15,
      90
    );
    doc.text(
      `Supervisor: ${selectedReport?.supervisor || "Jane Smith"}`,
      15,
      98
    );
    doc.text(
      `Period: ${selectedReport?.startDate || "2023-06-01"} to ${
        selectedReport?.endDate || "2023-08-31"
      }`,
      15,
      106
    );
    doc.text(`Status: ${selectedReport?.status || "Pending"}`, 15, 114);

    if (selectedReport?.type === "evaluation") {
      doc.text("Evaluation Results", 105, 40);
      doc.line(105, 42, 150, 42);

      doc.text(
        `Technical Skills: ${selectedReport?.technicalSkills || "4.0"}/5`,
        105,
        50
      );
      doc.text(
        `Problem Solving: ${selectedReport?.problemSolving || "4.0"}/5`,
        105,
        58
      );
      doc.text(`Teamwork: ${selectedReport?.teamwork || "5.0"}/5`, 105, 66);
      doc.text(
        `Communication: ${selectedReport?.communication || "4.5"}/5`,
        105,
        74
      );
      doc.text(
        `Professionalism: ${selectedReport?.professionalism || "5.0"}/5`,
        105,
        82
      );

      const overallRating = (
        (parseFloat(selectedReport?.technicalSkills || 4) +
          parseFloat(selectedReport?.problemSolving || 4) +
          parseFloat(selectedReport?.teamwork || 5) +
          parseFloat(selectedReport?.communication || 4.5) +
          parseFloat(selectedReport?.professionalism || 5)) /
        5
      ).toFixed(1);

      doc.setFontSize(14);
      doc.setTextColor(5, 68, 94);
      doc.text(`Overall Rating: ${overallRating}/5`, 105, 95);
    }

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Generated by SCAD System", 105, 285, { align: "center" });
    doc.text(new Date().toLocaleDateString(), 195, 285, { align: "right" });

    doc.save(
      `${selectedReport?.studentName || "Student"}_${
        selectedReport?.title || "Report"
      }.pdf`
    );
  };

  // Navigation handlers
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [selectedStatus, setSelectedStatus] = useState("All");

  const renderCompaniesTab = () => {
    const industries = ["All", ...new Set(companies.map((c) => c.industry))];
    const statusOptions = ["All", "Pending", "Accepted", "Rejected"];

    const filteredCompanies = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedIndustry === "All" || company.industry === selectedIndustry) &&
        (selectedStatus === "All" || company.status === selectedStatus)
    );

    return (
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>
          <FaBuilding style={styles.titleIcon} /> Company Management
        </h1>

        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            style={styles.dropdown}
          >
            {industries.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
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
          {filteredCompanies.length > 0 ? (
            <div style={styles.companyTableContainer}>
              <table style={styles.companyTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Company</th>
                    <th style={styles.tableHeader}>Industry</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr
                      key={company.id}
                      style={{
                        ...styles.companyTableRow,
                        backgroundColor:
                          company.status === "Accepted"
                            ? "#f0fff0"
                            : company.status === "Rejected"
                            ? "#fff0f0"
                            : "#fff",
                      }}
                    >
                      <td style={styles.tableCell}>
                        <strong>{company.name}</strong>
                      </td>
                      <td style={styles.tableCell}>{company.industry}</td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            color:
                              company.status === "Accepted"
                                ? "#4CAF50"
                                : company.status === "Rejected"
                                ? "#f44336"
                                : "#FFA500",
                            fontWeight: "bold",
                          }}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionButtons}>
                          <button
                            onClick={() => handleCompanyClick(company)}
                            style={styles.viewButton}
                          >
                            View
                          </button>
                          {company.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleAcceptCompany(company.id)}
                                style={styles.acceptButton}
                              >
                                <FaCheckCircle style={{ marginRight: "5px" }} />{" "}
                                Accept
                              </button>
                              <button
                                onClick={() => handleRejectCompany(company.id)}
                                style={styles.rejectButton}
                              >
                                <FaReject style={{ marginRight: "5px" }} />{" "}
                                Reject
                              </button>
                            </>
                          )}
                          {company.status !== "Pending" && (
                            <button
                              onClick={() => {
                                if (company.status === "Accepted") {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to reject this company?"
                                    )
                                  ) {
                                    handleRejectCompany(company.id);
                                  }
                                } else {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to accept this company?"
                                    )
                                  ) {
                                    handleAcceptCompany(company.id);
                                  }
                                }
                              }}
                              style={
                                company.status === "Accepted"
                                  ? styles.rejectButton
                                  : styles.acceptButton
                              }
                            >
                              {company.status === "Accepted" ? (
                                <>
                                  <FaReject style={{ marginRight: "5px" }} />{" "}
                                  Reject
                                </>
                              ) : (
                                <>
                                  <FaCheckCircle
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  Accept
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No companies found matching your criteria.</p>
          )}
        </div>

        {isModalOpen && selectedCompany && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={{ marginTop: 0, color: "#05445E" }}>
                {selectedCompany.name}
              </h2>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSubtitle}>Company Details</h3>
                <p>
                  <strong>Industry:</strong> {selectedCompany.industry}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    style={{
                      color:
                        selectedCompany.status === "Accepted"
                          ? "#4CAF50"
                          : selectedCompany.status === "Rejected"
                          ? "#f44336"
                          : "#FFA500",
                      fontWeight: "bold",
                      marginLeft: "5px",
                    }}
                  >
                    {selectedCompany.status}
                  </span>
                </p>
                <p>
                  <strong>Description:</strong> {selectedCompany.description}
                </p>
                <p>
                  <strong>Address:</strong> {selectedCompany.address}
                </p>
                <button
                  onClick={() => handleDownloadCompanyDocument(selectedCompany)}
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    padding: "10px 15px",
                    marginTop: "10px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  <FaDownload style={{ marginRight: "6px" }} />
                  Download Legitimacy Document
                </button>
              </div>

              <div style={styles.modalActionButtons}>
                {selectedCompany.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAcceptCompany(selectedCompany.id)}
                      style={styles.modalAcceptButton}
                    >
                      <FaCheckCircle style={{ marginRight: "8px" }} /> Accept
                      Company
                    </button>
                    <button
                      onClick={() => handleRejectCompany(selectedCompany.id)}
                      style={styles.modalRejectButton}
                    >
                      <FaReject style={{ marginRight: "8px" }} /> Reject Company
                    </button>
                  </>
                )}
                {selectedCompany.status !== "Pending" && (
                  <button
                    onClick={() => {
                      if (selectedCompany.status === "Accepted") {
                        if (
                          window.confirm(
                            "Are you sure you want to reject this company?"
                          )
                        ) {
                          handleRejectCompany(selectedCompany.id);
                        }
                      } else {
                        if (
                          window.confirm(
                            "Are you sure you want to accept this company?"
                          )
                        ) {
                          handleAcceptCompany(selectedCompany.id);
                        }
                      }
                    }}
                    style={
                      selectedCompany.status === "Accepted"
                        ? styles.modalRejectButton
                        : styles.modalAcceptButton
                    }
                  >
                    {selectedCompany.status === "Accepted" ? (
                      <>
                        <FaReject style={{ marginRight: "8px" }} /> Reject
                        Company
                      </>
                    ) : (
                      <>
                        <FaCheckCircle style={{ marginRight: "8px" }} /> Accept
                        Company
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={styles.modalCloseButton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render PDF preview
  const renderPdfPreview = () => {
    const isEvaluation = selectedReport?.type === "evaluation";
    const isInternshipReport = !isEvaluation;
    const reportId = selectedReport?.id;
    const reportClarifications = clarifications[reportId] || [];

    return (
      <div style={styles.pdfPreview}>
        <div style={styles.pdfHeader}>
          <h2>{selectedReport?.title || "Internship Report"}</h2>
          <button
            onClick={() => setIsPdfPreviewOpen(false)}
            style={styles.closePdfButton}
          >
            <FaTimesCircle size={24} />
          </button>
        </div>
        <div style={styles.pdfContent}>
          <div style={styles.pdfSection}>
            <h3>Student Information</h3>
            <p>
              <strong>Name:</strong> {selectedReport?.studentName || "John Doe"}
            </p>
            <p>
              <strong>Major:</strong>{" "}
              {selectedReport?.major || "Computer Science"}
            </p>
            <p>
              <strong>Company:</strong>{" "}
              {selectedReport?.company || "TechNova Solutions"}
            </p>
            <p>
              <strong>Supervisor:</strong>{" "}
              {selectedReport?.supervisor || "Jane Smith"}
            </p>
            <p>
              <strong>Internship Period:</strong> {selectedReport?.startDate} to{" "}
              {selectedReport?.endDate}
            </p>

            {isEvaluation && (
              <>
                <p>
                  <strong>Evaluator:</strong>{" "}
                  {selectedReport?.evaluator || "Dr. Sarah Johnson"}
                </p>
                <p>
                  <strong>Evaluation Date:</strong>{" "}
                  {selectedReport?.evaluationDate ||
                    new Date().toLocaleDateString()}
                </p>
              </>
            )}
          </div>

          {isEvaluation ? (
            <>
              <div style={styles.pdfSection}>
                <h3>Evaluation Summary</h3>
                <p>
                  This report evaluates the student's performance during their
                  internship period at {selectedReport?.company}. The evaluation
                  is based on technical skills, professional behavior, and
                  overall contribution to the host organization.
                </p>
              </div>

              <div style={styles.pdfSection}>
                <h3>Detailed Assessment</h3>
                <div style={styles.assessmentGrid}>
                  <div style={styles.assessmentItem}>
                    <strong>Technical Skills:</strong>{" "}
                    {selectedReport?.technicalSkills}/5
                  </div>
                  <div style={styles.assessmentItem}>
                    <strong>Problem Solving:</strong>{" "}
                    {selectedReport?.problemSolving}/5
                  </div>
                  <div style={styles.assessmentItem}>
                    <strong>Teamwork:</strong> {selectedReport?.teamwork}/5
                  </div>
                  <div style={styles.assessmentItem}>
                    <strong>Communication:</strong>{" "}
                    {selectedReport?.communication}/5
                  </div>
                  <div style={styles.assessmentItem}>
                    <strong>Professionalism:</strong>{" "}
                    {selectedReport?.professionalism}/5
                  </div>
                </div>
              </div>

              <div style={styles.pdfSection}>
                <h3>Supervisor Comments</h3>
                <p>
                  {selectedReport?.supervisorComments ||
                    "The student demonstrated strong technical abilities and adapted well to our team environment. They showed consistent improvement throughout the internship period."}
                </p>
              </div>
            </>
          ) : (
            <>
              <div style={styles.pdfSection}>
                <h3>Internship Summary</h3>
                <p>
                  This report details my internship experience at{" "}
                  {selectedReport?.company} where I worked on various projects.
                  I gained valuable experience and skills during this period.
                </p>
              </div>

              <div style={styles.pdfSection}>
                <h3>Key Learnings</h3>
                <ul>
                  <li>Practical application of classroom knowledge</li>
                  <li>Professional communication and teamwork skills</li>
                  <li>Industry-specific tools and technologies</li>
                  <li>Problem-solving in real-world scenarios</li>
                </ul>
              </div>

              <div style={styles.pdfSection}>
                <h3>Clarifications</h3>

                {reportClarifications.length > 0 ? (
                  reportClarifications.map((clarification, index) => (
                    <div key={index} style={styles.clarificationItem}>
                      <p>
                        <strong>Student:</strong> {clarification.text}
                      </p>
                      <p>
                        <small>
                          {new Date(clarification.date).toLocaleString()}
                        </small>
                      </p>
                      {clarification.response && (
                        <div style={styles.adminResponse}>
                          <p>
                            <strong>Admin Response:</strong>{" "}
                            {clarification.response}
                          </p>
                          <p>
                            <small>
                              {new Date(
                                clarification.responseDate
                              ).toLocaleString()}
                            </small>
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No clarifications submitted yet.</p>
                )}

                {(selectedReport?.status === "Flagged" ||
                  selectedReport?.status === "Rejected") && (
                  <div style={styles.clarificationForm}>
                    <h4>Submit Clarification</h4>
                    <textarea
                      value={clarificationText}
                      onChange={(e) => setClarificationText(e.target.value)}
                      placeholder="Explain any issues or provide additional information..."
                      style={styles.clarificationTextarea}
                    />
                    <button
                      onClick={() => {
                        if (!clarificationText.trim()) {
                          alert("Please enter your clarification");
                          return;
                        }

                        const newClarification = {
                          text: clarificationText,
                          date: new Date().toISOString(),
                          reportId: selectedReport.id,
                          studentName: selectedReport.studentName,
                        };

                        setClarifications((prev) => ({
                          ...prev,
                          [selectedReport.id]: [
                            ...(prev[selectedReport.id] || []),
                            newClarification,
                          ],
                        }));

                        setClarificationText("");
                        alert("Clarification submitted successfully!");
                      }}
                      style={styles.submitClarificationButton}
                    >
                      Submit Clarification
                    </button>
                  </div>
                )}

                {userRole === "admin" && reportClarifications.length > 0 && (
                  <div style={styles.adminResponseForm}>
                    <h4>Admin Response</h4>
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Enter your response to the clarification..."
                      style={styles.clarificationTextarea}
                    />
                    <button
                      onClick={() => {
                        if (!adminResponse.trim()) {
                          alert("Please enter your response");
                          return;
                        }

                        const updatedClarifications = [...reportClarifications];
                        const lastClarification =
                          updatedClarifications[
                            updatedClarifications.length - 1
                          ];
                        lastClarification.response = adminResponse;
                        lastClarification.responseDate =
                          new Date().toISOString();

                        setClarifications((prev) => ({
                          ...prev,
                          [selectedReport.id]: updatedClarifications,
                        }));

                        setAdminResponse("");
                        alert("Response submitted successfully!");
                      }}
                      style={styles.submitResponseButton}
                    >
                      Submit Response
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <div style={styles.pdfSection}>
            <h3>{isEvaluation ? "Overall Assessment" : "Conclusion"}</h3>
            <p>
              {isEvaluation
                ? selectedReport?.overallAssessment ||
                  "The student demonstrated excellent performance throughout the internship, showing strong technical abilities and professional demeanor. They exceeded expectations in all evaluation criteria."
                : "This internship provided invaluable real-world experience that complemented my academic studies. I'm now more confident in my abilities and better prepared for my future career."}
            </p>
            {isEvaluation && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Overall Rating:{" "}
                {selectedReport?.overallRating ||
                  (
                    (selectedReport?.technicalSkills +
                      selectedReport?.problemSolving +
                      selectedReport?.teamwork +
                      selectedReport?.communication +
                      selectedReport?.professionalism) /
                    5
                  ).toFixed(1)}
                /5
              </p>
            )}
          </div>
        </div>
        <div style={styles.pdfFooter}>
          <button onClick={handleDownloadReport} style={styles.downloadButton}>
            <FaDownload style={{ marginRight: "8px" }} /> Download PDF
          </button>
        </div>
      </div>
    );
  };

  const generateReport = (type) => {
    setIsGeneratingReport(true);

    setTimeout(() => {
      const doc = new jsPDF();

      // Report title
      doc.setFontSize(20);
      doc.setTextColor(5, 68, 94);
      doc.text("SCAD System Report", 105, 20, { align: "center" });

      // Report date
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, {
        align: "center",
      });

      // Section 1: Report Statistics
      doc.setFontSize(16);
      doc.setTextColor(5, 68, 94);
      doc.text("1. Report Statistics", 15, 50);
      doc.line(15, 52, 60, 52);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      const reportStats = [
        { label: "Total Reports", value: realTimeStats.reports?.total || 0 },
        { label: "Accepted", value: realTimeStats.reports?.accepted || 0 },
        { label: "Rejected", value: realTimeStats.reports?.rejected || 0 },
        { label: "Flagged", value: realTimeStats.reports?.flagged || 0 },
        { label: "Pending", value: realTimeStats.reports?.pending || 0 },
        {
          label: "Average Review Time",
          value: realTimeStats.reports?.averageReviewTime || "N/A",
        },
      ];

      // Draw report statistics table
      reportStats.forEach((stat, index) => {
        doc.text(`${stat.label}:`, 20, 65 + index * 10);
        doc.text(stat.value.toString(), 80, 65 + index * 10);
      });

      // Section 2: Course Distribution
      doc.setFontSize(16);
      doc.setTextColor(5, 68, 94);
      doc.text("2. Course Distribution", 15, 140);
      doc.line(15, 142, 60, 142);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      if (realTimeStats.courses?.distribution) {
        Object.entries(realTimeStats.courses.distribution).forEach(
          ([course, count], index) => {
            if (index < 5) {
              // Limit to top 5 courses
              doc.text(`${course}:`, 20, 155 + index * 10);
              doc.text(count.toString(), 80, 155 + index * 10);
            }
          }
        );
      } else {
        doc.text("No course data available", 20, 155);
      }

      // Section 3: Company Performance
      doc.setFontSize(16);
      doc.setTextColor(5, 68, 94);
      doc.text("3. Company Performance", 15, 210);
      doc.line(15, 212, 60, 212);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      // Top Rated Companies
      doc.text("Top Rated Companies:", 20, 225);
      if (realTimeStats.companies?.topRated?.length) {
        realTimeStats.companies.topRated.forEach((company, index) => {
          doc.text(
            `${company.name}: ${company.rating}/5`,
            30,
            235 + index * 10
          );
        });
      } else {
        doc.text("No company rating data available", 30, 235);
      }

      // Companies by Internship Count
      doc.text("Companies by Internship Count:", 20, 265);
      if (realTimeStats.companies?.topByCount?.length) {
        realTimeStats.companies.topByCount.forEach((company, index) => {
          doc.text(`${company.name}: ${company.count}`, 30, 275 + index * 10);
        });
      } else {
        doc.text("No company count data available", 30, 275);
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Generated by SCAD System", 105, 285, { align: "center" });

      // Save the PDF
      doc.save(`SCAD_Report_${new Date().toISOString().split("T")[0]}.pdf`);
      setIsGeneratingReport(false);
    }, 1000);
  };

  // Render page content based on active tab
  const renderPageContent = () => {
    switch (activeTab) {
      case "companies":
        return renderCompaniesTab();
        const industries = [
          "All",
          ...new Set(companies.map((c) => c.industry)),
        ];
        const filteredCompanies = companies.filter(
          (company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedIndustry === "All" ||
              company.industry === selectedIndustry)
        );

        return (
          <div>
            <h2 style={styles.sectionTitle}>Companies in SCAD</h2>

            <div style={styles.filterContainer}>
              <input
                type="text"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                style={styles.dropdown}
              >
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <ul style={styles.companyList}>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <li
                    key={company.id}
                    style={{
                      ...styles.companyItem,
                      borderLeft: `4px solid ${
                        company.status === "Accepted"
                          ? "#4CAF50"
                          : company.status === "Rejected"
                          ? "#f44336"
                          : "#189AB4"
                      }`,
                    }}
                    onClick={() => handleCompanyClick(company)}
                  >
                    <strong>{company.name}</strong>
                    <br />
                    Industry: {company.industry}
                    <br />
                    Status:{" "}
                    <span
                      style={{
                        color:
                          company.status === "Accepted"
                            ? "#4CAF50"
                            : company.status === "Rejected"
                            ? "#f44336"
                            : "#189AB4",
                        fontWeight: "bold",
                      }}
                    >
                      {company.status}
                    </span>
                  </li>
                ))
              ) : (
                <li style={styles.companyItem}>No companies found.</li>
              )}
            </ul>

            {isModalOpen && selectedCompany && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  <h3>{selectedCompany.name}</h3>
                  <p>
                    <strong>Industry:</strong> {selectedCompany.industry}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      style={{
                        color:
                          selectedCompany.status === "Accepted"
                            ? "#4CAF50"
                            : selectedCompany.status === "Rejected"
                            ? "#f44336"
                            : "#189AB4",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedCompany.status}
                    </span>
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedCompany.description}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedCompany.address}
                  </p>

                  {selectedCompany.status === "Pending" && (
                    <div style={styles.modalButtons}>
                      <button
                        onClick={() => handleAcceptCompany(selectedCompany.id)}
                        style={styles.acceptButton}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectCompany(selectedCompany.id)}
                        style={styles.rejectButton}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={styles.closeButton}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "internships":
        const companyOptions = [
          "All",
          ...new Set(internships.map((i) => i.company)),
        ];
        const durationOptions = [
          "All",
          ...new Set(internships.map((i) => i.duration)),
        ];
        const industryOptions = [
          "All",
          ...new Set(companies.map((c) => c.industry)),
        ];

        const filteredInternships = internships.filter((internship) => {
          const matchesSearch =
            internship.title
              .toLowerCase()
              .includes(internshipSearchTerm.toLowerCase()) ||
            internship.company
              .toLowerCase()
              .includes(internshipSearchTerm.toLowerCase());

          const companyObj = companies.find(
            (c) => c.name === internship.company
          );
          const matchesIndustry =
            selectedInternshipIndustry === "All" ||
            (companyObj && companyObj.industry === selectedInternshipIndustry);

          const matchesDuration =
            selectedInternshipDuration === "All" ||
            internship.duration === selectedInternshipDuration;

          const matchesPayment =
            selectedInternshipPayment === "All" ||
            (selectedInternshipPayment === "Paid" && internship.paid) ||
            (selectedInternshipPayment === "Unpaid" && !internship.paid);

          return (
            matchesSearch &&
            matchesIndustry &&
            matchesDuration &&
            matchesPayment
          );
        });

        return (
          <div style={styles.pageContainer}>
            <h1 style={styles.pageTitle}>
              <FaBriefcase style={styles.titleIcon} /> Available Internships
            </h1>

            <div style={styles.filterContainer}>
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={internshipSearchTerm}
                onChange={(e) => setInternshipSearchTerm(e.target.value)}
                style={{ ...styles.searchInput, flex: "2" }}
              />
            </div>

            <div style={{ ...styles.filterContainer, marginTop: "10px" }}>
              <select
                value={selectedInternshipIndustry}
                onChange={(e) => setSelectedInternshipIndustry(e.target.value)}
                style={styles.dropdown}
              >
                {industryOptions.map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>

              <select
                value={selectedInternshipDuration}
                onChange={(e) => setSelectedInternshipDuration(e.target.value)}
                style={styles.dropdown}
              >
                {durationOptions.map((duration, index) => (
                  <option key={index} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>

              <select
                value={selectedInternshipPayment}
                onChange={(e) => setSelectedInternshipPayment(e.target.value)}
                style={styles.dropdown}
              >
                <option value="All">All Payment Types</option>
                <option value="Paid">Paid Only</option>
                <option value="Unpaid">Unpaid Only</option>
              </select>
            </div>

            <p style={{ margin: "10px 0", color: "#666" }}>
              Showing {filteredInternships.length} internship
              {filteredInternships.length !== 1 ? "s" : ""}
            </p>

            <div style={styles.sectionContainer}>
              {filteredInternships.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {filteredInternships.map((internship) => (
                    <li
                      key={internship.id}
                      style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        marginBottom: "15px",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        border:
                          selectedInternship?.id === internship.id
                            ? "2px solid #189AB4"
                            : "none",
                        ":hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                        },
                      }}
                      onClick={() => {
                        setSelectedInternship(internship);
                        setIsInternshipModalOpen(true);
                      }}
                    >
                      <h3 style={{ marginTop: 0, color: "#05445E" }}>
                        {internship.title}
                      </h3>
                      <p>
                        <strong>Company:</strong> {internship.company}
                      </p>
                      <p>
                        <strong>Industry:</strong>{" "}
                        {companies.find((c) => c.name === internship.company)
                          ?.industry || "Other"}
                      </p>
                      <p>
                        <strong>Duration:</strong> {internship.duration}
                      </p>
                      <p>
                        <strong>Compensation:</strong>{" "}
                        {internship.paid
                          ? `${internship.stipend} (Paid)`
                          : "Unpaid (Academic Credit)"}
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
                  <p>No internships found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setInternshipSearchTerm("");
                      setSelectedInternshipIndustry("All");
                      setSelectedInternshipDuration("All");
                      setSelectedInternshipPayment("All");
                    }}
                    style={styles.clearFiltersButton}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {isInternshipModalOpen && selectedInternship && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  <h2 style={{ marginTop: 0, color: "#05445E" }}>
                    {selectedInternship.title}
                  </h2>
                  <p>
                    <strong>Company:</strong> {selectedInternship.company}
                  </p>
                  <p>
                    <strong>Industry:</strong>{" "}
                    {companies.find(
                      (c) => c.name === selectedInternship.company
                    )?.industry || "Other"}
                  </p>
                  <p>
                    <strong>Duration:</strong> {selectedInternship.duration} (
                    {selectedInternship.startDate} to{" "}
                    {selectedInternship.endDate})
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedInternship.location}
                  </p>
                  <p>
                    <strong>Compensation:</strong>{" "}
                    {selectedInternship.paid
                      ? `${selectedInternship.stipend} (Paid)`
                      : "Unpaid (Academic Credit Available)"}
                  </p>

                  <div style={{ margin: "20px 0" }}>
                    <h4>Description</h4>
                    <p>{selectedInternship.description}</p>
                  </div>

                  <div style={{ margin: "20px 0" }}>
                    <h4>Requirements</h4>
                    <p>{selectedInternship.requirements}</p>
                  </div>

                  <button
                    onClick={() => setIsInternshipModalOpen(false)}
                    style={styles.closeButton}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "students":
        const filteredStudents = students.filter(
          (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedInternshipStatus === "All" ||
              student.internshipStatus === selectedInternshipStatus)
        );

        return (
          <div style={styles.pageContainer}>
            <h1 style={styles.pageTitle}>
              <FaUserGraduate style={styles.titleIcon} /> Students
            </h1>

            <div style={styles.filterContainer}>
              <input
                type="text"
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />

              <select
                value={selectedInternshipStatus}
                onChange={(e) => setSelectedInternshipStatus(e.target.value)}
                style={styles.dropdown}
              >
                <option value="All">All Internship Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Flagged">Flagged</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>

            <div style={styles.sectionContainer}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    style={styles.studentCard}
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsStudentModalOpen(true);
                    }}
                  >
                    <h3>{student.name}</h3>
                    <p>
                      <strong>Course:</strong> {student.course}
                    </p>
                    <p>
                      <strong>Internship Status:</strong>
                      <span
                        style={{
                          color:
                            student.internshipStatus === "Accepted"
                              ? "#4CAF50"
                              : student.internshipStatus === "Pending"
                              ? "#FFA500"
                              : student.internshipStatus === "Rejected"
                              ? "#f44336"
                              : "#e55b13",
                          fontWeight: "bold",
                        }}
                      >
                        {student.internshipStatus}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p>No students found matching your criteria.</p>
              )}
            </div>

            {isStudentModalOpen && selectedStudent && (
              <div style={styles.modalOverlay}>
                <div style={styles.studentModalContent}>
                  <div style={styles.studentModalHeader}>
                    <h2>{selectedStudent.name}'s Profile</h2>
                    <button
                      onClick={() => setIsStudentModalOpen(false)}
                      style={styles.closeButton}
                    >
                      Close
                    </button>
                  </div>

                  <div style={styles.studentModalBody}>
                    <div style={styles.studentInfoSection}>
                      <h3>Basic Information</h3>
                      <p>
                        <strong>Course:</strong> {selectedStudent.course}
                      </p>
                      <p>
                        <strong>Year:</strong> {selectedStudent.year}
                      </p>
                      <p>
                        <strong>GPA:</strong> {selectedStudent.gpa}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedStudent.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedStudent.phone}
                      </p>
                    </div>

                    <div style={styles.studentInfoSection}>
                      <h3>Internship Details</h3>
                      <p>
                        <strong>Status:</strong>
                        <span
                          style={{
                            color:
                              selectedStudent.internshipStatus === "Accepted"
                                ? "#4CAF50"
                                : selectedStudent.internshipStatus === "Pending"
                                ? "#FFA500"
                                : selectedStudent.internshipStatus ===
                                  "Rejected"
                                ? "#f44336"
                                : "#e55b13",
                            fontWeight: "bold",
                          }}
                        >
                          {selectedStudent.internshipStatus}
                        </span>
                      </p>
                      {selectedStudent.internshipStatus === "Accepted" && (
                        <>
                          <p>
                            <strong>Company:</strong>{" "}
                            {selectedStudent.internshipCompany}
                          </p>
                          <p>
                            <strong>Supervisor:</strong>{" "}
                            {selectedStudent.internshipSupervisor}
                          </p>
                          <p>
                            <strong>Period:</strong>{" "}
                            {selectedStudent.internshipStartDate} to{" "}
                            {selectedStudent.internshipEndDate}
                          </p>
                        </>
                      )}
                    </div>

                    <div style={styles.studentInfoSection}>
                      <h3>Skills</h3>
                      <div style={styles.skillsContainer}>
                        {selectedStudent.skills.map((skill, index) => (
                          <span key={index} style={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={styles.studentInfoSection}>
                      <h3>Bio</h3>
                      <p>{selectedStudent.bio}</p>
                    </div>
                  </div>

                  <div style={styles.studentModalFooter}>
                    <button
                      style={styles.viewReportsButton}
                      onClick={() => {
                        setIsStudentModalOpen(false);
                        setActiveTab("reports");
                        setSearchTerm(selectedStudent.name.split(" ")[0]);
                      }}
                    >
                      View Reports
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "workshops":
        return (
          <div style={styles.pageContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 style={styles.pageTitle}>
                <FaChalkboardTeacher style={styles.titleIcon} /> Workshops
              </h1>
              <button
                onClick={() => {
                  setEditingWorkshop(null);
                  setIsWorkshopModalOpen(true);
                }}
                style={styles.addButton}
              >
                Add New Workshop
              </button>
            </div>

            <div style={styles.workshopTabs}>
              <button
                style={{
                  ...styles.workshopTabButton,
                  backgroundColor:
                    activeWorkshopTab === "available" ? "#05445E" : "#189AB4",
                }}
                onClick={() => setActiveWorkshopTab("available")}
              >
                Available Workshops
              </button>
              <button
                style={{
                  ...styles.workshopTabButton,
                  backgroundColor:
                    activeWorkshopTab === "upcoming" ? "#05445E" : "#189AB4",
                }}
                onClick={() => setActiveWorkshopTab("upcoming")}
              >
                Upcoming Workshops
              </button>
            </div>

            <div style={styles.sectionContainer}>
              {workshops.filter((w) => w.status === activeWorkshopTab).length >
              0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {workshops
                    .filter((w) => w.status === activeWorkshopTab)
                    .map((workshop) => (
                      <div key={workshop.id} style={styles.workshopCard}>
                        <h3>{workshop.name}</h3>
                        <p>
                          <strong>Date:</strong> {workshop.startDate}
                        </p>
                        <p>
                          <strong>Time:</strong> {workshop.startTime} -{" "}
                          {workshop.endTime}
                        </p>
                        <p>
                          <strong>Speaker:</strong> {workshop.speaker}
                        </p>
                        <p>{workshop.description}</p>
                        <div
                          style={{
                            marginTop: "15px",
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <button
                            onClick={() => handleEditWorkshop(workshop)}
                            style={styles.editButton}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteWorkshop(workshop.id)}
                            style={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>No {activeWorkshopTab} workshops found.</p>
              )}
            </div>

            {isWorkshopModalOpen && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  <div style={styles.modalHeader}>
                    <h2>
                      {editingWorkshop ? "Edit Workshop" : "Add New Workshop"}
                    </h2>
                  </div>

                  <div style={styles.modalBody}>
                    {!editingWorkshop && (
                      <div style={{ marginBottom: "15px" }}>
                        <label style={styles.label}>Workshop Status</label>
                        <select
                          value={activeWorkshopTab}
                          onChange={(e) => setActiveWorkshopTab(e.target.value)}
                          style={styles.input}
                        >
                          <option value="available">Available</option>
                          <option value="upcoming">Upcoming</option>
                        </select>
                      </div>
                    )}

                    <div style={{ marginBottom: "15px" }}>
                      <label style={styles.label}>Workshop Name</label>
                      <input
                        type="text"
                        value={
                          editingWorkshop
                            ? editingWorkshop.name
                            : newWorkshop.name
                        }
                        onChange={(e) =>
                          editingWorkshop
                            ? setEditingWorkshop({
                                ...editingWorkshop,
                                name: e.target.value,
                              })
                            : setNewWorkshop({
                                ...newWorkshop,
                                name: e.target.value,
                              })
                        }
                        style={styles.input}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={styles.label}>Description</label>
                      <textarea
                        value={
                          editingWorkshop
                            ? editingWorkshop.description
                            : newWorkshop.description
                        }
                        onChange={(e) =>
                          editingWorkshop
                            ? setEditingWorkshop({
                                ...editingWorkshop,
                                description: e.target.value,
                              })
                            : setNewWorkshop({
                                ...newWorkshop,
                                description: e.target.value,
                              })
                        }
                        style={styles.textarea}
                      />
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <label style={styles.label}>Start Date</label>
                        <input
                          type="date"
                          value={
                            editingWorkshop
                              ? editingWorkshop.startDate
                              : newWorkshop.startDate
                          }
                          onChange={(e) =>
                            editingWorkshop
                              ? setEditingWorkshop({
                                  ...editingWorkshop,
                                  startDate: e.target.value,
                                })
                              : setNewWorkshop({
                                  ...newWorkshop,
                                  startDate: e.target.value,
                                })
                          }
                          style={styles.input}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>End Date</label>
                        <input
                          type="date"
                          value={
                            editingWorkshop
                              ? editingWorkshop.endDate
                              : newWorkshop.endDate
                          }
                          onChange={(e) =>
                            editingWorkshop
                              ? setEditingWorkshop({
                                  ...editingWorkshop,
                                  endDate: e.target.value,
                                })
                              : setNewWorkshop({
                                  ...newWorkshop,
                                  endDate: e.target.value,
                                })
                          }
                          style={styles.input}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <label style={styles.label}>Start Time</label>
                        <input
                          type="time"
                          value={
                            editingWorkshop
                              ? editingWorkshop.startTime
                              : newWorkshop.startTime
                          }
                          onChange={(e) =>
                            editingWorkshop
                              ? setEditingWorkshop({
                                  ...editingWorkshop,
                                  startTime: e.target.value,
                                })
                              : setNewWorkshop({
                                  ...newWorkshop,
                                  startTime: e.target.value,
                                })
                          }
                          style={styles.input}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>End Time</label>
                        <input
                          type="time"
                          value={
                            editingWorkshop
                              ? editingWorkshop.endTime
                              : newWorkshop.endTime
                          }
                          onChange={(e) =>
                            editingWorkshop
                              ? setEditingWorkshop({
                                  ...editingWorkshop,
                                  endTime: e.target.value,
                                })
                              : setNewWorkshop({
                                  ...newWorkshop,
                                  endTime: e.target.value,
                                })
                          }
                          style={styles.input}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={styles.label}>Speaker Name</label>
                      <input
                        type="text"
                        value={
                          editingWorkshop
                            ? editingWorkshop.speaker
                            : newWorkshop.speaker
                        }
                        onChange={(e) =>
                          editingWorkshop
                            ? setEditingWorkshop({
                                ...editingWorkshop,
                                speaker: e.target.value,
                              })
                            : setNewWorkshop({
                                ...newWorkshop,
                                speaker: e.target.value,
                              })
                        }
                        style={styles.input}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={styles.label}>Speaker Bio</label>
                      <textarea
                        value={
                          editingWorkshop
                            ? editingWorkshop.speakerBio
                            : newWorkshop.speakerBio
                        }
                        onChange={(e) =>
                          editingWorkshop
                            ? setEditingWorkshop({
                                ...editingWorkshop,
                                speakerBio: e.target.value,
                              })
                            : setNewWorkshop({
                                ...newWorkshop,
                                speakerBio: e.target.value,
                              })
                        }
                        style={styles.textarea}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={styles.label}>Agenda</label>
                      <textarea
                        value={
                          editingWorkshop
                            ? editingWorkshop.agenda
                            : newWorkshop.agenda
                        }
                        onChange={(e) =>
                          editingWorkshop
                            ? setEditingWorkshop({
                                ...editingWorkshop,
                                agenda: e.target.value,
                              })
                            : setNewWorkshop({
                                ...newWorkshop,
                                agenda: e.target.value,
                              })
                        }
                        style={{ ...styles.textarea, minHeight: "100px" }}
                        placeholder="Enter agenda items separated by new lines"
                      />
                    </div>
                  </div>

                  <div style={styles.modalFooter}>
                    <button
                      onClick={
                        editingWorkshop
                          ? handleUpdateWorkshop
                          : handleCreateWorkshop
                      }
                      style={styles.saveButton}
                    >
                      {editingWorkshop ? "Update Workshop" : "Create Workshop"}
                    </button>
                    <button
                      onClick={() => setIsWorkshopModalOpen(false)}
                      style={styles.closeButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "reports":
        const statusOptions = [
          "All",
          "Pending",
          "Flagged",
          "Rejected",
          "Accepted",
        ];
        const majorOptions = [
          "All",
          ...new Set(submittedReports.map((report) => report.major)),
        ];
        const filteredReports = submittedReports.filter(
          (report) =>
            (reportStatusFilter === "All" ||
              report.status === reportStatusFilter) &&
            (reportMajorFilter === "All" ||
              report.major === reportMajorFilter) &&
            (selectedReportType === "all" || report.type === selectedReportType)
        );

        return (
          <div style={styles.pageContainer}>
            <h1 style={styles.pageTitle}>
              <FaFileAlt style={styles.titleIcon} /> Submitted Reports
            </h1>

            <div style={styles.reportTypeButtons}>
              <button
                onClick={() => setSelectedReportType("internship")}
                style={{
                  ...styles.reportTypeButton,
                  backgroundColor:
                    selectedReportType === "internship" ? "#05445E" : "#189AB4",
                }}
              >
                Internship Reports
              </button>
              <button
                onClick={() => setSelectedReportType("evaluation")}
                style={{
                  ...styles.reportTypeButton,
                  backgroundColor:
                    selectedReportType === "evaluation" ? "#05445E" : "#189AB4",
                }}
              >
                Evaluation Reports
              </button>
            </div>

            <div style={styles.filterContainer}>
              <select
                value={reportStatusFilter}
                onChange={(e) => setReportStatusFilter(e.target.value)}
                style={styles.dropdown}
              >
                {statusOptions.map((status, i) => (
                  <option key={i} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={reportMajorFilter}
                onChange={(e) => setReportMajorFilter(e.target.value)}
                style={styles.dropdown}
              >
                {majorOptions.map((major, i) => (
                  <option key={i} value={major}>
                    {major}
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
                        marginBottom: "16px",
                        padding: "12px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedReport(report);
                        setIsPdfPreviewOpen(true);
                      }}
                    >
                      <h3 style={{ margin: "0 0 8px 0" }}>{report.title}</h3>
                      <p style={{ margin: 0 }}>
                        <strong>Student:</strong> {report.studentName}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Major:</strong> {report.major}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color:
                            report.status === "Accepted"
                              ? "#4CAF50"
                              : report.status === "Rejected"
                              ? "#f44336"
                              : report.status === "Flagged"
                              ? "#e55b13"
                              : "#FFA500",
                          fontWeight: "bold",
                        }}
                      >
                        {report.status}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reports found matching your criteria.</p>
              )}
            </div>

            {isPdfPreviewOpen && (
              <div style={styles.modalOverlay}>
                <div style={styles.pdfModalContent}>{renderPdfPreview()}</div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div style={styles.dashboardContent}>
            <div style={styles.welcomeBox}>
              <h1 style={styles.welcomeTitle}>Welcome to SCAD</h1>
              <p style={styles.welcomeText}>
                Welcome to the SCAD Dashboard – your central hub for managing
                internships, companies, and student progress.
              </p>
            </div>

            {/* Statistics Section */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2 style={styles.sectionTitle}>Real-time Statistics</h2>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    style={{
                      color:
                        connectionStatus === "connected"
                          ? "#4CAF50"
                          : "#f44336",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {connectionStatus === "connected"
                      ? "Connected"
                      : "Disconnected"}
                  </span>
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    Last updated: {lastUpdate || "Never"}
                  </span>
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
                  {/* Reports Statistics */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ color: "#05445E", marginBottom: "15px" }}>
                      Reports Overview
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "20px",
                      }}
                    >
                      <StatCard
                        title="Accepted Reports"
                        value={realTimeStats.reports?.accepted || 0}
                        icon={<FaCheck size={24} />}
                        color="#4CAF50"
                        total={realTimeStats.reports?.total}
                      />
                      <StatCard
                        title="Rejected Reports"
                        value={realTimeStats.reports?.rejected || 0}
                        icon={<FaTimes size={24} />}
                        color="#f44336"
                        total={realTimeStats.reports?.total}
                      />
                      <StatCard
                        title="Flagged Reports"
                        value={realTimeStats.reports?.flagged || 0}
                        icon={<FaFlag size={24} />}
                        color="#FFA500"
                        total={realTimeStats.reports?.total}
                      />
                      <StatCard
                        title="Pending Review"
                        value={realTimeStats.reports?.pending || 0}
                        icon={<FaHourglassHalf size={24} />}
                        color="#189AB4"
                        total={realTimeStats.reports?.total}
                      />
                      <StatCard
                        title="Avg Review Time"
                        value={
                          realTimeStats.reports?.averageReviewTime || "0 days"
                        }
                        icon={<FaClock size={24} />}
                        color="#9C27B0"
                      />
                    </div>
                  </div>

                  {/* Courses Statistics */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ color: "#05445E", marginBottom: "15px" }}>
                      Courses in Internships
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          flex: 2,
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          minWidth: "300px",
                        }}
                      >
                        <h4 style={{ marginTop: 0 }}>Most Frequent Courses</h4>
                        <ul style={{ paddingLeft: "20px" }}>
                          {realTimeStats.courses?.mostFrequent?.map(
                            (course, index) => (
                              <li
                                key={index}
                                style={{
                                  marginBottom: "8px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>{course}</span>
                                <span style={{ fontWeight: "bold" }}>
                                  {realTimeStats.courses.distribution[course]}{" "}
                                  students
                                </span>
                              </li>
                            )
                          ) || <li>No course data available</li>}
                        </ul>
                        <p
                          style={{
                            marginTop: "15px",
                            textAlign: "right",
                            fontSize: "14px",
                          }}
                        >
                          Total courses:{" "}
                          {realTimeStats.courses?.totalCourses || 0}
                        </p>
                      </div>
                      <div
                        style={{
                          flex: 3,
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          minWidth: "400px",
                        }}
                      >
                        <h4 style={{ marginTop: 0 }}>Course Distribution</h4>
                        <div
                          style={{
                            height: "200px",
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "15px",
                            paddingTop: "20px",
                            borderTop: "1px solid #eee",
                          }}
                        >
                          {realTimeStats.courses?.distribution ? (
                            Object.entries(
                              realTimeStats.courses.distribution
                            ).map(([course, count]) => {
                              const maxValue = Math.max(
                                ...Object.values(
                                  realTimeStats.courses.distribution
                                )
                              );
                              return (
                                <div
                                  key={course}
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    maxWidth: "60px",
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: "#189AB4",
                                      width: "100%",
                                      height: `${(count / maxValue) * 100}%`,
                                      borderRadius: "5px 5px 0 0",
                                      position: "relative",
                                    }}
                                  >
                                    <span
                                      style={{
                                        position: "absolute",
                                        top: "-25px",
                                        width: "100%",
                                        textAlign: "center",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {count}
                                    </span>
                                  </div>
                                  <small
                                    style={{
                                      marginTop: "5px",
                                      textAlign: "center",
                                      fontSize: "12px",
                                      lineHeight: "1.3",
                                      display: "block",
                                      height: "30px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {course}
                                  </small>
                                </div>
                              );
                            })
                          ) : (
                            <div style={{ width: "100%", textAlign: "center" }}>
                              No data available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Companies Statistics */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ color: "#05445E", marginBottom: "15px" }}>
                      Company Performance
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          minWidth: "300px",
                        }}
                      >
                        <h4 style={{ marginTop: 0 }}>Top Rated Companies</h4>
                        <table
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                              <th
                                style={{
                                  textAlign: "left",
                                  padding: "8px 0",
                                  fontSize: "14px",
                                }}
                              >
                                Company
                              </th>
                              <th
                                style={{
                                  textAlign: "right",
                                  padding: "8px 0",
                                  fontSize: "14px",
                                }}
                              >
                                Rating
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {realTimeStats.companies?.topRated?.map(
                              (company, index) => (
                                <tr
                                  key={index}
                                  style={{ borderBottom: "1px solid #eee" }}
                                >
                                  <td
                                    style={{
                                      padding: "12px 0",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {company.name}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "right",
                                      padding: "12px 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          marginRight: "8px",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {company.rating.toFixed(1)}
                                      </span>
                                      <div
                                        style={{
                                          width: "100px",
                                          height: "8px",
                                          backgroundColor: "#f0f0f0",
                                          borderRadius: "4px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: `${
                                              (company.rating / 5) * 100
                                            }%`,
                                            height: "100%",
                                            backgroundColor: "#4CAF50",
                                            borderRadius: "4px",
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            ) || (
                              <tr>
                                <td
                                  colSpan="2"
                                  style={{
                                    textAlign: "center",
                                    padding: "12px 0",
                                  }}
                                >
                                  No company ratings available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <p
                          style={{
                            marginTop: "15px",
                            textAlign: "right",
                            fontSize: "14px",
                          }}
                        >
                          Total companies:{" "}
                          {realTimeStats.companies?.totalCompanies || 0}
                        </p>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          minWidth: "300px",
                        }}
                      >
                        <h4 style={{ marginTop: 0 }}>
                          Top Companies by Internship Count
                        </h4>
                        <table
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                              <th
                                style={{
                                  textAlign: "left",
                                  padding: "8px 0",
                                  fontSize: "14px",
                                }}
                              >
                                Company
                              </th>
                              <th
                                style={{
                                  textAlign: "right",
                                  padding: "8px 0",
                                  fontSize: "14px",
                                }}
                              >
                                Internships
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {realTimeStats.companies?.topByCount?.map(
                              (company, index) => {
                                const maxCount = Math.max(
                                  ...realTimeStats.companies.topByCount.map(
                                    (c) => c.count
                                  )
                                );
                                return (
                                  <tr
                                    key={index}
                                    style={{ borderBottom: "1px solid #eee" }}
                                  >
                                    <td
                                      style={{
                                        padding: "12px 0",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {company.name}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "right",
                                        padding: "12px 0",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            marginRight: "8px",
                                            fontSize: "14px",
                                          }}
                                        >
                                          {company.count}
                                        </span>
                                        <div
                                          style={{
                                            width: "100px",
                                            height: "8px",
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: `${
                                                (company.count / maxCount) * 100
                                              }%`,
                                              height: "100%",
                                              backgroundColor: "#189AB4",
                                              borderRadius: "4px",
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              }
                            ) || (
                              <tr>
                                <td
                                  colSpan="2"
                                  style={{
                                    textAlign: "center",
                                    padding: "12px 0",
                                  }}
                                >
                                  No company data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      marginTop: "40px",
                    }}
                  >
                    <h2 style={{ marginTop: 0, color: "#05445E" }}>
                      Generate Reports
                    </h2>
                    <p>
                      Generate comprehensive reports based on current statistics
                      and data.
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginTop: "20px",
                      }}
                    >
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
                  </div>
                  {/* Internship Cycle Statistics */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ color: "#05445E", marginBottom: "15px" }}>
                      Internship Cycle
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          minWidth: "300px",
                        }}
                      >
                        <h4 style={{ marginTop: 0 }}>Current Cycle</h4>
                        {realTimeStats.cycles?.currentCycle ? (
                          <>
                            <p>
                              <strong>Start Date:</strong>{" "}
                              {realTimeStats.cycles.currentCycle.startDate}
                            </p>
                            <p>
                              <strong>End Date:</strong>{" "}
                              {realTimeStats.cycles.currentCycle.endDate}
                            </p>
                            <p>
                              <strong>Students:</strong>{" "}
                              {realTimeStats.cycles.studentsInCycle}
                            </p>
                            <p>
                              <strong>Days Remaining:</strong>{" "}
                              {realTimeStats.cycles.daysRemaining}
                            </p>
                            <div style={{ marginTop: "15px" }}>
                              <div
                                style={{
                                  width: "100%",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "5px",
                                  height: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${realTimeStats.cycles.completionPercentage}%`,
                                    height: "100%",
                                    backgroundColor: "#4CAF50",
                                    borderRadius: "5px",
                                    transition: "width 0.5s ease",
                                  }}
                                ></div>
                              </div>
                              <p
                                style={{
                                  textAlign: "center",
                                  marginTop: "5px",
                                }}
                              >
                                {realTimeStats.cycles.completionPercentage}%
                                Complete
                              </p>
                            </div>
                          </>
                        ) : (
                          <p>No active internship cycle</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Internship Cycle Management Section */}
            <div style={styles.cycleManagementBox}>
              <h2 style={styles.sectionTitle}>Internship Cycle Management</h2>
              <div style={styles.cycleForm}>
                <div style={styles.dateInputGroup}>
                  <div style={styles.inputContainer}>
                    <label style={styles.label}>Start Date</label>
                    <input
                      type="date"
                      value={internshipCycle.startDate}
                      onChange={(e) =>
                        setInternshipCycle({
                          ...internshipCycle,
                          startDate: e.target.value,
                        })
                      }
                      style={styles.input}
                      disabled={internshipCycle.isAnnounced}
                    />
                  </div>
                  <div style={styles.inputContainer}>
                    <label style={styles.label}>End Date</label>
                    <input
                      type="date"
                      value={internshipCycle.endDate}
                      onChange={(e) =>
                        setInternshipCycle({
                          ...internshipCycle,
                          endDate: e.target.value,
                        })
                      }
                      style={styles.input}
                      disabled={internshipCycle.isAnnounced}
                    />
                  </div>
                </div>

                <div style={styles.inputContainer}>
                  <label style={styles.label}>Announcement Message</label>
                  <textarea
                    value={internshipCycle.announcement}
                    onChange={handleAnnouncementChange}
                    style={styles.textarea}
                    placeholder="Enter announcement message..."
                    disabled={internshipCycle.isAnnounced}
                  />
                </div>

                {!internshipCycle.isAnnounced && (
                  <button
                    onClick={handleInternshipCycleSubmit}
                    style={styles.announceButton}
                  >
                    Announce Internship Cycle
                  </button>
                )}
              </div>

              {/* Display Current Cycle */}
              {internshipCycle.isAnnounced && (
                <div style={styles.currentCycle}>
                  <h3 style={styles.cycleTitle}>Current Internship Cycle</h3>
                  <p>
                    <strong>Start Date:</strong> {internshipCycle.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {internshipCycle.endDate}
                  </p>
                  {internshipCycle.announcement && (
                    <div style={styles.announcementBox}>
                      <h4>Announcement</h4>
                      <p>{internshipCycle.announcement}</p>
                    </div>
                  )}
                  <button
                    onClick={() =>
                      setInternshipCycle({
                        startDate: "",
                        endDate: "",
                        announcement: "",
                        isAnnounced: false,
                      })
                    }
                    style={styles.resetCycleButton}
                  >
                    Reset Cycle
                  </button>
                </div>
              )}
            </div>

            <div style={styles.servicesSection}>
              <h2 style={styles.sectionTitle}>Services</h2>
              <ul style={styles.servicesList}>
                <li style={styles.serviceItem}>
                  <FaBuilding style={styles.serviceIcon} />
                  <span>Company Management</span>
                </li>
                <li style={styles.serviceItem}>
                  <FaBriefcase style={styles.serviceIcon} />
                  <span>Internship Listings</span>
                </li>
                <li style={styles.serviceItem}>
                  <FaUserGraduate style={styles.serviceIcon} />
                  <span>Student Monitoring</span>
                </li>
                <li style={styles.serviceItem}>
                  <FaChalkboardTeacher style={styles.serviceIcon} />
                  <span>Workshop Oversight</span>
                </li>
                <li style={styles.serviceItem}>
                  <FaFileAlt style={styles.serviceIcon} />
                  <span>Report Management</span>
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.hamburger} onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div style={{ ...styles.sidebar, width: sidebarOpen ? "250px" : "0px" }}>
        <div style={styles.sidebarContent}>
          <h2 style={styles.sidebarTitle}>SCAD Dashboard</h2>
          <ul style={styles.sidebarMenu}>
            <li
              style={
                activeTab === "dashboard"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("dashboard")}
            >
              <FaHome style={styles.menuIcon} /> Home
            </li>
            <li
              style={
                activeTab === "companies"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("companies")}
            >
              <FaBuilding style={styles.menuIcon} /> Companies
            </li>
            <li
              style={
                activeTab === "internships"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("internships")}
            >
              <FaBriefcase style={styles.menuIcon} /> Internships
            </li>
            <li
              style={
                activeTab === "students"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("students")}
            >
              <FaUserGraduate style={styles.menuIcon} /> Students
            </li>
            <li
              style={
                activeTab === "workshops"
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() => setActiveTab("workshops")}
            >
              <FaChalkboardTeacher style={styles.menuIcon} /> Workshops
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
          <button
            style={styles.logoutButton}
            onClick={() => navigate("/appointmentsS")}
          >
            <FaCalendar style={{ marginRight: "8px" }} /> Appointments
          </button>

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
          {renderPageContent()}
        </div>
      </div>
      {/* Add the CallNotification component here */}
      <CallNotification navigate={navigate} />
    </div>
  );
}

// StatCard component with percentage display
const StatCard = ({ title, value, icon, color, total }) => (
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
      position: "relative",
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
    {total !== undefined && typeof value === "number" && (
      <p
        style={{
          margin: "5px 0 0 0",
          fontSize: "14px",
          color: "#666",
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        {Math.round((value / total) * 100)}%
      </p>
    )}
  </div>
);

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
    position: "relative", // now relative to mainContentBox
    top: "20px",
    left: "20px",
    marginBottom: "10px", // space below the button
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#05445E",
    fontSize: "24px",
    zIndex: 10,
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
  servicesSection: {
    marginTop: "30px",
  },
  servicesList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  serviceItem: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
  },
  serviceIcon: {
    marginRight: "15px",
    color: "#189AB4",
    fontSize: "24px",
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
  companyList: {
    listStyle: "none",
    padding: 0,
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  companyItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    lineHeight: "1.6",
    cursor: "pointer",
    transition: "transform 0.2s",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
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
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
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
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "20px 0",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
  rejectButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    ":hover": {
      backgroundColor: "#d32f2f",
    },
  },
  closeButton: {
    backgroundColor: "#ccc",
    color: "#333",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    ":hover": {
      backgroundColor: "#bbb",
    },
  },
  studentCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "10px 0",
    lineHeight: "1.6",
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
  reportTypeButtons: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  reportTypeButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  assessmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "15px",
  },
  assessmentItem: {
    backgroundColor: "#e6f7ff",
    padding: "10px",
    borderRadius: "5px",
    borderLeft: "4px solid #189AB4",
  },
  studentModalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "600px",
    maxWidth: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  studentModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd",
  },
  studentModalBody: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  studentInfoSection: {
    marginBottom: "20px",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
  },
  skillTag: {
    backgroundColor: "#e6f7ff",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "14px",
    color: "#189AB4",
  },
  studentModalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
  },
  viewReportsButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  clearFiltersButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  addButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  workshopCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  editButton: {
    backgroundColor: "#FFA500",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#e59400",
    },
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#d32f2f",
    },
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "60px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
  workshopTabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  workshopTabButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "8px",
    width: "600px",
    maxWidth: "90%",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    padding: "20px 20px 0 20px",
  },
  modalBody: {
    padding: "0 20px",
    overflowY: "auto",
    flex: 1,
  },
  modalFooter: {
    padding: "20px",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cycleManagementBox: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "40px",
  },
  cycleForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  dateInputGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  announceButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    alignSelf: "flex-start",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  currentCycle: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  cycleTitle: {
    color: "#05445E",
    marginBottom: "15px",
  },
  announcementBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#e6f7ff",
    borderRadius: "5px",
  },
  resetCycleButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "20px",
    ":hover": {
      backgroundColor: "#d32f2f",
    },
  },
  clarificationItem: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "15px",
    borderLeft: "3px solid #189AB4",
  },
  adminResponse: {
    backgroundColor: "#e6f7ff",
    padding: "10px",
    borderRadius: "3px",
    marginTop: "10px",
  },
  clarificationForm: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#fff9e6",
    borderRadius: "5px",
  },
  adminResponseForm: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#e6ffe6",
    borderRadius: "5px",
  },
  clarificationTextarea: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    fontSize: "14px",
  },
  submitClarificationButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  submitResponseButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
  companyTableContainer: {
    width: "100%",
    overflowX: "auto",
  },
  companyTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    padding: "15px",
    textAlign: "left",
    backgroundColor: "#05445E",
    color: "white",
    fontSize: "16px",
  },
  companyTableRow: {
    borderBottom: "1px solid #eee",
    ":hover": {
      backgroundColor: "#f5f5f5 !important",
    },
  },
  tableCell: {
    padding: "15px",
    verticalAlign: "middle",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  viewButton: {
    backgroundColor: "#189AB4",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#05445E",
    },
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
  rejectButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#d32f2f",
    },
  },
  modalSection: {
    marginBottom: "20px",
  },
  modalSubtitle: {
    color: "#05445E",
    marginTop: "0",
    marginBottom: "15px",
    paddingBottom: "5px",
    borderBottom: "1px solid #eee",
  },
  modalActionButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  modalAcceptButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
  modalRejectButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#d32f2f",
    },
  },
  modalCloseButton: {
    backgroundColor: "#ccc",
    color: "#333",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#bbb",
    },
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
};

export default Scad;
