import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../hooks/useApi";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "skill" | "experience" | "journey";
  onSuccess: () => void;
}

const DynamicModal = ({
  isOpen,
  onClose,
  type,
  onSuccess,
}: DynamicModalProps) => {
  const [formData, setFormData] = useState<any>({ type: "education" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let endpoint = "";
      let data = { ...formData };

      switch (type) {
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
            description:
              formData.description
                ?.split("\n")
                .filter((line: string) => line.trim()) || [],
            technologies:
              formData.technologies
                ?.split(",")
                .map((tech: string) => tech.trim()) || [],
            logo: formData.logo,
          };
          break;

        case "journey":
          endpoint = "/journey";

          if (formData.type === "education") {
            data = {
              type: "education",
              course: formData.course,
              branch: formData.branch,
              stream: formData.stream,
              yearOfPassing: formData.yearOfPassing,
              cgpa: formData.cgpa,
              address: formData.address,
              side: formData.side || "left",
            };
          } else {
            data = {
              type: "work",
              year: formData.year,
              title: formData.title,
              company: formData.company,
              description: formData.description,
              side: formData.side || "right",
            };
          }
          break;
      }

      await api.post(endpoint, data);
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`
      );
      setFormData({});
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to add ${type}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case "skill":
        return (
          <>
            {/* Skill Form */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Skill Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., React"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                title="hi"
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required>
                  <option value="">Select Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Icon</label>
                <input
                  type="text"
                  value={formData.icon || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="⚛️"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Proficiency (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="85"
                  required
                />
              </div>
            </div>
          </>
        );

      case "experience":
        return (
          <>
            {/* Experience Form */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Company</label>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg text-blue-800"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Position</label>
                <input
                  type="text"
                  value={formData.position || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg text-blue-800"
                  placeholder="Job Title"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Duration</label>
              <input
                type="text"
                value={formData.duration || ""}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-blue-800"
                placeholder="2023 - Present"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border rounded-lg text-blue-800"
                placeholder="Worked on..."
                required
              />
            </div>
          </>
        );

      case "journey":
        return (
          <>
            {/* Toggle Work / Education */}
            <div className="flex space-x-2 -mt-4">
              <button
                type="button"
                className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                  formData.type === "education"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900"
                }`}
                onClick={() => setFormData({ ...formData, type: "education" })}>
                Education
              </button>
              <button
                type="button"
                className={`flex-1 px-4 py-2  rounded-lg font-medium ${
                  formData.type === "work" || !formData.type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900"
                }`}
                onClick={() => setFormData({ ...formData, type: "work" })}>
                Work
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium ">
                Card Position
              </label>
              <div className=" space-x-4">
                <label className=" items-center space-x-2">
                  <input
                    type="radio"
                    name="side"
                    value="left"
                    checked={formData.side === "left"}
                    onChange={(e) =>
                      setFormData({ ...formData, side: e.target.value })
                    }
                  />
                  <span>Left</span>
                </label>
                <label className=" items-center space-x-2">
                  <input
                    type="radio"
                    name="side"
                    value="right"
                    checked={formData.side === "right"}
                    onChange={(e) =>
                      setFormData({ ...formData, side: e.target.value })
                    }
                  />
                  <span>Right</span>
                </label>
              </div>
            </div>

            {formData.type === "education" ? (
              <>
                {/* Education Form */}
                <div>
                  <label className="block text-sm font-medium">Course</label>
                  <input
                    type="text"
                    value={formData.course || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full px-4 py-1 border rounded-lg text-blue-900 font-medium"
                    placeholder="10th / 12th / Graduation"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    {formData.course?.toLowerCase().includes("10") ||
                    formData.course?.toLowerCase().includes("12")
                      ? "Board"
                      : "Branch"}
                  </label>
                  <input
                    type="text"
                    value={formData.branch || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                    className="w-full px-4 py-1 border rounded-lg text-blue-900 font-medium"
                    placeholder={
                      formData.course?.toLowerCase().includes("10") ||
                      formData.course?.toLowerCase().includes("12")
                        ? "CBSE / ICSE"
                        : "Computer Science"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Stream</label>
                  <input
                    type="text"
                    value={formData.stream || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, stream: e.target.value })
                    }
                    className="w-full px-4 py-1 border rounded-lg text-blue-900 font-medium"
                    placeholder="Science / Commerce / Arts"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Year of Passing
                  </label>
                  <input
                    type="text"
                    value={formData.yearOfPassing || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yearOfPassing: e.target.value,
                      })
                    }
                    className="w-full px-4 py-1 border rounded-lg text-blue-900 font-medium"
                    placeholder="2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">CGPA / %</label>
                  <input
                    type="text"
                    value={formData.cgpa || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, cgpa: e.target.value })
                    }
                    className="w-full px-4 py-1 border rounded-lg text-blue-900 font-medium"
                    placeholder="8.5 / 85%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <textarea
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-1 border rounded-lg text-blue-900 font-medium"
                    placeholder="School / College address"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Work Form */}
                <div>
                  <label className="block text-sm font-medium">Year</label>
                  <input
                    type="text"
                    value={formData.year || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Software Engineer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <input
                    type="text"
                    value={formData.company || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Google"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Worked on AI model training..."
                    required
                  />
                </div>
              </>
            )}
          </>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "skill":
        return "Add New Skill";
      case "experience":
        return "Add New Experience";
      case "journey":
        return "Add Journey Milestone";
      default:
        return "Add New Item";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{getTitle()}</h3>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {renderForm()}

              <div className="flex space-x-3 ">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border rounded-lg">
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                  {isSubmitting ? "Saving..." : "Add"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicModal;


// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import toast from "react-hot-toast";
// import { api } from "../hooks/useApi";

// interface DynamicModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: "skill" | "experience" | "journey" | "project" | "blog" | "testimonial";
//   onSuccess: () => void;
// }

// const DynamicModal = ({
//   isOpen,
//   onClose,
//   type,
//   onSuccess,
// }: DynamicModalProps) => {
//   const [formData, setFormData] = useState<any>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       let endpoint = "";
//       let data = { ...formData };

//       switch (type) {
//         case "project":
//           endpoint = "/projects";
//           data.technologies = formData.technologies
//             ?.split(",")
//             .map((t: string) => t.trim());
//           data.featured = formData.featured === "true";
//           break;

//         case "blog":
//           endpoint = "/blogs";
//           data.tags = formData.tags?.split(",").map((t: string) => t.trim());
//           data.published = formData.published === "true";
//           break;

//         case "testimonial":
//           endpoint = "/testimonials";
//           data.approved = formData.approved === "true";
//           data.featured = formData.featured === "true";
//           break;

//         // skill, experience, journey cases you already had...
//       }

//       await api.post(endpoint, data);
//       toast.success(`${type} added successfully!`);
//       setFormData({});
//       onSuccess();
//       onClose();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || `Failed to add ${type}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ Render forms
//   const renderForm = () => {
//     switch (type) {
//       case "project":
//         return (
//           <>
//             <input
//               type="text"
//               placeholder="Title"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.title || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Description"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.description || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Technologies (comma separated)"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.technologies || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, technologies: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.image || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, image: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Demo URL"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.demoUrl || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, demoUrl: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="GitHub URL"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.githubUrl || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, githubUrl: e.target.value })
//               }
//             />
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.category || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, category: e.target.value })
//               }
//               required>
//               <option value="">Select Category</option>
//               <option>Web App</option>
//               <option>Full Stack</option>
//               <option>API</option>
//               <option>Mobile</option>
//             </select>
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.status || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value })
//               }>
//               <option value="completed">Completed</option>
//               <option value="in-progress">In Progress</option>
//               <option value="planning">Planning</option>
//             </select>
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.featured || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, featured: e.target.value })
//               }>
//               <option value="false">Not Featured</option>
//               <option value="true">Featured</option>
//             </select>
//           </>
//         );

