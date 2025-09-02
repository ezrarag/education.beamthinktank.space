export interface Property {
  id: string;
  title: string;
  slug: string;
  status: 'Active' | 'Proposed' | 'Planned';
  programs: string[];
  communityImpact: {
    parents: string[];
    students: string[];
    communityOrgs: string[];
    institutions: string[];
  };
  imageUrl?: string;
}

export const properties: Property[] = [
  {
    id: 'daycare-vine-city',
    title: 'Daycare @ Vine City',
    slug: 'daycare-vine-city',
    status: 'Active',
    programs: ['Early Childhood Education', 'Daycare Services', 'Parent Support Programs'],
    communityImpact: {
      parents: ['Flexible childcare options', 'Parent education workshops', 'Family support services'],
      students: ['Early learning foundation', 'Social development', 'School readiness preparation'],
      communityOrgs: ['Partnership opportunities', 'Resource sharing', 'Community engagement'],
      institutions: ['Educational collaboration', 'Research partnerships', 'Best practices sharing']
    },
    imageUrl: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg'
  },
  {
    id: 'high-school-old-fourth-ward',
    title: 'High School @ Old Fourth Ward',
    slug: 'old-fourth-ward-high-school',
    status: 'Active',
    programs: ['High School Education', 'Career Preparation', 'College Readiness', 'Trade Programs'],
    communityImpact: {
      parents: ['Quality education access', 'College preparation support', 'Career guidance'],
      students: ['Academic excellence', 'Career exploration', 'Leadership development'],
      communityOrgs: ['Educational partnerships', 'Youth programs', 'Community development'],
      institutions: ['Academic collaboration', 'Research opportunities', 'Innovation partnerships']
    },
    imageUrl: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg'
  },
  {
    id: 'proposed-middle-school-kimberly',
    title: 'Middle School @ Kimberly',
    slug: '1335-kimberly-rd-sw',
    status: 'Proposed',
    programs: ['Middle School Education', 'STEM Programs', 'Arts & Culture', 'Sports Programs'],
    communityImpact: {
      parents: ['Middle school options', 'Academic support', 'Extracurricular activities'],
      students: ['Academic growth', 'Personal development', 'Skill building'],
      communityOrgs: ['Youth engagement', 'Educational partnerships', 'Community building'],
      institutions: ['Educational innovation', 'Research collaboration', 'Best practices development']
    },
    imageUrl: 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg'
  }
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(property => property.slug === slug);
}

export function getAllProperties(): Property[] {
  return properties;
}
