import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Target, Award, Flame } from "lucide-react";
import { Subject, Badge } from "../types";
import SubjectCard from "./SubjectCard";

interface DashboardProps {
  subjects: Subject[];
  badges: Badge[];
  currentStreak: number;
  onSubjectClick: (subject: Subject) => void;
  onAddSubject?: () => void;
}

export default function Dashboard({
  subjects,
  badges,
  currentStreak,
  onSubjectClick,
  onAddSubject,
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(subjects.map((s) => s.category))];
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalProgress = Math.round(
    subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length
  );
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{totalProgress}%</h3>
              <p className="text-white/80">Overall Progress</p>
            </div>
            <Target size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{currentStreak}</h3>
              <p className="text-white/80">Day Streak</p>
            </div>
            <Flame size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{earnedBadges.length}</h3>
              <p className="text-white/80">Badges Earned</p>
            </div>
            <Award size={32} className="opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Recent Badges */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Achievements
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {earnedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 min-w-[200px]">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                <p className="text-gray-600 text-sm">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {onAddSubject && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddSubject}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-shadow">
              <Plus size={20} />
              Add Subject
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}>
            <SubjectCard
              subject={subject}
              onClick={() => onSubjectClick(subject)}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12">
          <div className="text-gray-400 text-lg">
            No subjects found matching your criteria
          </div>
        </motion.div>
      )}
    </div>
  );
}
