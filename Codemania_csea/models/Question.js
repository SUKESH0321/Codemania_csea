const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema(
  {
    input: String,
    output: String,
    hidden: { type: Boolean, default: true }
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    descriptionWithConstraints: { type: String, required: true },
    nonOptimizedCode: { type: String, required: true },

    totalPoints: { type: Number, required: true },
    currentPoints: { type: Number, required: true },
    noOfTeamsSolved: { type: Number, default: 0 },

    testcases: [TestCaseSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
