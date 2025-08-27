'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calculator, TrendingUp, Building2, Users, Target } from 'lucide-react'

interface PropertyInputs {
  propertyValue: number
  squareFootage: number
  currentUse: string
  currentRevenue: number
}

interface ProjectedOutputs {
  totalRevenue: number
  revenueIncrease: number
  timelineYears: number
  equityTransfer: number
}

export default function CalculatorSection() {
  const [inputs, setInputs] = useState<PropertyInputs>({
    propertyValue: 2100000,
    squareFootage: 8500,
    currentUse: 'childcare',
    currentRevenue: 180000
  })

  const [outputs, setOutputs] = useState<ProjectedOutputs>({
    totalRevenue: 310000,
    revenueIncrease: 72,
    timelineYears: 7,
    equityTransfer: 100
  })

  const [isCalculated, setIsCalculated] = useState(false)

  const handleInputChange = (field: keyof PropertyInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    setIsCalculated(false)
  }

  const calculateProjections = () => {
    // Simple calculation logic - in real app, this would be more sophisticated
    const baseRevenue = inputs.currentRevenue
    const squareFootageMultiplier = inputs.squareFootage / 1000
    const additionalRevenue = baseRevenue * 0.7 * squareFootageMultiplier
    
    const newTotalRevenue = baseRevenue + additionalRevenue
    const revenueIncrease = ((newTotalRevenue - baseRevenue) / baseRevenue) * 100
    const timelineYears = Math.max(5, Math.min(10, Math.ceil(revenueIncrease / 10)))
    const equityTransfer = Math.min(100, (timelineYears - 2) * 20)

    setOutputs({
      totalRevenue: Math.round(newTotalRevenue),
      revenueIncrease: Math.round(revenueIncrease),
      timelineYears,
      equityTransfer
    })
    
    setIsCalculated(true)
  }

  const currentUses = [
    { value: 'childcare', label: 'Childcare Facility' },
    { value: 'school', label: 'School Building' },
    { value: 'office', label: 'Office Building' },
    { value: 'retail', label: 'Retail Space' },
    { value: 'warehouse', label: 'Warehouse' }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Calculator className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Property Transformation Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Input your property details to see projected revenue streams and timeline for equity transfer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary-600" />
              Property Details
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Value ($)
                </label>
                <input
                  type="number"
                  value={inputs.propertyValue}
                  onChange={(e) => handleInputChange('propertyValue', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter property value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Square Footage
                </label>
                <input
                  type="number"
                  value={inputs.squareFootage}
                  onChange={(e) => handleInputChange('squareFootage', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter square footage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Use
                </label>
                <select
                  value={inputs.currentUse}
                  onChange={(e) => handleInputChange('currentUse', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {currentUses.map(use => (
                    <option key={use.value} value={use.value}>
                      {use.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Annual Revenue ($)
                </label>
                <input
                  type="number"
                  value={inputs.currentRevenue}
                  onChange={(e) => handleInputChange('currentRevenue', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter current revenue"
                />
              </div>

              <button
                onClick={calculateProjections}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
              >
                Calculate Projections
              </button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-accent-600" />
              Projected Results
            </h3>
            
            {isCalculated ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${outputs.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-800">Projected Revenue</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      +{outputs.revenueIncrease}%
                    </div>
                    <div className="text-sm text-green-800">Revenue Increase</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {outputs.timelineYears} Years
                  </div>
                  <div className="text-sm text-purple-800">Timeline to Full Transfer</div>
                </div>

                {/* Equity Transfer Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Equity Transfer Progress</span>
                    <span className="text-sm font-medium text-gray-700">{outputs.equityTransfer}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${outputs.equityTransfer}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Timeline Visualization */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Transfer Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Years 1-2: Partnership & Revenue Sharing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Years 3-5: Scale Programs & Prepare Transfer</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Years 5-7: Complete Equity Transfer</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your property details and click "Calculate Projections" to see results
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
