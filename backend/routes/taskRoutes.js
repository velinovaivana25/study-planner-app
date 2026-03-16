// Routes for managing tasks

import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).populate(
            "subject",
            "name"
        );
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Create a new task
router.post("/", protect, async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            subject: req.body.subject,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            user: req.user.id,
        });

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error creating task" });
    }
});

// Delete a task
router.delete("/:id", protect, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task" });
    }
});

// Toggle task completion
router.put("/:id", protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error updating task" });
    }
});

export default router;