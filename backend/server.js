import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

// Enable CORS
app.use(
  cors({
    origin: "*", 
  })
);

// Parse JSON
app.use(express.json());

// ================= ROUTES =================


app.get("/", (req, res) => {
  res.send("Study Planner API running 🚀");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/subjects", subjectRoutes);

// ================= ERROR HANDLER =================

app.use(errorHandler);

// ================= SERVER START =================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();