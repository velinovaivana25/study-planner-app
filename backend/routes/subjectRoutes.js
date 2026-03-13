const express = require("express")
const router = express.Router()
const Subject = require("../models/Subject")
const authMiddleware = require("../middleware/authMiddleware")

// ADD SUBJECT
router.post("/", authMiddleware, async(req,res)=>{

try{

const subject = new Subject({
name:req.body.name,
user:req.user.id
})

const savedSubject = await subject.save()

res.json(savedSubject)

}catch(err){
res.status(500).json({message:"Error adding subject"})
}

})

// GET SUBJECTS
router.get("/", authMiddleware, async(req,res)=>{

try{

const subjects = await Subject.find({user:req.user.id})

res.json(subjects)

}catch(err){
res.status(500).json({message:"Error fetching subjects"})
}

})

// UPDATE subject
router.put("/:id", authMiddleware, async (req,res)=>{

const subject = await Subject.findByIdAndUpdate(
req.params.id,
{name:req.body.name},
{new:true}
)

res.json(subject)

})

// DELETE subject
router.delete("/:id", authMiddleware, async (req,res)=>{

await Subject.findByIdAndDelete(req.params.id)

res.json({message:"Subject deleted"})

})

module.exports = router