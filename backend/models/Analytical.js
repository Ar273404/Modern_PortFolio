const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      unique: true,
    },
    visitorCount: {
      type: Number,
      default: 0,
    },
    projectClicks: {
      type: Number,
      default: 0,
    },
    contactRequests: {
      type: Number,
      default: 0,
    },
    blogViews: {
      type: Number,
      default: 0,
    },
    uniqueVisitors: {
      type: [String], // ✅ FIXED: use array instead of Set
      default: [],
    },
    pageViews: {
      type: Map,
      of: Number,
      default: () => new Map(),
    },
    referrers: {
      type: Map,
      of: Number,
      default: () => new Map(),
    },
    deviceTypes: {
      mobile: { type: Number, default: 0 },
      desktop: { type: Number, default: 0 },
      tablet: { type: Number, default: 0 },
    },
    countries: {
      type: Map,
      of: Number,
      default: () => new Map(),
    },
  },
  {
    timestamps: true,
  }
);

// Static method to update analytics
analyticsSchema.statics.updateAnalytics = async function (
  path,
  userAgent = "",
  ip = ""
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    let analytics = await this.findOne({ date: today });

    if (!analytics) {
      analytics = new this({ date: today });
    }

    // Update based on path
    switch (path) {
      case "/api/projects":
        analytics.projectClicks += 1;
        break;
      case "/api/blogs":
        analytics.blogViews += 1;
        break;
      case "/api/contact":
        analytics.contactRequests += 1;
        break;
      default:
        analytics.visitorCount += 1;
    }

    // Track unique visitors (based on IP)
    if (ip && !analytics.uniqueVisitors.includes(ip)) {
      analytics.uniqueVisitors.push(ip);
    }

    // Track device type
    if (userAgent) {
      if (/Mobile|Android|iPhone/i.test(userAgent)) {
        analytics.deviceTypes.mobile += 1;
      } else if (/Tablet|iPad/i.test(userAgent)) {
        analytics.deviceTypes.tablet += 1;
      } else {
        analytics.deviceTypes.desktop += 1;
      }
    }

    await analytics.save();
    return analytics;
  } catch (error) {
    console.error("Analytics update error:", error);
    throw error;
  }
};

// Static method to get aggregated analytics
analyticsSchema.statics.getAnalytics = async function () {
  try {
    const result = await this.aggregate([
      {
        $group: {
          _id: null,
          totalVisitors: { $sum: "$visitorCount" },
          totalProjectClicks: { $sum: "$projectClicks" },
          totalContactRequests: { $sum: "$contactRequests" },
          totalBlogViews: { $sum: "$blogViews" },
        },
      },
    ]);

    return (
      result[0] || {
        totalVisitors: 0,
        totalProjectClicks: 0,
        totalContactRequests: 0,
        totalBlogViews: 0,
      }
    );
  } catch (error) {
    console.error("Analytics fetch error:", error);
    throw error;
  }
};

module.exports = mongoose.model("Analytics", analyticsSchema);
