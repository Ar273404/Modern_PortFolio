import { Project, BlogPost, Skill, Experience, Testimonial, Analytics } from '../types';

export const mockData = {
  projects: [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      demoUrl: 'https://demo-ecommerce.vercel.app',
      githubUrl: 'https://github.com/yourusername/ecommerce',
      category: 'Full Stack' as const,
      featured: true,
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      title: 'AI Chat Application',
      description: 'Real-time chat application with AI integration. Built with React, Socket.io, and OpenAI API for intelligent conversations.',
      technologies: ['React', 'Socket.io', 'OpenAI', 'Node.js', 'MongoDB'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      demoUrl: 'https://ai-chat-demo.vercel.app',
      githubUrl: 'https://github.com/yourusername/ai-chat',
      category: 'Web App' as const,
      featured: true,
      createdAt: '2024-02-10'
    },
    {
      _id: '3',
      title: 'Task Management API',
      description: 'RESTful API for task management with advanced features like team collaboration, file uploads, and real-time notifications.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'Cloudinary'],
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      githubUrl: 'https://github.com/yourusername/task-api',
      category: 'API' as const,
      featured: false,
      createdAt: '2024-03-05'
    },
    {
      _id: '4',
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and automated reporting features.',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Chart.js'],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      demoUrl: 'https://social-dashboard-demo.vercel.app',
      githubUrl: 'https://github.com/yourusername/social-dashboard',
      category: 'Web App' as const,
      featured: true,
      createdAt: '2024-03-20'
    }
  ] as Project[],

  blogs: [
    {
      _id: '1',
      title: 'Mastering React Hooks: A Complete Guide',
      excerpt: 'Deep dive into React Hooks and how to use them effectively in your applications.',
      content: `# Mastering React Hooks

React Hooks have revolutionized how we write React components...`,
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      author: 'Arun Kumar',
      publishedAt: '2024-01-20',
      tags: ['React', 'JavaScript', 'Frontend'],
      readTime: 8
    },
    {
      _id: '2',
      title: 'Building Scalable APIs with Node.js',
      excerpt: 'Learn best practices for creating scalable and maintainable APIs using Node.js and Express.',
      content: `# Building Scalable APIs

When building APIs that need to handle thousands of requests...`,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
      author: 'Arun Kumar',
      publishedAt: '2024-02-15',
      tags: ['Node.js', 'API', 'Backend'],
      readTime: 12
    }
  ] as BlogPost[],

  skills: [
    { name: 'React', category: 'Frontend' as const, icon: '⚛️', proficiency: 95 },
    { name: 'TypeScript', category: 'Frontend' as const, icon: '📘', proficiency: 90 },
    { name: 'Next.js', category: 'Frontend' as const, icon: '▲', proficiency: 85 },
    { name: 'TailwindCSS', category: 'Frontend' as const, icon: '🎨', proficiency: 92 },
    { name: 'Node.js', category: 'Backend' as const, icon: '🟢', proficiency: 88 },
    { name: 'Express.js', category: 'Backend' as const, icon: '🚂', proficiency: 85 },
    { name: 'MongoDB', category: 'Database' as const, icon: '🍃', proficiency: 80 },
    { name: 'PostgreSQL', category: 'Database' as const, icon: '🐘', proficiency: 75 },
    { name: 'AWS', category: 'Cloud' as const, icon: '☁️', proficiency: 70 },
    { name: 'Docker', category: 'Tools' as const, icon: '🐳', proficiency: 75 }
  ] as Skill[],

  experience: [
    {
      _id: '1',
      company: 'Outlier AI',
      position: 'AI Training Specialist',
      duration: '2024 - Present',
      description: [
        'Training AI models for code generation and technical writing',
        'Developing comprehensive training datasets for MERN stack development',
        'Collaborating with ML engineers to improve model accuracy',
        'Creating documentation and best practices for AI training processes'
      ],
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
      logo: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    },
    {
      _id: '2',
      company: 'Tech Startup',
      position: 'Full Stack Developer Intern',
      duration: '2023 - 2024',
      description: [
        'Developed responsive web applications using MERN stack',
        'Implemented RESTful APIs and database design',
        'Collaborated with design team to create pixel-perfect UIs',
        'Optimized application performance and user experience'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
      logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    }
  ] as Experience[],

  testimonials: [
    {
      _id: '1',
      name: 'Sarah Johnson',
      position: 'Product Manager',
      company: 'TechCorp',
      message: 'Arun delivered exceptional work on our project. His attention to detail and technical expertise made our product launch successful.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      approved: true,
      createdAt: '2024-01-10'
    },
    {
      _id: '2',
      name: 'Michael Chen',
      position: 'CTO',
      company: 'StartupXYZ',
      message: 'Outstanding developer with great problem-solving skills. Arun helped us scale our platform efficiently.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      approved: true,
      createdAt: '2024-02-05'
    }
  ] as Testimonial[],

  analytics: {
    visitorCount: 2847,
    projectClicks: 567,
    contactRequests: 89,
    blogViews: 1234
  } as Analytics
};