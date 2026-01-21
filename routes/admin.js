const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/admin");

// ==================== QUESTION MANAGEMENT ====================
router.get("/questions", verifyAdmin, adminController.getAllQuestions);
router.post("/questions", verifyAdmin, adminController.createQuestion);
router.put("/questions/:id", verifyAdmin, adminController.updateQuestion);
router.delete("/questions/:id", verifyAdmin, adminController.deleteQuestion);

// ==================== TEAM MANAGEMENT ====================
router.get("/teams", verifyAdmin, adminController.getAllTeams);
router.delete("/teams/:id", verifyAdmin, adminController.deleteTeam);
router.put("/teams/:id/reset", verifyAdmin, adminController.resetTeam);

// ==================== SUBMISSIONS & STATS ====================
router.get("/submissions", verifyAdmin, adminController.getAllSubmissions);
router.get("/stats", verifyAdmin, adminController.getStats);

module.exports = router;
