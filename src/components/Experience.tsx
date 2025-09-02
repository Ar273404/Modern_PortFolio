import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Plus } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Experience } from "../types";
import DynamicModal from "./DynamicModal";

const ExperienceSection = () => {
  const {
    data: experiences,
    loading,
    refetch,
  } = useApi<Experience[]>("/experience");
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and the impact I've made
          </p>
        </motion.div>

        {/* Add Experience Button */}
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-24 right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
          <Plus className="w-6 h-6" />
        </motion.button>

        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-300 dark:bg-gray-600 w-16 h-16 rounded-2xl"></div>
                  <div className="flex-1">
                    <div className="bg-gray-300 dark:bg-gray-600 h-6 w-48 rounded mb-2"></div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-4 w-32 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-300 dark:bg-gray-600 h-3 w-full rounded"></div>
                      <div className="bg-gray-300 dark:bg-gray-600 h-3 w-3/4 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {experiences?.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-600">
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-10 h-10 rounded-lg"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {exp.company.charAt(0)}
                      </span>
                    )}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.position}
                        </h3>
                        <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                          {exp.company}
                        </h4>
                      </div>

                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <CalendarDays className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {exp.description.map((desc, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="text-blue-500 mr-3 mt-1">•</span>
                          {desc}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <DynamicModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="experience"
        onSuccess={refetch}
      />
    </section>
  );
};

export default ExperienceSection;
