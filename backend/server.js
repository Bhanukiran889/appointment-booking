const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");
const dotenv = require('dotenv');

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const MONGO_URI = process.env.MONGO_URI || "mongoDB://localhost:27017/"
// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
   if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
});

module.exports = app;

// Start server
if(process.env.NODE_ENV !== "test"){
  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}
