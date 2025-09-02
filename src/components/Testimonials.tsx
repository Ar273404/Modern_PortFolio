import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Testimonial } from "../types";

const Testimonials = () => {
  const { data: testimonials, loading } =
    useApi<Testimonial[]>("/testimonials");
  const approvedTestimonials = testimonials?.filter((t) => t.approved) || [];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Feedback from clients and colleagues I've had the pleasure to work
            with
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gray-300 dark:bg-gray-600 w-12 h-12 rounded-full"></div>
                  <div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-4 w-24 rounded mb-2"></div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-3 w-32 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-300 dark:bg-gray-600 h-3 w-full rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-600 h-3 w-3/4 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-600 relative"
                style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </motion.div>

                <div className="flex items-center space-x-4 mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={
                      testimonial.avatar ||
                      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    }
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                  "{testimonial.message}"
                </blockquote>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            Leave a Testimonial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
