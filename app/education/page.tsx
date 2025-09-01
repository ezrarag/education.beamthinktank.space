'use client';

import { motion } from 'framer-motion';

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-8">
              Education for All Ages
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto">
              Powered by Students & Alumni
            </p>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Enroll Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors">
              Join BEAM Staff
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors">
              Partner With Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              PK–College, Year-Round
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              7 Days a Week
            </p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Liberal Arts + Applied Projects</h3>
              <p className="text-gray-300">Combining traditional education with real-world applications</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Trust Accounts</h3>
              <p className="text-gray-300">Financial support system for sustainable education</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Tuition Cliff</h3>
              <p className="text-gray-300">Progressive pricing model for accessibility</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Adaptable Curriculum
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our curriculum highlights adaptability, ensuring every student receives personalized education that grows with them.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
