const express = require('express');
const router = express.Router();
const { registerForEvent, downloadTicket } = require('../controllers/registrationController');

router.post('/', registerForEvent);
router.get('/ticket/:id', downloadTicket); // for PDF download

module.exports = router;
