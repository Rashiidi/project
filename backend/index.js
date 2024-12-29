const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Assignment = require('./models/Assignment');
const authenticateToken = require('./helpers/auth');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const assignmentRoutes = require('./routes/Assignments');

app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);

// File Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
