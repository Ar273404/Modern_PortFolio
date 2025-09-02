import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, GitBranch, Star, Users } from "lucide-react";

const LiveActivity = () => {
  const [activities, setActivities] = useState([
    {
      type: "commit",
      message: "Updated portfolio design",
      time: "2 hours ago",
      repo: "portfolio-2024",
    },
    {
      type: "star",
      message: "Received a star on MERN-Chat-App",
      time: "5 hours ago",
      repo: "MERN-Chat-App",
    },
    {
      type: "push",
      message: "Pushed new features to e-commerce",
      time: "1 day ago",
      repo: "ecommerce-platform",
    },
    {
      type: "fork",
      message: "Project forked by developer",
      time: "2 days ago",
      repo: "task-management-api",
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "commit":
        return GitBranch;
      case "star":
        return Star;
      case "push":
        return Activity;
      case "fork":
        return Users;
      default:
        return Activity;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "commit":
        return "text-green-600 dark:text-green-400";
      case "star":
        return "text-yellow-600 dark:text-yellow-400";
      case "push":
        return "text-blue-600 dark:text-blue-400";
      case "fork":
        return "text-purple-600 dark:text-purple-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
        <Activity className="w-6 h-6 text-green-500" />
        <span>Live GitHub Activity</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div
                className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-600 ${getColor(
                  activity.type
                )}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.repo}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LiveActivity;
