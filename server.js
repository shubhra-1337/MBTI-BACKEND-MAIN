const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;

// 🔥 HARD-CODED ON PURPOSE TO PROVE EXECUTION
const MONGODB_URI =
  "mongodb+srv://shubhra1337:SHUBHRA1337@cluster0.j17wxuq.mongodb.net/mbtiDB?retryWrites=true&w=majority";

console.log("🚨 SERVER FILE IS RUNNING");
console.log("🚨 URI VALUE:", MONGODB_URI);

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

