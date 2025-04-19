import React, { useState, useEffect } from 'react';
import '../styles/my-tickets.css';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  // Load tickets from localStorage
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(savedTickets);
  }, []);

  // Cancel ticket
  const handleCancelTicket = (ticketId) => {
    const updatedTickets = tickets.filter(ticket => ticket.ticketId !== ticketId);
    setTickets(updatedTickets);

    // Remove from localStorage
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    alert('Your registration has been cancelled.');
  };

  return (
    <div className="my-tickets-container">
      <h2>Your Registered Tickets</h2>
      {tickets.length === 0 ? (
        <p>You have no tickets. Register for events to get started.</p>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.ticketId} className="ticket-card">
              <h3>{ticket.eventName}</h3>
              <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
              <p><strong>Event Date:</strong> {ticket.date}</p>
              <p><strong>Venue:</strong> {ticket.venue}</p>
              <button
                className="cancel-btn"
                onClick={() => handleCancelTicket(ticket.ticketId)}
              >
                Cancel Registration
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
