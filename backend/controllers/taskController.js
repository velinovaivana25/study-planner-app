

import Task from "../models/Task.js";


// Get all tasks, including their related subject
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("subject");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new task
export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Delete a task by its ID
export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Toggle the completed status of a task
export const toggleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};