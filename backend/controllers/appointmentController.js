const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const sendEmail = require('../utils/sendEmail');

// POST: Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, patientEmail, date, time } = req.body;

    // Validate required fields
    if (!doctorId || !patientName || !patientEmail || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Prevent duplicate appointment for same doctor, date, time
    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing) {
      return res.status(409).json({ message: 'This time slot is already booked' });
    }

    // Create new appointment
    const appointment = new Appointment({
      doctorId,
      patientName,
      patientEmail,
      date,
      time
    });

    await appointment.save();

    // Send email confirmation
    await sendEmail({
      to: patientEmail,
      subject: 'Appointment Confirmation',
      text: `Hi ${patientName},\n\nYour appointment with ${doctor.name} is confirmed on ${date} at ${time}.\n\nThanks,\nMediCare Team`
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

// GET: All appointments (admin/testing)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId', 'name specialization');
    res.json(appointments);
  } catch (err) {
    console.error('Fetching error:', err.message);
    res.status(500).json({ message: 'Fetching appointments failed', error: err.message });
  }
};

module.exports = { bookAppointment, getAllAppointments };
