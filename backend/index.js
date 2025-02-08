const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Assignment = require('./models/Assignment');
const authenticateToken = require('./helpers/auth');

// Load environment variables
dotenv.config();

// Check required environment variables
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is required');
}

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process on DB connection failure
  });

// Routes
const userRoutes = require('./routes/userRoutes');
const assignmentRoutes = require('./routes/assignments');

app.use('/api/users', userRoutes);
app.use('/api/assignments', authenticateToken, assignmentRoutes);

// File Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  await mongoose.disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
