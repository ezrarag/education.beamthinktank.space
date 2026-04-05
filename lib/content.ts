export type ProgramFormat = 'Remote' | 'Hybrid' | 'In-Person'
export type GradeBand = 'K-5' | '6-8' | '9-12' | 'K-12'
export type ProgramLocation = 'Milwaukee' | 'Atlanta' | 'Madison' | 'Any'
export type MembershipInterestRole = 'Student' | 'University Student' | 'Educator' | 'Community Member' | 'Grant Writer' | 'Researcher'
export type DatasetFormat = 'CSV' | 'PDF' | 'API'
export type GrantFocus = 'Research' | 'Programs' | 'Advocacy' | 'Capacity Building'
export type Eligibility = 'Nonprofit' | 'University' | 'Both'
export type RecordsRequestStatus = 'Submitted' | 'Acknowledged' | 'Received' | 'In Analysis' | 'Complete'
export type GrantApplicationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Awarded' | 'Declined'
export type BillStatus = 'In Committee' | 'Floor Vote' | 'Signed' | 'Failed'

export interface EducationProgram {
  id: string
  name: string
  trackId: string
  trackName: string
  ngo: string
  ngoColor: string
  ngoLogo: string
  ngoUrl: string
  gradeBand: GradeBand
  format: ProgramFormat
  location: ProgramLocation
  description: string
  enrollmentHref: string
}

export interface DatasetEntry {
  id: string
  name: string
  source: string
  format: DatasetFormat
  description: string
  href: string
}

export interface GrantOpportunity {
  id: string
  funder: string
  name: string
  amountRange: string
  deadline: string
  focusArea: GrantFocus
  eligibility: Eligibility
  description: string
  href: string
}

export interface RecordsRequest {
  id: string
  agency: string
  requestDate: string
  recordsRequested: string
  status: RecordsRequestStatus
  contactName: string
  referenceNumber: string
  dateReceived?: string
  analysisStatus?: string
}

export interface GrantApplication {
  id: string
  funder: string
  amount: string
  deadline: string
  status: GrantApplicationStatus
  assignedWriter: string
}

export interface ResearchBrief {
  id: string
  initiativeName: string
  problemStatement: string
  evidenceCitations: string
  outcomeMetrics: string
  budgetEstimate: string
  assignedWriter: string
}

export interface AdvocacyContact {
  id: string
  legislatorName: string
  district: string
  party: string
  lastContactDate: string
  contactMethod: string
  outcome: string
  relatedBillNumber: string
  billStatus: BillStatus
  testimonySubmitted: boolean
}

export const graduationGapSeries = [
  { year: '2000', blackRate: 65.2, whiteRate: 88.4 },
  { year: '2005', blackRate: 67.3, whiteRate: 89.6 },
  { year: '2010', blackRate: 68.9, whiteRate: 90.8 },
  { year: '2015', blackRate: 71.2, whiteRate: 92.9 },
  { year: '2020', blackRate: 73.8, whiteRate: 94.4 },
  { year: '2025', blackRate: 75.7, whiteRate: 95.8 },
]

export const taxBurdenRows = [
  { group: 'Lowest 20%', incomeRange: 'Up to $24,100', effectiveTaxRate: '11.0%', burdenNote: 'Highest effective combined state and local tax load.' },
  { group: 'Second 20%', incomeRange: '$24,100-$44,500', effectiveTaxRate: '10.3%', burdenNote: 'Still above the statewide effective average.' },
  { group: 'Middle 20%', incomeRange: '$44,500-$73,600', effectiveTaxRate: '9.7%', burdenNote: 'Middle-income households still pay a higher share than top earners.' },
  { group: 'Fourth 20%', incomeRange: '$73,600-$129,500', effectiveTaxRate: '8.4%', burdenNote: 'Burden falls as income rises.' },
  { group: 'Top 1%', incomeRange: '$617,100+', effectiveTaxRate: '7.2%', burdenNote: 'Lowest effective rate in the distribution.' },
]

