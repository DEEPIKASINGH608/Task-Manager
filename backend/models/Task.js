const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' }
<<<<<<< HEAD
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

=======
}, { timestamps: true }); // Adds created/updated times automatically

module.exports = mongoose.model('Task', taskSchema);
>>>>>>> 30e7c9c42947a841cc97f84a6c9232ed6e71ff00
