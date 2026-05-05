const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

<<<<<<< HEAD
// CREATE Task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Save Error:", err.message);
=======
// 1. CREATE: Add a new task (POST)
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({
      title,
      description,
      status: status || 'Pending'
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
>>>>>>> 30e7c9c42947a841cc97f84a6c9232ed6e71ff00
    res.status(400).json({ error: err.message });
  }
});

<<<<<<< HEAD
// GET Tasks
router.get('/', async (req, res) => {
  try {
=======
// 2. READ: Get all tasks (GET)
router.get('/', async (req, res) => {
  try {
    // Sorts by newest first
>>>>>>> 30e7c9c42947a841cc97f84a6c9232ed6e71ff00
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
module.exports = router;


=======
// 3. UPDATE: Change task status or details (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE: Remove a task (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
>>>>>>> 30e7c9c42947a841cc97f84a6c9232ed6e71ff00
