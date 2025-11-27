# Keyword Assignment Matrix & Internal Linking Map
## Sydney Pest Control Directory - SEO Cannibalization Resolution

---

## PART A: PRIMARY KEYWORD ASSIGNMENT BY PAGE TYPE

### Goal: Each page has ONE primary keyword to target

| Page Type | Example URL | Primary Keyword | Search Volume/mo | Difficulty | CPC | Priority |
|-----------|------------|-----------------|-----------------|------------|-----|----------|
| **Homepage** | / | pest control sydney | 1,200 | Very High | $12-18 | TIER 1 (HEAD TERM) |
| **Suburb** | /pest-control/bondi/ | pest control bondi | 120 | Medium | $8-12 | TIER 2 (LOCAL) |
| **Service** | /services/termite-inspection/ | termite inspection sydney | 240 | High | $15-25 | TIER 2 (SERVICE) |
| **Region** | /locations/eastern-suburbs/ | pest control eastern suburbs | 140 | Medium | $8-14 | TIER 2 (REGIONAL) |
| **Operator** | /operator/abc-pest-control/ | abc pest control sydney | 50 | Low | $5-10 | TIER 3 (BRAND) |
| **Operators List** | /operators/ | pest control operators sydney | 80 | Medium | $8-12 | Non-Primary |
| **Services List** | /services/ | pest control services sydney | 60 | Low | $6-10 | Non-Primary |
| **Locations Hub** | /locations/ | pest control locations sydney | 40 | Low | $5-8 | Hub Only |

**Tier Explanation:**
- **TIER 1:** Highest search volume, most competitive, most valuable
- **TIER 2:** Medium volume, medium competition, local intent
- **TIER 3:** Low volume, easy ranking, brand-specific

---

## PART B: SECONDARY & TERTIARY KEYWORD DISTRIBUTION

Secondary keywords can appear on pages but should NOT be optimized for (no anchor links in titles/descriptions).

### Suburb Pages - Example: Bondi (Primary: "pest control bondi")

| Keyword | Type | Should Appear | Should Optimize | Example Usage |
|---------|------|---|---|---|
| bondi pest control | Secondary | Yes | No | Mention in body text naturally |
| pest control in bondi | Secondary | Yes | No | Meta description |
| bondi 2026 pest control | Secondary | Yes | No | Body content only |
| termite inspection bondi | Tertiary | Mention only | No | "Common service here..." |
| bondi cockroach control | Tertiary | Mention only | No | In FAQ only |
| bondi cbd pest control | Tertiary | NO | NO | Too specific, likely same as main |
| {operator name} bondi | Tertiary | Mention only | NO | Operator listings on page |

**Rule:** Secondary keywords can appear 2-3 times naturally. Tertiary keywords only mention service types, not optimized for ranking.

### Service Pages - Example: Termite Inspection (Primary: "termite inspection sydney")

| Keyword | Type | Should Appear | Should Optimize | Example Usage |
|---------|------|---|---|---|
| termite inspection | Secondary | Yes | No | Body text, FAQ |
| professional termite inspection | Secondary | Yes | No | Meta description |
| termite inspection cost sydney | Secondary | Yes | No | FAQ answer |
| termite inspection {suburb} | Tertiary | Mention only | NO | NOT in title/meta - use link instead |
| termite treatment vs inspection | Secondary | Yes | No | Comparison section |
| termite barrier inspection | Secondary | Yes | No | Related service mention |
| diy termite inspection | Tertiary | Mention only | NO | Comparison to professional |

**Rule:** Do NOT optimize for "termite inspection {suburb}" combination. Link to suburb pages instead.

### Region Pages - Example: Eastern Suburbs (Primary: "pest control eastern suburbs")

