# Blog Linking Architecture Map

Visual guide showing how blog posts should link to directory pages and each other.

---

## VISUAL SITE ARCHITECTURE

```
HOME (/)
├── SERVICES (/services)
│   ├── Termite Inspection (/services/termite-inspection)
│   ├── Termite Treatment (/services/termite-treatment)
│   ├── General Pest Control (/services/general-pest-control)
│   ├── Rodent Control (/services/rodent-control)
│   ├── Bed Bug Treatment (/services/bed-bug-treatment)
│   └── Pre-Purchase Inspection (/services/pre-purchase-inspection)
│
├── SUBURBS (/pest-control)
│   ├── [suburb-1] (/pest-control/bondi)
│   ├── [suburb-2] (/pest-control/manly)
│   ├── [suburb-3] (/pest-control/parramatta)
│   └── ... 600+ suburb pages
│
├── BLOG / RESOURCES (/resources) ← YOU ARE HERE
│   ├── Main Hub (/resources)
│   ├── Guides (/resources/guides)
│   │   ├── Termite Guide (/resources/guides/termite-guide-sydney)
│   │   ├── Pest Identification (/resources/guides/pest-identification)
│   │   ├── Prevention Tips (/resources/guides/prevention-tips)
│   │   ├── Spring Pests (/resources/guides/spring-pest-guide)
│   │   ├── Seasonal Calendar (/resources/guides/seasonal-calendar)
│   │   └── ... more guides
│   │
│   └── Case Studies (/resources/case-studies)
│       ├── Case Study 1 (/resources/case-studies/termite-bondi)
│       └── ... more case studies
│
├── OPERATORS (/operators)
│   ├── All Operators Listing
│   └── Individual Operator Pages (/operator/[slug])
│
└── QUOTE (/quote)
    └── Quote Request Form
```

---

## BLOG POST → SERVICE PAGE LINKING MAP

### When to Link to Services

A blog post should link to a service page when:
1. The post discusses or recommends that service
2. The service is a treatment option being compared
3. The CTA section is "Get Professional Help"

### Linking Quantity
```
Per blog post: 2-4 service page links
Placement:
  - 1 in body text (contextual)
  - 1-2 in comparison sections
  - 1 in CTA section
```

### Example: Termite Guide Blog Post Linking Map

```
TERMITE GUIDE BLOG POST
│
├─ Body Text (H2: "What Are Termites?")
│  └─ Link: "professional termite inspections"
│     → /services/termite-inspection
│
├─ Body Text (H2: "Treatment Options")
│  ├─ Card 1: "Chemical Barriers"
│  │  └─ Link: "Learn more"
│  │     → /services/termite-treatment
│  └─ Card 2: "Baiting Systems"
│     └─ Link: "View details"
│        → /services/termite-treatment
│
├─ Body Text (H2: "High-Risk Suburbs")
│  └─ No service links here (use suburb links)
│
├─ Related Resources Section
│  ├─ Card: "Termite Inspections"
│  │  └─ /services/termite-inspection
│  ├─ Card: "Termite Treatment"
│  │  └─ /services/termite-treatment
│  └─ Card: "Pre-Purchase Inspection"
│     └─ /services/pre-purchase-inspection
│
└─ CTA Section
   ├─ Button: "Get Free Inspection Quotes"
   │  └─ /quote?service=termite-inspection
   └─ Link: "Find Termite Inspectors"
      └─ /services/termite-inspection

TOTAL: 3 service links (perfect)
```

### Service-Specific Blog Links

| Blog Topic | Service Link | CTA Button |
|---|---|---|
| Termite Guide | `/services/termite-inspection`, `/services/termite-treatment` | `/quote?service=termite-inspection` |
| Cockroach Control | `/services/general-pest-control` | `/quote?service=general-pest-control` |
| Rodent Prevention | `/services/rodent-control` | `/quote?service=rodent-control` |
| Bed Bug Guide | `/services/bed-bug-treatment` | `/quote?service=bed-bug-treatment` |
| Pre-Purchase | `/services/pre-purchase-inspection` | `/quote?service=pre-purchase-inspection` |
| DIY Prevention | `/services/general-pest-control` | `/quote?service=general-pest-control` |

