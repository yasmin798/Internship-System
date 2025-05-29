import React, { useState } from "react";
import "./companyStyles.css";

const initialInterns = [
  {
    id: 1,
    name: "Yasmin Abdelaziz",
    title: "UI/UX Designer Intern",
    startDate: "2025-05-11",
    endDate: "2025-08-25",
    status: "Completed",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    title: "Data Scientist Intern",
    startDate: "2025-05-12",
    endDate: "2025-08-28",
    status: "Ongoing",
  },
  {
    id: 3,
    name: "Ali Kamal",
    title: "Backend Developer Intern",
    startDate: "2025-06-01",
    endDate: "2025-09-01",
    status: "Ongoing",
  },
];

const InternStatus = () => {
  const [interns, setInterns] = useState(initialInterns);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleStatusChange = (id, newStatus) => {
    const updated = interns.map((intern) =>
      intern.id === id ? { ...intern, status: newStatus } : intern
    );
    setInterns(updated);
  };

  const filteredInterns = interns.filter((intern) => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || intern.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="card">
      <h4 className="section-title">Intern Status</h4>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or job title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Ongoing">Current Interns</option>
            <option value="Completed">Internship Complete</option>
            <option value="Terminated">Terminated</option>
          </select>
        </div>
      </div>

      {filteredInterns.length === 0 ? (
        <p>No interns found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern) => (
                <tr key={intern.id}>
                  <td>{intern.name}</td>
                  <td>{intern.title}</td>
                  <td>{intern.startDate}</td>
                  <td>{intern.endDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        intern.status === "Completed"
                          ? "badge-success"
                          : intern.status === "Ongoing"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {intern.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={intern.status}
                      onChange={(e) =>
                        handleStatusChange(intern.id, e.target.value)
                      }
                    >
                      <option>Ongoing</option>
                      <option>Completed</option>
                      <option>Terminated</option>
                    </select>
                    {intern.status === "Ongoing" && (
                      <button
                        className="btn-mark-completed ms-2"
                        onClick={() =>
                          handleStatusChange(intern.id, "Completed")
                        }
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InternStatus;