# SEO Cannibalization - Executive Action Plan
## Sydney Pest Control Directory

**Quick Reference Guide for Immediate Implementation**

---

## CONFLICT PRIORITY SCORECARD

| Conflict | Severity | Pages Affected | Quick Fix Time | Implementation Impact |
|----------|----------|---|---|---|
| Region vs Suburb | HIGH | 606 pages (7 regions + 600 suburbs) | 2 hours | +15% avg traffic |
| Service vs Suburb | MEDIUM | 615 pages (15 services + 600 suburbs) | 3 hours | +8% service traffic |
| Operator vs Service | MEDIUM | 115 pages (100+ operators + 15 services) | 2 hours | +10% operator traffic |
| Near-duplicate Suburbs | MEDIUM | 50-100 pages (Bondi variants, etc.) | 4 hours | +5% variant traffic |
| Service + Region Combos | LOW | All pages (linking opportunity) | 1 hour | +3% long-tail |
| Homepage vs Operators | LOW | 2 pages | 0.5 hours | Negligible |

**Total Priority-1 Implementation Time: 10-12 hours**

---

## PHASE 1: THIS WEEK (Immediate Action Items)

### Task 1.1: Update Meta Titles (2 hours)

**File:** `/lib/seo.js` - Update generateMetadata function

**Changes Required:**

```javascript
// CURRENT
title: `Pest Control ${suburb.name} - ${operators.length} Licensed Operators`

// IMPROVED
title: `Pest Control in ${suburb.name} NSW ${suburb.postcode} | ${operators.length} Operators | Free Quotes`

// RATIONALE: Adds postcode (local signal), calls action (free quotes), reduces generic-ness
```

**Implementation Checklist:**
- [ ] Update SUBURB page title template (file: `app/pest-control/[suburb]/page.js` lines 40-41)
- [ ] Update SERVICE page title template (file: `app/services/[service]/page.js` lines 39-40)
- [ ] Update REGION page title template (file: `app/locations/[region]/page.js` lines 85-87)
- [ ] Update OPERATOR page title template (file: `app/operator/[slug]/page.js` lines 40-41)
- [ ] Test: Search "Pest Control Bondi" → Verify title shows in SERP

**Expected Result:**
- Clearer SERP snippets
- Better CTR from more specific titles
- Reduced click competition between pages

---

### Task 1.2: Implement Canonical Tags (2 hours)

**File:** All page files need canonical implementation

**Current Situation:**
- Homepage: Likely has canonical ✓
- Suburb pages: Likely have self-referential canonical ✓
- Service pages: Likely have self-referential canonical ✓
- Region pages: UNKNOWN - may be missing

**Action - Add Canonical to Region Pages:**

File: `/app/locations/[region]/page.js`

```javascript
// Add to generateMetadata or layout
export async function generateMetadata({ params }) {
  const region = regionsData[params.region];

  return {
    title: `Pest Control ${region.name} Sydney...`,
    description: `...`,
    // ADD THIS:
    alternates: {
      canonical: `https://sydneypestcontrol.com.au/locations/${params.region}`,
    },
  };
}
```

**For Suburb Variant Consolidation:**

If keeping Bondi, Bondi Beach, Bondi Junction as separate pages:
```javascript
// In app/pest-control/[suburb]/page.js
export async function generateMetadata({ params }) {
  const suburb = getSuburbBySlug(params.suburb);

  // Bondi Beach and Bondi Junction can keep self-referential canonicals
  // They are legitimately different areas
  return {
    title: `...`,
    alternates: {
      canonical: `https://sydneypestcontrol.com.au/pest-control/${suburb.slug}`,
    },
  };
}

// If Bondi "Beach View" is just variant of Bondi:
// Use canonical to main Bondi page instead
```

**Action Checklist:**
- [ ] Add canonical to all region pages
- [ ] Audit for suburb variants that should be consolidated
- [ ] If consolidating, update data.js to redirect or remove variants
- [ ] Test canonical implementation with Google Search Console

---

### Task 1.3: Update Anchor Text (1 hour)

**Files Affected:**
- `/app/page.js` - Homepage links
- `/app/locations/[region]/page.js` - Region page links
- `/app/services/[service]/page.js` - Service page links

**Changes:**

**Homepage (/app/page.js):**

```javascript
// CURRENT (line 327)
<Link href="/operators" className="hidden sm:flex btn btn-secondary">
  View All Operators
