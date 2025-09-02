const express = require("express");
const Testimonial = require("../models/Testinomial.js");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Get approved testimonials
router.get("/", async (req, res) => {
  try {
    const { featured } = req.query;
    let filter = { approved: true };

    if (featured === "true") filter.featured = true;

    const testimonials = await Testimonial.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Submit testimonial
router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonial({
      ...req.body,
      approved: false,
      featured: false,
    });

    await testimonial.save();

    res.status(201).json({
      message:
        "Thank you for your testimonial! It will be reviewed and published soon.",
      id: testimonial._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all testimonials for admin
router.get("/admin", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status === "pending") filter.approved = false;
    if (status === "approved") filter.approved = true;

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Approve testimonial (Admin only)
router.put(
  "/:id/approve",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { approved, featured } = req.body;

      const testimonial = await Testimonial.findByIdAndUpdate(
        req.params.id,
        { approved, featured: featured || false },
        { new: true }
      );

      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Delete testimonial (Admin only)
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
