const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// @route   GET /api/leaderboard
router.get("/", leaderboardController.getLeaderboard);

// @route   GET /api/leaderboard/round1
router.get("/round1", leaderboardController.getRound1Leaderboard);

// @route   GET /api/leaderboard/top/:count
router.get("/top/:count", leaderboardController.getTopTeams);

module.exports = router;
