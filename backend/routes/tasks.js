const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// create new task after getting request from frontend side
router.post('/', async (req, res) => {

    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get All tasks after getting request from frontend side
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Upate task (complete or due) after getting request from frontend side
router.put('/:id', async (req, res) => {
    try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;