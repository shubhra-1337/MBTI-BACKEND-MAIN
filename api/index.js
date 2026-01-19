import express from "express";
import connectDB from "../config/db.js";
import mbtiRoutes from "../routes/mbtiRoutes.js";
import visitorRoutes from "../routes/visitors.js";

const app = express();

app.use(express.json());

// Connect to MongoDB
await connectDB();

// Routes
app.use("/api/mbti", mbtiRoutes);
app.use("/api/visitors", visitorRoutes);

// Export for Vercel
export default app;
