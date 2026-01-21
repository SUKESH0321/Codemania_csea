const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

// @route   POST /api/auth/register
router.post("/register", authController.register);

// @route   POST /api/auth/login
router.post("/login", authController.login);

// @route   GET /api/auth/me
router.get("/me", verifyToken, authController.getMe);

// @route   POST /api/auth/admin/login
router.post("/admin/login", authController.adminLogin);

module.exports = router;
