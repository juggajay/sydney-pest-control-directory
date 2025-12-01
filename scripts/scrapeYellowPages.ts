import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

const JINA_API_KEY = process.env.JINA_API_KEY!;

// Sydney suburbs to search - major areas
const SYDNEY_SUBURBS = [
  // CBD & Inner City
  'Sydney', 'Ultimo', 'Pyrmont', 'Surry Hills', 'Darlinghurst', 'Potts Point', 'Woolloomooloo',
  // Eastern Suburbs
  'Bondi', 'Bondi Junction', 'Coogee', 'Randwick', 'Maroubra', 'Double Bay', 'Rose Bay',
  'Vaucluse', 'Paddington', 'Woollahra', 'Bronte', 'Clovelly', 'Waverley',
  // Inner West
  'Newtown', 'Marrickville', 'Leichhardt', 'Balmain', 'Glebe', 'Annandale', 'Petersham',
  'Stanmore', 'Enmore', 'Dulwich Hill', 'Ashfield', 'Burwood', 'Strathfield', 'Homebush',
  // North Shore
  'North Sydney', 'Chatswood', 'Willoughby', 'Lane Cove', 'Artarmon', 'St Leonards',
  'Crows Nest', 'Neutral Bay', 'Mosman', 'Cremorne', 'Kirribilli',
  // Northern Beaches
  'Manly', 'Dee Why', 'Brookvale', 'Mona Vale', 'Newport', 'Avalon', 'Narrabeen',
  'Collaroy', 'Freshwater', 'Curl Curl', 'Warriewood',
  // Western Sydney
  'Parramatta', 'Blacktown', 'Penrith', 'Liverpool', 'Fairfield', 'Bankstown',
  'Auburn', 'Granville', 'Merrylands', 'Cabramatta', 'Westmead', 'Harris Park',
  // Hills District
  'Castle Hill', 'Baulkham Hills', 'Bella Vista', 'Rouse Hill', 'Kellyville',
  'Dural', 'Cherrybrook', 'West Pennant Hills', 'Carlingford',
  // Sutherland Shire
  'Sutherland', 'Cronulla', 'Miranda', 'Caringbah', 'Gymea', 'Jannali', 'Engadine',
  'Menai', 'Kirrawee', 'Sylvania',
  // South West
  'Campbelltown', 'Camden', 'Ingleburn', 'Leumeah', 'Minto', 'Macarthur', 'Narellan',
  // Upper North Shore
  'Hornsby', 'Gordon', 'Pymble', 'Turramurra', 'Wahroonga', 'Lindfield', 'Killara',
  'Roseville', 'St Ives',
  // Ryde Area
  'Ryde', 'Eastwood', 'Epping', 'Macquarie Park', 'Meadowbank', 'West Ryde', 'Denistone',
];

