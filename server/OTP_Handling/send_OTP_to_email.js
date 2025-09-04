require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email, // replace with your email
      pass: process.env.pass,   // use app password (not your login password)
    },
  });

  await transporter.sendMail({
    from: process.env.email,
    to: email,
    subject,
    text,
  });
};

module.exports = sendEmail;