export const educationProgramsSeed: EducationProgram[] = [
  {
    id: 'forge-web-dev-lab',
    name: 'Forge Web Development Lab',
    trackId: 'forge',
    trackName: 'Forge',
    ngo: 'BEAM Forge',
    ngoColor: '#2563EB',
    ngoLogo: 'FG',
    ngoUrl: 'https://forge.beamthinktank.space',
    gradeBand: '9-12',
    format: 'Hybrid',
    location: 'Milwaukee',
    description: 'Students build production-ready websites and learn version control, UI systems, and deployment workflow.',
    enrollmentHref: '/join?program=forge-web-dev-lab&track=Forge',
  },
  {
    id: 'finance-money-maps',
    name: 'Finance Money Maps',
    trackId: 'finance',
    trackName: 'Finance',
    ngo: 'BEAM Finance',
    ngoColor: '#0F766E',
    ngoLogo: 'FN',
    ngoUrl: 'https://finance.beamthinktank.space',
    gradeBand: '9-12',
    format: 'Remote',
    location: 'Any',
    description: 'A personal finance studio on banking, credit, taxes, and capital strategy for first-generation wealth building.',
    enrollmentHref: '/join?program=finance-money-maps&track=Finance',
  },
  {
    id: 'environment-water-science',
    name: 'Environment Water Science',
    trackId: 'environment',
    trackName: 'Environment',
    ngo: 'BEAM Environment',
    ngoColor: '#0F8A5F',
    ngoLogo: 'EN',
    ngoUrl: 'https://environment.beamthinktank.space',
    gradeBand: '6-8',
    format: 'Hybrid',
    location: 'Madison',
    description: 'Students investigate watershed quality, environmental sampling, and public health through local water systems.',
    enrollmentHref: '/join?program=environment-water-science&track=Environment',
  },
  {
    id: 'food-venture-lab',
    name: 'Food Entrepreneurship Lab',
    trackId: 'food',
    trackName: 'Food',
    ngo: 'BEAM Food',
    ngoColor: '#C2410C',
    ngoLogo: 'FD',
    ngoUrl: 'https://food.beamthinktank.space',
    gradeBand: '6-8',
    format: 'In-Person',
    location: 'Milwaukee',
    description: 'Students turn neighborhood food knowledge into pricing, branding, and vendor-day business projects.',
    enrollmentHref: '/join?program=food-venture-lab&track=Food',
  },
  {
    id: 'orchestra-theory-foundations',
    name: 'Orchestra Theory Foundations',
    trackId: 'orchestra',
    trackName: 'Orchestra',
    ngo: 'BEAM Orchestra',
    ngoColor: '#7C3AED',
    ngoLogo: 'OR',
    ngoUrl: 'https://orchestra.beamthinktank.space',
    gradeBand: 'K-12',
    format: 'Remote',
    location: 'Any',
    description: 'Music theory, score reading, and ensemble listening exercises that connect directly to BEAM Orchestra pathways.',
    enrollmentHref: '/join?program=orchestra-theory-foundations&track=Orchestra',
  },
  {
    id: 'transportation-auto-systems',
    name: 'Transportation Automotive Systems',
    trackId: 'transportation',
    trackName: 'Transportation',
    ngo: 'BEAM Transportation',
    ngoColor: '#B45309',
    ngoLogo: 'TR',
    ngoUrl: 'https://transportation.beamthinktank.space',
    gradeBand: '9-12',
    format: 'Hybrid',
    location: 'Atlanta',
    description: 'Students learn diagnostics, electrical systems, and systems thinking through automotive engineering workflows.',
    enrollmentHref: '/join?program=transportation-auto-systems&track=Transportation',
  },
]

