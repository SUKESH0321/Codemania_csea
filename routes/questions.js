const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { verifyToken } = require("../middleware/auth");

// @route   GET /api/questions
router.get("/", verifyToken, questionController.getAllQuestions);

// @route   GET /api/questions/round1/status (must be before /:id)
router.get("/round1/status", verifyToken, questionController.getRound1Status);

// @route   GET /api/questions/:id
router.get("/:id", verifyToken, questionController.getQuestionById);

module.exports = router;
