const bcrypt = require("bcryptjs");
const Team = require("../models/Team");
const { generateToken } = require("../middleware/auth");
const { generateAdminToken, ADMIN_USERNAME, ADMIN_PASSWORD } = require("../middleware/admin");

// @desc    Register a new team
exports.register = async (req, res) => {
  try {
    const { teamName, participant1Roll, collegeName, email, password, yearOfStudy } = req.body;

    // Input validation
    if (!teamName || !participant1Roll || !collegeName || !email || !password || !yearOfStudy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength (min 6 chars)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
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

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create team
    const team = new Team({
      teamName: teamName.trim(),
      participant1Roll: participant1Roll.trim(),
      collegeName: collegeName.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
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

// @desc    Login team
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find team (case-insensitive email)
    const team = await Team.findOne({ email: email.toLowerCase() });
    if (!team) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, team.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
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