export const datasetLibrarySeed: DatasetEntry[] = [
  {
    id: 'wisedash-grad',
    name: 'WISEdash Graduation Rate Exports',
    source: 'Wisconsin DPI / WISEdash',
    format: 'CSV',
    description: 'Seed export target for annual Black and white graduation-rate comparisons in Wisconsin.',
    href: 'https://wisedash.dpi.wi.gov/Dashboard/portalHome.jsp',
  },
  {
    id: 'nces-ccd',
    name: 'NCES Common Core of Data Historical Files',
    source: 'NCES',
    format: 'CSV',
    description: 'National public school and district reference files for longitudinal comparisons.',
    href: 'https://nces.ed.gov/ccd',
  },
  {
    id: 'itep-who-pays',
    name: 'Wisconsin "Who Pays?"',
    source: 'ITEP',
    format: 'PDF',
    description: 'State and local tax incidence reference used for the fiscal audit argument.',
    href: 'https://itep.org/who-pays/',
  },
  {
    id: 'brookings-taxes',
    name: 'Brookings Race + Taxes Working Paper',
    source: 'Brookings',
    format: 'PDF',
    description: 'Working paper on racial disparities in tax treatment and fiscal outcomes.',
    href: 'https://www.brookings.edu/wp-content/uploads/2025/02/20250213_TPC_GaleEtAl_RaceTaxes_WP.pdf',
  },
  {
    id: 'dpi-teacher-demographics',
    name: 'DPI Teacher Demographics Reports',
    source: 'Wisconsin DPI',
    format: 'PDF',
    description: 'Teacher workforce and preparation diversity references for pending analysis.',
    href: 'https://dpi.wi.gov/sites/default/files/imce/education-workforce/pdf/2022-wi-epp-workforce-annual-report.pdf',
  },
  {
    id: 'college-scorecard',
    name: 'College Scorecard Data API',
    source: 'U.S. Department of Education',
    format: 'API',
    description: 'Postsecondary outcome and cost data for academic credit and college pathway analysis.',
    href: 'https://collegescorecard.ed.gov/data/api/',
  },
  {
    id: 'urban-black-wealth',
    name: 'Urban Institute Black Wealth Dataset Reference',
    source: 'Urban Institute',
    format: 'PDF',
    description: 'Public-dataset reference point for asset accumulation and racial wealth disparities.',
    href: 'https://www.urban.org/research/publication/assessing-black-wealth-using-public-datasets-and-case-study-interviews',
  },
  {
    id: 'wpf-teacher-diversity',
    name: 'Wisconsin Policy Forum Teacher Diversity Report',
    source: 'Wisconsin Policy Forum',
    format: 'PDF',
    description: 'Teacher diversity and pipeline context for educator workforce analysis.',
    href: 'https://wispolicyforum.org/wp-content/uploads/2020/06/TeacherWhoLooksLikeMe_ExecSumm.pdf',
  },
]

