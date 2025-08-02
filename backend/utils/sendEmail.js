const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your gmail id
        pass: process.env.EMAIL_PASS  // your gmail app password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', to);
  } catch (err) {
    console.error('Email failed:', err.message);
  }
};

module.exports = sendEmail;
