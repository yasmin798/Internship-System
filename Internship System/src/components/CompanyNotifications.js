import React, { useEffect, useState } from "react";
import "./companyStyles.css";

const CompanyNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      message:
        "Applicant Mohamed Salah was marked as 'Pending' for Frontend Developer Intern",
      time: "5/16/2025, 7:37:56 PM",
      read: false,
    },
    {
      id: 2,
      type: "success",
      message:
        "Applicant Mohamed Salah was marked as 'Current Intern' for Frontend Developer Intern",
      time: "5/16/2025, 7:37:54 PM",
      read: false,
    },
    {
      id: 3,
      type: "success",
      message:
        "Applicant Mohamed Salah was marked as 'Pending' for Frontend Developer Intern",
      time: "5/16/2025, 7:37:51 PM",
      read: false,
    },
    {
      id: 4,
      type: "success",
      message:
        "Applicant Mohamed Salah was marked as 'Rejected' for Frontend Developer Intern",
      time: "5/16/2025, 7:37:48 PM",
      read: false,
    },
    {
      id: 5,
      type: "info",
      message: "Intern Yasmin Abdelaziz has submitted their mid-cycle report.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 6,
      type: "warning",
      message: "Application deadline for UI/UX Internship is tomorrow.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 7,
      type: "success",
      message: "Evaluation for Sara Ahmed has been received successfully.",
      time: "3 days ago",
      read: false,
    },
    {
      id: 8,
      type: "info",
      message: "Your company has been approved by SCAD!",
      time: "5 days ago",
      read: false,
    },
  ]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        {notifications.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications yet.</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div className="notification-content">
                <div className="notification-type">
                  <span className={`badge ${notification.type}`}>
                    {notification.type.charAt(0).toUpperCase() +
                      notification.type.slice(1)}
                  </span>
                </div>
                <p className="notification-message">{notification.message}</p>
              </div>
              <div className="notification-time">{notification.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyNotifications;
