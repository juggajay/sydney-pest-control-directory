import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

const JINA_API_KEY = process.env.JINA_API_KEY!;

const searchQueries = [
  "pest control Sydney CBD",
  "pest control North Sydney",
  "pest control Parramatta",
  "pest control Bondi",
  "pest control Manly",
  "pest control Chatswood",
  "pest control Penrith",
  "pest control Liverpool",
  "pest control Blacktown",
  "pest control Cronulla",
  "pest control Bankstown",
  "pest control Hornsby",
  "pest control Campbelltown",
  "pest control Ryde",
  "pest control Sutherland",
  "pest control Eastern Suburbs Sydney",
  "pest control Northern Beaches Sydney",
  "pest control Inner West Sydney",
  "pest control Hills District Sydney",
  "termite control Sydney",
  "termite inspection Sydney",
];

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

function detectServices(name: string, description: string = ''): string[] {
  const services = ["general-pest-control"];
  const text = `${name} ${description}`.toLowerCase();

  if (text.includes("termite") || text.includes("timber pest")) {
    services.push("termite-control", "termite-inspection");
  }
  if (text.includes("rodent") || text.includes("rat") || text.includes("mice") || text.includes("mouse")) {
    services.push("rodent-control");
  }
  if (text.includes("cockroach") || text.includes("roach")) {
    services.push("cockroach-control");
  }
  if (text.includes("bed bug") || text.includes("bedbug")) {
    services.push("bed-bug-treatment");
  }
  if (text.includes("spider")) {
    services.push("spider-control");
  }
  if (text.includes("ant ") || text.includes("ants")) {
    services.push("ant-control");
  }
  if (text.includes("commercial")) {
    services.push("commercial-pest-control");
  }
  if (text.includes("fumigat")) {
    services.push("fumigation");
  }

  return services;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if operator already exists by phone, website, or similar name
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

  // Check by website
  if (website) {
    const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    const { data: websiteMatch } = await supabase
      .from('operators')
      .select('id')
      .ilike('website', `%${domain}%`)
      .limit(1);

    if (websiteMatch && websiteMatch.length > 0) return true;
  }

  // Check by similar business name
  const slug = generateSlug(businessName);
  const { data: nameMatch } = await supabase
    .from('operators')
    .select('id')
    .eq('slug', slug)
    .limit(1);

  if (nameMatch && nameMatch.length > 0) return true;

  return false;
}

interface OperatorData {
  business_name: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address_suburb: string;
  address_postcode: string | null;
  google_rating: number | null;
  google_review_count: number;
  services: string[];
}

// Insert operator matching exact existing schema
async function insertOperator(operator: OperatorData): Promise<boolean> {
  const slug = generateSlug(operator.business_name);

  const newOperator = {
    business_name: operator.business_name,
    slug: slug,
    trading_name: operator.business_name,
    license_number: null,
    license_type: "Pest Management Technician",
    license_status: "active",
    license_expiry: null,
    epa_verified: false,
    epa_verified_date: null,
    phone: operator.phone,
    email: operator.email,
    website: operator.website,
    address_street: null,
    address_suburb: operator.address_suburb,
    address_postcode: operator.address_postcode,
    address_state: "NSW",
    abn: null,
    years_in_business: null,
    employee_count: null,
    insurance_verified: false,
    services: JSON.stringify(operator.services),
    service_areas: JSON.stringify([slugifySuburb(operator.address_suburb)]),
    google_rating: operator.google_rating,
    google_review_count: operator.google_review_count,
    pricing: null,
    features: JSON.stringify([]),
    description: `${operator.business_name} provides professional pest control services in ${operator.address_suburb} and surrounding areas. Licensed and insured.`,
    short_description: `Professional pest control in ${operator.address_suburb}. Licensed & insured.`,
    operating_hours: null,
    logo_url: null,
    images: JSON.stringify([]),
    listing_tier: "basic",
    featured: false,
    claimed: false,
    claimed_by: null,
    claimed_at: null,
    status: "active",
    seo_title: null,
    seo_description: null,
  };

  const { error } = await supabase
    .from('operators')
    .insert(newOperator);

  if (error) {
    console.error(`❌ Failed to insert ${operator.business_name}:`, error.message);
    return false;
  }

  console.log(`✅ Added: ${operator.business_name} (${operator.address_suburb})`);
  return true;
}

