/**
 * Regenerate index.json from existing operator JSON files
 * This does NOT modify individual operator files, just rebuilds the index
 */

const fs = require('fs');
const path = require('path');

const OPERATORS_DIR = path.join(process.cwd(), 'public', 'operators');

function getRegionFromSuburb(suburb) {
  const suburbLower = (suburb || '').toLowerCase();

  const regionMap = {
    'sydney-cbd': ['sydney', 'sydney cbd', 'cbd'],
    'eastern-suburbs': ['bondi', 'randwick', 'coogee', 'maroubra', 'clovelly', 'bronte', 'waverley', 'paddington', 'woollahra', 'double bay', 'rose bay', 'vaucluse', 'bellevue hill'],
    'inner-west': ['newtown', 'marrickville', 'leichhardt', 'balmain', 'glebe', 'annandale', 'petersham', 'stanmore', 'enmore', 'dulwich hill', 'ashfield', 'burwood', 'strathfield'],
    'north-shore': ['north sydney', 'chatswood', 'willoughby', 'lane cove', 'artarmon', 'st leonards', 'crows nest', 'neutral bay', 'mosman', 'cremorne'],
    'northern-beaches': ['manly', 'dee why', 'brookvale', 'mona vale', 'newport', 'avalon', 'narrabeen', 'collaroy', 'freshwater', 'curl curl'],
    'western-sydney': ['parramatta', 'blacktown', 'penrith', 'liverpool', 'fairfield', 'bankstown', 'auburn', 'granville', 'merrylands', 'cabramatta'],
    'hills-district': ['castle hill', 'baulkham hills', 'bella vista', 'rouse hill', 'kellyville', 'dural', 'cherrybrook'],
    'sutherland-shire': ['sutherland', 'cronulla', 'miranda', 'caringbah', 'gymea', 'jannali', 'engadine', 'menai', 'sylvania'],
    'south-west': ['campbelltown', 'camden', 'macarthur', 'ingleburn', 'leumeah', 'minto'],
    'upper-north-shore': ['hornsby', 'gordon', 'pymble', 'turramurra', 'wahroonga', 'lindfield'],
    'ryde': ['ryde', 'eastwood', 'epping', 'macquarie park', 'meadowbank'],
    'penrith': ['penrith', 'glenmore park', 'emu plains', 'st marys'],
    'all-sydney': ['all sydney', 'sydney wide']
  };

  for (const [region, suburbs] of Object.entries(regionMap)) {
    if (suburbs.some(s => suburbLower.includes(s))) {
      return region;
    }
  }

  return 'greater-sydney';
}

async function regenerateIndex() {
  console.log('🔄 Regenerating index.json from existing operator files...\n');

  // Get all JSON files except index.json
  const files = fs.readdirSync(OPERATORS_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json');

  console.log(`Found ${files.length} operator files\n`);

  const indexOperators = [];
  const regions = {};

  for (const file of files) {
    try {
      const filePath = path.join(OPERATORS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const op = JSON.parse(content);

      // Get suburb - handle both flat and nested formats
      const suburb = op.suburb || (op.address && op.address.suburb) || 'Sydney';
      const postcode = op.postcode || (op.address && op.address.postcode) || '';

      // Determine region
      const region = op.region || getRegionFromSuburb(suburb);

      if (!regions[region]) {
        regions[region] = [];
      }
      regions[region].push(op.slug);

      // Add to index
      indexOperators.push({
        id: op.id,
        slug: op.slug,
        businessName: op.businessName,
        tradingName: op.tradingName,
        suburb: suburb,
        postcode: postcode,
        region: region,
        rating: op.rating || 0,
        ratingSource: op.ratingSource || null,
        reviewCount: op.reviewCount || 0,
        yearsInBusiness: op.yearsInBusiness || null,
        services: op.services || [],
        serviceAreas: op.serviceAreas || [],
        featured: op.featured || false,
        tier: op.tier || 'basic',
        epaVerified: op.epaVerified || false,
        phone: op.phone,
        website: op.website,
        dataQuality: op.dataQuality || null
      });
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  // Sort operators by rating (descending), then by name
  indexOperators.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.businessName.localeCompare(b.businessName);
  });

  // Write index file
  const indexData = {
    total: indexOperators.length,
    lastUpdated: new Date().toISOString(),
    regions: regions,
    operators: indexOperators
  };

  fs.writeFileSync(
    path.join(OPERATORS_DIR, 'index.json'),
    JSON.stringify(indexData, null, 2)
  );

  console.log('✅ Index regenerated successfully');
  console.log(`   - Total operators: ${indexOperators.length}`);
  console.log(`   - Regions: ${Object.keys(regions).length}`);
  console.log('\nRegion breakdown:');
  Object.entries(regions)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([region, slugs]) => {
      console.log(`   ${region}: ${slugs.length} operators`);
    });
}

regenerateIndex().catch(console.error);
