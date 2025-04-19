import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/');
    }

    const data = JSON.parse(localStorage.getItem('adminNotifications')) || [];
    setNotifications(data.reverse()); // latest first
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Notification area */}
      <div className="admin-notifications">
        <h2>📣 New Registrations</h2>
        {notifications.length === 0 ? (
          <p>No new registrations</p>
        ) : (
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>
                <strong>{note.user}</strong> registered for <code>Event #{note.eventId}</code> at {note.time}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Other admin cards like create event, track, etc... */}
    </div>
  );
};

export default AdminDashboard;