// Fetch and parse Google search results using Jina
async function searchGoogleMaps(query: string): Promise<OperatorData[]> {
  // Try Google search which provides better structured results
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + ' site:*.com.au')}`;

  try {
    const response = await fetch(`https://s.jina.ai/${encodeURIComponent(query + ' pest control Sydney')}`, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Jina search failed: ${response.status}`);
      // Fallback to Google Maps scrape
      return await scrapeGoogleMaps(query);
    }

    const data = await response.json();
    const operators: OperatorData[] = [];

    // Extract suburb from query
    const suburbMatch = query.match(/pest control (.+)/i) || query.match(/termite (?:control|inspection) (.+)/i);
    let defaultSuburb = suburbMatch ? suburbMatch[1].replace(' Sydney', '').trim() : 'Sydney';

    const regionToSuburb: Record<string, string> = {
      'Eastern Suburbs': 'Bondi',
      'Northern Beaches': 'Manly',
      'Inner West': 'Newtown',
      'Hills District': 'Castle Hill',
      'CBD': 'Sydney',
    };
    if (regionToSuburb[defaultSuburb]) {
      defaultSuburb = regionToSuburb[defaultSuburb];
    }

    // Parse search results
    if (data.data && Array.isArray(data.data)) {
      for (const result of data.data) {
        const title = result.title || '';
        const url = result.url || '';
        const description = result.description || '';

        // Skip non-pest control sites
        if (!title.toLowerCase().includes('pest') &&
            !title.toLowerCase().includes('termite') &&
            !description.toLowerCase().includes('pest control')) {
          continue;
        }

        // Skip directories and aggregators
        if (url.includes('yellowpages') ||
            url.includes('truelocal') ||
            url.includes('localsearch') ||
            url.includes('yelp') ||
            url.includes('oneflare') ||
            url.includes('hipages') ||
            url.includes('servicecentral')) {
          continue;
        }

        // Extract business name from title
        let businessName = title
          .replace(/\s*[-|–]\s*.+$/, '') // Remove suffix after dash
          .replace(/\s*\|.+$/, '') // Remove suffix after pipe
          .trim();

        if (businessName.length < 5 || businessName.length > 80) continue;

        // Extract phone from description if present
        const phoneMatch = description.match(/(?:(?:\+61|0)[\s-]?)?(?:\d{1,2}[\s-]?)?\d{4}[\s-]?\d{4}/);
        const phone = phoneMatch ? phoneMatch[0] : null;

        operators.push({
          business_name: businessName,
          phone: phone,
          email: null,
          website: url,
          address_suburb: defaultSuburb,
          address_postcode: null,
          google_rating: null,
          google_review_count: 0,
          services: detectServices(businessName, description)
        });
      }
    }

    return operators;

  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return await scrapeGoogleMaps(query);
  }
}

// Fallback: Scrape Google Maps directly
async function scrapeGoogleMaps(query: string): Promise<OperatorData[]> {
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'Accept': 'text/plain'
      }
    });

    if (!response.ok) {
      return [];
    }

    const content = await response.text();
    return parseGoogleMapsResults(content, query);

  } catch (error) {
    return [];
  }
}

