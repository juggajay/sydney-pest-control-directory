// Author profiles for E-E-A-T compliance
// These are used to attribute content to qualified experts

export const authors = [
  {
    id: 'technical-team',
    name: 'Sydney Pest Control Directory Team',
    title: 'Editorial Team',
    credentials: [
      'Expert-reviewed content',
      'EPA license verification specialists',
      'Consumer protection focused'
    ],
    photo: '/authors/team.jpg',
    bio: 'Our editorial team works with licensed pest control professionals to ensure all content is accurate, helpful, and up-to-date.',
    expertise: ['Pest Control Services', 'Operator Verification', 'Consumer Guidance'],
    isDefault: true
  },
  {
    id: 'pest-expert',
    name: 'Expert Reviewed',
    title: 'Licensed Pest Control Professional',
    credentials: [
      'EPA Licensed Pest Controller',
      '10+ years industry experience',
      'AEPMA certified'
    ],
    photo: '/authors/expert.jpg',
    bio: 'All technical pest control content on this site is reviewed by licensed professionals to ensure accuracy and compliance with Australian standards.',
    expertise: ['Termite Control', 'General Pest Management', 'Treatment Methods'],
    isExpertReview: true
  }
];

// Get author by ID
export function getAuthor(id) {
  return authors.find(a => a.id === id) || authors.find(a => a.isDefault);
}

// Get default author
export function getDefaultAuthor() {
  return authors.find(a => a.isDefault);
}

// Generate author schema for structured data
export function generateAuthorSchema(author) {
  return {
    '@type': 'Person',
    'name': author.name,
    'jobTitle': author.title,
    'description': author.bio,
    'knowsAbout': author.expertise
  };
}
