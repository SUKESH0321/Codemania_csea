const { getLeaderboardData } = require("../controllers/leaderboardController");

// Emit leaderboard update to all connected clients
const emitLeaderboardUpdate = async (io) => {
  try {
    const leaderboard = await getLeaderboardData();
    io.to("leaderboard").emit("leaderboard-update", {
      timestamp: new Date(),
      leaderboard
    });
    console.log("📊 Leaderboard broadcasted to clients");
  } catch (error) {
    console.error("Socket emit error:", error);
  }
};

// Emit when a team solves a question
const emitSolveNotification = (io, data) => {
  io.to("leaderboard").emit("team-solved", {
    teamName: data.teamName,
    questionTitle: data.questionTitle,
    pointsAwarded: data.pointsAwarded,
    timestamp: new Date()
  });
};

module.exports = { emitLeaderboardUpdate, emitSolveNotification };