| Keyword | Type | Should Appear | Should Optimize | Example Usage |
|---------|------|---|---|---|
| eastern suburbs pest control | Secondary | Yes | No | Body text variation |
| pest control bondi | Tertiary | Mention only | NO | Suburb name listed, not optimized |
| eastern suburbs cockroaches | Tertiary | Mention only | NO | In "common pests" section |
| eastern suburbs termites | Tertiary | Mention only | NO | Regional climate section |
| coogee pest control | Tertiary | Mention only | NO | Suburb listing |
| randwick pest control | Tertiary | Mention only | NO | Suburb listing |

**Rule:** Region pages list suburbs but DON'T optimize for suburb keywords. That's the suburb page's job.

### Operator Pages - Example: ABC Pest Control (Primary: "abc pest control sydney")

| Keyword | Type | Should Appear | Should Optimize | Example Usage |
|---------|------|---|---|---|
| abc pest control | Secondary | Yes | No | Page title, meta |
| abc termite inspection | Secondary | Yes | Maybe | Natural mention if specialty |
| abc pest control bondi | Secondary | Yes | No | Service area mention |
| pest control bondi | Tertiary | Mention only | NO | Only as "serving" statement |
| termite inspection | Tertiary | Mention only | NO | Service list section |

---

## PART C: INTERNAL LINKING HIERARCHY

### Concept: Create Clear Parent → Child Relationships

```
TIER 0: Homepage (/)
  ↓
TIER 1: Hub Pages
  ├─ /locations/ (Locations Hub)
  ├─ /services/ (Services Hub)
  └─ /operators/ (Operators Hub)
    ↓
TIER 2: Primary Content
  ├─ /locations/{region}/  ← Primary page for region
  │   └─ /pest-control/{suburb}/  ← Primary page for suburb
  ├─ /services/{service}/  ← Primary page for service
  │   └─ /operator/{slug}/ (linking back to operator)
  └─ /operator/{slug}/  ← Primary page for operator
      └─ /pest-control/{suburb}/ (service areas)
```

### Detailed Linking Rules

**FROM HOMEPAGE TO:**
```
✓ Link to /locations (Primary navigation)
✓ Link to /services (Primary navigation)
✓ Link to /operators (Primary navigation)
✓ Link to specific suburbs (Bondi, Parramatta, etc.) - 4-5 featured
✗ Don't link to individual service pages
✗ Don't link to individual operator pages

Anchor text examples:
- "Find by Region" → /locations/
- "Browse Services" → /services/
- "All Operators" → /operators/
- "Pest Control Bondi" → /pest-control/bondi/ (featured)
```

**FROM REGION PAGE (/locations/eastern-suburbs/) TO:**
```
✓ Link to featured 6-12 suburbs (with expandable full list)
✓ Link back to /locations/ hub
✓ Link back to /

Anchor text:
- {Suburb name} → /pest-control/{suburb}/
- "All Suburbs" → /locations/
- Region description → Can soft link to parent

✗ Don't link to service pages
✗ Don't link to operator pages
```

**FROM SUBURB PAGE (/pest-control/bondi/) TO:**
```
✓ Link to parent region page
✓ Link to nearby suburbs (max 6-8 in footer area)
✓ Link to homepage
✓ Link to quote/contact form
✓ Link to /services (generic "all services" only)
✓ Link to /operators (generic "all operators" only)

Anchor text:
- "Eastern Suburbs" → /locations/eastern-suburbs/
- "Nearby Suburbs" → /pest-control/coogee/ (natural)
- "View all services" → /services/ (generic, not optimized)
- "View all operators" → /operators/ (generic, not optimized)

✗ Don't link to specific service pages (e.g., /services/termite-inspection/)
✗ Don't link to specific operator pages
✗ Don't link to other suburbs with keyword optimization
```

**FROM SERVICE PAGE (/services/termite-inspection/) TO:**
```
✓ Link to operator pages offering this service
✓ Link back to /services/ hub
✓ Link to /locations/ (generic "by region")
✓ Link to homepageor
✗ Don't link to suburb pages (e.g., /pest-control/bondi/)
✗ Don't link to region pages with this service in anchor

Anchor text:
- {Operator name} → /operator/{operator-slug}/ (can add service type)
- "All Locations" → /locations/
- "All Services" → /services/
- "Find Operators" → /operators/
```

