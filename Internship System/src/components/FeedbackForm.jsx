
import React, { useState } from 'react';

const FeedbackForm = ({ workshops, onSubmit }) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [contentQuality, setContentQuality] = useState(5);
  const [presenter, setPresenter] = useState(5);
  const [overallExperience, setOverallExperience] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedWorkshop) {
      onSubmit({
        workshopId: parseInt(selectedWorkshop),
        contentQuality,
        presenter,
        overallExperience,
        comments,
        timestamp: new Date().toISOString(),
      });
      setSelectedWorkshop('');
      setContentQuality(5);
      setPresenter(5);
      setOverallExperience(5);
      setComments('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Submit Feedback</h2>
      <form>
        <div className="mb-3">
          <select
            value={selectedWorkshop}
            onChange={(e) => setSelectedWorkshop(e.target.value)}
            className="form-select"
          >
            <option value="">Select Workshop</option>
            {workshops.map(workshop => (
              <option key={workshop.id} value={workshop.id}>
                {workshop.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Content Quality (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={contentQuality}
            onChange={(e) => setContentQuality(parseInt(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Presenter (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={presenter}
            onChange={(e) => setPresenter(parseInt(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Overall Experience (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={overallExperience}
            onChange={(e) => setOverallExperience(parseInt(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Additional Comments"
            className="form-control"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;