import React, { useState } from "react";
import "./companyStyles.css";

const dummyInterns = [
  { id: 1, name: "Yasmin Abdelaziz", status: "Completed" },
  { id: 2, name: "Sara Ahmed", status: "Ongoing" },
  { id: 3, name: "Ali Kamal", status: "Ongoing" },
];

const EvaluationForm = () => {
  const [form, setForm] = useState({
    internId: "",
    score: "",
    feedback: "",
  });

  const [evaluations, setEvaluations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const completedInterns = dummyInterns.filter((i) => i.status === "Completed");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const intern = completedInterns.find(
      (i) => i.id === parseInt(form.internId)
    );

    if (!intern) return;

    const newEvaluation = {
      ...form,
      internName: intern.name,
      internId: intern.id,
    };

    let updatedList = [...evaluations];
    if (editIndex !== null) {
      updatedList[editIndex] = newEvaluation;
    } else {
      updatedList.push(newEvaluation);
    }

    setEvaluations(updatedList);
    setForm({ internId: "", score: "", feedback: "" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const evalData = evaluations[index];
    setForm({
      internId: evalData.internId.toString(),
      score: evalData.score,
      feedback: evalData.feedback,
    });
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this evaluation?")) return;
    const updated = evaluations.filter((_, i) => i !== index);
    setEvaluations(updated);
  };

  return (
    <div className="card">
      <h4 className="section-title">
        {editIndex !== null ? "Update Evaluation" : "Intern Evaluation"}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Intern (Completed Only)</label>
          <select
            name="internId"
            className="form-select"
            value={form.internId}
            onChange={handleChange}
            required
          >
            <option value="">Choose an intern</option>
            {completedInterns.map((intern) => (
              <option key={intern.id} value={intern.id}>
                {intern.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Score (out of 10)</label>
          <input
            type="number"
            className="form-control"
            name="score"
            min="0"
            max="10"
            value={form.score}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Feedback</label>
          <textarea
            className="form-control"
            name="feedback"
            rows="3"
            value={form.feedback}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {editIndex !== null ? "Update" : "Submit Evaluation"}
        </button>
      </form>

      {evaluations.length > 0 && (
        <>
          <h5 className="mt-4 mb-2">Submitted Evaluations</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Intern</th>
                <th>Score</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evalItem, index) => (
                <tr key={index}>
                  <td>{evalItem.internName}</td>
                  <td>{evalItem.score}</td>
                  <td>{evalItem.feedback}</td>
                  <td>
                    <button
                      className=" btn-sm btnoutlineprimary me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-sm btn-outline-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default EvaluationForm;