**FROM OPERATOR PAGE (/operator/abc-pest-control/) TO:**
```
✓ Link to service area suburbs
✓ Link back to /operators/ hub
✓ Link to external website
✓ Link to quote form (with operator pre-selected)

Anchor text:
- "Serving Bondi" → /pest-control/bondi/
- "Serving {Suburb}" → /pest-control/{suburb}/
- "All Operators" → /operators/
- "Get Free Quote" → /quote/?operator=abc-pest-control

✗ Don't link to service pages
✗ Don't link to region pages
✗ Don't link to other suburb pages
```

### Visual Linking Map

```
                            HOMEPAGE (/)
                                 |
                    ______________|______________
                   |              |              |
              /locations/    /services/    /operators/
               (hub)          (hub)         (hub)
                   |              |              |
        ┌──────────┼──────────┐   |   ┌──────────┼──────────┐
        |          |          |   |   |          |          |
    /locations/ /locations/ /locations/  /services/ /services/ /services/
    /eastern-  /inner-west /northern-  /termite-  /cockroach /general
    suburbs/               beaches/    inspection/ control/   pest/
        |          |          |         |         |         |
    ┌───┼──┬──┐  ┌─┴──┐    ┌──┴──┐    │         │         │
    |   |  |  |  |    |    |     |    └────┬────┴──┬───────┘
/pest- /pest- /pest-  /pest-                │        │
control/control/control/control/         /operator/ /operator/
bondi/ coogee/ newtown/ manly/          /abc-pest/ /xyz-pest/
|      |       |       |
└──────┴───────┴───────┘ (Service Areas)
```

---

## PART D: CONTENT TYPE BY PAGE

### Homepage - Multi-purpose hub

**Primary Keyword Targeting:** pest control sydney

**Content Sections:**
1. Hero (search box, CTA)
2. Trust indicators
3. Featured operators (3) → Link to /operators/
4. Top services (6) → Generic "View All" to /services/
5. How it works
6. Regions (6) → Link to /locations/eastern-suburbs/ etc.
7. Why choose us
8. FAQ (8-10 general questions)
9. CTA (Get quotes)

**Link Strategy:**
- Featured operators: "View All Operators" (not individual operator links)
- Featured services: Generic links only, no service page links
- Regions: Direct links to region pages
- Do NOT compete with other pages

### Suburb Pages - Local service directory

**Primary Keyword Targeting:** pest control {suburb}

**Content Sections:**
1. Hero (suburb name, postcode, operator count)
2. Operator listings (featured + regular)
3. Sidebar:
   - Get free quotes CTA
   - Common pests (info only, no links)
   - About suburb
   - Pricing guide (services mentioned, NOT linked)
   - "View all services" (generic link, not optimized)
4. FAQ (suburb-specific)
5. Nearby suburbs (max 8, footer)
6. CTA (Get quotes)

**Link Strategy:**
- Link UP to region page
- Link ACROSS to nearby suburbs (natural, not optimized)
- Link DOWN to operators (no anchor, just listed)
- Link generic to /services/ (not individual services)

### Service Pages - Service education + operator listing

**Primary Keyword Targeting:** {service} sydney

**Content Sections:**
1. Hero (service name, price, operators count)
2. About this service (detailed)
3. Pests covered
4. Operators offering this service (as cards/links)
5. Sidebar:
   - Pricing guide (only this service)
   - Service details
   - Related services (no links, just comparison)
   - Popular locations (region-level, not suburb)
6. FAQ (service-specific)
7. CTA (Get quotes)

**Link Strategy:**
- Link to operator pages who offer this
- Link to /services/ (hub)
- Link to /locations/ (generic)
- Do NOT link to suburb pages
- Do NOT create "service + suburb" combinations

### Region Pages - Regional explorer hub

