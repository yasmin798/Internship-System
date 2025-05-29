
import React from 'react';

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Notifications</h2>
      <ul className="list-group">
        {notifications.map((notification, index) => (
          <li key={index} className="list-group-item">
            <p>{notification.message}</p>
            <p className="text-muted small">Received: {new Date(notification.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;