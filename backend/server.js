const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const reportRoutes = require('./routes/reports');
app.use('/api/reports', reportRoutes);

const assignmentRoutes = require('./routes/Assignments');
app.use('/api/assignments', assignmentRoutes);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});