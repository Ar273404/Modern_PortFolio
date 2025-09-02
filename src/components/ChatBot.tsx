import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm Arun's AI assistant. Ask me about his experience, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const responses = {
    experience:
      "Arun is currently working as an AI Training Specialist at Outlier AI, where he trains AI models for code generation. He has 3+ years of experience in full-stack development with the MERN stack and has completed 50+ projects.",
    skills:
      "Arun's core skills include React (95%), TypeScript (90%), Node.js (88%), MongoDB (80%), and AWS (70%). He's also experienced with Next.js, Express.js, Python, and various AI/ML technologies.",
    projects:
      "Arun has built several impressive projects including an AI Chat Application, E-Commerce Platform, Social Media Dashboard, and Task Management API. All projects showcase his full-stack capabilities with modern technologies.",
    contact:
      "You can reach Arun at arun@example.com or through the contact form on this website. He typically responds within 24 hours and is always excited to discuss new opportunities.",
    education:
      "Arun is a Computer Science graduate (2022) who started his MERN journey in 2021. He's been continuously learning and building projects, now specializing in AI training and full-stack development.",
    technologies:
      "Arun works with React, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL, AWS, Docker, Python, TensorFlow, and many other modern technologies. He's always learning new tools to stay current.",
    ai: "At Outlier AI, Arun trains AI models for code generation and technical writing. He develops comprehensive training datasets for MERN stack development and collaborates with ML engineers to improve model accuracy.",
    portfolio:
      "This portfolio is built with React, TypeScript, Tailwind CSS, Framer Motion for animations, Node.js backend, MongoDB database, and includes features like dark mode, dynamic content management, and real-time analytics.",
    hire: "Arun is available for full-time opportunities, freelance projects, and consulting work. He's particularly interested in full-stack development roles, AI/ML projects, and innovative startups. Feel free to reach out!",
    default:
      "That's an interesting question! You can find more details in the relevant sections of the portfolio, or feel free to contact Arun directly for specific inquiries. Try asking about his experience, skills, projects, or how to hire him!",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const lowercaseInput = userMessage.toLowerCase();
      let response = responses.default;

      // Find matching response
      for (const [keyword, answer] of Object.entries(responses)) {
        if (keyword !== "default" && lowercaseInput.includes(keyword)) {
          response = answer;
          break;
        }
      }

      // Check for greetings
      if (
        /^(hi|hello|hey|good morning|good afternoon|good evening)/i.test(
          lowercaseInput
        )
      ) {
        response =
          "Hello! I'm here to help you learn more about Arun Kumar. You can ask me about his experience, skills, projects, or anything else you'd like to know!";
      }

      // Check for thanks
      if (/^(thanks|thank you|thx)/i.test(lowercaseInput)) {
        response =
          "You're welcome! Is there anything else you'd like to know about Arun's background or work?";
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
    }, 1500);
  };

  const quickQuestions = [
    "Tell me about his experience",
    "What are his main skills?",
    "Show me his projects",
    "How can I contact him?",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50">
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-40 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}>
                  <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Portfolio Assistant</h3>
                  <p className="text-sm opacity-90">
                    Ask me anything about Arun!
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Quick questions:
                </p>
                <div className="space-y-1">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setInput(question);
                        setTimeout(() => handleSend(), 100);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full text-left text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about experience, skills..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isTyping || !input.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
