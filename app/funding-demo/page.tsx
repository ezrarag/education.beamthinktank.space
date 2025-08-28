'use client'

import { useState } from 'react'
import FundingModal from '@/components/FundingModal'
import FundingAdmin from '@/components/FundingAdmin'

export default function FundingDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Funding Modal Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test the Partner With Us funding modal and admin interface for education.beamthinktank.space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Funding Modal</h2>
            <p className="text-gray-600 mb-6">
              Experience the institutional onboarding flow with funding opportunities display.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Open Funding Modal
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Admin Interface</h2>
            <p className="text-gray-600 mb-6">
              Manage funding opportunities, add new partnerships, and export data.
            </p>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {showAdmin ? 'Hide Admin' : 'Show Admin'}
            </button>
          </div>
        </div>

        {/* Admin Interface */}
        {showAdmin && <FundingAdmin />}

        {/* Funding Modal */}
        <FundingModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  )
}
