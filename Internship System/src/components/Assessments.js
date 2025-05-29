import React, { useState } from "react";
import Sidebar from "./Sidebar";

const assessmentsList = [
  {
    id: 1,
    title: "Frontend Development Basics",
    questions: [
      {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: "CSS",
      },
      {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<script>", "<javascript>"],
        answer: "<script>",
      },
    ],
  },
  {
    id: 2,
    title: "Data Analysis Fundamentals",
    questions: [
      {
        question: "Which Python library is used for data analysis?",
        options: ["NumPy", "TensorFlow", "Matplotlib", "Pandas"],
        answer: "Pandas",
      },
      {
        question: "Which of the following is not a data type in Python?",
        options: ["List", "Set", "Tree", "Tuple"],
        answer: "Tree",
      },
    ],
  },
  {
    id: 3,
    title: "Basic JavaScript",
    questions: [
      {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Mozilla", "Microsoft", "Apple"],
        answer: "Netscape",
      },
      {
        question: "How do you declare a variable in JavaScript?",
        options: ["var", "int", "let", "Both var and let"],
        answer: "Both var and let",
      },
    ],
  },
  {
    id: 4,
    title: "Operating Systems Essentials",
    questions: [
      {
        question: "Which one is a non-preemptive scheduling algorithm?",
        options: ["SJF", "FCFS", "Round Robin", "Priority Scheduling"],
        answer: "FCFS",
      },
      {
        question: "What is a semaphore used for?",
        options: [
          "Memory management",
          "Process scheduling",
          "Synchronization",
          "Paging",
        ],
        answer: "Synchronization",
      },
    ],
  },
  {
    id: 5,
    title: "Database Concepts",
    questions: [
      {
        question: "Which SQL command is used to extract data from a database?",
        options: ["GET", "OPEN", "EXTRACT", "SELECT"],
        answer: "SELECT",
      },
      {
        question: "Which of the following is a type of JOIN in SQL?",
        options: ["OUTER", "INNER", "LEFT", "All of the above"],
        answer: "All of the above",
      },
    ],
  },
];

const Assessments = () => {
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showPostOption, setShowPostOption] = useState(false);
  const [error, setError] = useState("");

  const handleStartAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(null);
    setShowPostOption(false);
    setSelectedOption(null);
    setError("");
  };

  const handleAnswerSelect = (option) => {
    setSelectedOption(option);
    setError("");
  };

  const handleNext = () => {
    if (selectedOption === null) {
      setError("Please select an option before proceeding.");
      return;
    }

    const updatedAnswers = [...userAnswers, selectedOption];
    setUserAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < currentAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const correctAnswers = currentAssessment.questions.filter(
        (q, i) => q.answer === updatedAnswers[i]
      ).length;
      const calculatedScore = `${correctAnswers}/${currentAssessment.questions.length}`;
      setScore(calculatedScore);
      setShowPostOption(true);
    }
  };

  const handlePostScore = () => {
    localStorage.setItem("assessmentScore", score);
    setShowPostOption(false);
    setCurrentAssessment(null);
  };

  const currentQuestion = currentAssessment?.questions[currentQuestionIndex];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {!currentAssessment ? (
          <>
            <h2 style={styles.title}>Available Assessments</h2>
            <ul style={styles.assessmentList}>
              {assessmentsList.map((assessment) => (
                <li
                  key={assessment.id}
                  style={styles.assessmentItem}
                  onClick={() => handleStartAssessment(assessment)}
                >
                  {assessment.title}
                </li>
              ))}
            </ul>
          </>
        ) : score ? (
          <div style={styles.scoreBox}>
            <h3>Your Score: {score}</h3>
            {showPostOption && (
              <div style={styles.buttonContainer}>
                <button
                  style={styles.backButton}
                  onClick={() => {
                    setCurrentAssessment(null);
                    setShowPostOption(false);
                  }}
                >
                  Back to Assessments
                </button>
                <button style={styles.postButton} onClick={handlePostScore}>
                  Post Score to My Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 style={styles.title}>{currentAssessment.title}</h2>
            <p style={styles.question}>{currentQuestion.question}</p>
            <ul style={styles.optionsList}>
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  style={styles.optionItem(option === selectedOption)}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button style={styles.nextButton} onClick={handleNext}>
              {currentQuestionIndex === currentAssessment.questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </>
        )}
      </main>
    </div>
  );
};

const styles = {
  title: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#1A237E",
    textAlign: "center",
  },
  assessmentList: {
    listStyle: "none",
    padding: 0,
  },
  assessmentItem: {
    padding: "1rem",
    backgroundColor: "#E8EAF6",
    marginBottom: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: 500,
    color: "#1A237E",
  },
  question: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  optionsList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "1.5rem",
  },
  optionItem: (selected) => ({
    padding: "0.75rem 1rem",
    backgroundColor: selected ? "#C5CAE9" : "#F0F4F8",
    borderRadius: "6px",
    marginBottom: "0.75rem",
    cursor: "pointer",
    border: selected ? "2px solid #1A237E" : "1px solid #CCC",
  }),
  nextButton: {
    backgroundColor: "#457b9d",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  scoreBox: {
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
    marginTop: "1.5rem",
  },
  postButton: {
    backgroundColor: "#457b9d",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  backButton: {
    backgroundColor: "#457b9d",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
};

export default Assessments;
