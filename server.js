const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
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
  "http://localhost:5000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://knowthyself-7.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

/* ======================
   Serve Frontend
====================== */
app.use(
  express.static(path.join(__dirname, "public", "MBTI-Frontend-main"))
);

/* ======================
   API Routes
====================== */
const mbtiRoutes = require("./routes/mbtiRoutes");
app.use("/mbti", mbtiRoutes);

const visitorsRouter = require("./routes/visitors");
app.use("/api/visitors", visitorsRouter);

/* ======================
   Health Check
====================== */
app.get("/health", (req, res) => {
  res.json({ status: "Server running 🚀" });
});

/* ======================
   SAFE FALLBACK (Node 22 FIX)
   ❌ NO wildcards
====================== */
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "MBTI-Frontend-main", "index.html")
  );
});

/* ======================
   Start Server
====================== */
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mbtiDB";

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
  });
