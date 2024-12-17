const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  title: { type: String, required: true },
  file: { type: String, required: true }, 
});

module.exports = mongoose.model('Assignment', assignmentSchema);