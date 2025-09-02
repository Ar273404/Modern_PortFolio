const mongoose = require("mongoose");

const workJourneySchema = new mongoose.Schema(
  {
    side: { type: String, enum: ["left", "right"], default: "left" },
    year: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkJourney", workJourneySchema);
