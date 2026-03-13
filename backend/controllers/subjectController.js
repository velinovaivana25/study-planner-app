
const Subject = require("../models/Subject")

// GET subjects
const getSubjects = async (req,res)=>{

try{

const subjects = await Subject.find()

res.json(subjects)

}catch(err){

res.status(500).json({error:err.message})

}

}

// CREATE subject
const createSubject = async (req,res)=>{

try{

const subject = new Subject(req.body)

await subject.save()

res.json(subject)

}catch(err){

res.status(500).json({error:err.message})

}

}

module.exports = {
getSubjects,
createSubject
}

