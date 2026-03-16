// Routes for managing subjects

import express from "express";
import Subject from "../models/Subject.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new subject
router.post("/", protect, async (req, res) => {
    try {
        const subject = new Subject({
            name: req.body.name,
            user: req.user.id,
        });

        const savedSubject = await subject.save();
        res.json(savedSubject);
    } catch (err) {
        res.status(500).json({ message: "Error adding subject" });
    }
});

// Get all subjects for logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const subjects = await Subject.find({ user: req.user.id });
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subjects" });
    }
});

// Update a subject
router.put("/:id", protect, async (req, res) => {
    const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    res.json(subject);
});

// Delete a subject
router.delete("/:id", protect, async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
});

export default router;