interface ScrapedBusiness {
  name: string;
  phone: string | null;
  address: string | null;
  suburb: string | null;
  postcode: string | null;
  website: string | null;
  description: string | null;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

function slugifySuburb(suburb: string): string {
  return suburb
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Check if name looks like a real business
function isValidBusinessName(name: string): boolean {
  // Too short or too long
  if (name.length < 3 || name.length > 100) return false;

  // Contains call-to-action phrases or non-business content
  const invalidPhrases = [
    'call us', 'contact us', 'get a quote', 'free quote', 'looking for',
    'schedule', 'book now', 'enquiry', 'click here', 'learn more',
    'read more', 'view all', 'see more', 'results for', 'search',
    'sponsored', 'advertisement', 'promoted', 'map', 'directions',
    'write a review', 'website', 'phone', 'reviews', 'rating',
    'filter', 'handy tips', 'related categories', 'pest control near',
    'more info', 'less info', 'get quote', 'yellow pages',
    'nearby locations', 'popular categories', 'browse categories'
  ];
  const nameLower = name.toLowerCase();
  if (invalidPhrases.some(phrase => nameLower.includes(phrase))) return false;

  // Skip markdown headers that aren't business names
  if (name.startsWith('###') || name.startsWith('##') || name.startsWith('#')) return false;

  // Starts with numbers (except common like "1st", "24/7")
  if (/^\d+[^a-z0-9]/.test(name) && !/^(1st|24|365)/.test(name)) return false;

  // Contains newlines or excessive punctuation
  if (name.includes('\n') || /[!?]{2,}/.test(name)) return false;

  // Is just generic text
  const genericNames = [
    'pest control', 'pest services', 'termite control', 'pest management',
    'exterminator', 'bug control', 'home pest', 'local pest',
  ];
  if (genericNames.includes(nameLower.trim())) return false;

  return true;
}

// Detect services from business name/description
function detectServices(name: string, description: string = ''): string[] {
  const services = ['general-pest-control'];
  const text = `${name} ${description}`.toLowerCase();

  if (text.includes('termite') || text.includes('timber pest') || text.includes('white ant')) {
    services.push('termite-control', 'termite-inspection');
  }
  if (text.includes('rodent') || text.includes('rat') || text.includes('mice') || text.includes('mouse')) {
    services.push('rodent-control');
  }
  if (text.includes('cockroach') || text.includes('roach')) {
    services.push('cockroach-control');
  }
  if (text.includes('bed bug') || text.includes('bedbug')) {
    services.push('bed-bug-treatment');
  }
  if (text.includes('spider')) {
    services.push('spider-control');
  }
  if (text.includes('ant ') || text.includes('ants')) {
    services.push('ant-control');
  }
  if (text.includes('commercial')) {
    services.push('commercial-pest-control');
  }
  if (text.includes('fumigat')) {
    services.push('fumigation');
  }
  if (text.includes('possum')) {
    services.push('possum-removal');
  }
  if (text.includes('bird')) {
    services.push('bird-control');
  }
  if (text.includes('flea')) {
    services.push('flea-treatment');
  }

  return services;
}

// Check if operator already exists
async function checkExists(phone: string | null, website: string | null, businessName: string): Promise<boolean> {
  // Check by phone
  if (phone) {
    const normalizedPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
    const { data: phoneMatch } = await supabase
      .from('operators')
      .select('id')
      .ilike('phone', `%${normalizedPhone.slice(-8)}%`)
      .limit(1);

    if (phoneMatch && phoneMatch.length > 0) return true;
  }

  // Check by website domain
  if (website) {
    const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    const { data: websiteMatch } = await supabase
      .from('operators')
      .select('id')
      .ilike('website', `%${domain}%`)
      .limit(1);

    if (websiteMatch && websiteMatch.length > 0) return true;
  }

  // Check by slug
  const slug = generateSlug(businessName);
  const { data: nameMatch } = await supabase
    .from('operators')
    .select('id')
    .eq('slug', slug)
    .limit(1);

  if (nameMatch && nameMatch.length > 0) return true;

  return false;
}

// Parse Yellow Pages listing page
async function scrapeYellowPages(suburb: string): Promise<ScrapedBusiness[]> {
  const businesses: ScrapedBusiness[] = [];

  // Yellow Pages URL pattern for pest control in a suburb
  const url = `https://www.yellowpages.com.au/search/listings?clue=pest+control&locationClue=${encodeURIComponent(suburb)}%2C+NSW`;

  console.log(`   YP: ${suburb}`);

  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'Accept': 'text/plain',
      }
    });

    if (!response.ok) {
      console.log(`   YP returned ${response.status}`);
      return businesses;
    }

    const content = await response.text();

    // Parse for business listings
    // Yellow Pages format: [### Business Name](url) followed by details
    const lines = content.split('\n');
    let currentBusiness: Partial<ScrapedBusiness> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Look for Yellow Pages format: [### Business Name](listing-url)
      const ypLinkMatch = line.match(/\[###\s*([^\]]+)\]/);
      // Also check for bold text
      const boldMatch = line.match(/\*\*([^*]+)\*\*/);
      // Also check for markdown headers
      const headerMatch = line.match(/^###\s*(.+)$/);

      const nameCandidate = ypLinkMatch ? ypLinkMatch[1] : (boldMatch ? boldMatch[1] : (headerMatch ? headerMatch[1] : null));

      if (nameCandidate) {
        const potentialName = nameCandidate.trim();

        // Save previous business if it has contact info
        if (currentBusiness.name && (currentBusiness.phone || currentBusiness.website)) {
          businesses.push({
            name: currentBusiness.name,
            phone: currentBusiness.phone || null,
            address: currentBusiness.address || null,
            suburb: currentBusiness.suburb || suburb,
            postcode: currentBusiness.postcode || null,
            website: currentBusiness.website || null,
            description: null,
          });
        }

        // Start new business - be permissive since we're on a pest control search page
        if (isValidBusinessName(potentialName) && potentialName.length > 3) {
          currentBusiness = { name: potentialName, suburb };
        } else {
          currentBusiness = {};
        }
      }

      // Extract phone - look for tel: links or standard phone formats
      // Format: [1300 247 777](tel:1300247777) or [(02) 9477 4802](tel:0294774802)
      const telLinkMatch = line.match(/\[([^\]]+)\]\(tel:(\d+)\)/);
      if (telLinkMatch && currentBusiness.name && !currentBusiness.phone) {
        const displayedPhone = telLinkMatch[1];
        const telNumber = telLinkMatch[2];
        // Skip if it's just "Call" text - we want the actual phone number display
        if (displayedPhone.toLowerCase() !== 'call' && displayedPhone.length > 4) {
          currentBusiness.phone = displayedPhone;
        } else if (telNumber.length >= 8) {
          // Format the raw tel number
          if (telNumber.startsWith('1300') || telNumber.startsWith('1800')) {
            currentBusiness.phone = `${telNumber.slice(0,4)} ${telNumber.slice(4,7)} ${telNumber.slice(7)}`;
          } else if (telNumber.startsWith('04')) {
            currentBusiness.phone = `${telNumber.slice(0,4)} ${telNumber.slice(4,7)} ${telNumber.slice(7)}`;
          } else if (telNumber.startsWith('02') || telNumber.startsWith('03')) {
            currentBusiness.phone = `(${telNumber.slice(0,2)}) ${telNumber.slice(2,6)} ${telNumber.slice(6)}`;
          } else {
            currentBusiness.phone = telNumber;
          }
        }
      }

      // Fallback to standard phone patterns if no phone yet
      if (!currentBusiness.phone && currentBusiness.name) {
        const phoneMatch = line.match(/\(0\d\)\s*\d{4}\s*\d{4}/) ||
                           line.match(/0\d\s*\d{4}\s*\d{4}/) ||
                           line.match(/1300\s*\d{3}\s*\d{3}/) ||
                           line.match(/1800\s*\d{3}\s*\d{3}/);
        if (phoneMatch) {
          currentBusiness.phone = phoneMatch[0];
        }
      }

      // Extract website from View Website links or direct URLs
      const websiteMatch = line.match(/\[View Website\]\(([^)]+)\)/) ||
                           line.match(/https?:\/\/(?:www\.)?([a-z0-9-]+\.com\.au)[^\s\)]*/i);
      if (websiteMatch && currentBusiness.name && !currentBusiness.website) {
        const url = websiteMatch[1] || websiteMatch[0];
        // Normalize URL
        currentBusiness.website = url.startsWith('http') ? url : `https://${url}`;
      }

      // Extract postcode from location text
      const postcodeMatch = line.match(/\b(2\d{3})\b/);
      if (postcodeMatch && currentBusiness.name) {
        currentBusiness.postcode = postcodeMatch[1];
      }

      // Extract suburb from location text like "Pest Control, Parramatta, NSW 2150"
      const locationMatch = line.match(/,\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+)?),?\s*NSW/);
      if (locationMatch && currentBusiness.name) {
        currentBusiness.suburb = locationMatch[1];
      }
    }

    // Last business
    if (currentBusiness.name && isValidBusinessName(currentBusiness.name) &&
        (currentBusiness.phone || currentBusiness.website)) {
      businesses.push({
        name: currentBusiness.name,
        phone: currentBusiness.phone || null,
        address: currentBusiness.address || null,
        suburb: currentBusiness.suburb || suburb,
        postcode: currentBusiness.postcode || null,
        website: currentBusiness.website || null,
        description: null,
      });
    }

    return businesses;

  } catch (error) {
    console.error(`   Error scraping Yellow Pages for ${suburb}:`, error);
    return businesses;
  }
}

