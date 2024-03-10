// routes/index.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// Home
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Student
router.get('/student', (req, res) => {
  res.render('index', { title: 'Student' });
});

// About
router.get('/about', (req, res) => {
  res.render('index', { title: 'About' });
});

// Read Contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('index', { title: 'Contacts', contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Contact
router.get('/contacts/add', (req, res) => {
  res.render('add', { title: 'Add Contact' });
});

router.post('/contacts/add', async (req, res) => {
  try {
    const { firstName, lastName, studentNumber, email } = req.body;
    const newContact = new Contact({ firstName, lastName, studentNumber, email });
    await newContact.save();
    res.redirect('/contacts');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Contact
router.get('/contacts/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    res.render('index', { title: 'Edit Contact', contact, isEditing: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/contacts/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, studentNumber, email } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, studentNumber, email },
      { new: true }
    );
    res.redirect('/contacts');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Contact
router.get('/contacts/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.redirect('/contacts');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
