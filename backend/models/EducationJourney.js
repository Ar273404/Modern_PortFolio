const mongoose = require("mongoose");

const educationJourneySchema = new mongoose.Schema(
  {
    side: { type: String, enum: ["left", "right"], default: "left" },
    course: { type: String, required: true },
    branch: { type: String }, // or "board"
    stream: { type: String },
    yearOfPassing: { type: String, required: true },
    cgpa: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EducationJourney", educationJourneySchema);
