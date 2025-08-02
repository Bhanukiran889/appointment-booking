const express = require('express');
const router = express.Router();
const { bookAppointment, getAllAppointments } = require('../controllers/appointmentController');

router.post('/', bookAppointment); // This line throws the error if bookAppointment is not a function
router.get('/', getAllAppointments);

module.exports = router;
