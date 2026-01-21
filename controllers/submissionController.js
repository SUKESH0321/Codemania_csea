const Submission = require("../models/Submission");
const Question = require("../models/Question");
const Team = require("../models/Team");
const { emitLeaderboardUpdate, emitSolveNotification } = require("../utils/socketHandlers");

// @desc    Submit code for a question
exports.submitCode = async (req, res) => {
  try {
    const { questionId, code, status } = req.body;
    const teamId = req.teamId;

    // Validate question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Create submission
    const submission = new Submission({
      teamId,
      questionId,
      status, // AC, WA, TLE, RE (sent from code execution service)
      isCorrect: status === "AC"
    });

    await submission.save();

    // Update team stats
    const team = await Team.findById(teamId);
    team.totalSubmissions += 1;

    let pointsAwarded = 0;
    let shouldUpdateLeaderboard = false;

    // If correct answer
    if (status === "AC") {
      // Check if already solved this question
      const previousCorrect = await Submission.findOne({
        teamId,
        questionId,
        isCorrect: true,
        _id: { $ne: submission._id }
      });

      if (!previousCorrect) {
        // First time solving - award points
        team.solvedCount += 1;
        pointsAwarded = question.currentPoints;
        team.totalPoints += pointsAwarded;
        shouldUpdateLeaderboard = true;

        // Update question stats
        question.noOfTeamsSolved += 1;
        // Decay points (reduce by 10% for each solve, min 50% of total)
        question.currentPoints = Math.max(
          Math.floor(question.totalPoints * 0.5),
          Math.floor(question.currentPoints * 0.9)
        );
        await question.save();
      }
    }

    await team.save();

    // 🔥 Emit socket events if leaderboard changed
    if (shouldUpdateLeaderboard) {
      const io = req.app.get("io");
      
      // Emit solve notification
      emitSolveNotification(io, {
        teamName: team.teamName,
        questionTitle: question.title,
        pointsAwarded
      });
      
      // Emit updated leaderboard
      await emitLeaderboardUpdate(io);
    }

    // Return submission result
    res.status(201).json({
      message: status === "AC" ? "✅ Accepted!" : `❌ ${status}`,
      submission: {
        id: submission._id,
        status: submission.status,
        isCorrect: submission.isCorrect,
        submissionTime: submission.submissionTime,
        pointsAwarded
      }
    });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ message: "Server error during submission" });
  }
};

// @desc    Get current team's submissions
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ teamId: req.teamId })
      .populate("questionId", "title")
      .sort({ submissionTime: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get team's submissions for a specific question
exports.getMySubmissionsByQuestion = async (req, res) => {
  try {
    const submissions = await Submission.find({
      teamId: req.teamId,
      questionId: req.params.questionId
    }).sort({ submissionTime: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
