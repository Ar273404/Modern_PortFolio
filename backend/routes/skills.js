const express = require("express");
const router = express.Router();

// In-memory storage for skills (you can replace with MongoDB model)
let skills = [
  { id: "1", name: "React", category: "Frontend", icon: "⚛️", proficiency: 95 },
  {
    id: "2",
    name: "TypeScript",
    category: "Frontend",
    icon: "📘",
    proficiency: 90,
  },
  {
    id: "3",
    name: "Next.js",
    category: "Frontend",
    icon: "▲",
    proficiency: 85,
  },
  {
    id: "4",
    name: "TailwindCSS",
    category: "Frontend",
    icon: "🎨",
    proficiency: 92,
  },
  {
    id: "5",
    name: "Node.js",
    category: "Backend",
    icon: "🟢",
    proficiency: 88,
  },
  {
    id: "6",
    name: "Express.js",
    category: "Backend",
    icon: "🚂",
    proficiency: 85,
  },
  {
    id: "7",
    name: "MongoDB",
    category: "Database",
    icon: "🍃",
    proficiency: 80,
  },
  {
    id: "8",
    name: "PostgreSQL",
    category: "Database",
    icon: "🐘",
    proficiency: 75,
  },
  { id: "9", name: "AWS", category: "Cloud", icon: "☁️", proficiency: 70 },
  { id: "10", name: "Docker", category: "Tools", icon: "🐳", proficiency: 75 },
];

// Get all skills
router.get("/", async (req, res) => {
  try {
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add new skill
router.post("/", async (req, res) => {
  try {
    const { name, category, icon, proficiency } = req.body;

    const newSkill = {
      id: Date.now().toString(),
      name,
      category,
      icon: icon || "🔧",
      proficiency: parseInt(proficiency) || 50,
    };

    skills.push(newSkill);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update skill
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, icon, proficiency } = req.body;

    const skillIndex = skills.findIndex((skill) => skill.id === id);
    if (skillIndex === -1) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skills[skillIndex] = {
      ...skills[skillIndex],
      name,
      category,
      icon,
      proficiency: parseInt(proficiency),
    };

    res.json(skills[skillIndex]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete skill
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const skillIndex = skills.findIndex((skill) => skill.id === id);

    if (skillIndex === -1) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skills.splice(skillIndex, 1);
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
