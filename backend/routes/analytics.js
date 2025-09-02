const express = require("express");
const Analytics = require("../models/Analytical.js");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Get analytics data (Admin only)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { period = "all" } = req.query;

    let dateFilter = {};
    const now = new Date();

    switch (period) {
      case "today":
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        dateFilter.date = { $gte: today };
        break;
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter.date = { $gte: weekAgo };
        break;
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        dateFilter.date = { $gte: monthAgo };
        break;
    }

    const analytics = await Analytics.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          visitorCount: { $sum: "$visitorCount" },
          projectClicks: { $sum: "$projectClicks" },
          contactRequests: { $sum: "$contactRequests" },
          blogViews: { $sum: "$blogViews" },
        },
      },
    ]);

    const result = analytics[0] || {
      visitorCount: 0,
      projectClicks: 0,
      contactRequests: 0,
      blogViews: 0,
    };

    // Get daily breakdown for charts
    const dailyData = await Analytics.find(dateFilter)
      .sort({ date: 1 })
      .limit(30);

    res.json({
      ...result,
      dailyData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Track visitor (public endpoint)
router.post("/track", async (req, res) => {
  try {
    const { page, action = "visit" } = req.body;

    await Analytics.updateAnalytics(
      page,
      action,
      req.get("User-Agent"),
      req.ip
    );

    res.json({ message: "Analytics tracked successfully" });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    res.status(500).json({ message: "Failed to track analytics" });
  }
});

module.exports = router;
