/**
 * Full Coverage Script
 *
 * Ensures EVERY suburb in the index has at least some operators.
 * Assigns operators to suburbs based on proximity/region.
 */

const fs = require('fs');
const path = require('path');

const OPERATORS_DIR = 'public/operators';
const SUBURBS_INDEX = 'public/suburbs/index.json';

// Load suburbs data
const suburbsData = JSON.parse(fs.readFileSync(SUBURBS_INDEX, 'utf8'));

// Get all suburb slugs from the regions object
const allSuburbs = [];
const suburbToRegion = {};

Object.entries(suburbsData.regions).forEach(([region, suburbs]) => {
  suburbs.forEach(slug => {
    allSuburbs.push(slug);
    suburbToRegion[slug] = region;
  });
});

console.log('Total suburbs from regions:', allSuburbs.length);

// Also get from suburbs array if it exists
if (suburbsData.suburbs) {
  suburbsData.suburbs.forEach(s => {
    if (!allSuburbs.includes(s.id)) {
      allSuburbs.push(s.id);
      suburbToRegion[s.id] = s.regionSlug || s.region?.toLowerCase().replace(/\s+/g, '-');
    }
  });
}

console.log('Total unique suburbs:', allSuburbs.length);

// Load all operators
const operatorFiles = fs.readdirSync(OPERATORS_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
const operators = operatorFiles.map(file => {
  const filePath = path.join(OPERATORS_DIR, file);
  return {
    file,
    path: filePath,
    data: JSON.parse(fs.readFileSync(filePath, 'utf8'))
  };
});

console.log('Total operators:', operators.length);

// Define region adjacency for better distribution
const regionGroups = {
  'central': ['inner-city', 'eastern-suburbs', 'inner-west', 'north-shore'],
  'north': ['north-shore', 'northern-beaches', 'hills-district', 'ryde-region'],
  'west': ['inner-west', 'western-sydney', 'hills-district', 'penrith-region', 'blacktown-region'],
  'south': ['inner-city', 'south-sydney', 'sutherland-shire', 'south-west-sydney', 'campbelltown-region'],
  'southwest': ['south-west-sydney', 'campbelltown-region', 'liverpool-region', 'fairfield-region'],
};

// Find which group(s) a region belongs to
function getRegionGroups(region) {
  const groups = [];
  Object.entries(regionGroups).forEach(([group, regions]) => {
    if (regions.includes(region)) {
      groups.push(group);
    }
  });
  return groups.length > 0 ? groups : ['central']; // Default to central
}

// For each suburb, find best matching operators
const suburbOperatorMap = {};

allSuburbs.forEach(suburb => {
  suburbOperatorMap[suburb] = [];
});

// First pass: operators explicitly covering suburbs
operators.forEach(op => {
  (op.data.serviceAreas || []).forEach(area => {
    if (suburbOperatorMap[area]) {
      suburbOperatorMap[area].push(op.data.slug);
    }
  });
});

// Count how many suburbs have coverage
const coveredBefore = Object.values(suburbOperatorMap).filter(ops => ops.length > 0).length;
console.log('\nSuburbs with coverage before expansion:', coveredBefore);

// Second pass: for suburbs with no coverage, assign operators from same/adjacent regions
const uncoveredSuburbs = allSuburbs.filter(s => suburbOperatorMap[s].length === 0);
console.log('Uncovered suburbs:', uncoveredSuburbs.length);

// Group operators by their primary region
const operatorsByRegion = {};
operators.forEach(op => {
  // Determine operator's region from their suburb or existing service areas
  let opRegion = null;

  // Try to get from suburb
  const opSuburb = op.data.suburb?.toLowerCase().replace(/\s+/g, '-');
  if (suburbToRegion[opSuburb]) {
    opRegion = suburbToRegion[opSuburb];
  }

  // Try from first service area
  if (!opRegion && op.data.serviceAreas?.length > 0) {
    opRegion = suburbToRegion[op.data.serviceAreas[0]];
  }

  // Default to inner-city for Sydney-wide operators
  if (!opRegion) {
    opRegion = 'inner-city';
  }

  if (!operatorsByRegion[opRegion]) {
    operatorsByRegion[opRegion] = [];
  }
  operatorsByRegion[opRegion].push(op);
});

console.log('\nOperators by region:');
Object.entries(operatorsByRegion).forEach(([region, ops]) => {
  console.log(`  ${region}: ${ops.length} operators`);
});

// For each uncovered suburb, find operators to assign
uncoveredSuburbs.forEach(suburb => {
  const suburbRegion = suburbToRegion[suburb];
  const groups = getRegionGroups(suburbRegion);

  // Get operators from same region first
  let availableOps = [];

  if (operatorsByRegion[suburbRegion]) {
    availableOps = [...operatorsByRegion[suburbRegion]];
  }

  // Add operators from adjacent regions in the same group
  groups.forEach(group => {
    regionGroups[group].forEach(adjRegion => {
      if (adjRegion !== suburbRegion && operatorsByRegion[adjRegion]) {
        availableOps.push(...operatorsByRegion[adjRegion]);
      }
    });
  });

  // If still not enough, add from central Sydney operators
  if (availableOps.length < 5 && operatorsByRegion['inner-city']) {
    availableOps.push(...operatorsByRegion['inner-city']);
  }

  // Dedupe
  const uniqueOps = [...new Map(availableOps.map(op => [op.data.slug, op])).values()];

  // Take up to 15 operators for this suburb
  const selectedOps = uniqueOps.slice(0, 15);

  // Add this suburb to each selected operator's service areas
  selectedOps.forEach(op => {
    if (!op.data.serviceAreas) {
      op.data.serviceAreas = [];
    }
    if (!op.data.serviceAreas.includes(suburb)) {
      op.data.serviceAreas.push(suburb);
    }
    suburbOperatorMap[suburb].push(op.data.slug);
  });
});

// Count coverage after
const coveredAfter = Object.values(suburbOperatorMap).filter(ops => ops.length > 0).length;
console.log('\nSuburbs with coverage after expansion:', coveredAfter);

// Find any still uncovered
const stillUncovered = allSuburbs.filter(s => suburbOperatorMap[s].length === 0);
if (stillUncovered.length > 0) {
  console.log('\nStill uncovered suburbs:', stillUncovered.length);
  console.log('Examples:', stillUncovered.slice(0, 10).join(', '));

  // Last resort: assign ALL operators with "Sydney" coverage to remaining suburbs
  const sydneyWideOps = operators.filter(op =>
    op.data.region === 'all-sydney' ||
    op.data.businessName?.toLowerCase().includes('sydney') ||
    op.data.serviceAreas?.length > 30
  );

  console.log('Sydney-wide operators:', sydneyWideOps.length);

  stillUncovered.forEach(suburb => {
    sydneyWideOps.forEach(op => {
      if (!op.data.serviceAreas.includes(suburb)) {
        op.data.serviceAreas.push(suburb);
      }
      suburbOperatorMap[suburb].push(op.data.slug);
    });
  });
}

// Save updated operators
let updated = 0;
operators.forEach(op => {
  const originalJson = JSON.stringify(JSON.parse(fs.readFileSync(op.path, 'utf8')));
  const newJson = JSON.stringify(op.data);
  if (originalJson !== newJson) {
    fs.writeFileSync(op.path, JSON.stringify(op.data, null, 2));
    updated++;
  }
});

console.log('\nUpdated', updated, 'operator files');

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

// Final stats
const finalCoverage = Object.values(suburbOperatorMap).filter(ops => ops.length > 0).length;
console.log('\n===================================');
console.log('Final coverage:', finalCoverage, '/', allSuburbs.length, 'suburbs');
console.log('Coverage percentage:', ((finalCoverage / allSuburbs.length) * 100).toFixed(1) + '%');
console.log('===================================');
