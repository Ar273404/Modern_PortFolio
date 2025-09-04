import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ExperienceSection from "./components/Experience";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import ChatBot from "./components/ChatBot";
import Achievements from "./components/Achievements";
import ProtectedRoute from "./components/ProtectedRoute";
import AudioSection from "./components/AudioSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Projects />
      <Skills />
      <ExperienceSection />
      <Blog />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatBot />
      <AudioSection/>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Routes>
            {/* Public home */}
            <Route path="/" element={<HomePage />} />

            {/* Admin auth */}
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Projects from "./components/Projects";
// import Skills from "./components/Skills";
// import ExperienceSection from "./components/Experience";
// import Blog from "./components/Blog";
// import Testimonials from "./components/Testimonials";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import AdminDashboard from "./components/AdminDashboard";
// import ChatBot from "./components/ChatBot";
// import Achievements from "./components/Achievements";
// import LiveActivity from "./components/LiveActivity";
// import AudioSection from "./components/AudioSection";

// function HomePage() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <About />
//       <Achievements />
//       <Projects />
//       <Skills />
//       <ExperienceSection />
//       <Blog />
//       <Testimonials />
//       <Contact />
//       <Footer />
//       <ChatBot />
//       <AudioSection />
//     </>
//   );
// }

// function App() {
//   return (
//     <ThemeProvider>
//       <Router>
//         <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//           </Routes>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;