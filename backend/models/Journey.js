const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["work", "education"], default: "work" },

    // Common field
    side: { type: String, enum: ["left", "right"], default: "left" },

    // Work fields
    year: { type: String },
    title: { type: String },
    company: { type: String },
    description: { type: String },

    // Education fields
    course: { type: String },
    branch: { type: String },
    stream: { type: String },
    yearOfPassing: { type: String },
    cgpa: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journey", journeySchema);