export const grantLibrarySeed: GrantOpportunity[] = [
  {
    id: 'gmf-education-equity',
    funder: 'Greater Milwaukee Foundation',
    name: 'Education Equity Cycle',
    amountRange: '$25,000-$150,000',
    deadline: '2026-06-30',
    focusArea: 'Programs',
    eligibility: 'Nonprofit',
    description: 'Regional support for Milwaukee-based education equity initiatives tied to systems change and community outcomes.',
    href: 'https://www.greatermilwaukeefoundation.org/grants/grant-seekers/grant-calendar/',
  },
  {
    id: 'nsf-stem-k12',
    funder: 'National Science Foundation',
    name: 'STEM K-12',
    amountRange: '$25,000-$750,000',
    deadline: '2026-08-12',
    focusArea: 'Research',
    eligibility: 'University',
    description: 'Research and development program for K-12 STEM teaching and learning systems.',
    href: 'https://www.nsf.gov/funding/opportunities/stem-k-12-nsf-stem-k-12',
  },
  {
    id: 'doe-title-iv-equity',
    funder: 'U.S. Department of Education',
    name: 'Title IV Equity-Aligned Supports',
    amountRange: '$100,000-$500,000',
    deadline: '2026-04-25',
    focusArea: 'Advocacy',
    eligibility: 'Both',
    description: 'Federal student support and equity-related funding pathways relevant to well-rounded and safe school strategies.',
    href: 'https://www.ed.gov/grants-and-programs/formula-grants/school-improvement-grants/student-support-and-academic-enrichment-program-title-iv-part',
  },
  {
    id: 'joyce-education',
    funder: 'Joyce Foundation',
    name: 'Education & Economic Mobility',
    amountRange: '$50,000-$250,000',
    deadline: '2026-05-20',
    focusArea: 'Advocacy',
    eligibility: 'Both',
    description: 'Midwest policy, research, and advocacy support focused on educator quality and college-career momentum.',
    href: 'https://www.joycefdn.org/grants/education-economic-mobility-guidelines',
  },
  {
    id: 'wkkf-equity',
    funder: 'W.K. Kellogg Foundation',
    name: 'Education Equity + Racial Equity',
    amountRange: '$75,000-$300,000',
    deadline: '2026-07-15',
    focusArea: 'Capacity Building',
    eligibility: 'Nonprofit',
    description: 'Racial equity-oriented grantmaking relevant to children, education, and community opportunity.',
    href: 'https://www.wkkf.org/what-we-fund/',
  },
  {
    id: 'dpi-competitive',
    funder: 'Wisconsin DPI',
    name: 'Competitive Innovation Grants',
    amountRange: '$15,000-$200,000',
    deadline: '2026-04-18',
    focusArea: 'Programs',
    eligibility: 'Nonprofit',
    description: 'State-administered competitive grants for programmatic innovation and student support initiatives.',
    href: 'https://dpi.wi.gov/grants',
  },
]

export const recordsRequestsSeed: RecordsRequest[] = [
  {
    id: 'dpi-grad-2026',
    agency: 'Wisconsin DPI',
    requestDate: '2026-02-14',
    recordsRequested: 'Graduation rate exports disaggregated by race, district, and subgroup for 2000-2025.',
    status: 'Received',
    contactName: 'Open Records Office',
    referenceNumber: 'DPI-EDU-2026-014',
    dateReceived: '2026-03-01',
    analysisStatus: 'Cleaning cohort-year labels.',
  },
  {
    id: 'dpi-teacher-demo',
    agency: 'Wisconsin DPI',
    requestDate: '2026-03-28',
    recordsRequested: 'Teacher demographics by district, licensure pathway, and assignment for longitudinal comparison.',
    status: 'Acknowledged',
    contactName: 'Education Workforce Analytics',
    referenceNumber: 'DPI-EDU-2026-028',
    analysisStatus: 'Awaiting estimated fulfillment date.',
  },
  {
    id: 'nces-ccd-race',
    agency: 'NCES',
    requestDate: '2026-01-19',
    recordsRequested: 'Historical CCD pulls for Wisconsin district comparison and enrollment context.',
    status: 'In Analysis',
    contactName: 'NCES Data Support',
    referenceNumber: 'NCES-EDU-2026-003',
    dateReceived: '2026-02-02',
    analysisStatus: 'Matched to district crosswalk.',
  },
  {
    id: 'itep-supplement',
    agency: 'ITEP',
    requestDate: '2026-04-02',
    recordsRequested: 'Wisconsin supplement tables for state/local tax incidence and methodology notes.',
    status: 'Submitted',
    contactName: 'Research Desk',
    referenceNumber: 'ITEP-EDU-2026-001',
    analysisStatus: 'Queued.',
  },
]

export const grantApplicationsSeed: GrantApplication[] = [
  { id: 'gmf-cycle', funder: 'Greater Milwaukee Foundation', amount: '$85,000', deadline: '2026-06-30', status: 'Draft', assignedWriter: 'A. Rivera' },
  { id: 'joyce-midwest', funder: 'Joyce Foundation', amount: '$150,000', deadline: '2026-05-20', status: 'Submitted', assignedWriter: 'M. Patel' },
  { id: 'nsf-lab', funder: 'NSF STEM K-12', amount: '$350,000', deadline: '2026-08-12', status: 'Under Review', assignedWriter: 'D. Campbell' },
]

