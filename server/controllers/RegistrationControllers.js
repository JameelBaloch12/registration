const db = require('../config/db');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.registerForEvent = (req, res) => {
  const { user_id, event_id, name, cnic, contact } = req.body;

  const query = `
    INSERT INTO registrations (user_id, event_id, name, cnic, contact)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [user_id, event_id, name, cnic, contact], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Registered successfully', regId: result.insertId });
  });
};

exports.downloadTicket = (req, res) => {
  const registrationId = req.params.id;

  const query = `
    SELECT r.name, r.cnic, r.contact, e.title AS event_title, e.date, e.location
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE r.id = ?
  `;

  db.query(query, [registrationId], (err, results) => {
    if (err || results.length === 0) return res.status(500).json({ msg: 'Not found' });

    const data = results[0];
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../tickets/ticket_${registrationId}.pdf`);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(18).text('Event Ticket', { align: 'center' });
    doc.moveDown();
    doc.text(`Name: ${data.name}`);
    doc.text(`CNIC: ${data.cnic}`);
    doc.text(`Contact: ${data.contact}`);
    doc.text(`Event: ${data.event_title}`);
    doc.text(`Date: ${data.date}`);
    doc.text(`Location: ${data.location}`);
    doc.end();

    stream.on('finish', () => {
      res.download(filePath, `ticket_${registrationId}.pdf`);
    });
  });
};
