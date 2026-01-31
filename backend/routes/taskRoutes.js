const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

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
    res.status(400).json({ error: err.message });
  }
});

// 2. READ: Get all tasks (GET)
router.get('/', async (req, res) => {
  try {
    // Sorts by newest first
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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