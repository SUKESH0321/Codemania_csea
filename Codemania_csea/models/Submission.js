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
    status: {
      type: String,
      enum: ["AC", "WA", "TLE", "RE"],
      required: true
    },
    isCorrect: { type: Boolean, default: false },
    submissionTime: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
