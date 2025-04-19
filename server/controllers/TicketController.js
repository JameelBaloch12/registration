// Import required modules
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// @desc    Get all tickets
// @route   GET /api/tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get tickets for a specific event
// @route   GET /api/events/:eventId/tickets
exports.getTicketsForEvent = async (req, res) => {
  try {
    const tickets = await Ticket.find({ event: req.params.eventId });
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found for this event' });
    }
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get ticket details by ID
// @route   GET /api/tickets/:ticketId
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update ticket details
// @route   PUT /api/tickets/:ticketId
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:ticketId
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
