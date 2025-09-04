import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowUp,
  Save,
  X,
  Check,
  HomeIcon,
  Star,
  Code,
  Briefcase,
  LogOut,
  UserPlus,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Zap,
} from "lucide-react";
import { useApi, api } from "../hooks/useApi";
import {
  Analytics,
  Project,
  BlogPost,
  Testimonial,
  Skill,
  Experience,
} from "../types";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    | "project"
    | "blog"
    | "testimonial"
    | "skill"
    | "experience"
    | "admin"
    | "analytics"
    | null
  >(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { data: analytics, refetch: refetchAnalytics } =
    useApi<Analytics>("/analytics");
  const { data: projects, refetch: refetchProjects } =
    useApi<Project[]>("/projects");
  const { data: blogs, refetch: refetchBlogs } = useApi<BlogPost[]>("/blogs");
  const { data: testimonials, refetch: refetchTestimonials } = useApi<
    Testimonial[]
  >("/testimonials/admin");
  const { data: skills, refetch: refetchSkills } = useApi<Skill[]>("/skills");
  const { data: experiences, refetch: refetchExperiences } =
    useApi<Experience[]>("/experience");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: Code },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "admins", label: "Admin Users", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "HomePage", label: "HomePage", icon: HomeIcon },
  ];

  const stats = [
    {
      label: "Total Visitors",
      value: analytics?.visitorCount || 2847,
      icon: Users,
      color: "blue",
      trend: "+12%",
      editable: true,
    },
    {
      label: "Project Views",
      value: analytics?.projectClicks || 567,
      icon: Eye,
      color: "green",
      trend: "+8%",
      editable: true,
    },
    {
      label: "Contact Requests",
      value: analytics?.contactRequests || 89,
      icon: MessageSquare,
      color: "purple",
      trend: "+23%",
      editable: true,
    },
    {
      label: "Blog Views",
      value: analytics?.blogViews || 1234,
      icon: FileText,
      color: "orange",
      trend: "+15%",
      editable: true,
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await api.post("auth/login", loginData);
      localStorage.setItem("adminToken", response.data.token);
      setIsAuthenticated(true);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const openModal = (
    type:
      | "project"
      | "blog"
      | "testimonial"
      | "skill"
      | "experience"
      | "admin"
      | "analytics",
    item?: any
  ) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let endpoint = "";
      let data = { ...formData };

      switch (modalType) {
        case "project":
          endpoint = "/projects";
          data = {
            title: formData.title,
            description: formData.description,
            technologies: Array.isArray(formData.technologies)
              ? formData.technologies
              : formData.technologies
                  ?.split(",")
                  .map((tech: string) => tech.trim()) || [],
            image: formData.image,
            demoUrl: formData.demoUrl,
            githubUrl: formData.githubUrl,
            category: formData.category,
            featured:
              formData.featured === "true" || formData.featured === true,
          };
          break;
        case "blog":
          endpoint = "/blogs";
          data = {
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            image: formData.image,
            tags: Array.isArray(formData.tags)
              ? formData.tags
              : formData.tags?.split(",").map((tag: string) => tag.trim()) ||
                [],
            published:
              formData.published === "true" || formData.published === true,
          };
          break;
        case "skill":
          endpoint = "/skills";
          data = {
            name: formData.name,
            category: formData.category,
            icon: formData.icon || "🔧",
            proficiency: parseInt(formData.proficiency) || 50,
          };
          break;
        case "experience":
          endpoint = "/experience";
          data = {
            company: formData.company,
            position: formData.position,
            duration: formData.duration,
            description: Array.isArray(formData.description)
              ? formData.description
              : formData.description
                  ?.split("\n")
                  .filter((line: string) => line.trim()) || [],
            technologies: Array.isArray(formData.technologies)
              ? formData.technologies
              : formData.technologies
                  ?.split(",")
                  .map((tech: string) => tech.trim()) || [],
            logo: formData.logo,
          };
          break;
        case "testimonial":
          endpoint = "/testimonials";
          data = {
            name: formData.name,
            email: formData.email,
            position: formData.position,
            company: formData.company,
            message: formData.message,
            avatar: formData.avatar,
            approved:
              formData.approved === "true" || formData.approved === true,
            featured:
              formData.featured === "true" || formData.featured === true,
          };
          break;
        case "admin":
          endpoint = "/auth/register";
          data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            adminKey: formData.adminKey,
          };
          break;
        case "analytics":
          endpoint = "/analytics/update";
          data = {
            visitorCount: parseInt(formData.visitorCount) || 0,
            projectClicks: parseInt(formData.projectClicks) || 0,
            contactRequests: parseInt(formData.contactRequests) || 0,
            blogViews: parseInt(formData.blogViews) || 0,
          };
          break;
      }

      if (editingItem && modalType !== "admin" && modalType !== "analytics") {
        await api.put(`${endpoint}/${editingItem._id}`, data);
        toast.success(`${modalType} updated successfully!`);
      } else {
        await api.post(endpoint, data);
        toast.success(
          `${modalType} ${
            modalType === "admin" ? "created" : "added"
          } successfully!`
        );
      }

      // Refetch data
      switch (modalType) {
        case "project":
          refetchProjects();
          break;
        case "blog":
          refetchBlogs();
          break;
        case "skill":
          refetchSkills();
          break;
        case "experience":
          refetchExperiences();
          break;
        case "testimonial":
          refetchTestimonials();
          break;
        case "analytics":
          refetchAnalytics();
          break;
      }

      closeModal();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || `Failed to save ${modalType}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      await api.delete(`/${type}s/${id}`);
      toast.success(`${type} deleted successfully!`);

      // Refetch data
      switch (type) {
        case "project":
          refetchProjects();
          break;
        case "blog":
          refetchBlogs();
          break;
        case "skill":
          refetchSkills();
          break;
        case "experience":
          refetchExperiences();
          break;
        case "testimonial":
          refetchTestimonials();
          break;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to delete ${type}`);
    }
  };

  const handleApproveTestimonial = async (id: string, approved: boolean) => {
    try {
      await api.put(`/testimonials/${id}/approve`, { approved });
      toast.success(`Testimonial ${approved ? "approved" : "rejected"}!`);
      refetchTestimonials();
    } catch (error: any) {
      toast.error("Failed to update testimonial status");
    }
  };

  const renderForm = () => {
    switch (modalType) {
      case "project":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="E-Commerce Platform"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Full-stack e-commerce platform with React, Node.js..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technologies (comma separated) *
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(formData.technologies)
                      ? formData.technologies.join(", ")
                      : formData.technologies || ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                title="form"
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required>
                  <option value="">Select Category</option>
                  <option value="Web App">Web App</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="API">API</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="https://images.pexels.com/..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.demoUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, demoUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://demo.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Featured Project
                </span>
              </label>
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Mastering React Hooks"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt || ""}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the article..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content (Markdown) *
              </label>
              <textarea
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# Blog Title&#10;&#10;Your markdown content here..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.pexels.com/..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma separated) *
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(formData.tags)
                      ? formData.tags.join(", ")
                      : formData.tags || ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="React, JavaScript, Frontend"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.published || false}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Publish immediately
                </span>
              </label>
            </div>
          </div>
        );

      case "skill":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                title="form"
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required>
                  <option value="">Select Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Programming">Programming</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="⚛️"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proficiency (%) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="85"
                  required
                />
              </div>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={formData.position || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Title"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={formData.duration || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="2023 - Present"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (one per line) *
              </label>
              <textarea
                value={
                  Array.isArray(formData.description)
                    ? formData.description.join("\n")
                    : formData.description || ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Developed web applications&#10;Collaborated with team&#10;Implemented new features"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies (comma separated) *
              </label>
              <input
                type="text"
                value={
                  Array.isArray(formData.technologies)
                    ? formData.technologies.join(", ")
                    : formData.technologies || ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, technologies: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>
          </div>
        );

      case "testimonial":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={formData.position || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Product Manager"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="TechCorp"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                value={formData.message || ""}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Arun delivered exceptional work..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                value={formData.avatar || ""}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="https://images.pexels.com/..."
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.approved || false}
                  onChange={(e) =>
                    setFormData({ ...formData, approved: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Approved
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Featured
                </span>
              </label>
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Admin Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Admin Key *
              </label>
              <input
                type="password"
                value={formData.adminKey || ""}
                onChange={(e) =>
                  setFormData({ ...formData, adminKey: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Admin setup key"
                required
              />
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Visitors
                </label>
                <input
                title="visitors"
                  type="number"
                  value={formData.visitorCount || analytics?.visitorCount || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, visitorCount: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Views
                </label>
                <input
                 title='number'
                  type="number"
                  value={
                    formData.projectClicks || analytics?.projectClicks || 0
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, projectClicks: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Requests
                </label>
                <input
                  type="number"
                  value={
                    formData.contactRequests || analytics?.contactRequests || 0
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactRequests: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blog Views
                </label>
                <input
                  type="number"
                  value={formData.blogViews || analytics?.blogViews || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, blogViews: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isLoggingIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2">
              {isLoggingIn ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Login to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Please Contact Arun Yadav (the Super Admin) In Order To Access Admin Page
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Admin Panel
            </motion.h2>

            <nav className="space-y-2">
              {tabs.map(({ id, label, icon: Icon }, index) => (
                <motion.button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
              <motion.button
                onClick={handleLogout}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 mt-4">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard Overview
                </h1>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live</span>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(
                  (
                    { label, value, icon: Icon, color, trend, editable },
                    index
                  ) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative group">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-xl flex items-center justify-center`}>
                          <Icon
                            className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                            {trend}
                          </span>
                          {editable && (
                            <motion.button
                              onClick={() => openModal("analytics")}
                              whileHover={{ scale: 1.1 }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-all">
                              <Edit className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {value.toLocaleString()}
                      </motion.div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {label}
                      </p>
                    </motion.div>
                  )
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Add Project",
                    type: "project",
                    color: "blue",
                    icon: Code,
                  },
                  {
                    label: "Write Article",
                    type: "blog",
                    color: "green",
                    icon: FileText,
                  },
                  {
                    label: "Add Skill",
                    type: "skill",
                    color: "purple",
                    icon: Zap,
                  },
                  {
                    label: "Add Experience",
                    type: "experience",
                    color: "orange",
                    icon: Briefcase,
                  },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    onClick={() => openModal(action.type as any)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r from-${action.color}-600 to-${action.color}-700 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3`}>
                    <action.icon className="w-6 h-6" />
                    <span className="font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <span>Recent Activity</span>
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      action: "New project added",
                      time: "2 hours ago",
                      type: "success",
                      icon: Code,
                    },
                    {
                      action: "Blog post published",
                      time: "1 day ago",
                      type: "info",
                      icon: FileText,
                    },
                    {
                      action: "Contact form submitted",
                      time: "3 days ago",
                      type: "warning",
                      icon: MessageSquare,
                    },
                    {
                      action: "New testimonial received",
                      time: "1 week ago",
                      type: "success",
                      icon: Star,
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "success"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : activity.type === "info"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                        }`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {activity.action}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Manage Projects
                </h1>
                <motion.button
                  onClick={() => openModal("project")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Project</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects?.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-32 object-cover"
                      />
                      {project.featured && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.category === "Full Stack"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : project.category === "Web App"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : project.category === "API"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                          }`}>
                          {project.category}
                        </span>
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => openModal("project", project)}
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete("project", project._id)}
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "blogs" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Manage Blog Posts
                </h1>
                <motion.button
                  onClick={() => openModal("blog")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>New Article</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => openModal("blog", blog)}
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete("blog", blog._id)}
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Manage Skills
                </h1>
                <motion.button
                  onClick={() => openModal("skill")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Skill</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills?.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 text-center relative group">
                    <div className="text-3xl mb-3">{skill.icon}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {skill.category}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {skill.proficiency}%
                    </span>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <motion.button
                        onClick={() => openModal("skill", skill)}
                        whileHover={{ scale: 1.1 }}
                        className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                        <Edit className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete("skill", skill.name)}
                        whileHover={{ scale: 1.1 }}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Manage Experience
                </h1>
                <motion.button
                  onClick={() => openModal("experience")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Experience</span>
                </motion.button>
              </div>

              <div className="space-y-6">
                {experiences?.map((exp, index) => (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          {exp.logo ? (
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="w-8 h-8 rounded-lg"
                            />
                          ) : (
                            <span className="text-white font-bold">
                              {exp.company.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {exp.position}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-500">
                            {exp.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => openModal("experience", exp)}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete("experience", exp._id)}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "testimonials" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Manage Testimonials
                </h1>
                <motion.button
                  onClick={() => openModal("testimonial")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Testimonial</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                {testimonials?.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={
                            testimonial.avatar ||
                            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                          }
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.position} at {testimonial.company}
                          </p>
                          {/* <p className="text-xs text-gray-500 dark:text-gray-500">
                            {testimonial.email}
                          </p> */}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            testimonial.approved
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          }`}>
                          {testimonial.approved ? "Approved" : "Pending"}
                        </span>
                        {testimonial.featured && (
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <blockquote className="text-gray-600 dark:text-gray-400 mt-4 italic border-l-4 border-blue-500 pl-4">
                      "{testimonial.message}"
                    </blockquote>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        {!testimonial.approved && (
                          <motion.button
                            onClick={() =>
                              handleApproveTestimonial(testimonial._id, true)
                            }
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                            <Check className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          onClick={() => openModal("testimonial", testimonial)}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            handleDelete("testimonial", testimonial._id)
                          }
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <motion.button
                  onClick={() => openModal("analytics")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Edit className="w-5 h-5" />
                  <span>Edit Analytics</span>
                </motion.button>
              </div>

              {/* Detailed Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(
                  ({ label, value, icon: Icon, color, trend }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-xl flex items-center justify-center`}>
                          <Icon
                            className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`}
                          />
                        </div>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                          {trend}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {value.toLocaleString()}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {label}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "admins" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Admin Users
                </h1>
                <motion.button
                  onClick={() => openModal("admin")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Add Admin</span>
                </motion.button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Current Admin Users
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Arun Yadav
                        </p>
                        <p className="text-sm text-gray-500">
                          admin@example.com
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                      Super Admin
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Site Configuration */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Site Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Site Title
                      </label>
                      <input
                        title="site title"
                        type="text"
                        defaultValue="Arun Kumar - Full Stack Developer"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        title="textarea"
                        rows={3}
                        defaultValue="Full Stack Developer specializing in MERN stack and AI training"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="arun@example.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Save Configuration
                    </motion.button>
                  </div>
                </div>

                {/* API Configuration */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    API Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Base URL
                      </label>
                      <input
                        type="url"
                        defaultValue="http://localhost:8080/api"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cloudinary Cloud Name
                      </label>
                      <input
                        type="text"
                        placeholder="your-cloud-name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Service
                      </label>
                      <select
                        title="select"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                        <option value="gmail">Gmail</option>
                        <option value="outlook">Outlook</option>
                        <option value="sendgrid">SendGrid</option>
                      </select>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      Update API Settings
                    </motion.button>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        JWT Secret Key
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••••••"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Session Timeout (hours)
                      </label>
                      <input
                        type="number"
                        defaultValue="24"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Enable rate limiting
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                      Update Security
                    </motion.button>
                  </div>
                </div>

                {/* Backup & Export */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Backup & Export
                  </h3>
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                      <Database className="w-5 h-5" />
                      <span>Export Database</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Save className="w-5 h-5" />
                      <span>Create Backup</span>
                    </motion.button>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Last backup: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "HomePage" && (
            <div className="flex items-center space-x-4 pt-4 border-t-2 dark:border-gray-800">
              <motion.a
                href="http://localhost:5173/"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 
                text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl 
                transition-all duration-300">
                <span>HomePage</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </motion.a>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingItem ? `Edit ${modalType}` : `Add New ${modalType}`}
                </h3>
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit}>
                {renderForm()}

                <div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600 mt-6">
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{editingItem ? "Update" : "Create"}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default AdminDashboard;