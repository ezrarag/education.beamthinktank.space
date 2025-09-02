'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg',
      quote: 'I deeply love and appreciate my team for everything they do!',
      description: 'This team reinforced the importance of building student-centered education that offers value beyond traditional learning, especially in community development. Our programs have exceeded initial growth targets, and we\'ve received positive feedback from families and institutions.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Director of Education',
      image: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/right%20panel%20videos/pexels-yankrukov-8199175.jpg',
      quote: 'We are here to create education that will inspire you.',
      description: 'Leading our educational initiatives with a focus on innovative learning models that combine academic excellence with real-world application.'
    },
    {
      name: 'Dr. Emily Chen',
      role: 'Head of Community Development',
      image: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/right%20panel%20videos/pexels-bertellifotografia-33714912.jpg',
      quote: 'Building bridges between education and community impact.',
      description: 'Specializing in community partnerships and ensuring our programs create lasting positive impact in the neighborhoods we serve.'
    },
    {
      name: 'James Washington',
      role: 'Director of Real Estate',
      image: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/right%20panel%20videos/pexels-davegarcia-31085767.jpg',
      quote: 'Transforming spaces into places of learning and growth.',
      description: 'Overseeing our real estate development projects and ensuring our facilities support the best possible learning environments.'
    }
  ];

  const history = [
    {
      year: '2024',
      title: 'Expansion Year',
      description: 'Celebrates 5 years with expansion to multiple locations and launching our comprehensive scholarship program.'
    },
    {
      year: '2023',
      title: 'Community Recognition',
      description: 'Receives prestigious education award for innovative community-based learning model and student success rates.'
    },
    {
      year: '2022',
      title: 'Real Estate Milestone',
      description: 'Completes first purpose-built educational facility and begins construction on additional campuses.'
    },
    {
      year: '2021',
      title: 'Program Launch',
      description: 'Launches first BEAM programs with focus on hands-on learning and community integration.'
    },
    {
      year: '2020',
      title: 'Foundation',
      description: 'BEAM Education is founded with a vision to transform education through real-world application and community partnership.'
    }
  ];

  const awards = [
    {
      name: 'Excellence in Education Award',
      organization: 'National Education Association',
      year: '2024',
      description: 'Recognition for innovative community-based learning model'
    },
    {
      name: 'Community Impact Award',
      organization: 'Atlanta Business Chronicle',
      year: '2023',
      description: 'Outstanding contribution to community development through education'
    },
    {
      name: 'Innovation in Learning',
      organization: 'Georgia Department of Education',
      year: '2022',
      description: 'Pioneering new approaches to student engagement and success'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Us
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We are a passionate team dedicated to transforming education through real-world application, community partnership, and innovative learning models.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              We transform your vision into beautifully crafted education.
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our mission is to build real schools, careers, and ownership opportunities that create lasting positive impact in our communities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      {/* 
      <div className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-300 text-lg">
              Meet the passionate individuals driving our mission forward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center cursor-pointer"
                onClick={() => setActiveTeamMember(index)}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-yellow-400 mb-4">{member.role}</p>
                {activeTeamMember === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-gray-300"
                  >
                    <p className="italic mb-2">"{member.quote}"</p>
                    <p>{member.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-yellow-400 mb-4"
          >
            500+
          </motion.div>
          <p className="text-2xl text-gray-300">Students Impacted</p>
        </div>
      </div>

      {/* History Section */}
      <div className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our History</h2>
            <p className="text-gray-300 text-lg">
              Our journey is full of interesting stages and events
            </p>
          </motion.div>

          <div className="space-y-8">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start md:items-center gap-8"
              >
                <div className="md:w-1/4">
                  <div className="text-3xl font-bold text-yellow-400">{item.year}</div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Awards</h2>
            <p className="text-gray-300 text-lg">
              Recognition for our commitment to educational excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-lg p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{award.name}</h3>
                <p className="text-gray-300 mb-2">{award.organization}</p>
                <p className="text-yellow-400 font-bold mb-4">{award.year}</p>
                <p className="text-gray-300 text-sm">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      */}

      {/* CTA Section */}
      <div className="py-20 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Join Our Mission</h2>
            <p className="text-xl text-gray-300 mb-8">
              If you're ready to shape the future of education with us, your journey could start here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/join-beam'}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:bg-yellow-300 transition-colors"
              >
                Join Our Team
              </button>
              <button 
                onClick={() => window.location.href = '/partner-with-us'}
                className="bg-transparent border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back Button */}
      <div className="py-16 text-center">
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
}
