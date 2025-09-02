import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Zap, Users, Award, Calendar, MapPin, Plus } from "lucide-react";
import LiveActivity from "./LiveActivity";
import DynamicModal from "./DynamicModal";
import { useApi } from "../hooks/useApi";

type JourneyItem = {
  type: "work" | "education";
  side: "left" | "right";

  // Work fields
  year?: string;
  title?: string;
  company?: string;
  description?: string;

  // Education fields
  course?: string;
  branch?: string;
  stream?: string;
  yearOfPassing?: string;
  cgpa?: string;
  address?: string;
};

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: journeyData, refetch } = useApi<JourneyItem[]>("/journey");

  const stats = [
    { icon: Code, label: "Projects Completed", value: "50+" },
    { icon: Zap, label: "Technologies Mastered", value: "15+" },
    { icon: Users, label: "Happy Clients", value: "30+" },
    { icon: Award, label: "Years Experience", value: "3+" },
  ];

  const defaultJourney: JourneyItem[] = [
    {
      type: "work",
      year: "2024",
      title: "AI Training Specialist",
      company: "Outlier AI",
      side: "left",
      description:
        "Training AI models for code generation and technical writing",
    },
    {
      type: "work",
      year: "2023",
      title: "Full Stack Developer",
      company: "Tech Startup",
      side: "right",
      description: "Built scalable web applications using MERN stack",
    },
    {
      type: "education",
      course: "B.Tech Computer Science",
      branch: "Computer Science",
      stream: "Engineering",
      yearOfPassing: "2022",
      cgpa: "7.8 CGPA",
      address: "MMMUT, Gorakhpur",
      side: "left",
    },
    {
      type: "work",
      year: "2021",
      title: "Started MERN Journey",
      company: "Self-taught",
      side: "right",
      description: "Began learning modern web development technologies",
    },
  ];

  const journeyItems = journeyData || defaultJourney;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Profile & Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                    alt="Arun Kumar - Professional Headshot"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Passionate Developer & AI Enthusiast
                  </h3>

                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      I'm a dedicated Full Stack Developer with expertise in the
                      MERN stack, currently working as an AI Training Specialist
                      at Outlier AI. My journey in technology began with a
                      curiosity about how things work, which evolved into a
                      passion for building scalable web applications.
                    </p>

                    <p>
                      With over 3 years of experience in web development, I've
                      worked on diverse projects ranging from e-commerce
                      platforms to AI-powered applications. I believe in writing
                      clean, maintainable code and creating user experiences
                      that make a difference.
                    </p>

                    <p>
                      When I'm not coding, you'll find me exploring new
                      technologies, contributing to open source projects, or
                      sharing my knowledge through technical blogs and mentoring
                      aspiring developers.
                    </p>
                  </div>

                  <div className="flex items-center space-x-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Bangalore, India</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Available for opportunities</span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex flex-wrap gap-3">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Node.js",
                      "MongoDB",
                      "AWS",
                      "Python",
                      "AI/ML",
                    ].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {stats.map(({ icon: Icon, label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {value}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Live Activity Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6">
            <LiveActivity />

            {/* Quick Contact Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">Let's Work Together</h3>
              <p className="text-blue-100 mb-4">
                I'm always excited to take on new challenges and collaborate on
                innovative projects.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Journey
            </h3>
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Milestone</span>
            </motion.button>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {journeyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  item.side === "left" ? "justify-start" : "justify-end"
                }`}>
                <div
                  className={`w-5/12 ${
                    item.side === "left" ? "text-left pr-8" : "text-left pl-8"
                  }`}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    }}
                    className={`p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700
                      ${
                        item.side === "left"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "bg-green-100 dark:bg-green-900"
                      }`}>
                    {item.type === "education" ? (
                      <>
                        <div className="mb-2">
                          <span className="text-sm font-semibold  text-gray-700 dark:text-gray-300">
                            Year :
                          </span>{" "}
                          <span className="text-gray-900 dark:text-white">
                            {item.yearOfPassing}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Course :
                          </span>{" "}
                          <span className="text-gray-900 dark:text-white">
                            {item.course}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Branch / Stream :
                          </span>{" "}
                          <span className="text-gray-900 dark:text-white">
                            {item.branch || item.stream}
                          </span>
                        </div>
                        {item.cgpa && (
                          <div className="mb-2">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Score :
                            </span>{" "}
                            <span className="text-gray-900 dark:text-white">
                              {item.cgpa}
                            </span>
                          </div>
                        )}
                        {item.address && (
                          <div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              School / College :
                            </span>{" "}
                            <span className="text-gray-900 dark:text-white">
                              {item.address}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Year :
                          </span>{" "}
                          <span className="text-gray-900 dark:text-white">
                            {item.year}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Title :
                          </span>{" "}
                          <span className="text-gray-900 dark:text-white">
                            {item.title}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Company :
                          </span>{" "}
                          <span className="text-gray-900 dark:text-white">
                            {item.company}
                          </span>
                        </div>
                        {item.description && (
                          <div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Description : 
                            </span>{" "}
                            <span className="text-gray-900 dark:text-white">
                              {item.description}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 
                            bg-gradient-to-r from-blue-600 to-purple-600 rounded-full 
                            border-4 border-white dark:border-gray-900 shadow-lg"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <DynamicModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="journey"
        onSuccess={refetch}
      />
    </section>
  );
};

export default About;
