const express = require('express');
const multer = require('multer');
const Assignment = require('../models/Assignment');
const authenticateToken = require('../helpers/auth');

const router = express.Router();

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload Assignment
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  const { title } = req.body;
  const filePath = req.file.path;

  try {
    const assignment = new Assignment({
      userId: req.user.id,
      title,
      filePath,
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment Uploaded' });
  } catch (error) {
    res.status(500).json({ message: 'Error Uploading Assignment', error });
  }
});

// Get User's Assignments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.user.id });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Assignments', error });
  }
});

module.exports = router;
