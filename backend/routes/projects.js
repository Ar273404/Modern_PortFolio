const express = require("express");
const Project = require("../models/Project");
const { authenticateToken, requireAdmin } = require("../middleware/auth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [
      { width: 800, height: 600, crop: "fill", quality: "auto:good" },
    ],
  },
});

const upload = multer({ storage });

// Get all projects
router.get("/", async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let filter = {};

    if (category && category !== "All") filter.category = category;
    if (featured === "true") filter.featured = true;

    let query = Project.find(filter).sort({ order: 1, createdAt: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const projects = await query;
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Increment views
    await project.incrementViews();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create project (Admin only)
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const projectData = {
        ...req.body,
        technologies: JSON.parse(req.body.technologies || "[]"),
        image: req.file ? req.file.path : req.body.image,
      };

      const project = new Project(projectData);
      await project.save();

      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Update project (Admin only)
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        technologies: JSON.parse(req.body.technologies || "[]"),
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Delete project (Admin only)
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
