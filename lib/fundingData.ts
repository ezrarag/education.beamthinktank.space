export interface FundingOpportunity {
  id: string
  category: 'University' | 'Corporate Sponsorship' | 'Charter/Voucher' | 'Philanthropy' | 'EB-5' | 'Other'
  name: string
  status: 'active' | 'potential'
  region: string
  details?: string
}

export const fundingOpportunities: FundingOpportunity[] = [
  {
    id: "um-students",
    category: "University",
    name: "University of Miami (Student Org: BEAM@UM)",
    status: "active",
    region: "Miami",
    details: "25 students committed to teaching fellowships."
  },
  {
    id: "fiu-partnership",
    category: "University",
    name: "Florida International University",
    status: "potential",
    region: "Miami",
    details: "Discussions ongoing for education department collaboration."
  },
  {
    id: "microsoft-corp",
    category: "Corporate Sponsorship",
    name: "Microsoft Education",
    status: "active",
    region: "National",
    details: "Technology infrastructure and software licensing support."
  },
  {
    id: "step-up-florida",
    category: "Charter/Voucher",
    name: "Step Up For Students",
    status: "active",
    region: "Florida",
    details: "Florida Tax Credit Scholarship Program partner."
  },
  {
    id: "knight-foundation",
    category: "Philanthropy",
    name: "Knight Foundation",
    status: "potential",
    region: "Miami",
    details: "Community development and education initiatives."
  },
  {
    id: "eb5-miami",
    category: "EB-5",
    name: "Miami EB-5 Regional Center",
    status: "potential",
    region: "Miami",
    details: "Investment opportunities in education infrastructure."
  },
  {
    id: "orlando-ucf",
    category: "University",
    name: "University of Central Florida",
    status: "potential",
    region: "Orlando",
    details: "Expansion opportunities in Central Florida market."
  }
]

export const fundingCategories = [
  'University',
  'Corporate Sponsorship', 
  'Charter/Voucher',
  'Philanthropy',
  'EB-5',
  'Other'
] as const

export const regions = [
  'Miami',
  'Orlando',
  'Tampa',
  'Jacksonville',
  'National',
  'Florida'
] as const
