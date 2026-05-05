const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// CREATE Task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Save Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// GET Tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


