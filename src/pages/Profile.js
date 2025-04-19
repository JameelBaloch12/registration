import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Profile.css'; // Optional external CSS

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert("Please login to view your profile.");
      navigate('/login');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];

    setUser(currentUser);
    setRegisteredEvents(userEvents);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('registeredEvents');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <nav className="navbar">
        <h1>Event Manager</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="profile-content">
        <h2>👤 Your Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <h3>📋 Registered Events</h3>
        {registeredEvents.length > 0 ? (
          <ul className="event-list">
            {registeredEvents.map((event, idx) => (
              <li key={idx}>
                {event.name} — {event.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not registered for any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
