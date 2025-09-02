const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Testimonial = require("../models/Testimonial");
require("dotenv").config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: "Arun Kumar",
      email: "arun@example.com",
      password: "admin123",
      role: "admin",
    });
    await adminUser.save();
    console.log("✅ Admin user created");

    // Seed Projects
    const projects = [
      {
        title: "E-Commerce Platform",
        description:
          "Full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
        technologies: [
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "Stripe",
          "JWT",
        ],
        image:
          "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
        demoUrl: "https://demo-ecommerce.vercel.app",
        githubUrl: "https://github.com/yourusername/ecommerce",
        category: "Full Stack",
        featured: true,
        order: 1,
      },
      {
        title: "AI Chat Application",
        description:
          "Real-time chat application with AI integration. Built with React, Socket.io, and OpenAI API for intelligent conversations.",
        technologies: ["React", "Socket.io", "OpenAI", "Node.js", "MongoDB"],
        image:
          "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        demoUrl: "https://ai-chat-demo.vercel.app",
        githubUrl: "https://github.com/yourusername/ai-chat",
        category: "Web App",
        featured: true,
        order: 2,
      },
      {
        title: "Task Management API",
        description:
          "RESTful API for task management with advanced features like team collaboration, file uploads, and real-time notifications.",
        technologies: [
          "Node.js",
          "Express",
          "MongoDB",
          "Socket.io",
          "Cloudinary",
        ],
        image:
          "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
        githubUrl: "https://github.com/yourusername/task-api",
        category: "API",
        featured: false,
        order: 3,
      },
      {
        title: "Social Media Dashboard",
        description:
          "Analytics dashboard for social media management with data visualization and automated reporting features.",
        technologies: ["React", "D3.js", "Node.js", "MongoDB", "Chart.js"],
        image:
          "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
        demoUrl: "https://social-dashboard-demo.vercel.app",
        githubUrl: "https://github.com/yourusername/social-dashboard",
        category: "Web App",
        featured: true,
        order: 4,
      },
    ];

    await Project.insertMany(projects);
    console.log("✅ Projects seeded");

    // Seed Blog Posts
    const blogs = [
      {
        title: "Mastering React Hooks: A Complete Guide",
        excerpt:
          "Deep dive into React Hooks and how to use them effectively in your applications.",
        content: `# Mastering React Hooks

React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore all the essential hooks and advanced patterns.

## Introduction to Hooks

Hooks allow you to use state and other React features without writing a class component. They were introduced in React 16.8 and have become the standard way to write React components.

## useState Hook

The \`useState\` hook is the most basic hook that allows you to add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Custom Hooks

Creating custom hooks allows you to extract component logic into reusable functions:

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
}
\`\`\`

## Best Practices

1. Always follow the rules of hooks
2. Use custom hooks for complex logic
3. Optimize with useMemo and useCallback
4. Handle cleanup in useEffect

## Conclusion

React Hooks provide a powerful and elegant way to manage state and side effects in functional components. Master them to write cleaner, more maintainable React code.`,
        image:
          "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
        author: "Arun Kumar",
        tags: ["React", "JavaScript", "Frontend", "Hooks"],
        published: true,
        publishedAt: new Date("2024-01-20"),
      },
      {
        title: "Building Scalable APIs with Node.js and Express",
        excerpt:
          "Learn best practices for creating scalable and maintainable APIs using Node.js and Express.",
        content: `# Building Scalable APIs with Node.js

Building scalable APIs is crucial for modern web applications. In this guide, we'll explore best practices for creating robust, maintainable APIs.

## Project Structure

A well-organized project structure is the foundation of a scalable API:

\`\`\`
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── app.js
\`\`\`

## Error Handling

Implement centralized error handling:

\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
};
\`\`\`

## Authentication & Authorization

Use JWT for secure authentication:

\`\`\`javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
\`\`\`

## Validation

Use libraries like Joi or express-validator:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
\`\`\`

## Database Optimization

- Use indexing for frequently queried fields
- Implement pagination for large datasets
- Use aggregation pipelines for complex queries

## Caching

Implement Redis for caching frequently accessed data:

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await client.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
\`\`\`

## Conclusion

Building scalable APIs requires careful planning and implementation of best practices. Focus on security, performance, and maintainability from the start.`,
        image:
          "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
        author: "Arun Kumar",
        tags: ["Node.js", "API", "Backend", "Express", "MongoDB"],
        published: true,
        publishedAt: new Date("2024-02-15"),
      },
    ];

    await Blog.insertMany(blogs);
    console.log("✅ Blog posts seeded");

    // Seed Testimonials
    const testimonials = [
      {
        name: "Sarah Johnson",
        email: "sarah@techcorp.com",
        position: "Product Manager",
        company: "TechCorp",
        message:
          "Arun delivered exceptional work on our project. His attention to detail and technical expertise made our product launch successful.",
        rating: 5,
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        approved: true,
        featured: true,
      },
      {
        name: "Michael Chen",
        email: "michael@startupxyz.com",
        position: "CTO",
        company: "StartupXYZ",
        message:
          "Outstanding developer with great problem-solving skills. Arun helped us scale our platform efficiently.",
        rating: 5,
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
        approved: true,
        featured: true,
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log("✅ Testimonials seeded");

    console.log("🎉 Database seeding completed successfully!");
    console.log(`👤 Admin login: arun@example.com / admin123`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
