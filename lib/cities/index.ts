export interface CityData {
  slug: string
  name: string
  region: string
  state: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
  studentOrgs: {
    name: string
    institution: string
    status: 'active' | 'forming' | 'planned'
    members: number
    description: string
  }[]
  progress: {
    fundsRaised: number
    commitments: number
    activePartnerships: number
    targetGoal: number
  }
  fundingOpportunities: string[] // IDs from fundingData
  description: string
  imageUrl?: string
}

export const cities: Record<string, CityData> = {
  atlanta: {
    slug: 'atlanta',
    name: 'Atlanta',
    region: 'Atlanta',
    state: 'Georgia',
    country: 'USA',
    coordinates: { lat: 33.7490, lng: -84.3880 },
    studentOrgs: [
      {
        name: 'BEAM@GT',
        institution: 'Georgia Institute of Technology',
        status: 'active',
        members: 30,
        description: 'Active student organization with 30 committed teaching fellows.'
      },
      {
        name: 'BEAM@Emory',
        institution: 'Emory University',
        status: 'forming',
        members: 18,
        description: 'Student organization in formation with growing membership.'
      },
      {
        name: 'BEAM@GSU',
        institution: 'Georgia State University',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for GSU expansion.'
      }
    ],
    progress: {
      fundsRaised: 200000,
      commitments: 300000,
      activePartnerships: 5,
      targetGoal: 750000
    },
    fundingOpportunities: ['gt-students', 'emory-partnership', 'gsu-expansion', 'atlanta-foundation'],
    description: 'Atlanta is our flagship location with active partnerships and growing student organizations across multiple institutions.'
  },
  miami: {
    slug: 'miami',
    name: 'Miami',
    region: 'Miami',
    state: 'Florida',
    country: 'USA',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    studentOrgs: [
      {
        name: 'BEAM@UM',
        institution: 'University of Miami',
        status: 'active',
        members: 25,
        description: 'Active student organization with 25 committed teaching fellows.'
      },
      {
        name: 'BEAM@FIU',
        institution: 'Florida International University',
        status: 'forming',
        members: 12,
        description: 'Student organization in formation with growing membership.'
      }
    ],
    progress: {
      fundsRaised: 125000,
      commitments: 180000,
      activePartnerships: 3,
      targetGoal: 500000
    },
    fundingOpportunities: ['um-students', 'fiu-partnership', 'knight-foundation', 'eb5-miami'],
    description: 'Miami is our flagship location with active partnerships and growing student organizations.'
  },
  orlando: {
    slug: 'orlando',
    name: 'Orlando',
    region: 'Orlando',
    state: 'Florida',
    country: 'USA',
    coordinates: { lat: 28.5383, lng: -81.3792 },
    studentOrgs: [
      {
        name: 'BEAM@UCF',
        institution: 'University of Central Florida',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for UCF expansion.'
      }
    ],
    progress: {
      fundsRaised: 0,
      commitments: 25000,
      activePartnerships: 0,
      targetGoal: 300000
    },
    fundingOpportunities: ['orlando-ucf'],
    description: 'Orlando represents our expansion into Central Florida with UCF partnership opportunities.'
  },
  tampa: {
    slug: 'tampa',
    name: 'Tampa',
    region: 'Tampa',
    state: 'Florida',
    country: 'USA',
    coordinates: { lat: 27.9506, lng: -82.4572 },
    studentOrgs: [],
    progress: {
      fundsRaised: 0,
      commitments: 0,
      activePartnerships: 0,
      targetGoal: 250000
    },
    fundingOpportunities: [],
    description: 'Tampa Bay area represents future expansion opportunities in West Florida.'
  },
  jacksonville: {
    slug: 'jacksonville',
    name: 'Jacksonville',
    region: 'Jacksonville',
    state: 'Florida',
    country: 'USA',
    coordinates: { lat: 30.3322, lng: -81.6557 },
    studentOrgs: [],
    progress: {
      fundsRaised: 0,
      commitments: 0,
      activePartnerships: 0,
      targetGoal: 200000
    },
    fundingOpportunities: [],
    description: 'Jacksonville offers opportunities for Northeast Florida expansion.'
  },
  newyork: {
    slug: 'newyork',
    name: 'New York',
    region: 'New York',
    state: 'New York',
    country: 'USA',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    studentOrgs: [
      {
        name: 'BEAM@Columbia',
        institution: 'Columbia University',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for Columbia expansion.'
      },
      {
        name: 'BEAM@NYU',
        institution: 'New York University',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for NYU expansion.'
      }
    ],
    progress: {
      fundsRaised: 0,
      commitments: 50000,
      activePartnerships: 0,
      targetGoal: 1000000
    },
    fundingOpportunities: ['nyc-expansion', 'columbia-partnership', 'nyu-partnership'],
    description: 'New York City represents our expansion into the Northeast with major university partnerships.'
  },
  losangeles: {
    slug: 'losangeles',
    name: 'Los Angeles',
    region: 'Los Angeles',
    state: 'California',
    country: 'USA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    studentOrgs: [
      {
        name: 'BEAM@UCLA',
        institution: 'University of California, Los Angeles',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for UCLA expansion.'
      },
      {
        name: 'BEAM@USC',
        institution: 'University of Southern California',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for USC expansion.'
      }
    ],
    progress: {
      fundsRaised: 0,
      commitments: 75000,
      activePartnerships: 0,
      targetGoal: 800000
    },
    fundingOpportunities: ['la-expansion', 'ucla-partnership', 'usc-partnership'],
    description: 'Los Angeles represents our expansion into California with major university partnerships.'
  },
  chicago: {
    slug: 'chicago',
    name: 'Chicago',
    region: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    studentOrgs: [
      {
        name: 'BEAM@UChicago',
        institution: 'University of Chicago',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for UChicago expansion.'
      },
      {
        name: 'BEAM@Northwestern',
        institution: 'Northwestern University',
        status: 'planned',
        members: 0,
        description: 'Planned student organization for Northwestern expansion.'
      }
    ],
    progress: {
      fundsRaised: 0,
      commitments: 40000,
      activePartnerships: 0,
      targetGoal: 600000
    },
    fundingOpportunities: ['chicago-expansion', 'uchicago-partnership', 'northwestern-partnership'],
    description: 'Chicago represents our expansion into the Midwest with major university partnerships.'
  }
}

export const citySlugs = Object.keys(cities)
export const cityNames = Object.values(cities).map(city => city.name)

export function getCityBySlug(slug: string): CityData | null {
  return cities[slug.toLowerCase()] || null
}

export function getCityByRegion(region: string): CityData | null {
  return Object.values(cities).find(city => city.region === region) || null
}

export function getCitiesByState(state: string): CityData[] {
  return Object.values(cities).filter(city => city.state === state)
}

export function getNearestCity(lat: number, lng: number): CityData {
  let nearestCity = cities.atlanta // default
  let shortestDistance = Infinity

  Object.values(cities).forEach(city => {
    const distance = Math.sqrt(
      Math.pow(lat - city.coordinates.lat, 2) + 
      Math.pow(lng - city.coordinates.lng, 2)
    )
    if (distance < shortestDistance) {
      shortestDistance = distance
      nearestCity = city
    }
  })

  return nearestCity
}
