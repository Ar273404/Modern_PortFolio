import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ChatBot from "./components/ChatBot";
import Achievements from "./components/Achievements";
// import LiveActivity from "./components/LiveActivity";

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
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
