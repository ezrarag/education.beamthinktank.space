export interface EquipmentItem {
  id: string
  name: string
  category: string
  estimatedCost: number
  funded: boolean
  priority: 'high' | 'medium' | 'low'
  description: string
  supplier?: string
  leadTime?: string
}

export interface EquipmentCategory {
  name: string
  icon: string
  color: string
  textColor: string
  totalCost: number
  items: EquipmentItem[]
}

export const equipmentData: EquipmentItem[] = [
  // Classrooms
  {
    id: '1',
    name: 'Smart Boards & Projectors',
    category: 'Classrooms',
    estimatedCost: 15000,
    funded: false,
    priority: 'high',
    description: 'Interactive whiteboards and high-quality projectors for modern classroom learning',
    supplier: 'Educational Equipment Co.',
    leadTime: '2-3 weeks'
  },
  {
    id: '2',
    name: 'Computer Workstations',
    category: 'Classrooms',
    estimatedCost: 25000,
    funded: false,
    priority: 'high',
    description: 'Desktop computers and workstations for computer labs and digital learning',
    supplier: 'Tech Solutions Inc.',
    leadTime: '1-2 weeks'
  },
  {
    id: '3',
    name: 'Flexible Seating',
    category: 'Classrooms',
    estimatedCost: 8000,
    funded: false,
    priority: 'medium',
    description: 'Modular furniture for adaptable classroom layouts and collaborative learning',
    supplier: 'Classroom Furniture Plus',
    leadTime: '3-4 weeks'
  },
  {
    id: '4',
    name: 'Audio/Visual Equipment',
    category: 'Classrooms',
    estimatedCost: 12000,
    funded: false,
    priority: 'medium',
    description: 'Sound systems, microphones, and video equipment for presentations and events',
    supplier: 'AV Systems Pro',
    leadTime: '2-3 weeks'
  },
  
  // Business Units
  {
    id: '5',
    name: 'Tutoring Center Setup',
    category: 'Business Units',
    estimatedCost: 18000,
    funded: false,
    priority: 'high',
    description: 'Furniture, materials, and technology for after-school tutoring programs',
    supplier: 'Educational Supplies Co.',
    leadTime: '2-3 weeks'
  },
  {
    id: '6',
    name: 'After-School Program Materials',
    category: 'Business Units',
    estimatedCost: 15000,
    funded: false,
    priority: 'high',
    description: 'Arts, crafts, sports equipment, and educational materials for enrichment programs',
    supplier: 'School Supply Warehouse',
    leadTime: '1-2 weeks'
  },
  {
    id: '7',
    name: 'Summer Camp Equipment',
    category: 'Business Units',
    estimatedCost: 22000,
    funded: false,
    priority: 'medium',
    description: 'Outdoor equipment, tents, sports gear, and camp supplies for summer programs',
    supplier: 'Camp Equipment Supply',
    leadTime: '3-4 weeks'
  },
  {
    id: '8',
    name: 'Business Development Office',
    category: 'Business Units',
    estimatedCost: 10000,
    funded: false,
    priority: 'low',
    description: 'Office furniture and equipment for administrative and business development staff',
    supplier: 'Office Furniture Depot',
    leadTime: '1-2 weeks'
  },
  
  // Community Rentals
  {
    id: '9',
    name: 'Event Space Furnishings',
    category: 'Community Rentals',
    estimatedCost: 20000,
    funded: false,
    priority: 'medium',
    description: 'Folding tables, chairs, staging, and event equipment for community gatherings',
    supplier: 'Event Supply Co.',
    leadTime: '2-3 weeks'
  },
  {
    id: '10',
    name: 'Coworking Space Setup',
    category: 'Community Rentals',
    estimatedCost: 25000,
    funded: false,
    priority: 'medium',
    description: 'Desks, chairs, meeting tables, and technology for flexible workspace rental',
    supplier: 'Office Solutions Inc.',
    leadTime: '3-4 weeks'
  },
  {
    id: '11',
    name: 'Meeting Room Equipment',
    category: 'Community Rentals',
    estimatedCost: 12000,
    funded: false,
    priority: 'low',
    description: 'Conference tables, chairs, whiteboards, and presentation equipment',
    supplier: 'Conference Room Supply',
    leadTime: '2-3 weeks'
  },
  {
    id: '12',
    name: 'Kitchen & Catering Facilities',
    category: 'Community Rentals',
    estimatedCost: 30000,
    funded: false,
    priority: 'low',
    description: 'Commercial kitchen equipment, serving carts, and catering supplies',
    supplier: 'Commercial Kitchen Supply',
    leadTime: '4-6 weeks'
  },
  
  // Childcare
  {
    id: '13',
    name: 'Enhanced Safety Equipment',
    category: 'Childcare',
    estimatedCost: 15000,
    funded: false,
    priority: 'high',
    description: 'Security systems, safety gates, first aid supplies, and emergency equipment',
    supplier: 'Childcare Safety Supply',
    leadTime: '1-2 weeks'
  },
  {
    id: '14',
    name: 'Educational Toys & Materials',
    category: 'Childcare',
    estimatedCost: 20000,
    funded: false,
    priority: 'high',
    description: 'Age-appropriate toys, learning materials, and educational resources for children',
    supplier: 'Early Learning Supply',
    leadTime: '1-2 weeks'
  },
  {
    id: '15',
    name: 'Outdoor Play Equipment',
    category: 'Childcare',
    estimatedCost: 25000,
    funded: false,
    priority: 'medium',
    description: 'Playground equipment, outdoor toys, and safety surfacing for outdoor activities',
    supplier: 'Playground Equipment Co.',
    leadTime: '4-6 weeks'
  },
  {
    id: '16',
    name: 'Childcare Technology',
    category: 'Childcare',
    estimatedCost: 18000,
    funded: false,
    priority: 'medium',
    description: 'Tablets, educational software, and digital learning tools for children',
    supplier: 'Educational Technology Co.',
    leadTime: '2-3 weeks'
  }
]

export const equipmentCategories: EquipmentCategory[] = [
  {
    name: 'Classrooms',
    icon: 'GraduationCap',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    totalCost: 60000,
    items: equipmentData.filter(item => item.category === 'Classrooms')
  },
  {
    name: 'Business Units',
    icon: 'Users',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    totalCost: 65000,
    items: equipmentData.filter(item => item.category === 'Business Units')
  },
  {
    name: 'Community Rentals',
    icon: 'Building2',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    totalCost: 87000,
    items: equipmentData.filter(item => item.category === 'Community Rentals')
  },
  {
    name: 'Childcare',
    icon: 'Baby',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    totalCost: 78000,
    items: equipmentData.filter(item => item.category === 'Childcare')
  }
]

export const getTotalCost = () => equipmentData.reduce((sum, item) => sum + item.estimatedCost, 0)

export const getFundedCost = () => equipmentData.filter(item => item.funded).reduce((sum, item) => sum + item.estimatedCost, 0)

export const getRemainingCost = () => getTotalCost() - getFundedCost()

export const getCategoryCost = (category: string) => 
  equipmentData
    .filter(item => item.category === category)
    .reduce((sum, item) => sum + item.estimatedCost, 0)

export const getPriorityCount = (priority: 'high' | 'medium' | 'low') =>
  equipmentData.filter(item => item.priority === priority).length
