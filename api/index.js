import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import mbtiRoutes from "../routes/mbtiRoutes.js";
import visitorsRouter from "../routes/visitors.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5500",
  "http://localhost:5000",
  "http://127.0.0.1:5500",
  "https://knowthyself-7.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB (serverless-safe)
await connectDB();

// Routes
app.use("/mbti", mbtiRoutes);
app.use("/api/visitors", visitorsRouter);

// Test route
app.get("/", (req, res) => res.send("Serverless API is running! 🚀"));

// Export — VERY IMPORTANT
export default app;
