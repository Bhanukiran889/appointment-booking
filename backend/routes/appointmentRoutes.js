const express = require('express');
const router = express.Router();
const { bookAppointment } = require('../controllers/appointmentController');

router.post('/', bookAppointment);

// GET: View all appointments (optional for now)
router.get('/', bookAppointment);

module.exports = router;
