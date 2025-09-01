'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function JoinBeamPage() {
  const [selectedRole, setSelectedRole] = useState('');

  const opportunities = [
    {
      title: 'Teaching',
      description: 'Share your expertise and inspire the next generation',
      requirements: ['Bachelor\'s degree', 'Teaching experience preferred', 'Passion for education']
    },
    {
      title: 'Administration',
      description: 'Help manage and grow our educational programs',
      requirements: ['Organizational skills', 'Leadership experience', 'Education background']
    },
    {
      title: 'Governance',
      description: 'Shape the future of BEAM Education',
      requirements: ['Strategic thinking', 'Board experience', 'Education policy knowledge']
    }
  ];

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
              Join BEAM Staff
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto">
              Be part of a team that's transforming education for all ages
            </p>
          </motion.div>

          {/* Opportunities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-4">{opportunity.title}</h3>
                <p className="text-gray-300 mb-6">{opportunity.description}</p>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center text-sm text-gray-300">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Equity + Wage Model */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Equity + Wage Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Fair Compensation</h3>
                <p className="text-gray-300 mb-4">
                  We believe in paying our staff competitively while ensuring sustainable growth for our organization.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Competitive base salaries</li>
                  <li>• Performance-based bonuses</li>
                  <li>• Health and retirement benefits</li>
                  <li>• Professional development opportunities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Equity Participation</h3>
                <p className="text-gray-300 mb-4">
                  Staff members have the opportunity to participate in the organization's success through equity sharing.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Equity grants for long-term staff</li>
                  <li>• Profit sharing programs</li>
                  <li>• Decision-making participation</li>
                  <li>• Community ownership model</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
