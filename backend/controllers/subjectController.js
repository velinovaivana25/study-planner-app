import Subject from "../models/Subject.js";

// Get all subjects from the database
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new subject in the database
export const createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};