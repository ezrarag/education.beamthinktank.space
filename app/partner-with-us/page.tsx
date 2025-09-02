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

  const beamOrganizations = [
    {
      name: 'Skills BEAM',
      shortName: 'Skills BEAM',
      address: 'skills.beamthinktank.space',
      phone: 'N/A',
      website: 'https://skills.beamthinktank.space',
      type: 'BEAM Think Tank Organization',
      enrollment: 'N/A',
      hasBeamParticipantOrg: true,
      hasInstitutionAdmin: true
    }
  ];

  const atlantaInstitutions = [
    {
      name: 'Georgia Institute of Technology',
      shortName: 'Georgia Tech',
      address: 'North Avenue, Atlanta, GA 30332',
      phone: '(404) 894-2000',
      website: 'https://www.gatech.edu',
      type: 'Public Research University',
      enrollment: '~45,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Georgia State University',
      shortName: 'Georgia State',
      address: '33 Gilmer St SE, Atlanta, GA 30303',
      phone: '(404) 413-2000',
      website: 'https://www.gsu.edu',
      type: 'Public Research University',
      enrollment: '~54,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Spelman College',
      shortName: 'Spelman',
      address: '350 Spelman Ln SW, Atlanta, GA 30314',
      phone: '(404) 681-3643',
      website: 'https://www.spelman.edu',
      type: 'Private Liberal Arts College',
      enrollment: '~2,100 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Morehouse College',
      shortName: 'Morehouse',
      address: '830 Westview Dr SW, Atlanta, GA 30314',
      phone: '(404) 681-2800',
      website: 'https://www.morehouse.edu',
      type: 'Private Liberal Arts College',
      enrollment: '~2,200 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Clark Atlanta University',
      shortName: 'Clark Atlanta',
      address: '223 James P Brawley Dr SW, Atlanta, GA 30314',
      phone: '(404) 880-8000',
      website: 'https://www.cau.edu',
      type: 'Private Research University',
      enrollment: '~4,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Morris Brown College',
      shortName: 'Morris Brown',
      address: '643 Martin Luther King Jr Dr NW, Atlanta, GA 30314',
      phone: '(404) 739-1000',
      website: 'https://www.morrisbrown.edu',
      type: 'Private Liberal Arts College',
      enrollment: '~50 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Emory University',
      shortName: 'Emory',
      address: '201 Dowman Dr, Atlanta, GA 30322',
      phone: '(404) 727-6123',
      website: 'https://www.emory.edu',
      type: 'Private Research University',
      enrollment: '~15,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Morehouse School of Medicine',
      shortName: 'Morehouse School of Medicine',
      address: '720 Westview Dr SW, Atlanta, GA 30310',
      phone: '(404) 752-1500',
      website: 'https://www.msm.edu',
      type: 'Private Medical School',
      enrollment: '~500 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'University of Georgia',
      shortName: 'UGA',
      address: 'Athens, GA 30602',
      phone: '(706) 542-3000',
      website: 'https://www.uga.edu',
      type: 'Public Research University',
      enrollment: '~40,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Savannah College of Art and Design',
      shortName: 'SCAD',
      address: '1600 Peachtree St NW, Atlanta, GA 30309',
      phone: '(404) 253-2700',
      website: 'https://www.scad.edu',
      type: 'Private Art and Design University',
      enrollment: '~15,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Carver College',
      shortName: 'Carver College',
      address: '55 Atlanta Student Movement Blvd, Atlanta, GA 30314',
      phone: '(404) 527-8700',
      website: 'https://www.carver.edu',
      type: 'Private College',
      enrollment: '~300 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Atlanta Metropolitan State College',
      shortName: 'Atlanta Metropolitan',
      address: '1630 Metropolitan Pkwy SW, Atlanta, GA 30310',
      phone: '(404) 756-4000',
      website: 'https://www.atlm.edu',
      type: 'Public Community College',
      enrollment: '~2,500 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Chamberlain College of Nursing',
      shortName: 'Chamberlain',
      address: '5775 Peachtree Industrial Blvd, Atlanta, GA 30341',
      phone: '(404) 459-1900',
      website: 'https://www.chamberlain.edu',
      type: 'Private Nursing College',
      enrollment: '~1,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Herzing University',
      shortName: 'Herzing',
      address: '3393 Peachtree Rd NE, Atlanta, GA 30326',
      phone: '(404) 816-4533',
      website: 'https://www.herzing.edu',
      type: 'Private University',
      enrollment: '~1,500 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Atlanta Technical College',
      shortName: 'Atlanta Technical',
      address: '1560 Metropolitan Pkwy SW, Atlanta, GA 30310',
      phone: '(404) 225-4400',
      website: 'https://www.atlantatech.edu',
      type: 'Public Technical College',
      enrollment: '~3,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Kennesaw State University',
      shortName: 'Kennesaw State',
      address: '1000 Chastain Rd, Kennesaw, GA 30144',
      phone: '(470) 578-6000',
      website: 'https://www.kennesaw.edu',
      type: 'Public University',
      enrollment: '~41,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Oglethorpe University',
      shortName: 'Oglethorpe',
      address: '4484 Peachtree Rd NE, Atlanta, GA 30319',
      phone: '(404) 261-1441',
      website: 'https://www.oglethorpe.edu',
      type: 'Private Liberal Arts University',
      enrollment: '~1,400 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'University of North Georgia',
      shortName: 'UNG',
      address: '82 College Cir, Dahlonega, GA 30597',
      phone: '(706) 864-1400',
      website: 'https://www.ung.edu',
      type: 'Public University',
      enrollment: '~19,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Agnes Scott College',
      shortName: 'Agnes Scott',
      address: '141 E College Ave, Decatur, GA 30030',
      phone: '(404) 471-6000',
      website: 'https://www.agnesscott.edu',
      type: 'Private Liberal Arts College',
      enrollment: '~1,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Ashworth College',
      shortName: 'Ashworth',
      address: '430 Technology Pkwy, Norcross, GA 30092',
      phone: '(770) 729-8400',
      website: 'https://www.ashworthcollege.edu',
      type: 'Private Online College',
      enrollment: '~50,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Georgia Gwinnett College',
      shortName: 'Georgia Gwinnett',
      address: '1000 University Center Ln, Lawrenceville, GA 30043',
      phone: '(678) 407-5000',
      website: 'https://www.ggc.edu',
      type: 'Public College',
      enrollment: '~12,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Oxford College of Emory University',
      shortName: 'Oxford College',
      address: '801 Emory St, Oxford, GA 30054',
      phone: '(770) 784-8888',
      website: 'https://oxford.emory.edu',
      type: 'Private Liberal Arts College',
      enrollment: '~1,000 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    },
    {
      name: 'Point University',
      shortName: 'Point University',
      address: '507 W 10th St, West Point, GA 31833',
      phone: '(706) 645-6019',
      website: 'https://www.point.edu',
      type: 'Private Christian University',
      enrollment: '~1,800 students',
      hasBeamParticipantOrg: false,
      hasInstitutionAdmin: false
    }
  ];

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
        {/* BEAM Organizations Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">BEAM Think Tank Organizations</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Active BEAM organizations and initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beamOrganizations.map((organization, index) => (
              <motion.div
                key={organization.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/40 hover:border-yellow-400/60 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{organization.shortName}</h3>
                  <p className="text-sm text-gray-300 mb-2">{organization.type}</p>
                  <p className="text-xs text-gray-400 mb-3">{organization.enrollment}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-300">
                    <span className="text-gray-400">🌐</span> 
                    <a 
                      href={organization.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      {organization.address}
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">BEAM Participant Org</span>
                    <span className="text-sm px-2 py-1 rounded bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Institution Admin</span>
                    <span className="text-sm px-2 py-1 rounded bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium hover:bg-yellow-300 transition-colors">
                    Visit Organization
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Atlanta Institutions Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Atlanta Area Institutions</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Partner with BEAM Education to create opportunities for your students and institution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {atlantaInstitutions.map((institution, index) => (
              <motion.div
                key={institution.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{institution.shortName}</h3>
                  <p className="text-sm text-gray-300 mb-2">{institution.type}</p>
                  <p className="text-xs text-gray-400 mb-3">{institution.enrollment}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-300">
                    <span className="text-gray-400">📍</span> {institution.address}
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="text-gray-400">📞</span> {institution.phone}
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="text-gray-400">🌐</span> 
                    <a 
                      href={institution.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      {institution.website.replace('https://', '')}
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">BEAM Participant Org</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      institution.hasBeamParticipantOrg 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {institution.hasBeamParticipantOrg ? 'Active' : 'Not Active'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Institution Admin</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      institution.hasInstitutionAdmin 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {institution.hasInstitutionAdmin ? 'Active' : 'Not Active'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {!institution.hasBeamParticipantOrg && (
                    <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium hover:bg-yellow-300 transition-colors">
                      Start Student Organization
                    </button>
                  )}
                  {!institution.hasInstitutionAdmin && (
                    <button className="w-full bg-transparent border border-yellow-400 text-yellow-400 px-4 py-2 rounded text-sm font-medium hover:bg-yellow-400/10 transition-colors">
                      Institution Partnership
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Opportunities Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              BEAM Education provides unique opportunities for institutions to partner in building real schools, careers, and ownership.
            </p>
          </motion.div>

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