</Link>

// IMPROVED - Use more location/action-focused anchor
<Link href="/operators" className="hidden sm:flex btn btn-secondary">
  Find More Operators
</Link>

// Or even better, link to location hub instead:
<Link href="/locations" className="hidden sm:flex btn btn-secondary">
  Browse by Location
</Link>
```

**Service Page Popular Locations (/app/services/[service]/page.js):**

```javascript
// CURRENT (line 321-328)
<div className="flex flex-wrap gap-2">
  {suburbs.slice(0, 10).map((suburb) => (
    <Link href={`/pest-control/${suburb.slug}`}>
      {suburb.name}  // Just the suburb name - REMOVES service optimization
    </Link>
  ))}
</div>

// This is CORRECT - don't change
// Service optimization comes from the page itself, not anchor text
```

**Region Page Suburb Links (/app/locations/[region]/page.js):**

```javascript
// CURRENT (line 296)
<Link href={`/pest-control/${suburb.id || suburb.slug}`} className="...">
  {suburb.name}
</Link>

// This is CORRECT - keep as is
// Suburb name is appropriate anchor for region context
```

**Operator Page Service Links (/app/operator/[slug]/page.js):**

```javascript
// CURRENT (line 274-278)
<Link href={`/services/${service.slug}`} className="...">
  <div>{service.name}</div>
  <div>{service.priceRange}</div>
</Link>

// CHANGE TO - Remove link, show info only:
<div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50">
  <Bug className="w-5 h-5 text-primary-600" />
  <div>
    <div className="font-medium text-neutral-900">
      {service.name}
    </div>
    <div className="text-sm text-primary-600 font-medium">{service.priceRange}</div>
  </div>
</div>

// Add generic link below instead:
<Link href="/services" className="text-primary-600 text-sm mt-4">
  View all pest control services →
</Link>
```

**Checklist:**
- [ ] Update homepage anchor text
- [ ] Remove service links from operator service display
- [ ] Add generic "View all services" link instead
- [ ] Verify no other problematic anchor text in template pages
- [ ] Test links are still working after changes

**Expected Result:**
- Clearer keyword targeting
- Service pages don't lose authority to operator pages
- Better internal link hierarchy

---

### Task 1.4: Update Meta Descriptions (1.5 hours)

**File:** All page generateMetadata functions

**Suburb Pages - Add Specificity:**

```javascript
// CURRENT
`Find licensed pest control in ${suburb.name} ${suburb.postcode}. Compare ${operators.length}+ EPA-verified operators...`

// IMPROVED - Add differentiator from region page
`Bondi pest control experts. ${operators.length} EPA-licensed operators in Bondi 2026.
Termite inspections, general pest control, same-day service. Get free quotes today!`
// Added: Specific suburb name, postcode, urgency, specific services, CTA
```

**Service Pages - Keep Sydney-wide focus:**

```javascript
// CURRENT
`Professional ${service.name.toLowerCase()} in Sydney. ${service.description}
Compare ${serviceOperators.length}+ EPA-verified operators...`

// IMPROVED - Add specific benefit
`Professional ${service.name} in Sydney. Compare ${serviceOperators.length}+ EPA-licensed operators.
${service.description} Starting from ${service.priceRange}. Get free, no-obligation quotes.`
// Added: Pricing expectation, operator count, CTA
```

**Region Pages - Focus on explorer/comparative intent:**

```javascript
// CURRENT
`Find licensed pest control operators in ${region.name}, Sydney. Compare reviews...`

// IMPROVED - Add scope and specific suburbs
`Browse all pest control operators across ${region.name}, Sydney. Covering Bondi, Coogee,
Randwick and ${suburbCount}+ more suburbs. Compare reviews and get free quotes today.`
// Added: Specific suburb examples, total count, scope clarity
```

**Operator Pages - Add service specificity:**

```javascript
// CURRENT
`${operator.description} ★ ${operator.rating}/5 (${operator.reviewCount} reviews)...`

