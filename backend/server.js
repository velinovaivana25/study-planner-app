
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const subjectRoutes = require("./routes/subjectRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/subjects", subjectRoutes)

// Test route
app.get("/", (req,res)=>{
res.send("Study Planner API running")
})

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("MongoDB connected")

// Start server only after DB connects
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
console.log("Server running on port",PORT)
})

})
.catch(err=>{
console.error("MongoDB connection error:",err)
})

// Error middleware (must be last)
const errorHandler = require("./middleware/errorMiddleware")
app.use(errorHandler)

