const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // In production, set your frontend URL
    methods: ["GET", "POST"]
  }
});

// Make io accessible in routes/controllers
app.set("io", io);

// CORS — configurable via CORS_ORIGIN env var (default: allow all)
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const submissionRoutes = require("./routes/submissions");
const leaderboardRoutes = require("./routes/leaderboard");
const adminRoutes = require("./routes/admin");

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🚀 CodeMania API is running!" });
});

// ==================== SOCKET.IO ====================
io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // Join leaderboard room
  socket.on("join-leaderboard", () => {
    socket.join("leaderboard");
    console.log(`👀 ${socket.id} joined leaderboard room`);
  });

  // Leave leaderboard room
  socket.on("leave-leaderboard", () => {
    socket.leave("leaderboard");
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});