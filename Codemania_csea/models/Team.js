const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, unique: true },
    participant1Roll: { type: String, required: true },
    collegeName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    yearOfStudy: { type: Number, required: true },

    solvedCount: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