---

## BLOG POST → SUBURB PAGE LINKING MAP

### When to Link to Suburbs

A blog post should link to a suburb page when:
1. The post mentions the suburb by name
2. The suburb is listed as high-risk
3. Regional characteristics are being discussed
4. Users might search "[pest] [suburb]"

### Linking Strategy by Content Type

#### High-Risk Suburb Blog Post
```
TERMITE GUIDE (H2: "High-Risk Sydney Suburbs")
│
└─ Suburb Card Grid (3-8 suburbs)
   ├─ Eastern Suburbs
   │  ├─ Bondi → /pest-control/bondi
   │  ├─ Coogee → /pest-control/coogee
   │  ├─ Randwick → /pest-control/randwick
   │  └─ Maroubra → /pest-control/maroubra
   │
   ├─ Northern Beaches
   │  ├─ Manly → /pest-control/manly
   │  ├─ Dee Why → /pest-control/dee-why
   │  └─ Mona Vale → /pest-control/mona-vale
   │
   ├─ Inner West
   │  ├─ Marrickville → /pest-control/marrickville
   │  ├─ Newtown → /pest-control/newtown
   │  └─ Leichhardt → /pest-control/leichhardt
   │
   └─ Hills District
      └─ Castle Hill → /pest-control/castle-hill

TOTAL: 12 suburb links (high-density for region-specific blog)
```

#### General Blog Post (Mentions Suburbs Casually)
```
COCKROACH CONTROL BLOG
│
├─ Body Text
│  └─ "Inner West areas like Marrickville and Newtown"
│     ├─ Marrickville → /pest-control/marrickville
│     └─ Newtown → /pest-control/newtown
│
└─ Related Resources Section
   └─ "Find operators in your Sydney suburb"
      └─ /pest-control (list page, not individual)

TOTAL: 2-3 suburb links (light touch)
```

### High-Volume Suburb Linking (30+ Sydney Suburbs to Target)

```
Top Priority (Rank First): Major suburbs with high search volume
- Bondi, Manly, Parramatta, Randwick, Marrickville, Newtown
- Castle Hill, Kellyville, Baulkham Hills, Dee Why
- Coogee, Penrith, Blacktown, Mona Vale, Leichhardt

Secondary Priority (Rank Next): Larger suburbs
- Crows Nest, Neutral Bay, Cremorne, Belmore
- Concord, Homebush, Strathfield, Burwood

Tertiary (Ongoing): Less-searched suburbs
- Smaller residential areas, outer suburbs
- Fill in remaining 400+ Sydney suburbs

Linking Strategy:
- Every blog post: 3-8 suburb links minimum
- Rotate suburbs across posts
- Ensure every major suburb linked at least 2-3 times/year
- Use contextual anchor text: "[Suburb] pest control", "[Suburb] termite treatment"
```

---

## BLOG POST → BLOG POST LINKING MAP (Topic Clusters)

### Cluster 1: Termites (Pillar + 5 Sub-Articles)

```
PILLAR: "Complete Termite Guide for Sydney"
├─ Links to SUB-ARTICLES:
│  ├─ "Termite Prevention Tips"
│  │  └─ Linked in: "Prevention Tips" section
│  ├─ "DIY Termite Detection"
│  │  └─ Linked in: "Warning Signs" section
│  ├─ "High-Risk Sydney Suburbs for Termites"
│  │  └─ Linked in: "Suburbs" section
│  ├─ "Spring Termite Swarming Season"
│  │  └─ Linked in: "Seasonal" section
│  └─ "Termite Treatment Case Study"
│     └─ Linked in: "Related Resources"
│
└─ SUB-ARTICLES link BACK to PILLAR:
   ├─ "Termite Prevention" → links to main guide
   ├─ "DIY Detection" → links to main guide
   ├─ "High-Risk Suburbs" → links to main guide
   ├─ "Spring Guide" → links to main guide
   └─ "Case Study" → links to main guide
```

### Cluster 2: General Pest Control (Pillar + 6 Sub-Articles)

