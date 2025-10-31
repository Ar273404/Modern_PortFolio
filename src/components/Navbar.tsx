import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
            MyPortFolio👇👇👇
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                {item.label}
              </motion.a>
            ))}
            <div className="flex items-center space-x-4">
              {/* Admin Button */}
              <motion.a
                href="https://modern-portfolio-2.onrender.com/admin"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 
      text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl 
      transition-all duration-300">
                <span>Admin</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </motion.a>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t dark:border-gray-800">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.label}
                </motion.a>
              ))}

              <div className="flex items-center space-x-4 pt-4 border-t-2 dark:border-gray-800">
                <motion.a
                  href="http://localhost:5173/admin"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 
      text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl 
      transition-all duration-300">
                  <span>Admin</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
