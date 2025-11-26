import fs from 'fs';
import path from 'path';

// =============================================
// SUBURB DATA (from JSON files)
// =============================================

// Load suburbs synchronously at module load time
let suburbsData = null;
function loadSuburbsData() {
  if (suburbsData) return suburbsData;
  try {
    const indexPath = path.join(process.cwd(), 'public', 'suburbs', 'index.json');
    suburbsData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading suburbs:', error);
    suburbsData = { total: 0, regions: {}, suburbs: [] };
  }
  return suburbsData;
}

export function getAllSuburbs() {
  return loadSuburbsData();
}

export function getSuburbBySlug(slug) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'suburbs', `${slug}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return null;
  }
}

export function getSuburbSlugs() {
  const data = loadSuburbsData();
  return data.suburbs?.map(s => s.id) || [];
}

export function getRegions() {
  const data = loadSuburbsData();
  return Object.keys(data.regions || {});
}

// Export suburbs array for pages
export const suburbs = loadSuburbsData().suburbs || [];

// =============================================
// OPERATOR DATA (from JSON files)
// =============================================

let operatorsData = null;
function loadOperatorsData() {
  if (operatorsData) return operatorsData;
  try {
    const indexPath = path.join(process.cwd(), 'public', 'operators', 'index.json');
    operatorsData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading operators:', error);
    operatorsData = { total: 0, regions: {}, operators: [] };
  }
  return operatorsData;
}

export function getAllOperators() {
  return loadOperatorsData();
}

export function getOperatorBySlug(slug) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'operators', `${slug}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return null;
  }
}

export function getAllOperatorSlugs() {
  const data = loadOperatorsData();
  return data.operators?.map(o => o.slug) || [];
}

export function getOperatorsForSuburb(suburbSlug) {
  const data = loadOperatorsData();
  const normalizedSlug = suburbSlug.toLowerCase();
  return data.operators?.filter(o =>
    o.serviceAreas?.some(area => area.toLowerCase() === normalizedSlug)
  ) || [];
}

export function getOperatorsByService(serviceSlug) {
  const data = loadOperatorsData();
  return data.operators?.filter(o =>
    o.services?.includes(serviceSlug)
  ) || [];
}

export function getFeaturedOperators() {
  const data = loadOperatorsData();
  return data.operators?.filter(o => o.featured) || [];
}

export function getOperatorsByRegion(regionSlug) {
  const data = loadOperatorsData();
  const slugs = data.regions?.[regionSlug] || [];
  return data.operators?.filter(o => slugs.includes(o.slug)) || [];
}

// Export operators array for pages
export const operators = loadOperatorsData().operators || [];

// =============================================
// SERVICE DATA (from JSON files)
// =============================================

let servicesData = null;
function loadServicesData() {
  if (servicesData) return servicesData;
  try {
    const indexPath = path.join(process.cwd(), 'public', 'services', 'index.json');
    servicesData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading services:', error);
    servicesData = { total: 0, categories: {}, services: [] };
  }
  return servicesData;
}

export function getAllServices() {
  return loadServicesData();
}

export function getServiceBySlug(slug) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'services', `${slug}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return null;
  }
}

export function getServiceSlugs() {
  const data = loadServicesData();
  return data.services?.map(s => s.id) || [];
}

// Export services array for pages
export const services = loadServicesData().services || [];

// =============================================
// REVIEWS DATA
// =============================================

export const reviews = [
  { id: 1, operatorId: 1, author: 'Sarah M.', suburb: 'Bondi', rating: 5, date: '2024-11-10', text: 'Excellent service! They found termite activity that another company missed.' },
  { id: 2, operatorId: 1, author: 'James L.', suburb: 'Randwick', rating: 5, date: '2024-10-28', text: 'Quick response, professional team. The treatment worked perfectly.' },
  { id: 3, operatorId: 2, author: 'David W.', suburb: 'Sydney CBD', rating: 5, date: '2024-11-12', text: 'Our office building has been using Flick for years. Always reliable.' },
  { id: 4, operatorId: 3, author: 'Peter H.', suburb: 'Mosman', rating: 5, date: '2024-11-08', text: 'Love that they use eco-friendly products. Safe for my kids and pets!' },
  { id: 5, operatorId: 4, author: 'Chris B.', suburb: 'Parramatta', rating: 5, date: '2024-11-11', text: 'Found extensive termite damage. Their treatment saved our home.' },
];

export function getReviewsForOperator(operatorId) {
  return reviews.filter(r => r.operatorId === operatorId);
}

// =============================================
// FAQ DATA
// =============================================

export const faqs = {
  general: [
    { question: 'How much does pest control cost in Sydney?', answer: 'General pest control in Sydney typically costs $150-$350 for a standard home. Termite inspections range from $250-$500, while termite treatments can cost $2,000-$5,000+.' },
    { question: 'How often should I get pest control done?', answer: 'For general pest control, we recommend treatment every 6-12 months. Annual termite inspections are essential for all Sydney properties.' },
    { question: 'Are pest control chemicals safe for pets and children?', answer: 'Modern pest control products are designed to be low-toxicity when applied correctly. Keep pets and children away from treated areas until dry (usually 1-2 hours).' },
    { question: 'How long does a pest control treatment take?', answer: 'A general pest control treatment typically takes 30-60 minutes. Termite inspections take 1-2 hours depending on property size.' },
  ],
  termites: [
    { question: 'How do I know if I have termites?', answer: 'Signs include: mud tubes on walls, hollow-sounding timber, bubbling paint, discarded wings, and tight-fitting doors or windows.' },
    { question: 'How much does termite treatment cost in Sydney?', answer: 'Chemical barriers typically cost $2,000-$4,000. Baiting systems cost $2,500-$5,000+ for installation and monitoring.' },
    { question: 'Does home insurance cover termite damage?', answer: 'Most Australian home insurance policies do NOT cover termite damage. This is why annual inspections are so important.' },
  ],
};
