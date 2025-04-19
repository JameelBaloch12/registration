import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [registrations, setRegistrations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role') || 'attendee'; // Default to attendee
    setRole(storedRole);

    const notifs = JSON.parse(localStorage.getItem('adminNotifications')) || [];
    setNotifications(notifs);
  }, []);

  const handleTrackAttendeesClick = () => {
    setLoading(true);

    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem('eventRegistrations')) || [
        { id: 1, registrations: 0 },
        { id: 2, registrations: 0 }
      ];
      const total = events.reduce((sum, e) => sum + e.registrations, 0);
      setRegistrations(total);
      setLoading(false);
    }, 1000);
  };

  const handleAdminAccess = () => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      alert('Only admins can access this feature.');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f4f8', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>🎫 Eventify</h2>
        <Link to="/login">
          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '8px' }}>
            Log in
          </button>
        </Link>
      </nav>

      <h1>Event Registration and Ticketing System</h1>
      <p>Manage your events, registrations, and attendees from one dashboard.</p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Card icon="📅" title="Create Event" text="Publish your event in minutes" />
        <Card icon="✅" title="Track Attendees" text="View total registrations" onClick={handleTrackAttendeesClick}>
          {loading && <p>Loading...</p>}
          {!loading && registrations !== null && <p><strong>{registrations}</strong> total</p>}
        </Card>
        {role === 'admin' && (
          <Card icon="🔔" title="Notifications" text={`${notifications.length} new registration(s)`} />
        )}
        {role === 'admin' && (
          <Card icon="🛠" title="Admin Tools" text="Go to Dashboard" onClick={handleAdminAccess} />
        )}
      </div>
    </div>
  );
};

const Card = ({ icon, title, text, onClick, children }) => (
  <div onClick={onClick} style={{
    background: 'white', padding: '1.5rem', borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)', width: '240px',
    textAlign: 'center', cursor: onClick ? 'pointer' : 'default'
  }}>
    <div style={{ fontSize: '2rem' }}>{icon}</div>
    <h3>{title}</h3>
    <p>{text}</p>
    {children}
  </div>
);

export default Home;
