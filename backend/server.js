const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cloudinary = require("cloudinary").v2;

// Import Routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blogs");
const contactRoutes = require("./routes/contact");
const testimonialRoutes = require("./routes/testimonials");
const analyticsRoutes = require("./routes/analytics");
const skillsRoutes = require("./routes/skills");
const journeyRoutes = require("./routes/journey");

require("dotenv").config();

const app = express();

// Security and Performance Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS configuration
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? ["https://your-domain.com", "https://your-domain.vercel.app"]
//         : ["http://localhost:5173", "http://localhost:3000"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "https://your-domain.com",
//       "https://your-domain.vercel.app",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// CORS configuration


const allowedOrigins = [
  process.env.Frontend_url,
  "https://modern-portfolio-2.onrender.com/",
  "http://localhost:5173",
  "http://localhost:3000",
  
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("🌐 CORS enabled for:", allowedOrigins.join(", "));


// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// MongoDB Connection with retry logic
// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};


connectDB();



// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/journey", journeyRoutes);

// Experience endpoint (static data with dynamic additions)
let experienceData = [
  {
    _id: "1",
    company: "Outlier AI",
    position: "AI Training Specialist",
    duration: "2024 - Present",
    description: [
      "Training AI models for code generation and technical writing",
      "Developing comprehensive training datasets for MERN stack development",
      "Collaborating with ML engineers to improve model accuracy",
      "Creating documentation and best practices for AI training processes",
    ],
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    logo: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  },
  {
    _id: "2",
    company: "Tech Startup",
    position: "Full Stack Developer Intern",
    duration: "2023 - 2024",
    description: [
      "Developed responsive web applications using MERN stack",
      "Implemented RESTful APIs and database design",
      "Collaborated with design team to create pixel-perfect UIs",
      "Optimized application performance and user experience",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
  },
];

app.get("/api/experience", async (req, res) => {
  try {
    res.json(experienceData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/experience", async (req, res) => {
  try {
    const { company, position, duration, description, technologies, logo } =
      req.body;

    const newExperience = {
      _id: Date.now().toString(),
      company,
      position,
      duration,
      description: Array.isArray(description)
        ? description
        : description.split("\n").filter((line) => line.trim()),
      technologies: Array.isArray(technologies)
        ? technologies
        : technologies.split(",").map((tech) => tech.trim()),
      logo:
        logo ||
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    };

    experienceData.unshift(newExperience);
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// File upload endpoint
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/uploads",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf"],
    resource_type: "auto",
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // JWT error
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Default error
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(
    `🔗 MongoDB: ${
      mongoose.connection.readyState === 1 ? "Connected" : "Connecting..."
    }`
  );
  console.log(
    `🌐 CORS enabled for: ${
      process.env.NODE_ENV === "production" ? "production domains" : "localhost"
    }`
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

module.exports = app;