// IMPROVED - Add key service info
`${operator.businessName}: Termite & General Pest Control. ★ ${operator.rating}/5
(${operator.reviewCount} reviews). EPA License: ${operator.licenseNumber}. Serving ${operator.serviceAreas.length} suburbs.`
// Added: Key services, License number, service area count
```

**Checklist:**
- [ ] Update suburb description template
- [ ] Update service description template
- [ ] Update region description template
- [ ] Update operator description template
- [ ] Keep all descriptions under 160 characters
- [ ] Add variety - don't use identical format for all pages
- [ ] Test in Search Console to verify snippets look good

---

## PHASE 2: NEXT 2 WEEKS (Structural Changes)

### Task 2.1: Remove Service Pricing from Suburb Pages (2 hours)

**File:** `/app/pest-control/[suburb]/page.js`

**Current Code (lines 393-409):**

```javascript
{/* Pricing Guide */}
<div className="card p-6">
  <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
    Pricing Guide for {suburb.name}
  </h3>
  <div className="space-y-3 text-sm">
    {services.slice(0, 5).map((service) => (
      <div key={service.slug} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
        <span className="text-neutral-600">{service.shortName}</span>
        <span className="font-medium text-primary-600">{service.priceRange}</span>
      </div>
    ))}
  </div>
  <Link href="/services" className="block text-center text-sm text-primary-600 font-medium mt-4 hover:text-primary-700">
    View all services →
  </Link>
</div>
```

**Action - REPLACE WITH:**

```javascript
{/* Common Services in This Area */}
<div className="card p-6">
  <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
    Services Needed Most in {suburb.name}
  </h3>
  <p className="text-neutral-600 text-sm mb-4">
    Based on common pest issues in {suburb.name}, these services are most frequently requested:
  </p>
  <div className="space-y-2">
    {suburb.commonPests.map((pest) => (
      <div key={pest} className="flex items-center gap-2 py-2">
        <span className="text-primary-600">•</span>
        <span className="text-neutral-700 capitalize">{pest.replace('-', ' ')} control</span>
      </div>
    ))}
  </div>
  <Link href="/services" className="block text-center text-sm text-primary-600 font-medium mt-4 hover:text-primary-700">
    View all services with pricing →
  </Link>
</div>
```

**Rationale:**
- Removes service pricing duplication (conflict #2)
- Keeps suburb page focused on local pest problems
- Still directs users to service pages, but without optimizing service keywords
- Uses suburb's commonPests array which already exists

**Checklist:**
- [ ] Update suburb page template
- [ ] Verify commonPests array is populated for all suburbs
- [ ] Test that sidebar still looks good with new content
- [ ] Verify link to /services still works
- [ ] Check mobile view looks good

---

### Task 2.2: Reduce Suburb Links on Region Pages (1.5 hours)

**File:** `/app/locations/[region]/page.js`

**Current Code (lines 291-302):**

```javascript
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
  {regionSuburbs.map((suburb) => (
    <Link key={suburb.id || suburb.slug} href={`/pest-control/${suburb.id || suburb.slug}`}>
      {suburb.name}
    </Link>
  ))}
