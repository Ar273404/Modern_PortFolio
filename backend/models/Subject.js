const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const codeSnippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    category: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    topics: [topicSchema],
    codeSnippets: [codeSnippetSchema],
    images: [
      {
        type: String,
      },
    ],
    timeSpent: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for progress calculation
subjectSchema.virtual("progress").get(function () {
  if (this.topics.length === 0) return 0;
  const completedTopics = this.topics.filter((topic) => topic.completed).length;
  return Math.round((completedTopics / this.topics.length) * 100);
});

subjectSchema.virtual("completedTopics").get(function () {
  return this.topics.filter((topic) => topic.completed).length;
});

subjectSchema.virtual("totalTopics").get(function () {
  return this.topics.length;
});

// Ensure virtual fields are serialized
subjectSchema.set("toJSON", { virtuals: true });
subjectSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Subject", subjectSchema);
