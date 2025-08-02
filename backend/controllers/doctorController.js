const Doctor = require('../models/Doctor');

const getAllDoctors = async (req, res) => {
  try {
    const search = req.query.search;

    let filter = {};
    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive regex
      filter = {
        $or: [
          { name: { $regex: regex } },
          { specialization: { $regex: regex } }
        ]
      };
    }

    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllDoctors, getDoctorById };
