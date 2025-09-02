import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Analytics, Project, BlogPost, Testimonial } from "../types";
import DynamicModal from "./DynamicModal"; // ✅ Modal reused

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // ✅ States for different modals
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);

  const { data: analytics } = useApi<Analytics>("/analytics");
  const { data: projects, refetch: refetchProjects } =
    useApi<Project[]>("/projects");
  const { data: blogs, refetch: refetchBlogs } = useApi<BlogPost[]>("/blogs");
  const { data: testimonials, refetch: refetchTestimonials } =
    useApi<Testimonial[]>("/testimonials");

  // Tailwind-safe color mapping
  const colorClasses = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
    },
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "blogs", label: "Blogs", icon: Edit },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    {
      label: "Total Visitors",
      value: analytics?.visitorCount || 0,
      icon: Users,
      color: "blue",
    },
    {
      label: "Project Views",
      value: analytics?.projectClicks || 0,
      icon: Eye,
      color: "green",
    },
    {
      label: "Contact Requests",
      value: analytics?.contactRequests || 0,
      icon: MessageSquare,
      color: "purple",
    },
    {
      label: "Blog Views",
      value: analytics?.blogViews || 0,
      icon: FileText,
      color: "orange",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Admin Panel
            </h2>

            <nav className="space-y-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  whileHover={{ x: 5 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard Overview
              </h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(({ label, value, icon: Icon, color }, index) => {
                  const classes =
                    colorClasses[color as keyof typeof colorClasses];
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${classes.bg}`}>
                          <Icon className={`w-6 h-6 ${classes.text}`} />
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="text-2xl font-bold text-gray-900 dark:text-white">
                          {value.toLocaleString()}
                        </motion.div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
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
                  onClick={() => setShowProjectModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Project</span>
                </motion.button>
              </div>

              {/* Projects Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Project
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Featured
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {projects?.map((project) => (
                        <motion.tr
                          key={project._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{
                            backgroundColor: "rgba(59, 130, 246, 0.05)",
                          }}
                          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {project.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {project.technologies.slice(0, 2).join(", ")}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                              {project.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                project.featured
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                  : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
                              }`}>
                              {project.featured ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blogs Tab */}
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
                  onClick={() => setShowBlogModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>New Post</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
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
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
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

          {/* Testimonials Tab */}
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
                  onClick={() => setShowTestimonialModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
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
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            testimonial.avatar ||
                            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                          }
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.position} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            testimonial.approved
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          }`}>
                          {testimonial.approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 italic">
                      "{testimonial.message}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ✅ Modals */}
      <DynamicModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        type="project"
        onSuccess={refetchProjects}
      />
      <DynamicModal
        isOpen={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        type="blog"
        onSuccess={refetchBlogs}
      />
      <DynamicModal
        isOpen={showTestimonialModal}
        onClose={() => setShowTestimonialModal(false)}
        type="testimonial"
        onSuccess={refetchTestimonials}
      />

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default AdminDashboard;
