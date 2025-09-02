

// const express = require("express");
// const Journey = require("../models/Journey");

// const router = express.Router();

// // Get all journey items
// router.get("/", async (req, res) => {
//   try {
//     const items = await Journey.find().sort({ year: -1, createdAt: -1 });
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Add new journey item
// router.post("/", async (req, res) => {
//   try {
//     console.log("POST /api/journey body:", req.body); // Debug
//     const { year, title, company, description, side } = req.body;

//     const newItem = new Journey({
//       year,
//       title,
//       company,
//       description,
//       side: side || "left",
//     });

//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Update journey item
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { year, title, company, description, side } = req.body;

//     const updated = await Journey.findByIdAndUpdate(
//       id,
//       { year, title, company, description, side },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Journey item not found" });
//     }

//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Delete journey item
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await Journey.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Journey item not found" });
//     }

//     res.json({ message: "Journey item deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const Journey = require("../models/Journey");

const router = express.Router();

/**
 * @route   GET /api/journey
 * @desc    Get all journey items (both work + education)
 */
router.get("/", async (req, res) => {
  try {
    // Sort: education by yearOfPassing, work by year
    const items = await Journey.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   POST /api/journey
 * @desc    Add a new journey item (work OR education)
 */
router.post("/", async (req, res) => {
  try {
    console.log("POST /api/journey body:", req.body);

    let newItem;

    if (req.body.type === "education") {
      const { course, branch, stream, yearOfPassing, cgpa, address, side } =
        req.body;

      newItem = new Journey({
        type: "education",
        course,
        branch,
        stream,
        yearOfPassing,
        cgpa,
        address,
        side: side || "left",
      });
    } else {
      // Default: work
      const { year, title, company, description, side } = req.body;

      newItem = new Journey({
        type: "work",
        year,
        title,
        company,
        description,
        side: side || "left",
      });
    }

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   PUT /api/journey/:id
 * @desc    Update a journey item
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await Journey.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Journey item not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   DELETE /api/journey/:id
 * @desc    Delete a journey item
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Journey.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Journey item not found" });
    }

    res.json({ message: "Journey item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
