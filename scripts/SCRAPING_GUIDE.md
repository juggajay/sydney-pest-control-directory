# Scraping Guide for Sydney Pest Control Directory

This document explains how to correctly scrape pest control operator data from directories like Yellow Pages and True Local.

---

## Table of Contents

1. [Data Fields Required](#data-fields-required)
2. [Website URL Rules](#website-url-rules)
3. [Phone Number Formatting](#phone-number-formatting)
4. [Business Name Validation](#business-name-validation)
5. [Duplicate Detection](#duplicate-detection)
6. [Service Areas](#service-areas)
7. [Google Reviews](#google-reviews)
8. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
9. [Testing Before Full Scrape](#testing-before-full-scrape)
10. [Post-Scrape Verification](#post-scrape-verification)

---

## Data Fields Required

Each operator record requires the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL-friendly identifier (lowercase, hyphens only) |
| `businessName` | string | Yes | Official business name |
| `tradingName` | string | No | Trading name if different |
| `phone` | string | Yes* | Primary contact phone |
| `email` | string | No | Business email |
| `website` | string | Yes* | **ACTUAL business website** (NOT directory URL) |
| `address` | object | Yes | Contains suburb, postcode, state |
| `rating` | number | No | Google rating (1.0-5.0) |
| `reviewCount` | number | No | Number of Google reviews |
| `services` | array | Yes | Service slugs offered |
| `serviceAreas` | array | Yes | Suburb slugs serviced |
| `description` | string | Yes | Business description |
| `featured` | boolean | No | Featured listing flag |

*At least one of phone or website is required.

---

## Website URL Rules

### CRITICAL: Never Store Directory URLs

The most common mistake is storing the directory page URL instead of the actual business website.

#### WRONG (Directory URLs - NEVER use these):
```
https://yellowpages.com.au
https://yellowpages.com.au/nsw/sydney/some-business-listing.html
https://truelocal.com.au
https://truelocal.com.au/business/some-business/sydney
https://whitepages.com.au
https://yelp.com.au
https://hotfrog.com.au
https://localsearch.com.au
```

#### CORRECT (Actual Business Websites):
```
https://abcpestcontrol.com.au
https://www.sydneypestexperts.com.au
http://pestcontrolservices.net.au
```

### How to Extract the Correct Website

On Yellow Pages, look for the `[View Website]` link in the listing:
```
[View Website](https://actualbusiness.com.au)
```

Extract the URL inside the parentheses, NOT the yellowpages.com.au URL.

### Website Validation Regex

```javascript
// Domains to REJECT (these are directories, not business websites)
const DIRECTORY_DOMAINS = [
  'yellowpages.com.au',
  'truelocal.com.au',
  'whitepages.com.au',
  'yelp.com.au',
  'yelp.com',
  'hotfrog.com.au',
  'localsearch.com.au',
  'whereis.com',
  'startlocal.com.au',
  'aussieweb.com.au',
  'dlook.com.au',
  'pinkpages.com.au',
  'wordofmouth.com.au',
  'oneflare.com.au',
  'airtasker.com',
  'hipages.com.au',
  'serviceseeking.com.au',
  'google.com',
  'facebook.com',
  'instagram.com',
  'linkedin.com'
];

function isValidBusinessWebsite(url) {
  if (!url) return false;

  const domain = url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .toLowerCase();

  // Reject if it's a directory domain
  if (DIRECTORY_DOMAINS.some(dir => domain.includes(dir))) {
    return false;
  }

  // Must be a valid URL format
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }

  return true;
}
```

### If No Valid Website Found

If the listing doesn't have a `[View Website]` link or the URL is invalid:
- Set `website` to `null`
- The operator can still be added if they have a valid phone number
- Do NOT use the directory URL as a fallback

---

## Phone Number Formatting

### Accepted Formats

Australian phone numbers should be stored in readable format:

```javascript
// Mobile numbers
"0412 345 678"
"0412345678"

// Landlines (Sydney area code 02)
"(02) 9876 5432"
"02 9876 5432"

// 1300/1800 numbers
"1300 123 456"
"1800 123 456"
```

### Phone Extraction from Yellow Pages

Yellow Pages uses this format in markdown:
```
[0412 345 678](tel:0412345678)
[Call](tel:0412345678)
[(02) 9876 5432](tel:0298765432)
```

#### Extraction Rules:

1. **Prefer the displayed number** (before the `tel:` link) if it looks like a real phone number
2. **Skip "Call" buttons** - if the displayed text is just "Call", extract and format the `tel:` number
3. **Format raw tel: numbers** appropriately:

```javascript
function formatPhoneFromTel(telNumber) {
  // Remove non-digits
  const digits = telNumber.replace(/\D/g, '');

  if (digits.startsWith('1300') || digits.startsWith('1800')) {
    // 1300/1800 format: 1300 123 456
    return `${digits.slice(0,4)} ${digits.slice(4,7)} ${digits.slice(7)}`;
  }

  if (digits.startsWith('04')) {
    // Mobile format: 0412 345 678
    return `${digits.slice(0,4)} ${digits.slice(4,7)} ${digits.slice(7)}`;
  }

  if (digits.startsWith('02') || digits.startsWith('03')) {
    // Landline format: (02) 9876 5432
    return `(${digits.slice(0,2)}) ${digits.slice(2,6)} ${digits.slice(6)}`;
  }

  return digits; // Return as-is if format unknown
}
```

### Phone Number Validation

```javascript
function isValidAustralianPhone(phone) {
  if (!phone) return false;

  const digits = phone.replace(/\D/g, '');

  // Must be 10 digits (or 8 for some old formats)
  if (digits.length < 8 || digits.length > 10) return false;

  // Must start with valid prefix
  const validPrefixes = ['02', '03', '04', '07', '08', '1300', '1800', '13'];
  return validPrefixes.some(prefix => digits.startsWith(prefix));
}
```

---

## Business Name Validation

### Names to REJECT

```javascript
const INVALID_PHRASES = [
  // UI elements
  'call us', 'contact us', 'get a quote', 'free quote', 'looking for',
  'schedule', 'book now', 'enquiry', 'click here', 'learn more',
  'read more', 'view all', 'see more', 'more info', 'less info',

  // Directory elements
  'results for', 'search', 'sponsored', 'advertisement', 'promoted',
  'map', 'directions', 'write a review', 'reviews', 'rating',
  'filter', 'handy tips', 'related categories', 'pest control near',
  'nearby locations', 'popular categories', 'browse categories',
  'yellow pages', 'true local',

  // Navigation
  'get quote', 'website', 'phone'
];

const GENERIC_NAMES = [
  'pest control',
  'pest services',
  'termite control',
  'pest management',
  'exterminator',
  'bug control',
  'home pest',
  'local pest'
];

function isValidBusinessName(name) {
  if (!name) return false;

  // Length check
  if (name.length < 3 || name.length > 100) return false;

  const nameLower = name.toLowerCase().trim();

  // Reject invalid phrases
  if (INVALID_PHRASES.some(phrase => nameLower.includes(phrase))) {
    return false;
  }

  // Reject markdown artifacts
  if (name.startsWith('###') || name.startsWith('##') || name.startsWith('#')) {
    return false;
  }

  // Reject numbered lists (except business names starting with 1st, 24, 365, etc.)
  if (/^\d+[^a-z0-9]/i.test(name) && !/^(1st|24|365)/i.test(name)) {
    return false;
  }

  // Reject names with line breaks or excessive punctuation
  if (name.includes('\n') || /[!?]{2,}/.test(name)) {
    return false;
  }

  // Reject generic names
  if (GENERIC_NAMES.includes(nameLower)) {
    return false;
  }

  return true;
}
```

---

## Duplicate Detection

Before adding a new operator, check for duplicates using these methods (in order):

### 1. Phone Number Match

```javascript
async function checkPhoneDuplicate(phone) {
  if (!phone) return false;

  // Normalize: remove spaces, dashes, parentheses
  const normalized = phone.replace(/[\s\-()]/g, '');

  // Check last 8 digits (handles different area code formats)
  const last8 = normalized.slice(-8);

  const { data } = await supabase
    .from('operators')
    .select('id, business_name')
    .ilike('phone', `%${last8}%`)
    .limit(1);

  return data && data.length > 0;
}
```

### 2. Website Domain Match

```javascript
async function checkWebsiteDuplicate(website) {
  if (!website) return false;

  // Extract domain without protocol or www
  const domain = website
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .toLowerCase();

  const { data } = await supabase
    .from('operators')
    .select('id, business_name')
    .ilike('website', `%${domain}%`)
    .limit(1);

  return data && data.length > 0;
}
```

### 3. Business Name/Slug Match

```javascript
function generateSlug(businessName) {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens
    .substring(0, 100);           // Limit length
}

async function checkSlugDuplicate(businessName) {
  const slug = generateSlug(businessName);

  const { data } = await supabase
    .from('operators')
    .select('id')
    .eq('slug', slug)
    .limit(1);

  return data && data.length > 0;
}
```

### Full Duplicate Check

```javascript
async function isDuplicate(phone, website, businessName) {
  // Check phone first (most reliable)
  if (await checkPhoneDuplicate(phone)) {
    console.log(`Duplicate found by phone: ${phone}`);
    return true;
  }

  // Check website
  if (await checkWebsiteDuplicate(website)) {
    console.log(`Duplicate found by website: ${website}`);
    return true;
  }

  // Check slug
  if (await checkSlugDuplicate(businessName)) {
    console.log(`Duplicate found by name: ${businessName}`);
    return true;
  }

  return false;
}
```

---

## Service Areas

### Format

Service areas are stored as an array of suburb slugs:

```javascript
"serviceAreas": [
  "sydney",
  "parramatta",
  "bondi",
  "chatswood"
]
```

### Extracting from Listings

Yellow Pages often shows the suburb in the listing. Use it as the primary service area:

```javascript
function extractSuburbSlug(suburb) {
  return suburb
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

### If Suburb Unknown

Use the search suburb as the default service area:

```javascript
const business = {
  // ... other fields
  serviceAreas: [extractSuburbSlug(searchSuburb)]
};
```

---

## Google Reviews

### Where to Get Reviews

1. **Best Source**: The business's own website often displays their Google rating
2. **Alternative**: Yellow Pages sometimes shows ratings
3. **Manual Lookup**: Google Maps (cannot be scraped automatically)

### Extracting from Business Websites

Look for schema.org markup or visible rating displays:

```javascript
// Common patterns in HTML/Markdown
const ratingPatterns = [
  /(\d\.?\d?)\s*(?:out of\s*)?5\s*stars?/i,
  /rating[:\s]+(\d\.?\d?)/i,
  /(\d\.?\d?)\s*\/\s*5/i
];

const reviewCountPatterns = [
  /(\d+)\s*reviews?/i,
  /(\d+)\s*customer reviews?/i,
  /based on\s*(\d+)\s*reviews?/i
];
```

### Validation

```javascript
function validateRating(rating) {
  const num = parseFloat(rating);
  return num >= 1.0 && num <= 5.0 ? num : null;
}

function validateReviewCount(count) {
  const num = parseInt(count);
  return num >= 0 ? num : null;
}
```

---

## Common Mistakes to Avoid

### 1. Storing Directory URLs as Website
**WRONG**: `website: "https://yellowpages.com.au"`
**RIGHT**: `website: "https://actualbusiness.com.au"` or `website: null`

### 2. Capturing UI Elements as Business Names
**WRONG**: `businessName: "### Filter"`
**RIGHT**: Skip this entry, it's not a business

### 3. Using "Call" Button Text as Phone
**WRONG**: `phone: "Call"`
**RIGHT**: Extract the actual number from the `tel:` link

### 4. Not Checking for Duplicates
Always check phone, website, AND slug before adding

### 5. Adding Businesses Without Contact Info
At least one of phone or website must be valid

### 6. Including Perth/Melbourne Businesses
Only include businesses in Sydney/NSW areas

### 7. Not Validating Postcodes
Sydney postcodes are 2000-2999. Reject others.

---

## Testing Before Full Scrape

### Always Run a Test First

Before running a full scrape across all suburbs, test with 2-3 suburbs:

```javascript
const TEST_SUBURBS = ['Parramatta', 'Chatswood', 'Penrith'];
```

### What to Check in Test Output

1. **Business names look legitimate** (not UI elements)
2. **Websites are actual business domains** (not directory URLs)
3. **Phone numbers are properly formatted**
4. **Duplicate detection is working**
5. **No errors in the console**

### Test Script Location

```
scripts/scrapeDirectoriesTest.ts
```

---

## Post-Scrape Verification

After running the scraper, verify the data:

### 1. Check for Bad Websites

```javascript
// Run this query to find directory URLs that slipped through
const { data } = await supabase
  .from('operators')
  .select('slug, website')
  .or('website.ilike.%yellowpages%,website.ilike.%truelocal%,website.ilike.%yelp%');

console.log('Bad websites found:', data);
```

### 2. Check for Missing Data

```javascript
// Find operators without phone AND without website
const { data } = await supabase
  .from('operators')
  .select('slug, business_name')
  .is('phone', null)
  .is('website', null);

console.log('Operators without contact info:', data);
```

### 3. Verify New Additions

After each scrape, manually spot-check 3-5 new additions:
- Visit their website (does it work?)
- Call the phone number (is it correct?)
- Search Google for the business (does it exist?)

---

## Script Files

| Script | Purpose |
|--------|---------|
| `scripts/scrapeYellowPages.ts` | Full Yellow Pages + True Local scrape |
| `scripts/scrapeDirectoriesTest.ts` | Test version (3 suburbs only) |
| `scripts/syncOperators.ts` | Sync Supabase to JSON files |
| `scripts/cleanupJunkOperators.ts` | Remove bad entries |

---

## Running the Scripts

```bash
# Test scrape (always run first!)
npx tsx scripts/scrapeDirectoriesTest.ts

# Full scrape (only after test passes)
npm run scrape-directories

# Sync to JSON files after scraping
npm run sync-operators

# Clean up bad entries if needed
npx tsx scripts/cleanupJunkOperators.ts
```

---

## Summary Checklist

Before adding ANY operator, verify:

- [ ] Business name is valid (not a UI element)
- [ ] Website is the ACTUAL business website (not a directory URL)
- [ ] Phone number is valid and properly formatted
- [ ] Not a duplicate (checked phone, website, and slug)
- [ ] Has at least one contact method (phone or website)
- [ ] Located in Sydney/NSW area
- [ ] Postcode is in 2000-2999 range (if known)

---

*Last updated: December 2024*