```
PILLAR: "Sydney Pest Identification Guide"
├─ Links to SUB-ARTICLES:
│  ├─ "Cockroach Control Methods"
│  ├─ "Rodent & Rat Prevention"
│  ├─ "Bed Bug Detection & Elimination"
│  ├─ "Spider Identification (Dangerous Species)"
│  ├─ "Ant Control for Sydney Homes"
│  └─ "Wasp & Bee Safety Guide"
│
└─ SUB-ARTICLES link BACK to PILLAR
   └─ All reference main pest ID guide
```

### Cluster 3: Seasonal Content (4 Standalone Guides)

```
SPRING GUIDE (/resources/guides/spring-pest-guide)
├─ Internal links to:
│  ├─ "Termite Swarming Season" (termite cluster)
│  ├─ "Wasp Nesting" (pest ID cluster)
│  └─ "Spring Prevention Checklist"
│
└─ Links FROM other posts:
   ├─ Termite Guide → Spring Guide
   ├─ Wasp Guide → Spring Guide
   └─ Seasonal Calendar → Spring Guide

SUMMER GUIDE
├─ Links to: Cockroach control, Fly prevention

AUTUMN GUIDE
├─ Links to: Rodent prevention, Spider guide

WINTER GUIDE
├─ Links to: Rodent control, Moisture issues
```

### Full Linking Matrix Example

```
POST: "Complete Termite Guide for Sydney"
│
├─ INTERNAL BLOG LINKS (3-5)
│  ├─ "Termite Prevention Tips"
│  ├─ "Spring Pest Guide"
│  ├─ "DIY Termite Detection"
│  ├─ "Pest Identification Guide" (foundational)
│  └─ "Pre-Purchase Inspection Guide" (related)
│
├─ SERVICE LINKS (2-4)
│  ├─ /services/termite-inspection
│  ├─ /services/termite-treatment
│  └─ /services/pre-purchase-inspection
│
├─ SUBURB LINKS (3-8)
│  ├─ /pest-control/bondi
│  ├─ /pest-control/manly
│  ├─ /pest-control/parramatta
│  ├─ /pest-control/marrickville
│  ├─ /pest-control/castle-hill
│  └─ ... (up to 8 total)
│
└─ CTA LINKS (1-2)
   ├─ /quote?service=termite-inspection
   └─ /operators

TOTAL: ~15 links (perfect range)
```

---

## BLOG HUB PAGE LINKING MAP

### /resources (Blog Hub)

This page should:
1. Link to all major blog post categories
2. Showcase recent blog posts
3. Link to specific service guides
4. Feature popular suburb pages

```
/RESOURCES (BLOG HUB)
│
├─ FEATURED GUIDES (Latest 3-4 posts)
│  ├─ Link to: Termite Guide
│  ├─ Link to: Cockroach Control
│  ├─ Link to: Spring Pest Guide
│  └─ Link to: DIY Prevention
│
├─ TOPIC CLUSTERS (Organized by category)
│  ├─ Termite Resources (links to 5-6 termite posts)
│  ├─ General Pest Resources (links to 6-8 general posts)
│  ├─ Seasonal Guides (links to 4 seasonal posts)
│  └─ Prevention & DIY (links to 3-4 how-to posts)
│
├─ POPULAR SUBURBS (Link to top 10-15)
│  ├─ Bondi, Manly, Parramatta
│  ├─ Marrickville, Newtown, Castle Hill
│  └─ ... etc
│
└─ SERVICES OVERVIEW
   ├─ Link to all service pages
   └─ Brief description of each

LINKING STRATEGY:
- Hub page links OUT to all content
- Hub page does NOT link back to individual posts
- Hub page = entry point for users, search crawlers
- Update hub page monthly with new posts
```

---

## FOOTER & SIDEBAR LINKING

### Site-Wide Footer Links

```
FOOTER SECTIONS:

1. RESOURCES LINKS
   └─ /resources → Blog Hub
   └─ /resources/guides → All Guides
   └─ /resources/case-studies → Case Studies

2. SERVICE LINKS
   └─ /services/termite-inspection
   └─ /services/termite-treatment
   └─ /services/general-pest-control
   └─ /services/rodent-control
   └─ /services/pre-purchase-inspection

3. LOCATION LINKS
   └─ Top 10 Sydney suburbs
      └─ /pest-control/bondi
      └─ /pest-control/manly
      └─ /pest-control/parramatta
      └─ ... etc

4. COMPANY LINKS
   └─ /about
   └─ /contact
   └─ /operators
   └─ /quote
   └─ /privacy
```