// Scrape True Local
async function scrapeTrueLocal(suburb: string): Promise<ScrapedBusiness[]> {
  const businesses: ScrapedBusiness[] = [];
  const suburbSlug = suburb.toLowerCase().replace(/\s+/g, '-');

  const url = `https://www.truelocal.com.au/find/pest-control/${suburbSlug}-nsw`;

  console.log(`   TL: ${suburb}`);

  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'Accept': 'text/plain',
      }
    });

    if (!response.ok) {
      console.log(`   TL returned ${response.status}`);
      return businesses;
    }

    const content = await response.text();

    // Parse similar to Yellow Pages
    const lines = content.split('\n');
    let currentBusiness: Partial<ScrapedBusiness> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Look for business names - True Local uses similar patterns
      const linkMatch = line.match(/\[###\s*([^\]]+)\]/);
      const boldMatch = line.match(/\*\*([^*]+)\*\*/);
      const headerMatch = line.match(/^###\s*(.+)$/);
      const nameCandidate = linkMatch ? linkMatch[1] : (boldMatch ? boldMatch[1] : (headerMatch ? headerMatch[1] : null));

      if (nameCandidate) {
        const potentialName = nameCandidate.trim();

        // Save previous business if valid
        if (currentBusiness.name && (currentBusiness.phone || currentBusiness.website)) {
          businesses.push({
            name: currentBusiness.name,
            phone: currentBusiness.phone || null,
            address: currentBusiness.address || null,
            suburb: currentBusiness.suburb || suburb,
            postcode: currentBusiness.postcode || null,
            website: currentBusiness.website || null,
            description: null,
          });
        }

        // Start new business - be permissive since we're on a pest control search page
        if (isValidBusinessName(potentialName) && potentialName.length > 3) {
          currentBusiness = { name: potentialName, suburb };
        } else {
          currentBusiness = {};
        }
      }

      // Extract phone from tel: links first
      const telLinkMatch = line.match(/\[([^\]]+)\]\(tel:(\d+)\)/);
      if (telLinkMatch && currentBusiness.name && !currentBusiness.phone) {
        const displayedPhone = telLinkMatch[1];
        const telNumber = telLinkMatch[2];
        if (displayedPhone.toLowerCase() !== 'call' && displayedPhone.length > 4) {
          currentBusiness.phone = displayedPhone;
        } else if (telNumber.length >= 8) {
          if (telNumber.startsWith('1300') || telNumber.startsWith('1800')) {
            currentBusiness.phone = `${telNumber.slice(0,4)} ${telNumber.slice(4,7)} ${telNumber.slice(7)}`;
          } else if (telNumber.startsWith('04')) {
            currentBusiness.phone = `${telNumber.slice(0,4)} ${telNumber.slice(4,7)} ${telNumber.slice(7)}`;
          } else if (telNumber.startsWith('02') || telNumber.startsWith('03')) {
            currentBusiness.phone = `(${telNumber.slice(0,2)}) ${telNumber.slice(2,6)} ${telNumber.slice(6)}`;
          } else {
            currentBusiness.phone = telNumber;
          }
        }
      }

      // Fallback to standard phone patterns
      if (!currentBusiness.phone && currentBusiness.name) {
        const phoneMatch = line.match(/\(0\d\)\s*\d{4}\s*\d{4}/) ||
                           line.match(/0\d\s*\d{4}\s*\d{4}/) ||
                           line.match(/1300\s*\d{3}\s*\d{3}/) ||
                           line.match(/1800\s*\d{3}\s*\d{3}/);
        if (phoneMatch) {
          currentBusiness.phone = phoneMatch[0];
        }
      }

      // Extract website
      const websiteMatch = line.match(/\[View Website\]\(([^)]+)\)/) ||
                           line.match(/https?:\/\/(?:www\.)?([a-z0-9-]+\.com\.au)[^\s\)]*/i);
      if (websiteMatch && currentBusiness.name && !currentBusiness.website) {
        const url = websiteMatch[1] || websiteMatch[0];
        currentBusiness.website = url.startsWith('http') ? url : `https://${url}`;
      }

      // Extract postcode
      const postcodeMatch = line.match(/\b(2\d{3})\b/);
      if (postcodeMatch && currentBusiness.name) {
        currentBusiness.postcode = postcodeMatch[1];
      }

      // Extract suburb
      const locationMatch = line.match(/,\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+)?),?\s*NSW/);
      if (locationMatch && currentBusiness.name) {
        currentBusiness.suburb = locationMatch[1];
      }
    }

    // Last business
    if (currentBusiness.name && isValidBusinessName(currentBusiness.name) &&
        (currentBusiness.phone || currentBusiness.website)) {
      businesses.push({
        name: currentBusiness.name,
        phone: currentBusiness.phone || null,
        address: currentBusiness.address || null,
        suburb: currentBusiness.suburb || suburb,
        postcode: currentBusiness.postcode || null,
        website: currentBusiness.website || null,
        description: null,
      });
    }

    return businesses;

  } catch (error) {
    console.error(`   Error scraping True Local for ${suburb}:`, error);
    return businesses;
  }
}

