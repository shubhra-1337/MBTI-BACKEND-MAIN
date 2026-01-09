const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ======================
   Middleware
====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

/* ======================
   CORS
====================== */
const allowedOrigins = [
  "https://mbti-frontend-main.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5500",
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
  })
);

/* ======================
   Routes
====================== */
const mbtiRoutes = require("./mbtiRoutes");
app.use("/mbti", mbtiRoutes);

/* ======================
   Health Check
====================== */
app.get("/", (req, res) => {
  res.json({ message: "Backend API running 🚀" });
});

app.get("/health", (req, res) => {
  res.json({ status: "Server running 🚀" });
});

/* ======================
   Start Server
====================== */
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log("Mongo URI loaded:", !!MONGODB_URI); // should log true

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

