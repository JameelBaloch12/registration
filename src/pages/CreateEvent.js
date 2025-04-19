import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateEvent.css'; // This CSS file will handle the design

const CreateEvent = ({ content }) => {
  const navigate = useNavigate();

  // State for form inputs
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  });

  // Handle form field changes
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
    console.log('Event Created:', eventData);

    // For now, navigate to a confirmation page or back to the dashboard
    alert('Event Created Successfully!');
    navigate('/admin-dashboard');
  };

  return (
    <div className="create-event">
      <div className="event-form-container">
        <h2>{content.createEvent || 'Create a New Event'}</h2>

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-group">
            <label>{content.eventTitle || 'Event Title'}</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{content.eventDate || 'Event Date'}</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{content.eventLocation || 'Event Location'}</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{content.eventDescription || 'Event Description'}</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {content.submit || 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
