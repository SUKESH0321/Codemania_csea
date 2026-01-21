const jwt = require("jsonwebtoken");

const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin_secret_key";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "codemania2026";

// Verify admin token
const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No admin token." });
    }

    const decoded = jwt.verify(token, ADMIN_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access required." });
    }

    req.isAdmin = true;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid admin token." });
  }
};

// Generate admin token
const generateAdminToken = () => {
  return jwt.sign({ isAdmin: true }, ADMIN_SECRET, { expiresIn: "12h" });
};

module.exports = { verifyAdmin, generateAdminToken, ADMIN_USERNAME, ADMIN_PASSWORD };
