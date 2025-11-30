import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

const OPERATORS_DIR = path.join(process.cwd(), 'public', 'operators');

interface Operator {
  id: string;
  slug: string;
  business_name: string;
  trading_name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address_suburb: string | null;
  address_postcode: string | null;
  address_state: string | null;
  license_number: string | null;
  license_type: string | null;
  license_status: string | null;
  epa_verified: boolean;
  google_rating: number | null;
  google_review_count: number | null;
  services: string | null;
  service_areas: string | null;
  description: string | null;
  short_description: string | null;
  featured: boolean;
  status: string;
}

function parseJsonField(field: string | null): any[] {
  if (!field) return [];
  try {
    return JSON.parse(field);
  } catch {
    return [];
  }
}

async function syncOperators() {
  console.log('🔄 Syncing operators from Supabase to JSON files...\n');

  // Fetch all active operators
  const { data: operators, error } = await supabase
    .from('operators')
    .select('*')
    .eq('status', 'active')
    .order('business_name');

  if (error) {
    console.error('Error fetching operators:', error.message);
    process.exit(1);
  }

  if (!operators || operators.length === 0) {
    console.log('No operators found');
    return;
  }

  console.log(`Found ${operators.length} active operators\n`);

  // Ensure directory exists
  if (!fs.existsSync(OPERATORS_DIR)) {
    fs.mkdirSync(OPERATORS_DIR, { recursive: true });
  }

  // Build index data
  const indexOperators: any[] = [];
  const regions: Record<string, string[]> = {};

  for (const op of operators as Operator[]) {
    const services = parseJsonField(op.services);
    const serviceAreas = parseJsonField(op.service_areas);

    // Determine region from suburb
    const suburb = op.address_suburb || 'Sydney';
    const region = getRegionFromSuburb(suburb);

    if (!regions[region]) {
      regions[region] = [];
    }
    regions[region].push(op.slug);

    // Create individual operator JSON file
    const operatorData = {
      slug: op.slug,
      businessName: op.business_name,
      tradingName: op.trading_name || op.business_name,
      phone: op.phone,
      email: op.email,
      website: op.website,
      address: {
        suburb: op.address_suburb,
        postcode: op.address_postcode,
        state: op.address_state || 'NSW',
      },
      license: {
        number: op.license_number,
        type: op.license_type,
        status: op.license_status,
        verified: op.epa_verified,
      },
      rating: op.google_rating || 0,
      reviewCount: op.google_review_count || 0,
      services: services,
      serviceAreas: serviceAreas.length > 0 ? serviceAreas : [slugify(suburb)],
      description: op.description,
      shortDescription: op.short_description,
      featured: op.featured || false,
    };

    // Write individual file
    const filePath = path.join(OPERATORS_DIR, `${op.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(operatorData, null, 2));

    // Add to index
    indexOperators.push({
      slug: op.slug,
      businessName: op.business_name,
      rating: op.google_rating || 0,
      reviewCount: op.google_review_count || 0,
      suburb: op.address_suburb || 'Sydney',
      featured: op.featured || false,
      serviceAreas: serviceAreas.length > 0 ? serviceAreas : [slugify(suburb)],
      services: services,
      epaVerified: op.epa_verified,
      phone: op.phone,
      website: op.website,
    });
  }

  // Write index file
  const indexData = {
    total: operators.length,
    lastUpdated: new Date().toISOString(),
    regions: regions,
    operators: indexOperators,
  };

  fs.writeFileSync(
    path.join(OPERATORS_DIR, 'index.json'),
    JSON.stringify(indexData, null, 2)
  );

  console.log(`✅ Synced ${operators.length} operators to JSON files`);
  console.log(`   - Individual files: ${operators.length}`);
  console.log(`   - Index file updated`);
  console.log(`   - Regions: ${Object.keys(regions).length}`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getRegionFromSuburb(suburb: string): string {
  const suburbLower = suburb.toLowerCase();

  // Map suburbs to regions
  const regionMap: Record<string, string[]> = {
    'sydney-cbd': ['sydney', 'sydney cbd', 'cbd'],
    'eastern-suburbs': ['bondi', 'randwick', 'coogee', 'maroubra', 'clovelly', 'bronte', 'waverley', 'paddington', 'woollahra', 'double bay', 'rose bay', 'vaucluse', 'bellevue hill'],
    'inner-west': ['newtown', 'marrickville', 'leichhardt', 'balmain', 'glebe', 'annandale', 'petersham', 'stanmore', 'enmore', 'dulwich hill', 'ashfield', 'burwood', 'strathfield'],
    'north-shore': ['north sydney', 'chatswood', 'willoughby', 'lane cove', 'artarmon', 'st leonards', 'crows nest', 'neutral bay', 'mosman', 'cremorne'],
    'northern-beaches': ['manly', 'dee why', 'brookvale', 'mona vale', 'newport', 'avalon', 'narrabeen', 'collaroy', 'freshwater', 'curl curl'],
    'western-sydney': ['parramatta', 'blacktown', 'penrith', 'liverpool', 'fairfield', 'bankstown', 'auburn', 'granville', 'merrylands', 'cabramatta'],
    'hills-district': ['castle hill', 'baulkham hills', 'bella vista', 'rouse hill', 'kellyville', 'dural', 'cherrybrook'],
    'sutherland-shire': ['sutherland', 'cronulla', 'miranda', 'caringbah', 'gymea', 'jannali', 'engadine'],
    'south-west': ['campbelltown', 'camden', 'macarthur', 'ingleburn', 'leumeah', 'minto'],
    'upper-north-shore': ['hornsby', 'gordon', 'pymble', 'turramurra', 'wahroonga', 'lindfield'],
    'ryde': ['ryde', 'eastwood', 'epping', 'macquarie park', 'meadowbank'],
  };

  for (const [region, suburbs] of Object.entries(regionMap)) {
    if (suburbs.some(s => suburbLower.includes(s))) {
      return region;
    }
  }

  return 'greater-sydney';
}

syncOperators().catch(console.error);
