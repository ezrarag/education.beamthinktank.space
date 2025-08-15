'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Star, DollarSign } from 'lucide-react'

const featuredClasses = [
  {
    id: 1,
    title: 'Advanced Python Programming',
    instructor: 'Dr. Sarah Chen',
    category: 'Academic',
    level: 'Advanced',
    duration: '12 weeks',
    schedule: 'Mondays & Wednesdays',
    time: '6:00 PM - 8:00 PM',
    location: 'New York City',
    price: 299,
    enrolled: 18,
    maxStudents: 25,
    rating: 4.8,
    description: 'Master advanced Python concepts including data structures, algorithms, and web development.',
    startDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Community Mental Health First Aid',
    instructor: 'Dr. Michael Rodriguez',
    category: 'Social Work',
    level: 'Intermediate',
    duration: '8 weeks',
    schedule: 'Tuesdays & Thursdays',
    time: '7:00 PM - 9:00 PM',
    location: 'Los Angeles',
    price: 199,
    enrolled: 22,
    maxStudents: 30,
    rating: 4.9,
    description: 'Learn to recognize and respond to mental health crises in your community.',
    startDate: '2024-01-20'
  },
  {
    id: 3,
    title: 'Creative Writing Workshop',
    instructor: 'Prof. Emily Watson',
    category: 'Academic',
    level: 'All Levels',
    duration: '10 weeks',
    schedule: 'Fridays',
    time: '4:00 PM - 6:00 PM',
    location: 'Chicago',
    price: 249,
    enrolled: 15,
    maxStudents: 20,
    rating: 4.7,
    description: 'Develop your creative voice through poetry, short stories, and personal essays.',
    startDate: '2024-01-25'
  },
  {
    id: 4,
    title: 'Youth Leadership Development',
    instructor: 'Coach James Wilson',
    category: 'Social Work',
    level: 'Teen to Young Adult',
    duration: '16 weeks',
    schedule: 'Saturdays',
    time: '10:00 AM - 12:00 PM',
    location: 'Miami',
    price: 349,
    enrolled: 12,
    maxStudents: 18,
    rating: 4.6,
    description: 'Build leadership skills, confidence, and community engagement abilities.',
    startDate: '2024-02-01'
  }
]

export default function FeaturedClasses() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Classes
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our most popular upcoming classes across academic and social work programs. 
            Limited spots available - enroll today!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredClasses.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      classItem.category === 'Academic' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-secondary-100 text-secondary-700'
                    }`}>
                      {classItem.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {classItem.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {classItem.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {classItem.description}
                  </p>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {classItem.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{classItem.instructor}</div>
                  <div className="text-sm text-gray-500">Instructor</div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{classItem.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{classItem.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{classItem.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{classItem.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{classItem.enrolled}/{classItem.maxStudents}</span>
                </div>
              </div>

              {/* Duration and Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Duration: {classItem.duration}
                </span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xl font-bold text-green-600">
                    {classItem.price}
                  </span>
                </div>
              </div>

              {/* Enrollment Status */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Enrollment Progress</span>
                  <span className="font-medium text-gray-900">
                    {Math.round((classItem.enrolled / classItem.maxStudents) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      classItem.category === 'Academic' ? 'bg-primary-500' : 'bg-secondary-500'
                    }`}
                    style={{ width: `${(classItem.enrolled / classItem.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  classItem.category === 'Academic' 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-secondary-600 hover:bg-secondary-700 text-white'
                }`}>
                  Enroll Now
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Classes CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button className="btn-outline text-lg px-8 py-3">
            View All Available Classes
          </button>
        </motion.div>
      </div>
    </section>
  )
}
