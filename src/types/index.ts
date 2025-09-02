export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'Web App' | 'Full Stack' | 'API' | 'Mobile';
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Cloud';
  icon: string;
  proficiency: number;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  message: string;
  avatar?: string;
  approved: boolean;
  createdAt: string;
}

export interface Analytics {
  visitorCount: number;
  projectClicks: number;
  contactRequests: number;
  blogViews: number;
}