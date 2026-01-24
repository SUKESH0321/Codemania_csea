const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ["python", "java"],
      required: true
    },
    status: {
      type: String,
      enum: ["AC", "WA", "TLE", "RE", "CE", "PENDING"],
      required: true
    },
    isCorrect: { type: Boolean, default: false },
    executionTime: { type: Number, default: 0 }, // in ms
    passedTestCases: { type: Number, default: 0 },
    totalTestCases: { type: Number, default: 0 },
    submissionTime: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
