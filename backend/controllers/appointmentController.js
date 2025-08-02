const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const sendEmail = require('../utils/sendEmail');

// POST: Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, patientEmail, phone, reason, date, time } = req.body;

    // Validate required fields
    if (!doctorId || !patientName || !patientEmail || !phone || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Prevent duplicate appointment
    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing) {
      return res.status(409).json({ message: 'This time slot is already booked' });
    }

    // Create and save appointment
    const appointment = new Appointment({
      doctorId,
      patientName,
      patientEmail,
      phone,
      reason,
      date,
      time
    });

    await appointment.save();

    // Compose email HTML
    const emailHtml = `
      <div style="max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; font-family: 'Segoe UI', sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <span style="font-size: 32px; font-family: 'Pacifico', cursive; color: #2563eb;">MediCare</span>
        </div>

        <div style="text-align: center;">
          <div style="background-color: #d1fae5; border-radius: 50%; width: 64px; height: 64px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <span style="font-size: 32px; color: #10b981;">✓</span>
          </div>
          <h2 style="font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 12px;">Appointment Confirmed!</h2>
        </div>

        <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px;">
          <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">Appointment Details:</h3>
          <p style="margin: 4px 0;"><strong>Doctor:</strong> ${doctor.name}</p>
          <p style="margin: 4px 0;"><strong>Specialization:</strong> ${doctor.specialization}</p>
          <p style="margin: 4px 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 4px 0;"><strong>Time:</strong> ${time}</p>
          <p style="margin: 4px 0;"><strong>Patient:</strong> ${patientName}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${phone}</p>
          ${reason ? `<p style="margin: 4px 0;"><strong>Reason:</strong> ${reason}</p>` : ''}
        </div>

        <p style="margin-top: 20px; font-size: 14px; color: #6b7280; text-align: center;">
          Thank you for using <strong>MediCare</strong>. We look forward to seeing you!
        </p>
      </div>
    `;

    await sendEmail({
      to: patientEmail,
      subject: 'Appointment Confirmation',
      html: emailHtml
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

module.exports = {
  bookAppointment,
  getAllAppointments
};