### Sidebar/Widget on Blog Posts

```
SIDEBAR (Right Column):

1. QUICK LINKS (Service-specific)
   └─ Link to relevant service page
   └─ "Find [Service] Near You" CTA

2. RELATED POSTS (3-5)
   └─ Links to other blog posts in cluster

3. CTA BOX
   └─ "Get Free Quotes" button
   └─ → /quote?service=[service]

4. TRUST SIGNALS
   └─ "700+ Licensed Operators"
   └─ → /operators
   └─ "600+ Sydney Suburbs"
   └─ → /pest-control
```

---

## URL STRUCTURE FOR BLOG

### Recommended Slug Structure

```
/resources/guides/[topic]-sydney          → /resources/guides/termite-guide-sydney
/resources/guides/[topic]-[suburb]        → /resources/guides/termite-treatment-bondi
/resources/case-studies/[case-slug]       → /resources/case-studies/termite-bondi-success
/resources/seasonal/[season]-[year]       → /resources/seasonal/spring-2024-guide
/resources/tips/[tip-category]            → /resources/tips/termite-prevention-checklist
```

### Benefits of This Structure:
- Clear information hierarchy
- Keyword-rich URLs
- Easy to organize and link
- Breadcrumb-friendly
- Google-crawlable

---

## INTERNAL LINK ANCHOR TEXT STRATEGY

### Best Practices

**Use descriptive anchor text that includes keywords:**
```
✓ "termite inspection in Sydney"
✓ "find termite treatment providers"
✓ "learn about cockroach control methods"
✓ "Bondi pest control operators"

✗ "click here"
✗ "read more"
✗ "link"
✗ "next page"
```

### Anchor Text by Link Type

**Service Pages:**
```
"[service] in Sydney" → /services/termite-inspection
"find [service] providers" → /services/termite-treatment
"[service] cost & options" → /services/general-pest-control
"licensed [service] operators" → /services/termite-inspection
"get free [service] quotes" → /quote?service=termite-inspection
```

**Suburb Pages:**
```
"[suburb] pest control" → /pest-control/bondi
"find [suburb] operators" → /pest-control/manly
"[pest] in [suburb]" → /pest-control/parramatta
"[suburb] termite inspection" → /pest-control/bondi
```

**Blog Posts:**
```
"[topic] guide" → /resources/guides/termite-guide-sydney
"learn more about [topic]" → /resources/guides/pest-identification
"[topic] tips" → /resources/guides/prevention-tips
"related: [topic]" → /resources/guides/spring-pest-guide
```

---

## LINKING FREQUENCY GUIDE

### How Often to Link Each Page

**Service Pages**: Target 20-30 links from blog annually
```
- Termite Inspection: 15-20 blog links/year
- Termite Treatment: 10-15 blog links/year
- General Pest Control: 12-18 blog links/year
- Pre-Purchase Inspection: 6-10 blog links/year
- Rodent Control: 8-12 blog links/year
- Bed Bug Treatment: 6-10 blog links/year
```

**Suburb Pages**: Target 200-400 blog links annually
```
- Major suburbs (Bondi, Manly, etc.): 10-20 links/year
- Secondary suburbs (Belmore, Concord, etc.): 5-10 links/year
- Tertiary suburbs (outer areas): 2-5 links/year
- Total: 600 suburbs × 0.3-0.7 links/year = 180-420 links
```

**Blog Posts**: Target 10-15 internal links per post
```
- Service links: 2-4
- Suburb links: 3-8
- Related blog links: 3-5
- CTA links: 1-2
```

---

## QUARTERLY REVIEW CHECKLIST

Every 3 months, review linking:

