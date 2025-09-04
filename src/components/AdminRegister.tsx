import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../hooks/useApi";
import toast from "react-hot-toast";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", formData, { withCredentials: true });

      toast.success("Admin registered successfully! Please login.");
      navigate("/admin/login"); // go to login after register
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Admin Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Admin Key"
            value={formData.adminKey}
            onChange={(e) =>
              setFormData({ ...formData, adminKey: e.target.value })
            }
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white 
              py-2 rounded-lg font-medium shadow-lg disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already registered?{" "}
          <Link
            to="/admin/login"
            className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
