
import React, { useState } from 'react';

const NotificationForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      onSubmit({ message, timestamp: new Date().toISOString() });
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Send Notification</h2>
      <form>
        <div className="mb-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            className="form-control"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;