export const researchBriefsSeed: ResearchBrief[] = [
  {
    id: 'brief-forge-credit',
    initiativeName: 'Forge Credit Pathway Pilot',
    problemStatement: 'High school participants need work-aligned technical skill pathways that translate to portfolio evidence and postsecondary credit.',
    evidenceCitations: 'WISEdash graduation trends; Brookings fiscal inequity brief; internal BEAM attendance logs.',
    outcomeMetrics: 'Program completion, portfolio submissions, internship placement, dual-credit participation.',
    budgetEstimate: '$62,000',
    assignedWriter: 'A. Rivera',
  },
  {
    id: 'brief-water-lab',
    initiativeName: 'Water Science Supplemental Lab',
    problemStatement: 'Middle school science engagement remains disconnected from place-based inquiry and environmental stewardship careers.',
    evidenceCitations: 'DPI science achievement reports; NCES CCD district context; local watershed data partners.',
    outcomeMetrics: 'Attendance, science confidence gains, family showcase participation, project artifacts.',
    budgetEstimate: '$48,500',
    assignedWriter: 'M. Patel',
  },
]

export const advocacyContactsSeed: AdvocacyContact[] = [
  {
    id: 'contact-1',
    legislatorName: 'Rep. Angela Brooks',
    district: 'Milwaukee 17',
    party: 'D',
    lastContactDate: '2026-03-30',
    contactMethod: 'Email + briefing deck',
    outcome: 'Requested district-level graduation memo.',
    relatedBillNumber: 'AB-114',
    billStatus: 'In Committee',
    testimonySubmitted: true,
  },
  {
    id: 'contact-2',
    legislatorName: 'Sen. Daniel Mercer',
    district: 'Madison 12',
    party: 'D',
    lastContactDate: '2026-03-21',
    contactMethod: 'Virtual meeting',
    outcome: 'Follow-up on supplemental grant language.',
    relatedBillNumber: 'SB-208',
    billStatus: 'Floor Vote',
    testimonySubmitted: false,
  },
  {
    id: 'contact-3',
    legislatorName: 'Rep. Monica Hale',
    district: 'Milwaukee 9',
    party: 'D',
    lastContactDate: '2026-02-27',
    contactMethod: 'Phone call',
    outcome: 'Staff requested teacher diversity data when received.',
    relatedBillNumber: 'AB-131',
    billStatus: 'In Committee',
    testimonySubmitted: true,
  },
]

export const crossNgoOpportunities = [
  {
    label: 'BEAM Forge Career Track',
    summary: 'Frontend, backend, and deployment pathways for Education participants entering web production.',
    href: 'https://forge.beamthinktank.space/portal',
  },
  {
    label: 'BEAM Finance Youth Capital Studio',
    summary: 'Personal finance and grant budget fluency for older participants and university researchers.',
    href: 'https://finance.beamthinktank.space/portal',
  },
  {
    label: 'BEAM Orchestra Theory Residency',
    summary: 'Music literacy and ensemble discipline as a bridge into K-12 supplemental instruction.',
    href: 'https://orchestra.beamthinktank.space/portal',
  },
]

export const systemLinks = [
  { label: 'BEAM Home', href: 'https://home.beamthinktank.space' },
  { label: 'BEAM Grounds', href: 'https://grounds.beamthinktank.space' },
  { label: 'BEAM Orchestra', href: 'https://orchestra.beamthinktank.space' },
  { label: 'BEAM Forge', href: 'https://forge.beamthinktank.space' },
  { label: 'BEAM Finance', href: 'https://finance.beamthinktank.space' },
  { label: 'BEAM Environment', href: 'https://environment.beamthinktank.space' },
  { label: 'BEAM Food', href: 'https://food.beamthinktank.space' },
  { label: 'BEAM Transportation', href: 'https://transportation.beamthinktank.space' },
]
