import { useState, useEffect, SVGProps } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail , Globe} from "lucide-react";
import ProfileImage from "../public/Image/Phtot1.png"
import { JSX } from "react/jsx-runtime";

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Trigger download
      const link = document.createElement("a");
      link.href =
        "https://drive.google.com/uc?export=download&id=1vI0MLl-RoGoOKFmQHo_sLbecQycdr4cl";
      // 🔗 use public folder or Google Drive direct link
      link.download = "Arun_Yadav_Resume.pdf";
      link.click();
    }, 4000); // 4 seconds animation
  };
  const titles = [
    "Full Stack MERN Developer",
    "C/C++ & Problem Solving Expert",
    "AI Trainer Expert",
    "Problem Solver",
    "JavaScript & TypeScript Developer",
    "Open Source & Continuous Learner",
  ];

  // ✅ Custom SVGs for LeetCode & CodeChef
  const LeetCodeIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.6 18.2L11.3 12l6.3-6.2-1.6-1.6-7.9 7.8 7.9 7.8 1.6-1.6z"
        fill="currentColor"
      />
      <path
        d="M21 12c0-5-4-9-9-9s-9 4-9 9 4 9 9 9c2.5 0 4.8-1 6.5-2.7l-1.4-1.4C15.8 18.1 14 19 12 19c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7h2z"
        fill="currentColor"
      />
    </svg>
  );

  const CodeChefIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Ar273404",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/arun273404/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:arun273404@gmail.com",
      label: "Email",
    },
    {
      icon: LeetCodeIcon,
      href: "https://leetcode.com/u/Arun_0806/",
      label: "LeetCode",
    },
    {
      icon: CodeChefIcon,
      href: "https://www.codechef.com/users/ar0806",
      label: "CodeChef",
    },
    {
      icon: Globe,
      href: "https://final-portfolio-fronted.vercel.app/", // 🔗 put your actual old portfolio link here
      label: "Old Portfolio",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = titles[currentIndex];

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % titles.length);
          }
        } else {
          setCurrentText(current.substring(0, currentText.length + 1));

          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, titles]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Arun Yadav
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-16">
              I'm a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Full Stack MERN Developer with strong problem-solving skills in
              Data Structures & Algorithms and hands-on experience in scalable
              web applications and AI model training. Passionate about building
              innovative, user-focused products that create real-world impact
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.button> */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="flex items-center space-x-2">
                    <ArrowDown className="w-5 h-5" />
                    <span>Preparing download...</span>
                  </motion.div>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Resume</span>
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-full font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }>
                View Projects 👁️👁️
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="flex items-center space-x-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -6,
                    rotate: 360,
                    transition: { duration: 0.3, ease: "easeInOut" }, // 👈 smooth hover
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative flex flex-col items-center">
                    <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    <span className="absolute top-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 text-xs text-gray-700 dark:text-gray-300 transition-all duration-500 ease-in-out">
                      {label}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Professional Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center lg:justify-end">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 rounded-full blur-xl opacity-70"
              />

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotateY: 25,
                  rotateX: 25,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                animate={{
                  y: [0, -8, 0], // floating effect
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}>
                <motion.img
                  src={ProfileImage}
                  alt="Arun Yadav - Full Stack Developer"
                  className="w-full h-full object-cover py-2"
                  initial={{ scale: 1.1 }}
                  animate={{
                    scale: [1.1, 1.05, 1.1], // subtle zoom in/out
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent" />

                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-blue-500"
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Top-right React atom */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 right-1 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">⚛️</span>
              </motion.div>

              {/* Bottom-left Node orb */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 left-1 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🟢</span>
              </motion.div>

              {/* Left-center leaf */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -left-14 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🍃</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -right-14 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🍃</span>
              </motion.div>

              {/* Top-left fire */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -left-8 w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🔥</span>
              </motion.div>

              {/* Bottom-right water drop */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">💧</span>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }>
          <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