**Primary Keyword Targeting:** pest control {region}

**Content Sections:**
1. Hero (region name, suburb count)
2. Quick stats
3. About region (geography, pests, climate)
4. Featured operators (3-5)
5. Suburbs list (featured 6-12 + expandable full list)
6. Regional climate & pests
7. FAQ (region-specific if possible)
8. CTA (Get quotes)

**Link Strategy:**
- Link to featured suburbs (6-12)
- Show all suburbs in expandable list
- Link back to /locations/ (hub)
- Do NOT link to specific services
- Do NOT link to specific operators

### Operator Pages - Local business profile

**Primary Keyword Targeting:** {business name} pest control

**Content Sections:**
1. Hero (business name, rating, license info)
2. Quick actions (call, quote)
3. Services offered (no links, just listed)
4. Service areas (suburbs by region)
5. Customer reviews
6. Sidebar:
   - Contact info
   - Google Map
   - Working hours
   - Quick facts
   - Get quote CTA
7. CTA (Compare operators)

**Link Strategy:**
- Link to service area suburbs
- Link to /operators/ (hub)
- Link to external website
- Do NOT link to service pages
- Do NOT link to other operator pages

---

## PART E: KEYWORD CANNIBALIZATION DETECTION CHECKLIST

### Monthly Audit - Check for These Issues:

**Red Flag #1: Multiple Pages Targeting Same Keyword**

How to detect:
1. Go to Search Console → Performance
2. Filter by "pest control bondi"
3. How many pages appear? (Should be 1-2 max: /pest-control/bondi/ + maybe homepage)
4. If 3+: PROBLEM - Pages are cannibalizing each other

Fix:
- Consolidate content into primary page
- Use canonical tags for variants
- Update internal linking to point to primary page only

**Red Flag #2: Declining Click-Through Rate**

How to detect:
1. Compare CTR month-over-month for key pages
2. If CTR drops >10% on an important page: PROBLEM

Fix:
- Update title tag to be more specific
- Update meta description with unique angle
- Verify no competing internal page is showing in SERP

**Red Flag #3: Rising Impressions But Declining Clicks**

How to detect:
1. Page impressions up (+20%)
2. Clicks down (-5%)
3. CTR has declined

Fix:
- Update title/meta for more compelling messaging
- Verify user intent matches content
- Check SERP - may have new competition

**Red Flag #4: Position Instability**

How to detect:
1. Track keyword position daily
2. Large swings (position 5 → 15 → 5 repeatedly)
3. PROBLEM - Likely internal competition

Fix:
- Consolidate competing internal pages
- Use stronger canonical signals
- Consider deleting very weak duplicate

**Red Flag #5: Internal Search Navigation**

How to detect:
1. Google Analytics → Site Search
2. Users searching terms like "pest control bondi service page"
3. PROBLEM - They want service + location page that doesn't exist

Fix:
- Either create service + region pages
- Or improve internal linking to make service pages discoverable from suburb pages
- Or improve on-page content about services

---

## PART F: POST-IMPLEMENTATION KEYWORD TRACKING

### Keywords to Track Monthly

**TIER 1 Priority (Head Terms):**
```
pest control sydney
find pest control near me
pest control services
licensed pest controller
epa pest control
```

**TIER 2 Priority (Key Suburb Terms - Top 10 Suburbs):**
```
pest control bondi
pest control parramatta
pest control sydney cbd
pest control newtown
pest control manly
pest control blacktown
pest control penrith
pest control eastern suburbs
pest control inner west
pest control northern beaches
```

**TIER 3 Priority (Key Service Terms):**
```
termite inspection sydney
cockroach control sydney
rodent control sydney
bed bug treatment sydney
general pest control sydney
```

**TIER 4 Priority (Brand Terms):**
```
pest control operators sydney
find pest controllers
epa licensed pest control
best pest control sydney
pest control companies sydney
```

### Tracking Tool Setup

