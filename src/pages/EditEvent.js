import React, { useState } from 'react';
import '../styles/AdminDashboard.css'; // Ensure you import the CSS file

const AdminDashboard = ({ createEvent }) => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create event object
    const newEvent = {
      id: Date.now(), // Simple ID based on timestamp
      title: eventData.title,
      date: eventData.date,
      location: eventData.location,
      description: eventData.description
    };

    // Pass the new event to App.js to update state
    createEvent(newEvent);

    // Reset form
    setEventData({
      title: '',
      date: '',
      location: '',
      description: ''
    });

    alert('Event Created Successfully!');
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-heading">Create a New Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
