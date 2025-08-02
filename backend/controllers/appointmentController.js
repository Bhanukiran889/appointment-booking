const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const sendEmail = require('../utils/sendEmail');

// POST: Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, email, date, time } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const appointment = new Appointment({
      doctorId,
      patientName,
      email,
      date,
      time
    });

    await appointment.save();

    // Send email confirmation
    await sendEmail({
      to: email,
      subject: 'Appointment Confirmation',
      text: `Hi ${patientName},\n\nYour appointment with ${doctor.name} is confirmed on ${date} at ${time}.\n\nThank you!`
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

// GET: All appointments (optional, useful for admin/testing)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId', 'name specialization');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Fetching appointments failed', error: err.message });
  }
};

module.exports = { bookAppointment, getAllAppointments };
