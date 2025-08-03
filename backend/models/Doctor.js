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
  availability: {
    Monday: [String],
    Tuesday: [String],
    Wednesday: [String],
    Thursday: [String],
    Friday: [String],
    Saturday: [String],
    Sunday: [String]
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