```
Q1 LINKING AUDIT
[ ] Top 20 service pages each have 5+ blog links
[ ] Top 30 suburbs each have 5+ blog links
[ ] Blog hub (/resources) links to all posts from past quarter
[ ] All blog posts have 10-20 internal links
[ ] Anchor text is descriptive (not "click here")
[ ] No broken links (404s)
[ ] Linking ratio is 2:4:3:2 (service:suburb:blog:cta)
[ ] Average blog post has links distributed evenly
[ ] Old blog posts updated with new internal links
[ ] Footer links point to top 10-15 suburbs and services

ACTION ITEMS:
[ ] Update old posts with new blog links
[ ] Add missing service links to related blog posts
[ ] Increase suburb link diversity (cover more suburbs)
[ ] Test all links for functionality
[ ] Review anchor text for keyword optimization
```

---

## EXAMPLE: BLOG POST COMPLETE LINKING WORKFLOW

### POST: "How Much Does Cockroach Control Cost in Sydney?"

**Metadata:**
- URL: `/resources/guides/cockroach-control-cost-sydney`
- H1: "Cockroach Control Cost Sydney 2024"
- Word Count: 2,400

**Linking Plan:**

```
SECTION 1: What Are Cockroaches?
└─ No links (intro section)

SECTION 2: Cockroach Control Methods
├─ Service Link 1: "professional cockroach treatment"
│  → /services/general-pest-control
└─ Service Link 2: "professional pest control options"
   → /services/general-pest-control

SECTION 3: Cost Breakdown (Featured Snippet: Table)
├─ No links (pure data)

SECTION 4: High-Risk Sydney Suburbs for Cockroaches
├─ Suburb Link 1: Marrickville → /pest-control/marrickville
├─ Suburb Link 2: Newtown → /pest-control/newtown
├─ Suburb Link 3: Leichhardt → /pest-control/leichhardt
├─ Suburb Link 4: Parramatta → /pest-control/parramatta
├─ Suburb Link 5: Blacktown → /pest-control/blacktown
└─ Suburb Link 6: Concord → /pest-control/concord

SECTION 5: Prevention Tips
├─ Blog Link 1: "pest prevention tips"
│  → /resources/guides/prevention-tips
└─ Blog Link 2: "general pest identification"
   → /resources/guides/pest-identification

SECTION 6: DIY vs. Professional
└─ Blog Link 1: "DIY pest control"
   → /resources/guides/diy-prevention

SECTION 7: FAQs
└─ No links (Q&A section)

SECTION 8: Related Resources
├─ Service Link 3: General Pest Control
│  → /services/general-pest-control
└─ Blog Link 3: Pest Identification Guide
   → /resources/guides/pest-identification

SECTION 9: CTA
├─ CTA Link 1: Button "Get Free Quotes"
│  → /quote?service=general-pest-control
└─ CTA Link 2: "Find licensed operators"
   → /operators

TOTAL LINKS: 14 (Perfect!)
├─ Service links: 3 ✓
├─ Suburb links: 6 ✓
├─ Blog links: 3 ✓
└─ CTA links: 2 ✓
```

**Quality Check:**
- All links are contextual (not forced) ✓
- Anchor text is descriptive ✓
- No duplicate links ✓
- Link diversity across page types ✓
- Distribution is natural ✓

---

## KEY TAKEAWAYS

1. **Blog serves as hub** connecting users from awareness (search) to conversion (quote form)
2. **Service pages get 2-4 links** per blog post minimum
3. **Suburb pages get 3-8 links** per blog post to maximize suburb coverage
4. **Blog posts link to each other** in topic clusters
5. **Quote form gets 1-2 CTA links** per post
6. **Total links per post**: 10-20 (balance is key)
7. **Update old posts quarterly** with new internal links
8. **Monitor Search Console** for which posts/pages get impressions
9. **A/B test anchor text** to find what converts best
10. **Seasonal content ranks fast** when published 3 weeks before season

---

**Implementation Priority:**
1. Add linking to existing blog posts (Week 1)
2. Set up topic clusters (Week 2)
3. Create 12-month content calendar (Week 3)
4. Publish first 4 blog posts with full linking (Weeks 4-8)
5. Monitor rankings and refine (Ongoing)

**Expected Results:**
- 100-200 new organic sessions/month from blog after 3 months
- 300-500 new organic sessions/month after 6 months
- 50-100% increase in service/suburb page traffic after 6 months
- Higher CTR to quote form from blog traffic
