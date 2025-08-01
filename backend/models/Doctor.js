const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  image: String,
  status: { type: String, enum: ['Available', 'On Leave'], default: 'Available' },
  rating: Number,
  experience: String,
  education: String,
  about: String,
  location: String,
  languages: [String],
  consultationFee: String,
  availability: Object // e.g., { Monday: ['9:00 AM', '10:00 AM'], ... }
});

module.exports = mongoose.model('Doctor', doctorSchema);
