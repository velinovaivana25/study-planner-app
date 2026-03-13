
const Task = require("../models/Task")

// GET all tasks
const getTasks = async (req,res)=>{
try{

const tasks = await Task.find().populate("subject")

res.json(tasks)

}catch(err){
res.status(500).json({error:err.message})
}
}

// CREATE task
const createTask = async (req,res)=>{
try{

const task = new Task(req.body)

await task.save()

res.json(task)

}catch(err){
res.status(500).json({error:err.message})
}
}

// DELETE task
const deleteTask = async (req,res)=>{
try{

await Task.findByIdAndDelete(req.params.id)

res.json({message:"Task deleted"})

}catch(err){
res.status(500).json({error:err.message})
}
}

// TOGGLE complete
const toggleTask = async (req,res)=>{
try{

const task = await Task.findById(req.params.id)

task.completed = !task.completed

await task.save()

res.json(task)

}catch(err){
res.status(500).json({error:err.message})
}
}

module.exports = {
getTasks,
createTask,
deleteTask,
toggleTask
}