//       case "blog":
//         return (
//           <>
//             <input
//               type="text"
//               placeholder="Title"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.title || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Excerpt"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.excerpt || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, excerpt: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Content"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.content || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, content: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.image || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, image: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Author"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.author || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, author: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Tags (comma separated)"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.tags || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, tags: e.target.value })
//               }
//             />
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.published || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, published: e.target.value })
//               }>
//               <option value="false">Draft</option>
//               <option value="true">Published</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Meta Title"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.metaTitle || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, metaTitle: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Meta Description"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.metaDescription || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, metaDescription: e.target.value })
//               }
//             />
//           </>
//         );

//       case "testimonial":
//         return (
//           <>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.name || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.email || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Position"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.position || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, position: e.target.value })
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Company"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.company || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, company: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Message"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.message || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, message: e.target.value })
//               }
//               required
//             />
//             <input
//               type="number"
//               placeholder="Rating (1-5)"
//               min={1}
//               max={5}
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.rating || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, rating: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Avatar URL"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.avatar || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, avatar: e.target.value })
//               }
//             />
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.approved || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, approved: e.target.value })
//               }>
//               <option value="false">Not Approved</option>
//               <option value="true">Approved</option>
//             </select>
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.featured || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, featured: e.target.value })
//               }>
//               <option value="false">Not Featured</option>
//               <option value="true">Featured</option>
//             </select>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={onClose}>
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold capitalize">Add {type}</h3>
//               <motion.button
//                 onClick={onClose}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
//                 <X className="w-5 h-5 text-gray-500" />
//               </motion.button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {renderForm()}
//               <div className="flex space-x-3 pt-4">
//                 <motion.button
//                   type="button"
//                   onClick={onClose}
//                   className="flex-1 px-4 py-2 border rounded-lg">
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
//                   {isSubmitting ? "Saving..." : "Add"}
//                 </motion.button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DynamicModal;
