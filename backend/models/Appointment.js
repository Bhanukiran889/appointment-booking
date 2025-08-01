const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientName: String,
  email: String,
  date: String,
  time: String,
  status: { type: String, default: 'Scheduled' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
