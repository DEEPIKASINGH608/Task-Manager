const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// CREATE Task (POST /api/tasks)
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// GET all Tasks (GET /api/tasks)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE Task (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;



