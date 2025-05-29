import React, { useContext, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import { WorkshopContext } from "../context/WorkshopContext";
import * as api from "../services/api";
import Sidebar from "../components/Sidebar"; // ✅ import the reusable sidebar

const WorkshopFeedback = () => {
  const { workshops, feedback, setFeedback } = useContext(WorkshopContext);

  const handleSubmitFeedback = async (feedbackData) => {
    await api.addFeedback(feedbackData);
    setFeedback([...feedback, feedbackData]);
  };

  return (
    <div style={styles.pageWrapper}>
      <Sidebar />
      <div style={styles.contentArea}>
        <h2 style={styles.heading}>💬 Workshop Feedback</h2>
        <FeedbackForm workshops={workshops} onSubmit={handleSubmitFeedback} />
        <FeedbackList feedback={feedback} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
  },
  contentArea: {
    flex: 1,
    padding: "2rem",
    marginLeft: "0px", // same as sidebar width
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "#1A237E",
    marginBottom: "1.5rem",
  },
};

export default WorkshopFeedback;
