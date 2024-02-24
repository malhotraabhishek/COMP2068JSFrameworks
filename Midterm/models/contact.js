// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  studentNumber: { type: String, required: true },
  email: { type: String, required: true },
  // Add any other properties as needed
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
