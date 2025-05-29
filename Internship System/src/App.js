import React, { useState, useEffect } from "react";
import { WorkshopProvider } from "./context/WorkshopContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Authentication and Layout Imports
import CompanyLayout from "./components/CompanyLayout";

// Internship System Imports
import ApplyPage from "./components/ApplyPage";
import Myinternships from "./components/Myinternships";
import MyReport from "./components/Myreport";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import StudentDashboard from "./components/Student";
import PROStudent from "./components/PROStudent";
import EditProfile from "./components/EditProfile";
import InternshipsPage from "./components/Internship";
import Myapplication from "./components/Myapplication";
import Evaluations from "./components/Evaluations";
import Reports from "./components/Reports";
import CompanyDashboard from "./components/CompanyDashboard";
import Scad from "./components/scad";
import WorkshopPage from "./components/WorkshopPage";

// Workshop System Imports
import WorkshopBrowse from "./pages/WorkshopBrowse";
import WorkshopFeedback from "./pages/WorkshopFeedback";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotificationsPage from "./pages/NotificationsPage";

// Additional Imports
import Faculty from "./components/Faculty";
import AppointmentsS from "./components/AppointmentsS";
import AppointmentsP from "./components/AppointmentsP";

// Company System Imports
import CompanySignup from "./components/CompanySignup";
import InternStatus from "./components/InternStatus";
import PostInternship from "./components/PostInternship";
import CompanyNotifications from "./components/CompanyNotifications";
import CompanyInternshipsPosts from "./components/CompanyInternshipsPosts";
import AllInternships from "./components/AllInternships";

// New Pages
import Viewed from "./components/viewed";
import InternshipPolicies from "./components/InternshipPolicies";
import Assessments from "./components/Assessments";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole") || null;
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <WorkshopProvider>
      <Router>
        <div className="App container p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/internship" replace />} />
            <Route path="/internship" element={<Signup />} />
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              }
            />
            <Route
              path="/workshopbrowse"
              element={
                isLoggedIn ? (
                  <WorkshopBrowse />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />

            {/* STUDENT DASHBOARD */}
            <Route
              path="/student-dashboard"
              element={
                isLoggedIn && userRole === "student" ? (
                  <StudentDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="workshopbrowse" element={<WorkshopBrowse />} />
              <Route path="feedback" element={<WorkshopFeedback />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route
                path="notifications"
                element={
                  isLoggedIn && userRole === "prostudent" ? (
                    <NotificationsPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Route>

            {/* PRO STUDENT */}
            <Route
              path="/pro-student-dashboard"
              element={
                isLoggedIn && userRole === "prostudent" ? (
                  <PROStudent onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="workshopbrowse" element={<WorkshopBrowse />} />
              <Route path="feedback" element={<WorkshopFeedback />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            {/* SCAD DASHBOARD */}
            <Route
              path="/scad-dashboard"
              element={
                isLoggedIn && userRole === "scad" ? (
                  <Scad />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="WorkshopsBrowse" element={<WorkshopPage />} />
            </Route>

            {/* Faculty */}
            <Route
              path="/faculty-dashboard"
              element={
                isLoggedIn && userRole === "faculty" ? (
                  <Faculty />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Company */}
            <Route element={<CompanyLayout />}>
              <Route path="/company/signup" element={<CompanySignup />} />
              <Route
                path="/company"
                element={
                  isLoggedIn && userRole === "company" ? (
                    <CompanyDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/my-internships"
                element={
                  isLoggedIn && userRole === "company" ? (
                    <CompanyInternshipsPosts />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/post-internship"
                element={
                  isLoggedIn && userRole === "company" ? (
                    <PostInternship />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/all-internships"
                element={
                  isLoggedIn && userRole === "company" ? (
                    <AllInternships />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/intern-status"
                element={
                  isLoggedIn && userRole === "company" ? (
                    <InternStatus />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/notifications"
                element={
                  isLoggedIn && userRole === "company" ? (
                    <CompanyNotifications />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Route>

            {/* Misc Pages */}
            <Route path="/my-internships" element={<Myinternships />} />
            <Route path="/My-Reports" element={<MyReport />} />
            <Route path="/Evaluations" element={<Evaluations />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/my-application" element={<Myapplication />} />
            <Route
              path="/apply/:company"
              element={
                isLoggedIn ? <ApplyPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/internships"
              element={
                isLoggedIn ? (
                  <InternshipsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/edit-profile"
              element={
                isLoggedIn ? <EditProfile /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/company-dashboard"
              element={
                isLoggedIn ? (
                  <CompanyDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/appointmentsP"
              element={
                isLoggedIn && userRole === "prostudent" ? (
                  <AppointmentsP />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/appointmentsS"
              element={
                isLoggedIn && userRole === "scad" ? (
                  <AppointmentsS />
                ) : (
                  <Navigate to="/scad" replace />
                )
              }
            />
            <Route
              path="/feedback"
              element={
                isLoggedIn && userRole === "prostudent" ? (
                  <WorkshopFeedback />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                isLoggedIn && userRole === "prostudent" ? (
                  <AnalyticsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/NotificationsPage"
              element={
                isLoggedIn && userRole === "prostudent" ? (
                  <NotificationsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/support"
              element={<Navigate to="/help-center" replace />}
            />
            <Route path="/viewed" element={<Viewed />} />
            <Route
              path="/internship-policies"
              element={<InternshipPolicies />}
            />
            <Route path="/assessments" element={<Assessments />} />
          </Routes>
        </div>
      </Router>
    </WorkshopProvider>
  );
}

export default App;
