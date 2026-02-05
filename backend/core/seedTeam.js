// Quick script to seed a test team
// Run: node seedTeam.js

require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const Team = require("./models/Team");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/codemania";

const seedTeam = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if team already exists
    const existing = await Team.findOne({ teamName: "TestTeam" });
    if (existing) {
      console.log("Team already exists:", existing.teamName);
      process.exit(0);
    }

    // Create a test team
    const team = new Team({
      teamName: "TestTeam",
      participant1Roll: "22CS001",
      collegeName: "Test College",
      email: "test@example.com",
      yearOfStudy: 2,
    });

    await team.save();
    console.log("✅ Team created successfully!");
    console.log("Team Name:", team.teamName);
    console.log("Use Access Code: CODEMANIA2026 (or your TEAM_ACCESS_CODE env variable)");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedTeam();
