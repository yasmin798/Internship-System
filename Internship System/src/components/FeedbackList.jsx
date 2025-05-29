import React from 'react';

const FeedbackList = ({ feedback }) => {
  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Feedback</h2>
      <ul className="list-group">
        {feedback.map((item, index) => (
          <li key={index} className="list-group-item">
            <p>Content Quality: {item.contentQuality}/10</p>
            <p>Presenter: {item.presenter}/10</p>
            <p>Overall Experience: {item.overallExperience}/10</p>
            <p>Comments: {item.comments || 'None'}</p>
            <p className="text-muted small">Submitted: {new Date(item.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
