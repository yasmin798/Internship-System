import React, { useState, useEffect, useRef } from "react";
import "./companyStyles.css";

const AllInternships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterPaid, setFilterPaid] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const allInternships = [
    {
      id: 1,
      company: "GUC",
      title: "Software Intern",
      industry: "Education",
      duration: "3 months",
      paid: "Yes",
      salary: "3000 EGP",
      skills: "JavaScript, React",
      description: "Work on GUC internal systems and portals.",
    },
    {
      id: 2,
      company: "Vodafone",
      title: "Data Analyst Intern",
      industry: "Telecommunications",
      duration: "2 months",
      paid: "No",
      salary: "",
      skills: "Python, SQL",
      description: "Support the business intelligence team.",
    },
    {
      id: 3,
      company: "Valeo",
      title: "Embedded Software Intern",
      industry: "Automotive",
      duration: "6 months",
      paid: "Yes",
      salary: "4000 EGP",
      skills: "C, Embedded Systems",
      description: "Assist in automotive embedded development.",
    },
  ];
  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matches = allInternships.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (internship) => {
    setSelectedInternship(internship);
    setSearchTerm(`${internship.title} at ${internship.company}`);
    setShowSuggestions(false);
  };

  const filteredList = allInternships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !filterIndustry || item.industry === filterIndustry;
    const matchesPaid = !filterPaid || item.paid === filterPaid;
    const matchesDuration = !filterDuration || item.duration === filterDuration;

    return matchesSearch && matchesIndustry && matchesPaid && matchesDuration;
  });

  return (
    <div className="card full-height-card">
      <h4 className="summer-text mb-3">Available Internships in SCAD</h4>

      <div className="row g-3 mb-3" ref={searchRef}>
        <div className="col-md-4 position-relative">
          <input
            type="text"
            className="form-control search-input "
            placeholder="Search by job title or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown show">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="suggestion-title">
                    {item.title} at {item.company}
                  </div>
                  <div className="suggestion-details">
                    {item.industry} • {item.duration} •{" "}
                    {item.paid ? "Paid" : "Unpaid"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
          >
            <option value="">Filter by Industry</option>
            <option value="Education">Education</option>
            <option value="Automotive">Automotive</option>
            <option value="Telecommunications">Telecommunications</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value)}
          >
            <option value="">Paid/Unpaid</option>
            <option value="Yes">Paid</option>
            <option value="No">Unpaid</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterDuration}
            onChange={(e) => setFilterDuration(e.target.value)}
          >
            <option value="">Duration</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
          </select>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <p>No internships found matching your filters.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Industry</th>
                <th>Duration</th>
                <th>Paid</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((post) => (
                <tr key={post.id}>
                  <td>{post.company}</td>
                  <td>{post.title}</td>
                  <td>{post.industry}</td>
                  <td>{post.duration}</td>
                  <td>{post.paid}</td>
                  <td>{post.salary || "-"}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setSelectedInternship(post)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedInternship && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedInternship(null)}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  {selectedInternship.title} at {selectedInternship.company}
                </h5>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Industry:</strong> {selectedInternship.industry}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedInternship.duration}
                </p>
                <p>
                  <strong>Paid:</strong> {selectedInternship.paid}
                </p>
                <p>
                  <strong>Salary:</strong> {selectedInternship.salary || "-"}
                </p>
                <p>
                  <strong>Skills Required:</strong> {selectedInternship.skills}
                </p>
                <p>
                  <strong>Description:</strong> {selectedInternship.description}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedInternship(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInternships;
