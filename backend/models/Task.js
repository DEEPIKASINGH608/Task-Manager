const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true }); // Adds created/updated times automatically

module.exports = mongoose.model('Task', taskSchema);