// Try to scrape email from business website
async function scrapeEmail(website: string): Promise<string | null> {
  try {
    const response = await fetch(`https://r.jina.ai/${website}`, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'Accept': 'text/plain'
      }
    });

    if (!response.ok) return null;

    const content = await response.text();

    // Look for email patterns
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = content.match(emailRegex);

    if (emails && emails.length > 0) {
      // Filter out system emails
      const excludedDomains = [
        'example.com', 'sentry.io', 'wixpress.com', 'wordpress.com',
        'squarespace.com', 'google.com', 'facebook.com', 'domain.com'
      ];

      const validEmails = emails.filter(email => {
        const domain = email.split('@')[1].toLowerCase();
        return !excludedDomains.some(ex => domain.includes(ex)) &&
               !email.includes('noreply') &&
               !email.includes('no-reply');
      });

      // Prefer contact emails
      const preferredPrefixes = ['info', 'contact', 'admin', 'enquiries', 'enquiry', 'hello'];
      const preferred = validEmails.find(email =>
        preferredPrefixes.some(prefix => email.toLowerCase().startsWith(prefix + '@'))
      );

      return preferred || validEmails[0] || null;
    }

    return null;
  } catch {
    return null;
  }
}

// Insert operator to database
async function insertOperator(business: ScrapedBusiness, email: string | null): Promise<boolean> {
  const slug = generateSlug(business.name);
  const services = detectServices(business.name, business.description || '');

  const newOperator = {
    business_name: business.name,
    slug: slug,
    trading_name: business.name,
    license_number: null,
    license_type: 'Pest Management Technician',
    license_status: 'active',
    license_expiry: null,
    epa_verified: false,
    epa_verified_date: null,
    phone: business.phone,
    email: email,
    website: business.website,
    address_street: business.address,
    address_suburb: business.suburb,
    address_postcode: business.postcode,
    address_state: 'NSW',
    abn: null,
    years_in_business: null,
    employee_count: null,
    insurance_verified: false,
    services: JSON.stringify(services),
    service_areas: JSON.stringify([slugifySuburb(business.suburb || 'Sydney')]),
    google_rating: null,
    google_review_count: 0,
    pricing: null,
    features: JSON.stringify([]),
    description: `${business.name} provides professional pest control services in ${business.suburb || 'Sydney'} and surrounding areas.`,
    short_description: `Professional pest control in ${business.suburb || 'Sydney'}.`,
    operating_hours: null,
    logo_url: null,
    images: JSON.stringify([]),
    listing_tier: 'basic',
    featured: false,
    claimed: false,
    claimed_by: null,
    claimed_at: null,
    status: 'active',
    seo_title: null,
    seo_description: null,
  };

  const { error } = await supabase
    .from('operators')
    .insert(newOperator);

  if (error) {
    console.error(`   Failed to insert ${business.name}:`, error.message);
    return false;
  }

  return true;
}

