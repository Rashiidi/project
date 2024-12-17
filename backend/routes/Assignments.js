const express = require('express');
const Assignment = require('../models/Assignment');
const router = express.Router();
const authMiddleware = require('../helpers/auth'); // Create this middleware for token verification

// Upload Assignment
router.post('/', authMiddleware, async (req, res) => {
  const { title, file } = req.body; // Assume file is uploaded and its path is sent
  const assignment = new Assignment({ userId: req.user.id, title, file });
  await assignment.save();
  res.status(201).send('Assignment uploaded');
});

    // Get User Assignments
router.get('/', authMiddleware, async (req, res) => {
    const assignments = await Assignment.find({ userId: req.user.id });
    res.json(assignments);
  });

  // Search Assignments
router.get('/search', authMiddleware, async (req, res) => {
  const { query } = req.query;
  const assignments = await Assignment.find({
    title: { $regex: query, $options: 'i' },
    userId: req.user.id,
  });
  res.json(assignments);
});
  
  // Admin: Get All Assignments
  router.get('/all', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Access denied');
    }
    const assignments = await Assignment.find().populate('userId', 'username');
    res.json(assignments);
  });
  
  module.exports = router;