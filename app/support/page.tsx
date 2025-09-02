'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SupportPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const supportOptions = [
    {
      id: 'participants',
      title: 'BEAM Participants',
      description: 'Support individual students and families participating in BEAM programs',
      amount: 50,
      benefits: ['Direct impact on student success', 'Family support services', 'Educational resources']
    },
    {
      id: 'scholarship',
      title: 'Student Scholarship Trust Fund',
      description: 'Contribute to our scholarship fund to help students access quality education',
      amount: 100,
      benefits: ['Long-term educational impact', 'Multiple student support', 'Sustainable funding model']
    },
    {
      id: 'equity',
      title: 'Real Estate Equity Stakes',
      description: 'Invest in construction bonds for equity stakes in BEAM real estate projects',
      amount: 1000,
      benefits: ['Financial returns potential', 'Community development', 'Real estate ownership']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Support BEAM</h1>
            <p className="text-xl text-gray-300">Choose how you want to make a difference</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ways to Support</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Your support helps us build real schools, careers, and ownership opportunities for our community.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/10 rounded-lg p-6 border-2 transition-all duration-300 cursor-pointer ${
                selectedOption === option.id 
                  ? 'border-yellow-400 bg-yellow-400/10' 
                  : 'border-white/20 hover:border-yellow-400/40'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{option.title}</h3>
              <p className="text-gray-300 mb-4">{option.description}</p>
              <div className="text-2xl font-bold mb-4">${option.amount.toLocaleString()}</div>
              <ul className="space-y-2">
                {option.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Donation Form */}
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-lg p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Support {supportOptions.find(opt => opt.id === selectedOption)?.title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Donation Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Additional Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                      placeholder="Share why you're supporting BEAM..."
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="mr-2"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-300">
                      Make donation anonymous
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:bg-yellow-300 transition-colors">
                Continue to Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
