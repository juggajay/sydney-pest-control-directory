/**
 * Expand Service Areas
 *
 * Assigns operators to more suburbs based on their region/suburb
 */

const fs = require('fs');
const path = require('path');

const OPERATORS_DIR = 'public/operators';
const SUBURBS_INDEX = 'public/suburbs/index.json';

// Load suburbs data
const suburbsData = JSON.parse(fs.readFileSync(SUBURBS_INDEX, 'utf8'));

// Map suburb names to slugs and their regions
const suburbsByRegion = {};
const suburbSlugMap = {};

suburbsData.suburbs.forEach(s => {
  const regionKey = s.regionSlug || s.region?.toLowerCase().replace(/\s+/g, '-');
  if (!suburbsByRegion[regionKey]) {
    suburbsByRegion[regionKey] = [];
  }
  suburbsByRegion[regionKey].push(s.id);
  suburbSlugMap[s.name.toLowerCase()] = s.id;
  suburbSlugMap[s.id] = s.id;
});

// Map operator suburbs to region keys
const suburbToRegion = {};
suburbsData.suburbs.forEach(s => {
  suburbToRegion[s.id] = s.regionSlug || s.region?.toLowerCase().replace(/\s+/g, '-');
  suburbToRegion[s.name.toLowerCase()] = s.regionSlug || s.region?.toLowerCase().replace(/\s+/g, '-');
});

console.log('Regions found:', Object.keys(suburbsByRegion));
console.log('Total suburbs:', suburbsData.suburbs.length);

// Load all operators
const operatorFiles = fs.readdirSync(OPERATORS_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
console.log('\\nProcessing', operatorFiles.length, 'operators...');

let updated = 0;

operatorFiles.forEach(file => {
  const filePath = path.join(OPERATORS_DIR, file);
  const operator = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Determine operator's primary region from their suburb
  const primarySuburb = operator.suburb?.toLowerCase().replace(/\s+/g, '-');
  let primaryRegion = suburbToRegion[primarySuburb];

  // If no match, try to infer from operator name or existing service areas
  if (!primaryRegion && operator.serviceAreas?.length > 0) {
    const firstArea = operator.serviceAreas[0];
    primaryRegion = suburbToRegion[firstArea];
  }

  // If still no match, assign based on keywords in name/suburb
  if (!primaryRegion) {
    const text = (operator.suburb + ' ' + operator.businessName).toLowerCase();
    if (text.includes('penrith') || text.includes('blue mountain')) {
      primaryRegion = 'penrith-region';
    } else if (text.includes('liverpool') || text.includes('fairfield')) {
      primaryRegion = 'south-west-sydney';
    } else if (text.includes('sutherland') || text.includes('cronulla')) {
      primaryRegion = 'sutherland-shire';
    } else if (text.includes('chatswood') || text.includes('north shore')) {
      primaryRegion = 'north-shore';
    } else if (text.includes('parramatta')) {
      primaryRegion = 'western-sydney';
    } else if (text.includes('newtown') || text.includes('inner west')) {
      primaryRegion = 'inner-west';
    } else if (text.includes('bondi') || text.includes('eastern')) {
      primaryRegion = 'eastern-suburbs';
    } else if (text.includes('manly') || text.includes('dee why') || text.includes('northern beach')) {
      primaryRegion = 'northern-beaches';
    } else if (text.includes('castle hill') || text.includes('hills')) {
      primaryRegion = 'hills-district';
    } else if (text.includes('sydney') || text.includes('cbd')) {
      primaryRegion = 'inner-city';
    }
  }

  // Get suburbs for this region
  const regionSuburbs = suburbsByRegion[primaryRegion] || [];

  // Also get suburbs from adjacent regions for wider coverage
  const adjacentRegions = {
    'inner-city': ['eastern-suburbs', 'inner-west', 'north-shore'],
    'eastern-suburbs': ['inner-city', 'south-sydney'],
    'inner-west': ['inner-city', 'western-sydney'],
    'north-shore': ['inner-city', 'northern-beaches', 'hills-district'],
    'northern-beaches': ['north-shore'],
    'western-sydney': ['inner-west', 'hills-district', 'penrith-region', 'south-west-sydney'],
    'hills-district': ['north-shore', 'western-sydney'],
    'penrith-region': ['western-sydney', 'blue-mountains'],
    'south-west-sydney': ['western-sydney', 'south-sydney'],
    'south-sydney': ['inner-city', 'eastern-suburbs', 'sutherland-shire'],
    'sutherland-shire': ['south-sydney'],
    'campbelltown-region': ['south-west-sydney', 'sutherland-shire'],
  };

  // Calculate how many suburbs this operator should cover
  // Featured operators get more coverage
  const maxAreas = operator.featured ? 50 : 25;

  // Build expanded service areas
  let expandedAreas = new Set(operator.serviceAreas || []);

  // Add suburbs from primary region
  regionSuburbs.slice(0, maxAreas / 2).forEach(s => expandedAreas.add(s));

  // Add some suburbs from adjacent regions
  const adjacent = adjacentRegions[primaryRegion] || [];
  adjacent.forEach(adjRegion => {
    const adjSuburbs = suburbsByRegion[adjRegion] || [];
    adjSuburbs.slice(0, 10).forEach(s => expandedAreas.add(s));
  });

  // Limit total areas
  const finalAreas = Array.from(expandedAreas).slice(0, maxAreas);

  if (finalAreas.length > (operator.serviceAreas?.length || 0)) {
    operator.serviceAreas = finalAreas;
    fs.writeFileSync(filePath, JSON.stringify(operator, null, 2));
    updated++;
    console.log(`  ${operator.businessName}: ${finalAreas.length} areas (was ${operator.serviceAreas?.length || 0})`);
  }
});

// Update index.json
const indexPath = path.join(OPERATORS_DIR, 'index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
indexData.operators = operatorFiles.map(file => {
  const op = JSON.parse(fs.readFileSync(path.join(OPERATORS_DIR, file), 'utf8'));
  return {
    slug: op.slug,
    businessName: op.businessName,
    rating: op.rating,
    reviewCount: op.reviewCount,
    suburb: op.suburb,
    featured: op.featured || false,
    serviceAreas: op.serviceAreas
  };
}).sort((a, b) => {
  if (a.featured !== b.featured) return b.featured ? 1 : -1;
  return (b.rating || 0) - (a.rating || 0);
});
indexData.lastUpdated = new Date().toISOString();
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

console.log('\\n===================================');
console.log('Updated', updated, 'operators');
console.log('===================================');
