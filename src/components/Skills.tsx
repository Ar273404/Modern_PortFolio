// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Plus } from "lucide-react";
// import { useApi } from "../hooks/useApi";
// import { Skill } from "../types";
// import DynamicModal from "./DynamicModal";

// const Skills = () => {
//   const { data: skills, loading, refetch } = useApi<Skill[]>("/skills");
//   const [showModal, setShowModal] = useState(false);

//   const groupedSkills =
//     skills?.reduce((acc, skill) => {
//       if (!acc[skill.category]) {
//         acc[skill.category] = [];
//       }
//       acc[skill.category].push(skill);
//       return acc;
//     }, {} as Record<string, Skill[]>) || {};

//   return (
//     <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//             Skills & Technologies
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
//           <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             A comprehensive toolkit for building modern web applications
//           </p>
//         </motion.div>

//         {/* Add Skill Button */}
//         <motion.button
//           onClick={() => setShowModal(true)}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="fixed top-24 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
//           <Plus className="w-6 h-6" />
//         </motion.button>

//         {/* 3D Rotating Skill Cube */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="flex justify-center mb-16">
//           <div className="relative w-40 h-40 perspective-1000">
//             <motion.div
//               animate={{ rotateY: 360, rotateX: 360 }}
//               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-0 transform-style-preserve-3d">
//               {/* Cube faces */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80 transform rotateY-0 translateZ-20">
//                 <div className="flex items-center justify-center h-full text-white text-4xl">
//                   ⚛️
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 opacity-80 transform rotateY-90 translateZ-20">
//                 <div className="flex items-center justify-center h-full text-white text-4xl">
//                   🟢
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-80 transform rotateY-180 translateZ-20">
//                 <div className="flex items-center justify-center h-full text-white text-4xl">
//                   🍃
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-80 transform rotateY-270 translateZ-20">
//                 <div className="flex items-center justify-center h-full text-white text-4xl">
//                   🚂
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-80 transform rotateX-90 translateZ-20">
//                 <div className="flex items-center justify-center h-full text-white text-4xl">
//                   ☁️
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-80 transform rotateX-270 translateZ-20">
//                 <div className="flex items-center justify-center h-full text-white text-4xl">
//                   🐳
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {loading ? (
//           <div className="space-y-8">
//             {["Frontend", "Backend", "Database", "Tools", "Cloud"].map(
//               (category) => (
//                 <div key={category} className="animate-pulse">
//                   <div className="bg-gray-300 dark:bg-gray-600 h-8 w-32 rounded mb-4"></div>
//                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                     {[...Array(5)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="bg-gray-300 dark:bg-gray-600 h-24 rounded-2xl"></div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         ) : (
//           <div className="space-y-12">
//             {Object.entries(groupedSkills).map(
//               ([category, categorySkills], categoryIndex) => (
//                 <motion.div
//                   key={category}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: categoryIndex * 0.1 }}>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
//                     {category}
//                   </h3>

//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//                     {categorySkills.map((skill, index) => (
//                       <motion.div
//                         key={skill.name}
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{
//                           scale: 1.1,
//                           rotateY: 15,
//                           boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
//                         }}
//                         className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-600 group cursor-pointer"
//                         style={{ transformStyle: "preserve-3d" }}>
//                         <div className="text-center">
//                           <motion.div
//                             whileHover={{ rotate: 360 }}
//                             transition={{ duration: 0.6 }}
//                             className="text-4xl mb-3">
//                             {skill.icon}
//                           </motion.div>
//                           <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                             {skill.name}
//                           </h4>

//                           {/* Proficiency Bar */}
//                           <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
//                             <motion.div
//                               initial={{ width: 0 }}
//                               whileInView={{ width: `${skill.proficiency}%` }}
//                               viewport={{ once: true }}
//                               transition={{ delay: 0.5, duration: 1 }}
//                               className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
//                             />
//                           </div>
//                           <span className="text-sm text-gray-500 dark:text-gray-400">
//                             {skill.proficiency}%
//                           </span>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       <DynamicModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         type="skill"
//         onSuccess={refetch}
//       />
//     </section>
//   );
// };

// export default Skills;


import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Code,
  Server,
  Database,
  Cloud,
  Wrench,
  Terminal,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Skill } from "../types";
import DynamicModal from "./DynamicModal";

const Skills = () => {
  const { data: skills, loading, refetch } = useApi<Skill[]>("/skills");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { name: "All", icon: Terminal, color: "gray" },
    { name: "Frontend", icon: Code, color: "blue" },
    { name: "Backend", icon: Server, color: "green" },
    { name: "Database", icon: Database, color: "purple" },
    { name: "Cloud", icon: Cloud, color: "cyan" },
    { name: "Tools", icon: Wrench, color: "orange" },
    { name: "Programming", icon: Terminal, color: "red" },
  ];

  const filteredSkills =
    skills?.filter(
      (skill) =>
        selectedCategory === "All" || skill.category === selectedCategory
    ) || [];

  const groupedSkills =
    skills?.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>) || {};

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications
          </p>
        </motion.div>

        {/* Add Skill Button */}
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-24 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
          <Plus className="w-6 h-6" />
        </motion.button>

        {/* Category Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.name
                  ? `bg-gradient-to-r from-${category.color}-600 to-${category.color}-700 text-white shadow-lg`
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md"
              }`}>
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.name
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                }`}>
                {category.name === "All"
                  ? skills?.length || 0
                  : groupedSkills[category.name]?.length || 0}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Rotating Skill Cube */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16">
          <div className="relative w-40 h-40 perspective-1000">
            <motion.div
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 transform-style-preserve-3d">
              {/* Cube faces with skill icons */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80 transform rotateY-0 translateZ-20 rounded-lg">
                <div className="flex items-center justify-center h-full text-white text-4xl">
                  ⚛️
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 opacity-80 transform rotateY-90 translateZ-20 rounded-lg">
                <div className="flex items-center justify-center h-full text-white text-4xl">
                  🟢
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-80 transform rotateY-180 translateZ-20 rounded-lg">
                <div className="flex items-center justify-center h-full text-white text-4xl">
                  🍃
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-80 transform rotateY-270 translateZ-20 rounded-lg">
                <div className="flex items-center justify-center h-full text-white text-4xl">
                  🚂
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-80 transform rotateX-90 translateZ-20 rounded-lg">
                <div className="flex items-center justify-center h-full text-white text-4xl">
                  ☁️
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-80 transform rotateX-270 translateZ-20 rounded-lg">
                <div className="flex items-center justify-center h-full text-white text-4xl">
                  🐳
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-600 w-12 h-12 rounded-full mx-auto mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-2 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-600 group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl mb-3">
                    {skill.icon}
                  </motion.div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h4>

                  {/* Category Badge */}
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                      skill.category === "Frontend"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        : skill.category === "Backend"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : skill.category === "Database"
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                        : skill.category === "Cloud"
                        ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300"
                        : skill.category === "Tools"
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    }`}>
                    {skill.category}
                  </div>

                  {/* Proficiency Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredSkills.length === 0 &&
          !loading &&
          selectedCategory !== "All" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No skills found in the {selectedCategory} category.
              </p>
              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Add First {selectedCategory} Skill
              </motion.button>
            </motion.div>
          )}
      </div>

      <DynamicModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="skill"
        onSuccess={refetch}
      />
    </section>
  );
};

export default Skills;