// Main function
async function main() {
  console.log('🔍 Starting Yellow Pages / True Local scrape...\n');
  console.log(`Searching ${SYDNEY_SUBURBS.length} suburbs\n`);

  let totalFound = 0;
  let totalAdded = 0;
  let totalSkipped = 0;

  // Dedupe businesses across suburbs
  const seenBusinesses = new Set<string>();

  for (let i = 0; i < SYDNEY_SUBURBS.length; i++) {
    const suburb = SYDNEY_SUBURBS[i];
    console.log(`\n[${i + 1}/${SYDNEY_SUBURBS.length}] 📍 Searching: ${suburb}`);

    // Scrape both Yellow Pages and True Local
    const ypBusinesses = await scrapeYellowPages(suburb);
    await sleep(2000); // Rate limit

    const tlBusinesses = await scrapeTrueLocal(suburb);
    await sleep(2000); // Rate limit

    // Combine and dedupe
    const allBusinesses = [...ypBusinesses, ...tlBusinesses];
    const uniqueBusinesses = allBusinesses.filter(b => {
      const key = generateSlug(b.name);
      if (seenBusinesses.has(key)) return false;
      seenBusinesses.add(key);
      return true;
    });

    console.log(`   Found ${uniqueBusinesses.length} unique businesses`);
    totalFound += uniqueBusinesses.length;

    for (const business of uniqueBusinesses) {
      // Check if already in database
      const exists = await checkExists(business.phone, business.website, business.name);
      if (exists) {
        console.log(`   ⏭️  Skip duplicate: ${business.name}`);
        totalSkipped++;
        continue;
      }

      // Try to get email
      let email: string | null = null;
      if (business.website) {
        console.log(`   🌐 Getting email from ${business.website}...`);
        email = await scrapeEmail(business.website);
        if (email) {
          console.log(`      Found: ${email}`);
        }
        await sleep(1500); // Rate limit
      }

      // Insert to database
      const success = await insertOperator(business, email);
      if (success) {
        console.log(`   ✅ Added: ${business.name}`);
        totalAdded++;
      }

      await sleep(500);
    }

    // Progress save every 10 suburbs
    if ((i + 1) % 10 === 0) {
      console.log(`\n📊 Progress: ${totalAdded} added, ${totalSkipped} skipped\n`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 SCRAPE COMPLETE');
  console.log('='.repeat(50));
  console.log(`Total found:   ${totalFound}`);
  console.log(`Total added:   ${totalAdded}`);
  console.log(`Total skipped: ${totalSkipped} (duplicates)`);
  console.log('='.repeat(50));

  // Final count
  const { count } = await supabase
    .from('operators')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');
  console.log(`\nTotal operators in database: ${count}`);
}

main().catch(console.error);
