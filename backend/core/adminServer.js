const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const Team = require("./models/Team");

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   MongoDB Connection
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* ===============================
   GET: All Teams (Admin View)
================================ */
app.get("/api/admin/teams", async (req, res) => {
  const teams = await Team.find({});
  res.json(teams);
});

/* ===============================
   POST: Mark Question Solved
================================ */
app.post("/api/admin/solve", async (req, res) => {
  const { teamId, questionIndex } = req.body;

  const team = await Team.findById(teamId);
  if (!team) return res.status(404).send("Team not found");

  const questionKey = `q${questionIndex + 1}`;

  // Prevent double solve
  if (team.round1.questionsSolved[questionKey]) {
    return res.json({ success: true, team });
  }

  // Mark solved
  team.round1.questionsSolved[questionKey] = true;
  team.round1.solvedCount += 1;

  // Start timer on first solve
  if (!team.round1.startTime) {
    team.round1.startTime = new Date();
    team.round1.status = "IN_PROGRESS";
  }

  // If all 5 solved
  if (team.round1.solvedCount === 5) {
    team.round1.status = "COMPLETED";
    team.round1.endTime = new Date();
    team.round1.totalTime =
      team.round1.endTime - team.round1.startTime;
  }

  await team.save();
  res.json({ success: true, team });
});

/* ===============================
   GET: Leaderboard (RANK + POINTS)
================================ */
app.get("/api/admin/leaderboard", async (req, res) => {
  // Only completed teams
  const teams = await Team.find({
    "round1.status": "COMPLETED"
  });

  // Sort by fastest time
  teams.sort((a, b) => a.round1.totalTime - b.round1.totalTime);

  // Assign points dynamically
  const leaderboard = teams.map((team, index) => {
    const points = Math.max(100 - index * 10, 10); // 100, 90, 80...

    return {
      rank: index + 1,
      teamId: team._id,
      teamName: team.teamName,
      solved: team.round1.solvedCount,
      time: team.round1.totalTime,
      points
    };
  });

  res.json(leaderboard);
});

/* ===============================
   Serve Frontend
================================ */
app.use(express.static(path.join(__dirname, "frontend/admin")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend/admin/index.html")
  );
});


app.post("/api/admin/reset-round1", async (req, res) => {
  try {
    await Team.updateMany(
      {},
      {
        $set: {
          round1: {
            questionsSolved: {
              q1: false,
              q2: false,
              q3: false,
              q4: false,
              q5: false
            },
            solvedCount: 0,
            status: "NOT_STARTED",
            round1Points: 0,
            completedAt: null
          }
        }
      }
    );

    res.json({ message: "Round 1 reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ===============================
   Start Server
================================ */
app.listen(5000, () => {
  console.log("🚀 Admin Server running at http://localhost:5000");
});

