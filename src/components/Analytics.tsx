import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Analytics } from "../types";

const AnalyticsSection = () => {
  const { data: analytics, loading } = useApi<Analytics>("/analytics");

  const chartData = [
    { month: "Jan", visitors: 1200, projects: 150, contacts: 25 },
    { month: "Feb", visitors: 1800, projects: 220, contacts: 35 },
    { month: "Mar", visitors: 2400, projects: 180, contacts: 40 },
    { month: "Apr", visitors: 2847, projects: 567, contacts: 89 },
  ];

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Analytics
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Visitors",
            value: analytics?.visitorCount,
            icon: Users,
            trend: "+12%",
          },
          {
            label: "Project Clicks",
            value: analytics?.projectClicks,
            icon: Eye,
            trend: "+8%",
          },
          {
            label: "Contact Requests",
            value: analytics?.contactRequests,
            icon: BarChart3,
            trend: "+23%",
          },
          {
            label: "Blog Views",
            value: analytics?.blogViews,
            icon: TrendingUp,
            trend: "+15%",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                {metric.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {metric.value?.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Simple Chart Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Monthly Trends
        </h3>
        <div className="flex items-end space-x-4 h-64">
          {chartData.map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ height: 0 }}
              animate={{ height: `${(data.visitors / 3000) * 100}%` }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg min-h-8 relative group">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {data.visitors}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 dark:text-gray-400">
                {data.month}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
