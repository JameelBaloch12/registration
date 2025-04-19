import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Event.css';

const Events = () => {
  const [visibleDetails, setVisibleDetails] = useState(null);

  const events = [
    { id: 1, name: 'Event 1', date: '2025-05-10', venue: 'Main Auditorium', description: 'This is the first event description.' },
    { id: 2, name: 'Scope of Computer Science in 21st Century', date: '2025-06-20', venue: 'AB3', description: 'A deep dive into the evolving field of Computer Science.' },
    { id: 3, name: 'Event 3', date: '2025-07-15', venue: 'AB2', description: 'Description for Event 3.' },
    { id: 4, name: 'Event 4', date: '2025-08-22', venue: 'Hall A', description: 'Details about Event 4.' },
    { id: 5, name: 'Event 5', date: '2025-09-05', venue: 'Conference Room', description: 'An exciting talk happening at the Conference Room.' },
  ];

  const toggleDetails = (id) => {
    setVisibleDetails(visibleDetails === id ? null : id);
  };

  return (
    <div className="events-container">
      <h2 className="events-title">Available Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>

            {/* Buttons Row */}
            <div className="event-buttons">
              <Link to={`/register-event/${event.id}`} className="register-link">
                Register Now
              </Link>
              <button onClick={() => toggleDetails(event.id)} className="details-button">
                {visibleDetails === event.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {/* Expanded Details */}
            {visibleDetails === event.id && (
              <div className="event-details">
                <p><strong>Description:</strong> {event.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
