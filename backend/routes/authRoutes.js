const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")

// REGISTER
router.post("/register", async (req,res)=>{

try{

const {name,email,password} = req.body

const userExists = await User.findOne({email})

if(userExists){
return res.status(400).json({message:"User already exists"})
}

const hashedPassword = await bcrypt.hash(password,10)

const user = await User.create({
name,
email,
password:hashedPassword
})

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"1d" }
)

res.json({
token,
user:{
id:user._id,
name:user.name,
email:user.email
}
})

}catch(err){
res.status(500).json({message:"Server error"})
}

})


// LOGIN
router.post("/login", async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.status(400).json({message:"Invalid password"})
}

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"1d"}
)

res.json({
token,
user:{
id:user._id,
name:user.name,
email:user.email
}
})

}catch(err){
res.status(500).json({message:"Server error"})
}

})


// GET CURRENT USER
router.get("/me", authMiddleware, async (req,res)=>{

try{

const user = await User.findById(req.user.id).select("-password")

res.json(user)

}catch(err){
res.status(500).json({message:"Server error"})
}

})

module.exports = router