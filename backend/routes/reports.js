const express = require('express');
const Assignment = require('../models/Assignment');
const router = express.Router();
const authMiddleware = require('../helpers/auth');

// Generate Report
router.get('/', authMiddleware, async (req, res) => {
  const assignments = await Assignment.find().populate('userId', 'username');
  // Here you can format the report as needed
  res.json(assignments);
});

module.exports = router;