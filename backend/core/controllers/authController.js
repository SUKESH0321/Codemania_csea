const bcrypt = require("bcryptjs");
const Team = require("../models/Team");
const { generateToken } = require("../middleware/auth");
const { generateAdminToken, ADMIN_USERNAME, ADMIN_PASSWORD } = require("../middleware/admin");

// Common access code for all teams (set in environment or default)
const TEAM_ACCESS_CODE = process.env.TEAM_ACCESS_CODE || "CODEMANIA2026";

// @desc    Register a new team
exports.register = async (req, res) => {
  try {
    const { teamName, participant1Roll, collegeName, email, yearOfStudy } = req.body;

    // Input validation
    if (!teamName || !participant1Roll || !collegeName || !email || !yearOfStudy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if team already exists
    const existingTeam = await Team.findOne({
      $or: [{ teamName }, { email: email.toLowerCase() }]
    });

    if (existingTeam) {
      return res.status(400).json({
        message: existingTeam.teamName === teamName
          ? "Team name already taken"
          : "Email already registered"
      });
    }

    // Create team (no password needed - they use common access code)
    const team = new Team({
      teamName: teamName.trim(),
      participant1Roll: participant1Roll.trim(),
      collegeName: collegeName.trim(),
      email: email.toLowerCase().trim(),
      yearOfStudy
    });

    await team.save();

    // Generate token
    const token = generateToken(team._id);

    res.status(201).json({
      message: "Team registered successfully!",
      token,
      team: {
        id: team._id,
        teamName: team.teamName,
        email: team.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Login team with teamName + common accessCode
exports.login = async (req, res) => {
  try {
    const { teamName, accessCode } = req.body;

    // Input validation
    if (!teamName || !accessCode) {
      return res.status(400).json({ message: "Team name and access code are required" });
    }

    // Check access code
    if (accessCode !== TEAM_ACCESS_CODE) {
      return res.status(400).json({ message: "Invalid access code" });
    }

    // Find team by name (case-insensitive)
    const team = await Team.findOne({ 
      teamName: { $regex: new RegExp(`^${teamName.trim()}$`, 'i') }
    });
    
    if (!team) {
      return res.status(400).json({ message: "Team not found. Please register first." });
    }

    // Generate token
    const token = generateToken(team._id);

    res.json({
      message: "Login successful!",
      token,
      team: {
        id: team._id,
        teamName: team.teamName,
        email: team.email,
        round1Status: team.round1.status
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Get current team info
exports.getMe = async (req, res) => {
  try {
    const team = await Team.findById(req.teamId).select("-passwordHash");
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Admin login
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateAdminToken();
    res.json({ message: "Admin login successful", token });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};
