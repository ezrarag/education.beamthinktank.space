'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PartnerWithUsPage() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: '',
    contributionAmount: '',
    message: ''
  });

  const opportunities = [
    {
      title: 'Student Business Development',
      description: 'Students build real businesses with equity while learning academically',
      benefits: ['Hands-on entrepreneurship experience', 'Equity ownership opportunities', 'Academic credit integration']
    },
    {
      title: 'University Investment Portal',
      description: 'Direct investment opportunities in BEAM construction and development projects',
      benefits: ['Financial returns potential', 'Community impact', 'Strategic partnerships']
    },
    {
      title: 'Academic Integration',
      description: 'Seamless integration of BEAM programs with university curriculum',
      benefits: ['Credit transfer options', 'Internship opportunities', 'Research collaboration']
    }
  ];

  const phases = [
    {
      number: 1,
      title: 'Initial Contribution',
      description: 'University contributions in the form of tuition/meal/book credits and investment dollars',
      fields: ['institutionName', 'contactName', 'email', 'phone', 'contributionAmount']
    },
    {
      number: 2,
      title: 'Partnership Details',
      description: 'Define the specific university-level interaction and collaboration model',
      fields: ['partnershipType', 'message']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Partner With Us</h1>
            <p className="text-xl text-gray-300">Building the future of education together</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Opportunities Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              BEAM Education provides unique opportunities for institutions to partner in building real schools, careers, and ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 rounded-lg p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold mb-3 text-yellow-400">{opportunity.title}</h3>
                <p className="text-gray-300 mb-4">{opportunity.description}</p>
                <ul className="space-y-2">
                  {opportunity.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership Form */}
        <div className="bg-white/10 rounded-lg p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Start Your Partnership</h2>
            <p className="text-gray-300">Complete the form below to begin your partnership journey</p>
          </div>

          {/* Phase Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {phases.map((phase) => (
                <button
                  key={phase.number}
                  onClick={() => setCurrentPhase(phase.number)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    currentPhase === phase.number
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Phase {phase.number}
                </button>
              ))}
            </div>
          </div>

          {/* Current Phase Info */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              {phases.find(p => p.number === currentPhase)?.title}
            </h3>
            <p className="text-gray-300">
              {phases.find(p => p.number === currentPhase)?.description}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Institution Name *</label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange('institutionName', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  placeholder="Your institution name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  placeholder="Primary contact person"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  placeholder="contact@institution.edu"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              {currentPhase === 1 && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Contribution Amount *</label>
                  <input
                    type="number"
                    value={formData.contributionAmount}
                    onChange={(e) => handleInputChange('contributionAmount', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter amount in dollars"
                    required
                  />
                </div>
              )}

              {currentPhase === 2 && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Partnership Type *</label>
                  <select
                    value={formData.partnershipType}
                    onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="academic">Academic Integration</option>
                    <option value="investment">Investment Partnership</option>
                    <option value="research">Research Collaboration</option>
                    <option value="student">Student Program Integration</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Information</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                placeholder="Tell us more about your institution and partnership goals..."
              />
            </div>

            <div className="flex justify-between items-center">
              {currentPhase > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentPhase(currentPhase - 1)}
                  className="px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
              )}
              
              <div className="flex-1"></div>
              
              {currentPhase < 2 ? (
                <button
                  type="button"
                  onClick={() => setCurrentPhase(currentPhase + 1)}
                  className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-full hover:bg-yellow-300 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-full hover:bg-yellow-300 transition-colors"
                >
                  Submit Partnership Request
                </button>
              )}
            </div>
          </form>
        </div>

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
