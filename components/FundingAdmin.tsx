'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { fundingOpportunities, fundingCategories, regions, type FundingOpportunity } from '@/lib/fundingData'

export default function FundingAdmin() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>(fundingOpportunities)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<FundingOpportunity | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newOpportunity, setNewOpportunity] = useState<Partial<FundingOpportunity>>({
    category: 'University',
    status: 'potential',
    region: 'Miami'
  })

  const handleEdit = (opportunity: FundingOpportunity) => {
    setEditingId(opportunity.id)
    setEditingData({ ...opportunity })
  }

  const handleSave = (id: string) => {
    if (editingData) {
      setOpportunities(prev => 
        prev.map(opp => opp.id === id ? editingData : opp)
      )
      setEditingId(null)
      setEditingData(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingData(null)
    setIsAdding(false)
    setNewOpportunity({
      category: 'University',
      status: 'potential',
      region: 'Miami'
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this opportunity?')) {
      setOpportunities(prev => prev.filter(opp => opp.id !== id))
    }
  }

  const handleAdd = () => {
    if (newOpportunity.name && newOpportunity.category && newOpportunity.region) {
      const newOpp: FundingOpportunity = {
        id: `new-${Date.now()}`,
        name: newOpportunity.name,
        category: newOpportunity.category as any,
        status: newOpportunity.status as any,
        region: newOpportunity.region,
        details: newOpportunity.details || ''
      }
      setOpportunities(prev => [...prev, newOpp])
      setIsAdding(false)
      setNewOpportunity({
        category: 'University',
        status: 'potential',
        region: 'Miami'
      })
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(opportunities, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'fundingData.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Funding Opportunities Admin</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAdding(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
          <button
            onClick={exportData}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Add New Opportunity */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Funding Opportunity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Institution Name"
              value={newOpportunity.name || ''}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <select
              value={newOpportunity.category || ''}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {fundingCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={newOpportunity.status || ''}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="potential">Potential</option>
            </select>
            <select
              value={newOpportunity.region || ''}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, region: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Additional Details"
              value={newOpportunity.details || ''}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, details: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Opportunities List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === opportunity.id ? (
                      <input
                        type="text"
                        value={editingData?.name || ''}
                        onChange={(e) => setEditingData(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{opportunity.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === opportunity.id ? (
                      <select
                        value={editingData?.category || ''}
                        onChange={(e) => setEditingData(prev => prev ? { ...prev, category: e.target.value as any } : null)}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {fundingCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {opportunity.category}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === opportunity.id ? (
                      <select
                        value={editingData?.status || ''}
                        onChange={(e) => setEditingData(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="potential">Potential</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        opportunity.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {opportunity.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === opportunity.id ? (
                      <select
                        value={editingData?.region || ''}
                        onChange={(e) => setEditingData(prev => prev ? { ...prev, region: e.target.value } : null)}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-900">{opportunity.region}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === opportunity.id ? (
                      <textarea
                        value={editingData?.details || ''}
                        onChange={(e) => setEditingData(prev => prev ? { ...prev, details: e.target.value } : null)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={2}
                      />
                    ) : (
                      <div className="text-sm text-gray-500 max-w-xs truncate" title={opportunity.details}>
                        {opportunity.details || 'No details'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === opportunity.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(opportunity.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(opportunity)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(opportunity.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Admin Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click the edit icon to modify any funding opportunity</li>
          <li>• Use the "Add New" button to create new partnerships</li>
          <li>• Export the data to update your fundingData.ts file</li>
          <li>• Changes are temporary - export and update the file to make them permanent</li>
        </ul>
      </div>
    </div>
  )
}
