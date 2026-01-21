const jwt = require("jsonwebtoken");
const Team = require("../models/Team");

const JWT_SECRET = process.env.JWT_SECRET || "codemania_secret_key";

// Verify JWT token for teams
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const team = await Team.findById(decoded.teamId);

    if (!team) {
      return res.status(401).json({ message: "Invalid token. Team not found." });
    }

    req.team = team;
    req.teamId = decoded.teamId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Generate JWT token
const generateToken = (teamId) => {
  return jwt.sign({ teamId }, JWT_SECRET, { expiresIn: "24h" });
};

module.exports = { verifyToken, generateToken, JWT_SECRET };
