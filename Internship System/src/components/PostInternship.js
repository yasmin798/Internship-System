import React, { useState } from "react";
import { toast } from "react-toastify";
import "./companyStyles.css";

const PostInternship = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    paid: "Yes",
    salary: "",
    skills: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // NEW: Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [paidFilter, setPaidFilter] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const updated = [...posts];
      if (editIndex !== null) {
        updated[editIndex] = form;
        toast.success("Internship updated!");
      } else {
        updated.push(form);
        toast.success("Internship posted!");
        const stored = JSON.parse(localStorage.getItem("notifications")) || [];
        const notif = {
          id: Date.now(),
          type: "success",
          message: `📩 A student has applied to your "${form.title}" internship.`,
          time: new Date().toLocaleString(),
        };
        localStorage.setItem(
          "notifications",
          JSON.stringify([notif, ...stored])
        );
      }
      setPosts(updated);
      setForm({
        title: "",
        description: "",
        location: "",
        duration: "",
        paid: "Yes",
        salary: "",
        skills: "",
      });
      setEditIndex(null);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (index) => {
    setForm(posts[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this post?")) {
      const updated = posts.filter((_, i) => i !== index);
      setPosts(updated);
      toast.success("Internship deleted.");
    }
  };

  // NEW: Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPaid = paidFilter === "" || post.paid === paidFilter;
    return matchesSearch && matchesPaid;
  });

  return (
    <div className="card">
      <h4 className="section-title">
        {editIndex !== null ? "Edit Internship" : "Post a New Internship"}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Duration</label>
            <input
              type="text"
              name="duration"
              className="form-control"
              value={form.duration}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Paid?</label>
            <select
              name="paid"
              className="form-select"
              value={form.paid}
              onChange={handleChange}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Salary (if paid)</label>
            <input
              type="text"
              name="salary"
              className="form-control"
              value={form.salary}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Skills Required</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              value={form.skills}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Job Description</label>
            <textarea
              name="description"
              rows="3"
              className="form-control"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          {editIndex !== null ? "Update Internship" : "Post Internship"}
        </button>
      </form>

      {/* NEW: Filters for posted internships */}
      <div className="mt-5">
        <h5 className="section-title">My Internship Posts</h5>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search by title..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value)}
            >
              <option value="">Filter by Paid/Unpaid</option>
              <option value="Yes">Paid</option>
              <option value="No">Unpaid</option>
            </select>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <p>No matching posts found.</p>
        ) : (
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Paid</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, index) => (
                <tr key={index}>
                  <td>{post.title}</td>
                  <td>{post.duration}</td>
                  <td>{post.paid}</td>
                  <td>{post.salary || "-"}</td>
                  <td>
                    <button
                      className=" btn-sm btnoutlineprimary me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-sm btn-outline-danger "
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PostInternship;