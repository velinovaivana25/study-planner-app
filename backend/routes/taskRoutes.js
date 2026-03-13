
const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
const protect = require("../middleware/authMiddleware")

// GET TASKS
router.get("/", protect, async (req,res)=>{

try{

const tasks = await Task
.find({user:req.user.id})
.populate("subject","name")

res.json(tasks)

}catch(err){
res.status(500).json({message:"Error fetching tasks"})
}

})

// CREATE TASK
router.post("/", protect, async (req,res)=>{

try{

const task = new Task({
title:req.body.title,
subject:req.body.subject,
dueDate:req.body.dueDate,
priority:req.body.priority,
user:req.user.id
})

await task.save()

res.json(task)

}catch(err){
res.status(500).json({message:"Error creating task"})
}

})

// DELETE TASK
router.delete("/:id", protect, async (req,res)=>{

try{

await Task.findByIdAndDelete(req.params.id)

res.json({message:"Task deleted"})

}catch(err){
res.status(500).json({message:"Error deleting task"})
}

})

// TOGGLE COMPLETE
router.put("/:id", protect, async (req,res)=>{

try{

const task = await Task.findById(req.params.id)

task.completed = !task.completed

await task.save()

res.json(task)

}catch(err){
res.status(500).json({message:"Error updating task"})
}

})

module.exports = router

