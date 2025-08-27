'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Simple SVG icons to avoid lucide-react import issues
const XIcon = () => (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CircleIcon = () => (
  <svg className="w-6 h-6 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12m-10 0a10 10 0 110-20 10 10 0 010 20z" />
  </svg>
)

const Building2Icon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const BabyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const GraduationCapIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

interface EquipmentItem {
  id: string
  name: string
  category: string
  estimatedCost: number
  funded: boolean
  priority: 'high' | 'medium' | 'low'
}

interface EquipmentNeedsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EquipmentNeedsModal({ isOpen, onClose }: EquipmentNeedsModalProps) {
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
    { name: 'Classrooms', iconIndex: 0, color: 'bg-blue-100', textColor: 'text-blue-800' },
    { name: 'Business Units', iconIndex: 1, color: 'bg-green-100', textColor: 'text-green-800' },
    { name: 'Community Rentals', iconIndex: 2, color: 'bg-purple-100', textColor: 'text-purple-800' },
    { name: 'Childcare', iconIndex: 3, color: 'bg-orange-100', textColor: 'text-orange-800' }
  ]

  const renderIcon = (iconIndex: number) => {
    switch (iconIndex) {
      case 0:
        return <GraduationCapIcon />
      case 1:
        return <UsersIcon />
      case 2:
        return <Building2Icon />
      case 3:
        return <BabyIcon />
      default:
        return <GraduationCapIcon />
    }
  }

  const [equipment, setEquipment] = useState<EquipmentItem[]>(equipmentData)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleFunded = (id: string) => {
    setEquipment(prev => 
      prev.map(item => 
        item.id === id ? { ...item, funded: !item.funded } : item
      )
    )
  }

  const filteredEquipment = selectedCategory === 'all' 
    ? equipment 
    : equipment.filter(item => item.category === selectedCategory)

  const totalCost = equipment.reduce((sum, item) => sum + item.estimatedCost, 0)
  const fundedCost = equipment.filter(item => item.funded).reduce((sum, item) => sum + item.estimatedCost, 0)
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop overlay - only covers background content */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal content - positioned above backdrop */}
          <div className="relative h-full flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Equipment & Real Estate Needs</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XIcon />
                </button>
              </div>

              {/* Summary Stats */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Estimated Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${fundedCost.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Funded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">${remainingCost.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                        selectedCategory === category.name 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {renderIcon(category.iconIndex)}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment List */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {filteredEquipment.map(item => (
                    <motion.div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleFunded(item.id)}
                          className="flex-shrink-0"
                        >
                          {item.funded ? (
                            <CheckCircleIcon />
                          ) : (
                            <CircleIcon />
                          )}
                        </button>
                        
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
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {equipment.filter(item => item.funded).length} of {equipment.length} items funded
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
