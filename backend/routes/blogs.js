const express = require("express");
const Blog = require("../models/Blog");
const { authenticateToken, requireAdmin } = require("../middleware/auth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [
      { width: 800, height: 400, crop: "fill", quality: "auto:good" },
    ],
  },
});

const upload = multer({ storage });

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const { search, tag, limit } = req.query;
    let filter = { published: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (tag && tag !== "All") {
      filter.tags = tag;
    }

    let query = Blog.find(filter).sort({ publishedAt: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const blogs = await query;
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get single blog
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create blog (Admin only)
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {

      let tags = req.body.tags;

      if (Array.isArray(tags)) {
        // Already array from frontend
      } else if (typeof tags === "string") {
        try {
          tags = JSON.parse(tags); // In case frontend sends a JSON string
        } catch {
          tags = tags.split(",").map((t) => t.trim());
        }
      } else {
        tags = [];
      }
      
const blogData = {
  ...req.body,
  tags,
  image: req.file ? req.file.path : req.body.image,
  published: req.body.published === "true" || req.body.published === true,
  publishedAt:
    req.body.published === "true" || req.body.published === true
      ? new Date()
      : null,
};

      const blog = new Blog(blogData);
      await blog.save();

      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Update blog (Admin only)
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        tags: JSON.parse(req.body.tags || "[]"),
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      if (req.body.published === "true" && !req.body.publishedAt) {
        updateData.publishedAt = new Date();
      }

      const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      });
      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Delete blog (Admin only)
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
