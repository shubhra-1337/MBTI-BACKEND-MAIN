import express from "express";
import mbtiRoutes from "../routes/mbtiRoutes.js";
import visitorRoutes from "../routes/visitors.js";
import connectDB from "../config/db.js";

const app = express();

app.use(express.json());

await connectDB();

app.use("/api/mbti", mbtiRoutes);
app.use("/api/visitors", visitorRoutes);

export default app; // 🔥 THIS is the key