</div>
```

**Problem:** Shows ALL suburbs, making region page less important than suburb pages

**Action - CHANGE TO:**

```javascript
{/* Featured Suburbs Section */}
<div>
  <h3 className="text-xl font-bold text-neutral-900 mb-4">Suburbs in {regionData.name}</h3>

  {/* Featured - all suburbs linked */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
    {regionSuburbs.slice(0, 12).map((suburb) => (
      <Link
        key={suburb.id || suburb.slug}
        href={`/pest-control/${suburb.id || suburb.slug}`}
        className="p-3 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors text-sm text-center font-medium"
      >
        {suburb.name}
      </Link>
    ))}
  </div>

  {/* Show count if more than featured */}
  {regionSuburbs.length > 12 && (
    <div className="text-center py-6 border-t border-neutral-200">
      <p className="text-neutral-600 mb-3">
        Browse all {regionSuburbs.length} suburbs in {regionData.name}
      </p>
      <button className="text-primary-600 font-medium hover:text-primary-700">
        Show all suburbs →
      </button>
    </div>
  )}
</div>
```

**Alternative - Use Expandable Section:**

```javascript
<div className="card p-6">
  <h3 className="text-xl font-bold text-neutral-900 mb-4">Browse Suburbs</h3>

  {/* Always show featured */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
    {regionSuburbs.slice(0, 6).map((suburb) => (
      <Link
        key={suburb.id || suburb.slug}
        href={`/pest-control/${suburb.id || suburb.slug}`}
        className="px-3 py-2 rounded bg-primary-50 text-primary-700 hover:bg-primary-100 text-sm"
      >
        {suburb.name}
      </Link>
    ))}
  </div>

  {/* Details/Summary expandable */}
  <details>
    <summary className="cursor-pointer text-primary-600 font-medium">
      Show all {regionSuburbs.length} suburbs →
    </summary>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 pt-4 border-t">
      {regionSuburbs.slice(6).map((suburb) => (
        <Link
          key={suburb.id || suburb.slug}
          href={`/pest-control/${suburb.id || suburb.slug}`}
          className="px-3 py-2 rounded bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 text-sm transition-colors"
        >
          {suburb.name}
        </Link>
      ))}
    </div>
  </details>
</div>
```

**Rationale:**
- Keeps featured 6-12 suburbs visible
- Uses expandable/paginated approach for rest
- Makes region page MORE important (featured placement)
- Reduces link equity fragmentation
- Better UX (less overwhelming for users)

**Checklist:**
- [ ] Decide on featured suburb count (6-12 recommended)
- [ ] Update region page template
- [ ] Test expandable functionality
- [ ] Verify link colors/styling match site design
- [ ] Test mobile view

---

### Task 2.3: Operator Page Service Display Changes (1.5 hours)

**File:** `/app/operator/[slug]/page.js`

**Current Code (lines 270-291):**

```javascript
<h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">Services Offered</h2>
<div className="grid sm:grid-cols-2 gap-4">
  {operatorServices.map((service) => (
    <Link
      key={service.slug}
      href={`/services/${service.slug}`}
      className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
        <Bug className="w-5 h-5 text-primary-600" />
      </div>
      <div>
        <div className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
          {service.name}
        </div>
        <div className="text-sm text-primary-600 font-medium">{service.priceRange}</div>
      </div>
    </Link>
  ))}
</div>
```

**Action - CHANGE TO:**

```javascript
<h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">Services Offered</h2>
<div className="grid sm:grid-cols-2 gap-4">
  {operatorServices.map((service) => (
    <div
      key={service.slug}
      className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50"
    >
      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
        <Bug className="w-5 h-5 text-primary-600" />
      </div>
      <div>
        <div className="font-medium text-neutral-900">
          {service.name}
        </div>
        <div className="text-sm text-primary-600 font-medium">{service.priceRange}</div>
      </div>
    </div>
  ))}
</div>

{/* Add single generic link below */}
<Link href="/services" className="text-primary-600 text-sm mt-6 inline-flex items-center gap-1 hover:gap-2 transition-all">
  Explore all pest control services
  <ChevronRight className="w-4 h-4" />
</Link>
```

**Rationale:**
- Removes all individual service links (prevents operator page from fragmenting service page authority)
- Keeps user on operator page longer
- Uses single generic link to /services (doesn't optimize individual service keywords)
- Cleaner visual design (cards instead of links)

**Checklist:**
- [ ] Import ChevronRight icon if not already imported
- [ ] Update operator page component
- [ ] Verify styling looks good
- [ ] Test on mobile view
- [ ] Verify link to /services still works

---

## PHASE 3: WEEKS 3-4 (Content Differentiation)

### Task 3.1: Suburb Page Content Audit (2 hours setup)

For top 20 suburbs by search volume:

**File:** Create audit spreadsheet with columns:

```
Suburb | Population | Property Types | Common Issues | Historical Problems | Climate Impact
Bondi | 14,000 | Terraces, apartments | Termites, cockroaches | 1970s termite damage | Coastal salt spray
Parramatta | 22,000 | Mix of all types | Termites, rodents | Growing area issues | Extreme heat summer
```

**Action - Add to each top suburb page:**

1. **Property Type Note**
```javascript
<div className="card p-6 bg-primary-50">
  <h3>Property Types in {suburb.name}</h3>
  <p>Most common: {propertyTypes} - Relevant pest controls include {relevantServices}</p>
</div>
```

2. **Unique Climate Note**
```javascript
<div className="card p-6">
  <h3>Climate & Pest Impact in {suburb.name}</h3>
  <p>{climateDescription}</p>
</div>
```

3. **Local FAQ (instead of generic)**
```javascript
const faqData = [
  {
    question: `What's the biggest pest problem in ${suburb.name}?`,
    answer: `Based on local reports, ${topPestProblem} is the most common issue...`
  },
  // ... more local-specific questions
];
```

**Checklist:**
- [ ] Research top 20 suburbs' demographics
- [ ] Add property type information to suburb data files
- [ ] Add climate impact notes
- [ ] Create local FAQ alternatives
- [ ] Implement on 5-10 test suburbs first
- [ ] Monitor rankings before rolling to all 600

---

### Task 3.2: Service Page Content Expansion (3 hours)

For each service page, add:

**File:** `/app/services/[service]/page.js`

**Addition 1 - Service Overview by Region:**

```javascript
{/* How this service differs by Sydney region */}
<div className="card p-6 mt-8">
  <h2 className="text-xl font-bold text-neutral-900 mb-4">
    {service.name} Across Sydney Regions
  </h2>
  <div className="grid md:grid-cols-2 gap-4">
    {regions.map(region => (
      <div key={region.id} className="p-4 bg-neutral-50 rounded-lg">
        <h3 className="font-semibold text-neutral-900 mb-2">{region.name}</h3>
        <p className="text-sm text-neutral-600">
          {/* Region-specific service info */}
          Termite treatment in {region.name} focuses on {regionSpecificFocus}
        </p>
      </div>
    ))}
  </div>
</div>
```

**Addition 2 - Service Comparison:**

```javascript
{/* Compare related services */}
<div className="card p-6 mt-8">
  <h2 className="text-xl font-bold text-neutral-900 mb-4">
    Related Services
  </h2>
  <div className="grid md:grid-cols-2 gap-4">
    {relatedServices.map(service => (
      <div key={service.slug}>
        <h3 className="font-semibold text-neutral-900">{service.name}</h3>
        <p className="text-sm text-neutral-600 mb-2">{service.description}</p>
        <p className="text-sm">
          <strong>Price:</strong> {service.priceRange}
        </p>
      </div>
    ))}
  </div>
</div>
```

**Checklist:**
- [ ] Add regional variations for each service
- [ ] Add comparison with related services
- [ ] Update FAQ with real operator questions (not templated)
- [ ] Add case studies or success stories
- [ ] Test on mobile view

---

## MONITORING & TRACKING

### Weekly Checklist (Every Monday)

- [ ] Check Google Search Console for new errors
- [ ] Review top-performing vs declining keywords
- [ ] Monitor SERP for key target keywords
- [ ] Check average CTR trends

### Monthly Checklist (First of month)

- [ ] Rank tracking for all primary keywords
- [ ] Traffic analysis by page type
- [ ] Cannibalization check (Search Console impressions)
- [ ] Competitive SERP analysis

### Quarterly Review (Every 3 months)

- [ ] Full cannibalization audit
- [ ] Content gap analysis
- [ ] Schema markup validation
- [ ] Backlink profile review

---

## SUCCESS METRICS

### Target Improvements (3-6 months post-launch)

**Organic Traffic:**
- Suburb pages: +12% average
- Service pages: +8% average
- Region pages: -3% (intentional shift to suburbs)
- Operator pages: +15% average
- Overall: +8-10% organic traffic

**Keyword Rankings:**
- Primary keyword on page 1 for all key pages
- Primary keyword in top 3 for main pages
- Secondary keywords showing growth

**User Behavior:**
- Bounce rate reduction on region pages
- Increased CTR on improved snippets
- Increased quote form submissions

---

## ROLLBACK PLAN

If rankings drop significantly after implementation:

1. **First 2 weeks:** Monitor closely but don't revert
2. **Weeks 2-4:** Minor adjustments (add more internal links if needed)
3. **Weeks 4+:** If negative trend continues, revert and try different approach

Revert by:
- Restoring previous title/description templates
- Removing canonical tags
- Restoring old internal linking

---

## SUCCESS STORY TEMPLATE

Once fully implemented, you should be able to say:

> "We reduced SEO cannibalization across our 600+ suburb pages by implementing:
> 1. Differentiated meta titles and descriptions
> 2. Canonical tag strategy for page variants
> 3. Hierarchical internal linking (Region → Suburbs → Operators)
> 4. Content isolation (removed service pricing from suburb pages)
> 5. Anchor text optimization (removed service keyword optimization from non-service pages)
>
> Result: +10% organic traffic, better CTR from clearer SERP snippets, +15% operator page visibility"

---

*This action plan should be reviewed and updated quarterly as the site grows.*

