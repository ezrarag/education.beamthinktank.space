'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Baby, GraduationCap, CheckCircle, Circle } from 'lucide-react'

interface EquipmentItem {
  id: string
  name: string
  category: string
  estimatedCost: number
  funded: boolean
  priority: 'high' | 'medium' | 'low'
}

export default function EquipmentNeedsSection() {
  const equipmentData: EquipmentItem[] = [
    // Classrooms
    { id: '1', name: 'Smart Boards & Projectors', category: 'Classrooms', estimatedCost: 15000, funded: false, priority: 'high' },
    { id: '2', name: 'Computer Workstations', category: 'Classrooms', estimatedCost: 25000, funded: false, priority: 'high' },
    { id: '3', name: 'Flexible Seating', category: 'Classrooms', estimatedCost: 8000, funded: false, priority: 'medium' },
    { id: '4', name: 'Audio/Visual Equipment', category: 'Classrooms', estimatedCost: 12000, funded: false, priority: 'medium' },
    
    // Business Units
    { id: '5', name: 'Tutoring Center Setup', category: 'Business Units', estimatedCost: 18000, funded: false, priority: 'high' },
    { id: '6', name: 'After-School Program Materials', category: 'Business Units', estimatedCost: 15000, funded: false, priority: 'high' },
    { id: '7', name: 'Summer Camp Equipment', category: 'Business Units', estimatedCost: 22000, funded: false, priority: 'medium' },
    { id: '8', name: 'Business Development Office', category: 'Business Units', estimatedCost: 10000, funded: false, priority: 'low' },
    
    // Community Rentals
    { id: '9', name: 'Event Space Furnishings', category: 'Community Rentals', estimatedCost: 20000, funded: false, priority: 'medium' },
    { id: '10', name: 'Coworking Space Setup', category: 'Community Rentals', estimatedCost: 25000, funded: false, priority: 'medium' },
    { id: '11', name: 'Meeting Room Equipment', category: 'Community Rentals', estimatedCost: 12000, funded: false, priority: 'low' },
    { id: '12', name: 'Kitchen & Catering Facilities', category: 'Community Rentals', estimatedCost: 30000, funded: false, priority: 'low' },
    
    // Childcare
    { id: '13', name: 'Enhanced Safety Equipment', category: 'Childcare', estimatedCost: 15000, funded: false, priority: 'high' },
    { id: '14', name: 'Educational Toys & Materials', category: 'Childcare', estimatedCost: 20000, funded: false, priority: 'high' },
    { id: '15', name: 'Outdoor Play Equipment', category: 'Childcare', estimatedCost: 25000, funded: false, priority: 'medium' },
    { id: '16', name: 'Childcare Technology', category: 'Childcare', estimatedCost: 18000, funded: false, priority: 'medium' }
  ]

  const categories = [
    { name: 'Classrooms', icon: GraduationCap, color: 'bg-blue-100', textColor: 'text-blue-800' },
    { name: 'Business Units', icon: Users, color: 'bg-green-100', textColor: 'text-green-800' },
    { name: 'Community Rentals', icon: Building2, color: 'bg-purple-100', textColor: 'text-purple-800' },
    { name: 'Childcare', icon: Baby, color: 'bg-orange-100', textColor: 'text-orange-800' }
  ]

  const totalCost = equipmentData.reduce((sum, item) => sum + item.estimatedCost, 0)
  const fundedCost = equipmentData.filter(item => item.funded).reduce((sum, item) => sum + item.estimatedCost, 0)
  const remainingCost = totalCost - fundedCost

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <section id="equipment-needs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Equipment & Real Estate Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear list of what's required to start transforming properties into education hubs
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">${totalCost.toLocaleString()}</div>
              <div className="text-gray-600">Total Estimated Cost</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">${fundedCost.toLocaleString()}</div>
              <div className="text-gray-600">Funded</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">${remainingCost.toLocaleString()}</div>
              <div className="text-gray-600">Remaining</div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`${category.color} ${category.textColor} px-6 py-3 rounded-full font-medium flex items-center gap-2`}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Equipment List */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="space-y-4">
            {equipmentData.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {item.funded ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className={`font-medium ${item.funded ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </span>
                      <span className="text-sm text-gray-500">{item.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${item.funded ? 'text-green-600' : 'text-gray-900'}`}>
                    ${item.estimatedCost.toLocaleString()}
                  </div>
                  {item.funded && (
                    <div className="text-sm text-green-600">Funded ✓</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note about projections */}
        <motion.div 
          className="mt-8 text-center p-6 bg-blue-50 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-blue-800 font-medium">
            All projections are conservative and based on verified case data from Dr. Moseley's pilot program.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