// Parse Google Maps results from Jina output
function parseGoogleMapsResults(content: string, query: string): OperatorData[] {
  const operators: OperatorData[] = [];

  // Extract suburb from query
  const suburbMatch = query.match(/pest control (.+)/i) || query.match(/termite (?:control|inspection) (.+)/i);
  let defaultSuburb = suburbMatch ? suburbMatch[1].replace(' Sydney', '').trim() : 'Sydney';

  // Clean up region names to suburbs
  const regionToSuburb: Record<string, string> = {
    'Eastern Suburbs': 'Bondi',
    'Northern Beaches': 'Manly',
    'Inner West': 'Newtown',
    'Hills District': 'Castle Hill',
    'CBD': 'Sydney',
  };
  if (regionToSuburb[defaultSuburb]) {
    defaultSuburb = regionToSuburb[defaultSuburb];
  }

  // Phone patterns
  const phoneRegex = /(?:(?:\+61|0)[\s-]?)?(?:\d{1,2}[\s-]?)?\d{4}[\s-]?\d{4}/g;

  // Website pattern
  const websiteRegex = /https?:\/\/[^\s\)]+\.com\.au[^\s\)]*/gi;

  // Rating pattern - look for X.X or X stars/rating
  const ratingRegex = /(\d\.?\d?)\s*(?:stars?|\(|rating)/gi;

  // Review count pattern
  const reviewRegex = /\((\d+)\)|(\d+)\s*(?:reviews?|Google reviews?)/gi;

  // Split content into sections that might represent individual businesses
  // Google Maps results often have business names followed by details
  const lines = content.split('\n');

  let currentBusiness: OperatorData | null = null;
  const seenNames = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and common navigation text
    if (!line ||
        line.length < 3 ||
        line.includes('Directions') ||
        line.includes('Open 24 hours') ||
        line.includes('Closed') ||
        line.includes('Opens') ||
        line.startsWith('More') ||
        line.startsWith('Website') ||
        line.startsWith('Phone') ||
        line === 'Results') {
      continue;
    }

    // Look for business name patterns
    // Usually formatted as **Name** or just prominent text with Pest/Control/Termite
    const boldMatch = line.match(/\*\*([^*]+)\*\*/);
    const nameMatch = boldMatch ||
      (line.match(/^([A-Z][A-Za-z0-9\s&'.,-]+(?:Pest|Termite|Control|Services?|Solutions?|Management)[A-Za-z0-9\s&'.,-]*)$/i) &&
       line.length > 8 &&
       line.length < 80 &&
       !line.includes('http'));

    if (nameMatch) {
      const potentialName = (boldMatch ? boldMatch[1] : line).trim();

      // Validate it looks like a business name
      if (potentialName.length > 5 &&
          potentialName.length < 80 &&
          !potentialName.includes('http') &&
          !potentialName.match(/^\d/) &&
          !seenNames.has(potentialName.toLowerCase()) &&
          (potentialName.toLowerCase().includes('pest') ||
           potentialName.toLowerCase().includes('termite') ||
           potentialName.toLowerCase().includes('control') ||
           potentialName.toLowerCase().includes('exterminator'))) {

        // Save previous business if valid
        if (currentBusiness && currentBusiness.business_name && currentBusiness.phone) {
          operators.push(currentBusiness);
        }

        seenNames.add(potentialName.toLowerCase());
        currentBusiness = {
          business_name: potentialName,
          phone: null,
          email: null,
          website: null,
          address_suburb: defaultSuburb,
          address_postcode: null,
          google_rating: null,
          google_review_count: 0,
          services: detectServices(potentialName)
        };
      }
    }

    // Extract data for current business
    if (currentBusiness) {
      // Extract phone
      const phoneMatches = line.match(phoneRegex);
      if (phoneMatches && !currentBusiness.phone) {
        // Validate phone looks Australian
        const phone = phoneMatches[0].replace(/\s+/g, ' ').trim();
        if (phone.length >= 8 && phone.length <= 15) {
          currentBusiness.phone = phone;
        }
      }

      // Extract rating
      const ratingMatches = [...line.matchAll(ratingRegex)];
      if (ratingMatches.length > 0 && !currentBusiness.google_rating) {
        const rating = parseFloat(ratingMatches[0][1]);
        if (rating >= 1 && rating <= 5) {
          currentBusiness.google_rating = rating;
        }
      }

      // Extract review count
      const reviewMatches = [...line.matchAll(reviewRegex)];
      if (reviewMatches.length > 0 && currentBusiness.google_review_count === 0) {
        const count = parseInt(reviewMatches[0][1] || reviewMatches[0][2]);
        if (count > 0 && count < 10000) {
          currentBusiness.google_review_count = count;
        }
      }

      // Extract website
      const websiteMatches = line.match(websiteRegex);
      if (websiteMatches && !currentBusiness.website) {
        currentBusiness.website = websiteMatches[0].replace(/[)\]]+$/, ''); // Clean trailing brackets
      }

      // Extract suburb from address-like text
      const suburbMatch = line.match(/(?:^|\s)([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s*(?:NSW|2\d{3})/);
      if (suburbMatch) {
        currentBusiness.address_suburb = suburbMatch[1];
      }

      // Extract postcode
      const postcodeMatch = line.match(/\b(2\d{3})\b/);
      if (postcodeMatch && !currentBusiness.address_postcode) {
        currentBusiness.address_postcode = postcodeMatch[1];
      }
    }
  }

  // Don't forget the last business
  if (currentBusiness && currentBusiness.business_name && currentBusiness.phone) {
    operators.push(currentBusiness);
  }

  return operators;
}

// Try to extract email from operator's website
async function scrapeEmailFromWebsite(website: string): Promise<string | null> {
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
      // Filter out common non-business emails
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

      // Prefer info@, contact@, admin@, enquiries@ emails
      const preferredPrefixes = ['info', 'contact', 'admin', 'enquiries', 'enquiry'];
      const preferred = validEmails.find(email =>
        preferredPrefixes.some(prefix => email.toLowerCase().startsWith(prefix + '@'))
      );

      return preferred || validEmails[0] || null;
    }

    return null;
  } catch (error) {
    return null;
  }
}

// Main scraping function
async function main() {
  console.log('🔍 Starting Google Maps operator scrape...\n');
  console.log(`Using ${searchQueries.length} search queries\n`);

  let totalFound = 0;
  let totalAdded = 0;
  let totalSkipped = 0;

  for (let q = 0; q < searchQueries.length; q++) {
    const query = searchQueries[q];
    console.log(`\n[${q + 1}/${searchQueries.length}] 📍 Searching: ${query}`);

    const operators = await searchGoogleMaps(query);
    console.log(`   Found ${operators.length} potential operators`);

    for (const operator of operators) {
      totalFound++;

      // Check for duplicates
      const exists = await checkExists(operator.phone, operator.website, operator.business_name);
      if (exists) {
        console.log(`   ⏭️  Skipping duplicate: ${operator.business_name}`);
        totalSkipped++;
        continue;
      }

      // Try to get email from website
      if (operator.website && !operator.email) {
        console.log(`   🌐 Scraping email from ${operator.website}...`);
        operator.email = await scrapeEmailFromWebsite(operator.website);
        if (operator.email) {
          console.log(`      Found email: ${operator.email}`);
        }
        await sleep(2000); // Rate limit website scraping
      }

      // Insert the operator
      const success = await insertOperator(operator);
      if (success) {
        totalAdded++;
      }

      await sleep(1000); // Rate limit database inserts
    }

    // Rate limit between searches
    console.log(`   Waiting 3s before next search...`);
    await sleep(3000);
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
    .select('*', { count: 'exact', head: true });
  console.log(`\nTotal operators in database: ${count}`);
}

main().catch(console.error);
