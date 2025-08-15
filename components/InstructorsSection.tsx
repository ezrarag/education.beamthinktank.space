'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, BookOpen, Users, Award, Mail } from 'lucide-react'

const featuredInstructors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Senior Computer Science Instructor',
    expertise: ['Python Programming', 'Data Science', 'Web Development'],
    location: 'New York City',
    rating: 4.9,
    totalStudents: 1247,
    totalClasses: 45,
    experience: '8+ years',
    education: 'Ph.D. Computer Science, MIT',
    bio: 'Dr. Chen is a passionate educator with expertise in modern programming languages and software development. She has helped hundreds of students transition into tech careers.',
    avatar: '/avatars/sarah-chen.jpg',
    specializations: ['Academic', 'Technology'],
    languages: ['English', 'Mandarin']
  },
  {
    id: 2,
    name: 'Dr. Michael Rodriguez',
    title: 'Clinical Social Worker & Mental Health Specialist',
    expertise: ['Mental Health First Aid', 'Crisis Intervention', 'Community Outreach'],
    location: 'Los Angeles',
    rating: 4.8,
    totalStudents: 892,
    totalClasses: 32,
    experience: '12+ years',
    education: 'Ph.D. Social Work, UCLA',
    bio: 'Dr. Rodriguez specializes in community mental health and has developed innovative programs for underserved populations across Los Angeles.',
    avatar: '/avatars/michael-rodriguez.jpg',
    specializations: ['Social Work', 'Mental Health'],
    languages: ['English', 'Spanish']
  },
  {
    id: 3,
    name: 'Prof. Emily Watson',
    title: 'Creative Writing & Literature Professor',
    expertise: ['Creative Writing', 'Poetry', 'Literature Analysis'],
    location: 'Chicago',
    rating: 4.7,
    totalStudents: 756,
    totalClasses: 28,
    experience: '6+ years',
    education: 'MFA Creative Writing, Columbia University',
    bio: 'Prof. Watson is an award-winning author and educator who inspires students to find their unique voice through creative expression.',
    avatar: '/avatars/emily-watson.jpg',
    specializations: ['Academic', 'Arts & Humanities'],
    languages: ['English']
  },
  {
    id: 4,
    name: 'Coach James Wilson',
    title: 'Youth Development & Leadership Coach',
    expertise: ['Leadership Training', 'Youth Mentoring', 'Community Engagement'],
    location: 'Miami',
    rating: 4.6,
    totalStudents: 634,
    totalClasses: 22,
    experience: '10+ years',
    education: 'M.S. Youth Development, University of Miami',
    bio: 'Coach Wilson has dedicated his career to empowering young people and building strong community leaders through innovative youth programs.',
    avatar: '/avatars/james-wilson.jpg',
    specializations: ['Social Work', 'Youth Development'],
    languages: ['English', 'Spanish']
  }
]

export default function InstructorsSection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Expert Instructors
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn from experienced professionals who are passionate about education and community impact. 
            Our instructors bring real-world expertise to every class.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredInstructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{instructor.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{instructor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{instructor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {instructor.bio}
              </p>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{instructor.totalStudents}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600">{instructor.totalClasses}</div>
                  <div className="text-sm text-gray-600">Classes</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-600">{instructor.experience}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{instructor.education}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Specializations: {instructor.specializations.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Languages: {instructor.languages.join(', ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  View Classes
                </button>
                <button className="flex-1 btn-outline flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become an Instructor CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Team of Instructors
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Are you passionate about education and community impact? We're always looking for 
              talented instructors to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3">
                Apply to Become an Instructor
              </button>
              <button className="btn-outline text-lg px-8 py-3">
                Learn About Our Teaching Model
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
