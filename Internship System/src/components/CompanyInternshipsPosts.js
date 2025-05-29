import React, { useState } from "react";
import "./companyStyles.css";

const dummyMyPosts = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    duration: "3 months",
    paid: "Yes",
    salary: "3000 EGP",
    skills: "React, CSS, Bootstrap",
    description: "Work with the UI team to build and maintain interfaces.",
    applications: 5,
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    duration: "2 months",
    paid: "No",
    salary: "",
    skills: "Python, Excel",
    description: "Support the analytics team in data cleanup and reporting.",
    applications: 2,
  },
];

const CompanyInternshipsPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaid, setFilterPaid] = useState("");
  const [posts, setPosts] = useState(dummyMyPosts);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPaid = filterPaid === "" || post.paid === filterPaid;
    return matchesSearch && matchesPaid;
  });

  return (
    <div className="card fill-height no-gutters">
      <h4 className="section-title">My Internship Posts</h4>

      <div className="filter-row">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value)}
        >
          <option value="">Filter by Paid/Unpaid</option>
          <option value="Yes">Paid</option>
          <option value="No">Unpaid</option>
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <p>No matching posts found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Paid</th>
                <th>Salary</th>
                <th>Skills</th>
                <th>Description</th>
                <th>Applications</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.duration}</td>
                  <td>{post.paid}</td>
                  <td>{post.salary || "-"}</td>
                  <td>{post.skills}</td>
                  <td>{post.description}</td>
                  <td style={{ color: "black" }}>{post.applications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyInternshipsPosts;