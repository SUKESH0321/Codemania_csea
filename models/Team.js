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
    
        // 🔹 Round 1 – Optimization Arena
    round1: {
      questionsSolved: {
        q1: { type: Boolean, default: false },
        q2: { type: Boolean, default: false },
        q3: { type: Boolean, default: false },
        q4: { type: Boolean, default: false },
        q5: { type: Boolean, default: false }
      },
      solvedCount: { type: Number, default: 0 },
      startTime: { type: Date },
      endTime: { type: Date },
      totalTime: { type: Number },
      status: {
        type: String,
        enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
        default: "NOT_STARTED"
      },
      round1Points: { type: Number, default: 0 }
    },

    totalSubmissions: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
