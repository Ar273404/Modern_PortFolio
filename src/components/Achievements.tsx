import { motion } from "framer-motion";
import { Award, Target, Code, Users, Star, GitBranch } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Code,
      title: "100+ Projects",
      description: "Completed various web applications",
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/25",
    },
    {
      icon: Star,
      title: "AI Trainer",
      description: "Training AI models at Outlier AI",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/25",
    },
    {
      icon: Users,
      title: "50+ Collaborations",
      description: "Worked with developers worldwide",
      color: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/25",
    },
    {
      icon: GitBranch,
      title: "Open Source",
      description: "Active contributor to OSS projects",
      color: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/25",
    },
    {
      icon: Target,
      title: "Problem Solver",
      description: "1000+ coding challenges solved",
      color: "from-teal-500 to-blue-500",
      glow: "shadow-teal-500/25",
    },
    {
      icon: Award,
      title: "Top Performer",
      description: "Recognized for excellence in AI training",
      color: "from-yellow-500 to-orange-500",
      glow: "shadow-yellow-500/25",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements & Milestones
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
              className={`bg-gradient-to-br ${achievement.color} p-6 rounded-2xl text-white shadow-xl ${achievement.glow} hover:shadow-2xl transition-all duration-300 text-center group cursor-pointer`}
              style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <achievement.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2 group-hover:scale-110 transition-transform">
                {achievement.title}
              </h3>
              <p className="text-sm opacity-90">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
