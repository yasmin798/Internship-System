import React, { useState } from "react";
import "./1stCompanyDashboard.css";
import PostInternship from "./PostInternship";
import ApplicantsList from "./ApplicantsList";
import InternStatus from "./InternStatus";
import EvaluationForm from "./EvaluationForm";
import CompanyNotifications from "./CompanyNotifications";
import CompanyInternshipsPosts from "./CompanyInternshipsPosts";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("post");
  const [internshipPosts, setInternshipPosts] = useState([]);

  const addInternshipPost = (post) => {
    setInternshipPosts([...internshipPosts, post]);
  };

  const updateInternshipPost = (index, updatedPost) => {
    const updated = [...internshipPosts];
    updated[index] = updatedPost;
    setInternshipPosts(updated);
  };

  const deleteInternshipPost = (index) => {
    const updated = internshipPosts.filter((_, i) => i !== index);
    setInternshipPosts(updated);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "post":
        return (
          <PostInternship
            posts={internshipPosts}
            onAddPost={addInternshipPost}
            onUpdatePost={updateInternshipPost}
          />
        );
      case "my-posts":
        return (
          <CompanyInternshipsPosts
            posts={internshipPosts}
            onDeletePost={deleteInternshipPost}
          />
        );
      case "applicants":
        return <ApplicantsList />;
      case "interns":
        return <InternStatus />;
      case "evaluate":
        return <EvaluationForm />;
      case "notifications":
        return <CompanyNotifications />;
      default:
        return <PostInternship />;
    }
  };

  return (
    <div className="company-dashboard">
      <h2 className="dashboard-title">Corporate Portal</h2>
      <ul className="nav-tabs">
        <li>
          <button
            className={`tab-link ${activeTab === "post" ? "active" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            Post Internship
          </button>
        </li>
        <li>
          <button
            className={`tab-link ${activeTab === "applicants" ? "active" : ""}`}
            onClick={() => setActiveTab("applicants")}
          >
            Applicants
          </button>
        </li>
        <li>
          <button
            className={`tab-link ${activeTab === "interns" ? "active" : ""}`}
            onClick={() => setActiveTab("interns")}
          >
            Interns
          </button>
        </li>
        <li>
          <button
            className={`tab-link ${activeTab === "evaluate" ? "active" : ""}`}
            onClick={() => setActiveTab("evaluate")}
          >
            Evaluation
          </button>
        </li>
        <li>
          <button
            className={`tab-link ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </li>
      </ul>
      <div className="dashboard-content">{renderTab()}</div>
    </div>
  );
};

export default CompanyDashboard;