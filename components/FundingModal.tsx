'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Building2, Users, Target, TrendingUp, GraduationCap, Globe, MapPin, HeartHandshake } from 'lucide-react'
import { fundingOpportunities, fundingCategories, regions, type FundingOpportunity } from '@/lib/fundingData'
import { useLocation } from '@/contexts/LocationContext'

interface FundingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface OnboardingForm {
  institutionName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  category: string
  region: string
  commitmentType: string
  studentOrgName?: string
  additionalDetails: string
}

const categoryIcons = {
  'University': GraduationCap,
  'Corporate Sponsorship': Building2,
  'Charter/Voucher': Target,
  'Philanthropy': HeartHandshake,
  'EB-5': TrendingUp,
  'Other': Globe
}

export default function FundingModal({ isOpen, onClose }: FundingModalProps) {
  const { userLocation, cityData } = useLocation()
  const [activeStep, setActiveStep] = useState<'overview' | 'onboarding'>('overview')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(Array.from(fundingCategories))
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [showLocalFirst, setShowLocalFirst] = useState(true)
  const [formData, setFormData] = useState<OnboardingForm>({
    institutionName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    category: '',
    region: '',
    commitmentType: '',
    additionalDetails: ''
  })

  // Set default region to user's location when modal opens
  useEffect(() => {
    if (isOpen && userLocation && showLocalFirst) {
      setSelectedRegion(userLocation.region)
    }
  }, [isOpen, userLocation, showLocalFirst])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Filter opportunities based on selected region and local priority
  const getFilteredOpportunities = () => {
    let filtered = selectedRegion === 'all' 
      ? fundingOpportunities
      : fundingOpportunities.filter(opp => opp.region === selectedRegion)

    // If showing local first and user has a location, prioritize local opportunities
    if (showLocalFirst && userLocation && selectedRegion === 'all') {
      const localOpps = filtered.filter(opp => opp.region === userLocation.region)
      const otherOpps = filtered.filter(opp => opp.region !== userLocation.region)
      return [...localOpps, ...otherOpps]
    }

    return filtered
  }

  const filteredOpportunities = getFilteredOpportunities()

  const groupedOpportunities = fundingCategories.reduce((acc, category) => {
    acc[category] = filteredOpportunities.filter(opp => opp.category === category)
    return acc
  }, {} as Record<string, FundingOpportunity[]>)

  const handleInputChange = (field: keyof OnboardingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-generate student org name for universities
    if (field === 'institutionName' && formData.category === 'University') {
      const schoolName = value.replace(/University|College|Institute|School/gi, '').trim()
      if (schoolName) {
        setFormData(prev => ({ 
          ...prev, 
          studentOrgName: `BEAM@${schoolName}` 
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send to your backend
    console.log('Form submitted:', formData)
    
    // For now, we'll just close the modal
    onClose()
    setActiveStep('overview')
    setFormData({
      institutionName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      category: '',
      region: '',
      commitmentType: '',
      additionalDetails: ''
    })
  }

  const isUniversity = formData.category === 'University'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Partner With Us - Funding Opportunities
                </h2>
                {userLocation && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Showing opportunities for {userLocation.city}, {userLocation.state}</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-120px)]">
              {/* Left Side - Overview */}
              <motion.div
                className={`w-1/2 p-6 overflow-y-auto border-r border-gray-200 ${
                  activeStep === 'onboarding' ? 'hidden' : 'block'
                }`}
                initial={{ x: 0 }}
                animate={{ x: activeStep === 'onboarding' ? -100 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Local Priority Toggle */}
                {userLocation && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-blue-900">
                        <input
                          type="checkbox"
                          checked={showLocalFirst}
                          onChange={(e) => setShowLocalFirst(e.target.checked)}
                          className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        Show {userLocation.city} opportunities first
                      </label>
                    </div>
                    <p className="text-xs text-blue-700">
                      When enabled, local funding opportunities will appear at the top of each category.
                    </p>
                  </div>
                )}

                {/* Region Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Funding Categories */}
                <div className="space-y-4">
                  {fundingCategories.map(category => {
                    const Icon = categoryIcons[category]
                    const opportunities = groupedOpportunities[category]
                    const isExpanded = expandedCategories.includes(category)
                    
                    // Count local opportunities for this category
                    const localCount = userLocation ? 
                      opportunities.filter(opp => opp.region === userLocation.region).length : 0
                    
                    return (
                      <div key={category} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-primary-600" />
                            <span className="font-semibold text-gray-900">{category}</span>
                            <span className="text-sm text-gray-500">({opportunities.length})</span>
                            {localCount > 0 && userLocation && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {localCount} local
                              </span>
                            )}
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4"
                          >
                            {opportunities.length === 0 ? (
                              <p className="text-gray-500 text-sm py-2">No opportunities in this category for the selected region.</p>
                            ) : (
                              <div className="space-y-3">
                                {opportunities.map(opportunity => {
                                  const isLocal = userLocation && opportunity.region === userLocation.region
                                  
                                  return (
                                    <div
                                      key={opportunity.id}
                                      className={`p-3 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group ${
                                        isLocal ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                                      }`}
                                      title={opportunity.details}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-medium text-gray-900">{opportunity.name}</h4>
                                          {isLocal && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                              Local
                                            </span>
                                          )}
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                          opportunity.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {opportunity.status}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600">{opportunity.region}</p>
                                      {opportunity.details && (
                                        <p className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          {opportunity.details}
                                        </p>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* CTA Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setActiveStep('onboarding')}
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Activate Your Institution
                  </button>
                </div>
              </motion.div>

              {/* Right Side - Onboarding Form */}
              <motion.div
                className={`w-1/2 p-6 overflow-y-auto ${
                  activeStep === 'onboarding' ? 'block' : 'hidden'
                }`}
                initial={{ x: 100 }}
                animate={{ x: activeStep === 'onboarding' ? 0 : 100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Institution Onboarding</h3>
                  <button
                    onClick={() => setActiveStep('overview')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ← Back to Overview
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Institution Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institutionName}
                      onChange={(e) => handleInputChange('institutionName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your institution name"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="email@institution.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Category and Region */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {fundingCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region *
                      </label>
                      <select
                        required
                        value={formData.region}
                        onChange={(e) => handleInputChange('region', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select region</option>
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Commitment Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commitment Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.commitmentType}
                      onChange={(e) => handleInputChange('commitmentType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Student fellowships, funding, facilities, etc."
                    />
                  </div>

                  {/* University-specific Student Org */}
                  {isUniversity && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Student Organization Required</h4>
                      <p className="text-sm text-blue-800 mb-3">
                        For university partnerships, a student organization must be created following the naming convention "BEAM@[School]".
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Student Organization Name
                        </label>
                        <input
                          type="text"
                          value={formData.studentOrgName || ''}
                          onChange={(e) => handleInputChange('studentOrgName', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="BEAM@[School]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Additional Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      value={formData.additionalDetails}
                      onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us more about your institution and partnership goals..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Submit Partnership Request
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