**Recommended Tools:**
- Google Search Console (free) - Primary tracking
- Ahrefs or SEMrush (paid) - Competitive analysis
- Google Sheets (free) - Manual tracking spreadsheet

**Monthly Report Template:**

```
MONTH: November 2025

Primary Keyword | Position | Change | Traffic | CTR | Impressions
pest control sydney | 12 | -2 | 450 | 3.2% | 14,000
pest control bondi | 8 | +1 | 120 | 5.1% | 2,350
termite inspection sydney | 15 | -4 | 80 | 2.8% | 2,800

Analysis:
- "pest control sydney" lost 2 positions - possible: new competitor page OR
  natural fluctuation (monitoring)
- "termite inspection sydney" dropped 4 positions - ACTION: Review competing
  suburb pages for "termite" keyword optimization
- Overall traffic +5% month-over-month

Actions this month:
- [ ] Update homepage title for "pest control sydney"
- [ ] Reduce service keyword optimization on suburb pages
- [ ] Review region pages for accidental service keyword targeting
```

---

## PART G: QUICK REFERENCE CARDS

### For Content Teams: What Can I Link To?

**FROM Suburb Page, Can I Link To:**
```
✓ Region page          (SAME keyword family)
✓ Nearby suburbs       (SAME keyword family)
✓ /services/ (all)     (DIFFERENT keyword family - generic)
✓ /operators/ (all)    (DIFFERENT keyword family - generic)
✗ /services/termite/   (COMPETING keyword family - BAD)
✗ /operator/abc-pest/  (No benefit, unclear relevance)
```

**FROM Service Page, Can I Link To:**
```
✓ Operator pages       (SUPPORTING - operators offer this service)
✓ /services/ (all)     (SAME keyword family - hub)
✓ /locations/ (hub)    (NAVIGATION - good UX)
✗ /pest-control/bondi/ (COMPETING keyword family - BAD)
✗ Region pages         (No logical connection)
```

**FROM Region Page, Can I Link To:**
```
✓ Suburb pages         (CHILD PAGES - hierarchy)
✓ /locations/ (hub)    (PARENT/NAVIGATION)
✓ Homepage             (NAVIGATION)
✗ /services/ pages     (COMPETING - bad)
✗ /operator/ pages     (No clear connection)
```

**FROM Operator Page, Can I Link To:**
```
✓ Suburb service areas (SHOWING SERVICE AREA)
✓ /operators/ (hub)    (PARENT/NAVIGATION)
✓ /quote form          (CONVERSION)
✗ /services/           (Fragments authority)
✗ /locations/          (No need - link to suburbs instead)
```

---

## FINAL CHECKLIST: Before Publishing

**Title/Meta Updates:**
- [ ] All titles are unique? (No two pages have same title)
- [ ] Titles include primary keyword naturally?
- [ ] Descriptions include secondary keywords?
- [ ] All under character limits? (Title <60, Meta <160)

**Canonical Tags:**
- [ ] Homepage: Self-referential canonical
- [ ] Suburb pages: Self-referential canonicals
- [ ] Service pages: Self-referential canonicals
- [ ] Region pages: Self-referential canonicals
- [ ] Operator pages: Self-referential canonicals
- [ ] No cross-linking canonicals (except variants)

**Internal Linking:**
- [ ] No links from service page to suburb pages
- [ ] No links from suburb page to service pages (except generic /services/)
- [ ] All operator service listings don't link to service pages
- [ ] Region pages have featured suburb links (6-12, not all)
- [ ] All links use appropriate anchor text

**Content:**
- [ ] No pricing tables on suburb pages
- [ ] Service pages don't mention specific suburbs in title
- [ ] Region pages list suburbs but don't optimize for suburb keywords
- [ ] Operator pages show services without external links

**Schema:**
- [ ] All pages have appropriate schema markup
- [ ] No conflicting schema between related pages
- [ ] Breadcrumbs are correct (Parent → Child relationships)

---

*Last Updated: November 2025*
*Review Date: February 2026*
