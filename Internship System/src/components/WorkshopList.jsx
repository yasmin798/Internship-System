import React, { useState } from "react";
import WorkshopDetails from "./WorkshopDetails";

const WorkshopList = ({ workshops, onSelect, onDelete, showUpdate = true }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedWorkshop, setEditedWorkshop] = useState({});

  const handleEditClick = (workshop) => {
    setEditingId(workshop.id);
    setEditedWorkshop({ ...workshop });
  };

  const handleSave = () => {
    onSelect(editedWorkshop); // Update workshop in WorkshopForm
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setEditedWorkshop((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Workshops</h2>
      <ul className="list-group">
        {workshops.map((workshop) => (
          <li
            key={workshop.id}
            className="list-group-item d-flex justify-content-between align-items-start flex-column"
          >
            {editingId === workshop.id ? (
              <div className="w-100 mb-2">
                <input
                  className="form-control mb-1"
                  value={editedWorkshop.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <input
                  className="form-control mb-1"
                  type="date"
                  value={editedWorkshop.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
                <select
                  className="form-select mb-1"
                  value={editedWorkshop.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  <option>Live</option>
                  <option>Pre-recorded</option>
                </select>
                <input
                  className="form-control mb-1"
                  placeholder="Presenter"
                  value={editedWorkshop.presenter || ""}
                  onChange={(e) => handleChange("presenter", e.target.value)}
                />
                <textarea
                  className="form-control mb-1"
                  placeholder="Description"
                  value={editedWorkshop.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                <textarea
                  className="form-control mb-1"
                  placeholder="Agenda"
                  value={editedWorkshop.agenda || ""}
                  onChange={(e) => handleChange("agenda", e.target.value)}
                />
              </div>
            ) : (
              <div className="d-flex justify-content-between w-100 align-items-center">
                <span>
                  {workshop.title} - {workshop.date} ({workshop.type})
                </span>
                <div>
                  <button
                    onClick={() => onSelect(workshop)}
                    className="btn btn-primary btn-sm me-2"
                  >
                    View Details
                  </button>
                  {showUpdate && (
                    <button
                      onClick={() => handleEditClick(workshop)}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Update
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(workshop.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
            {editingId === workshop.id && (
              <div className="d-flex justify-content-end w-100">
                <button
                  onClick={handleSave}
                  className="btn btn-success btn-sm mt-2"
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkshopList;
