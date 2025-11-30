# Blog Strategy - Quick Reference Card

Use this one-page reference while creating blog posts.

---

## HEADER HIERARCHY CHECKLIST

```
[ ] ONE H1 only - Primary keyword focus
[ ] 2-5 H2 sections - Each H2 targets secondary keyword
[ ] H3 subsections - Support H2 topic, use LSI keywords
[ ] AVOID H4-H6 - Keep it simple
[ ] ID anchors on H2s - Enable table of contents links
```

### Header Keyword Formula
```
[Action Verb/Problem] [Service/Pest] [Location] [Qualifier/Year]

✓ "How Much Does Termite Treatment Cost in Sydney 2024?"
✓ "Cockroach Control Methods for Inner West Homes"
✓ "Spring Pest Prevention Tips for Sydney Suburbs"
✗ "More Information About Pests" (vague, no keywords)
```

---

## CONTENT LENGTH BY TYPE

| Type | Words | H2 Sections | FAQs | Time to Read |
|------|-------|-----------|------|--------------|
| Service Guide | 2,500-3,500 | 5-7 | 6-10 | 12-15 min |
| How-To | 1,500-2,500 | 4-5 | 4-6 | 8-12 min |
| Comparison | 2,000-3,000 | 5-6 | 5-8 | 10-14 min |
| Seasonal | 1,200-1,800 | 3-4 | 3-5 | 6-9 min |
| Case Study | 2,000-2,800 | 4-5 | 3-5 | 10-13 min |
| Quick Tips | 800-1,200 | 2-3 | 2-3 | 4-6 min |

---

## INTERNAL LINKING QUICK GUIDE

### By Link Type

**Service Pages** (2-4 per post)
- When discussing treatment/service options
- In CTA sections
- In "Related Resources" section
- Pattern: `/services/[service-slug]`

**Suburb Pages** (3-8 per post)
- When mentioning high-risk areas
- When location is relevant to advice
- Link only specific suburbs mentioned
- Pattern: `/pest-control/[suburb-slug]`

**Other Blog Posts** (3-5 per post)
- Topic cluster: link related guides
- Deeper dives: link to specialized guides
- Foundational: link to pest identification
- Pattern: `/resources/guides/[topic-slug]`

**Quote Form** (1-2 per post)
- In CTA sections only
- With service parameter: `/quote?service=termite-inspection`
- Bottom of post is best placement

**Operator Directory** (0-1 per post)
- Use `/operators` (not individual pages)
- Only in "Find Licensed Operators" CTA
- Avoid linking to specific operator pages in blog body

### Linking Density
- **Total links per post**: 10-20 (depends on length)
- **Suburb links**: 3-8 per post
- **Service links**: 2-4 per post
- **Blog links**: 3-5 per post
- **CTA links**: 1-2 per post

---

## SCHEMA MARKUP CHECKLIST

**MUST HAVE (Every Post)**
- [ ] BlogPosting schema
- [ ] BreadcrumbList schema
- [ ] Meta tags (title, description, OG)

**HIGHLY RECOMMENDED (Most Posts)**
- [ ] FAQ schema (if 5+ FAQs)
- [ ] HowTo schema (if step-by-step)

**OPTIONAL (Specialty Posts)**
- [ ] Review/Rating schema (case studies)
- [ ] WebPage schema (general info pages)
- [ ] Organization schema (company info)

### Quick Schema Implementation
```jsx
// Always include these two
<script type="application/ld+json">{blogSchema}</script>
<script type="application/ld+json">{faqSchema}</script>

// For step-by-step posts
<script type="application/ld+json">{howtoSchema}</script>
```

---

## FEATURED SNIPPET TARGETS

### Match Query Type to Format

| Query Type | Format | Example | Target Length |
|---|---|---|---|
| "What is..." | Paragraph | Definition of baiting system | 40-60 words |
| "How to..." | Numbered list | 6 prevention steps | 5-10 items |
| "Best..." | Bulleted list | Best treatment options | 5-8 items |
| "vs." | Comparison table | Barriers vs. baiting | 3-4 columns |

### Snippet Best Practices
- [ ] 0-5 snippets per post (not too many)
- [ ] Clear, scannable format
- [ ] Concise answers
- [ ] Use H3 for snippet sections
- [ ] Include source attribution

---

## META TAGS FORMULA

### Title Tag (50-60 chars)
```
[Primary Keyword] [Location] [Year] | [Value]

Examples:
✓ "Termite Treatment Cost Sydney 2024 | Pricing Guide"
✓ "Cockroach Control Sydney | DIY Methods & Professional"
✓ "Spring Pest Guide 2024 | Sydney Preparation Checklist"
```

### Meta Description (150-160 chars)
```
[Problem/Question] [Brief Answer] [Action]

Examples:
✓ "Termite treatment in Sydney costs $2,000-$5,000. Learn what affects pricing, compare treatment options, and find licensed providers. Updated 2024."
✓ "Discover how to identify termites in your Sydney home. Learn warning signs, prevention tips, and when to call professionals. Expert guide."
```

---

## BLOG POST STRUCTURE TEMPLATE

```
1. HERO SECTION
   - H1: [Primary keyword]
   - Subheading: 120-150 chars describing article
   - CTA buttons: "Get Quotes" / "Find Operators"

2. QUICK STATS (optional)
   - 3-4 key numbers
   - Establishes authority

3. TABLE OF CONTENTS
   - Jumpable anchor links
   - Lists all H2 sections

4. BODY CONTENT
   - Section 1 (H2)
     - Intro paragraph
     - H3 subsections
     - Content with lists/images
   - Section 2 (H2)
     - Same pattern
   - [Repeat for each H2]

5. CTA SECTION
   - Link to quote form
   - Or service page
   - Or operator directory

6. RELATED RESOURCES
   - 3-5 related blog posts
   - 2-3 related service pages
   - Links to relevant suburbs

7. FOOTER
   - Trust signals (licenses, associations)
   - Last updated date
```

---

## LINKING WORKFLOW CHECKLIST

When writing blog post:

**Step 1: Identify Linkable Topics**
- [ ] Which services are discussed?
- [ ] Which suburbs are mentioned?
- [ ] Are there related blog posts?

**Step 2: Add Service Links**
- [ ] Main service page link (body text)
- [ ] Service comparison card (if applicable)
- [ ] Service CTA section

**Step 3: Add Suburb Links**
- [ ] High-risk suburbs mentioned
- [ ] Regional patterns identified
- [ ] 3-8 suburb links total

**Step 4: Add Blog Links**
- [ ] Related topic cluster posts
- [ ] Foundational guides
- [ ] Deeper dive guides

**Step 5: Add CTA Links**
- [ ] Quote form (with service parameter)
- [ ] Operator directory (general)
- [ ] Related service page

**Step 6: Review Link Quantity**
- [ ] Service pages: 2-4 total ✓
- [ ] Suburb pages: 3-8 total ✓
- [ ] Blog posts: 3-5 total ✓
- [ ] CTAs: 1-2 total ✓
- [ ] Total: 10-20 links ✓

---

## SEASONAL CONTENT DATES

Post these **in advance** of the season:

| Season | Dates | Post 3 Weeks Before |
|--------|-------|------------------|
| Spring | Sep 1 - Nov 30 | Mid-August |
| Summer | Dec 1 - Feb 28 | Mid-November |
| Autumn | Mar 1 - May 31 | Mid-February |
| Winter | Jun 1 - Aug 31 | Mid-May |

**Why**: Users search 3-4 weeks before seasonal changes.

---

## TOPIC CLUSTERS (Link Map)

### Termite Cluster
- Pillar: "Complete Termite Guide"
  - Sub: "Termite Identification"
  - Sub: "Termite Treatment Costs"
  - Sub: "Termite Prevention"
  - Sub: "High-Risk Suburbs"
  - Sub: "Spring Swarming Season"

### General Pest Cluster
- Pillar: "Pest Identification Guide"
  - Sub: "Cockroach Control"
  - Sub: "Rodent Prevention"
  - Sub: "Bed Bug Elimination"
  - Sub: "Spider Identification"
  - Sub: "Ant Control"

### Seasonal Cluster
- "Spring Pest Guide" → Pest ID, Prevention
- "Summer Pest Guide" → Cockroaches, Flies
- "Autumn Pest Guide" → Rodents, Spiders
- "Winter Pest Guide" → Rodent Season

### Service Cluster
- "Termite Inspection Process"
- "What to Expect: Pest Control Treatment"
- "Pre-Purchase Inspection Guide"
- "DIY vs. Professional Treatment"

**Internal Linking Rule**: Within a cluster, link forward and backward between related posts.

---

## KEYWORD TARGETING STRATEGY

### For Each H2 Section
Identify one "secondary keyword" to target:

```
H1: [Primary Keyword - 1 per post]
├─ H2: [Secondary Keyword - 2,000+ monthly searches]
│  └─ H3: [LSI Keyword/Entity]
├─ H2: [Secondary Keyword - different angle]
│  └─ H3: [LSI Keyword/Entity]
```

**Example:**
```
H1: Termite Guide Sydney (primary: 320/mo)
├─ H2: What Are Termites (secondary: 100/mo)
│  └─ H3: Termite Biology 101 (LSI)
├─ H2: Termite Treatment Costs (secondary: 150/mo)
│  └─ H3: Cost Breakdown Table (entity)
├─ H2: Prevention Tips (secondary: 80/mo)
│  └─ H3: Moisture Control (entity)
```

**Tools**: SEMrush, Ahrefs, Google Search Console

---

## SEO QUICK WINS

Implement these for immediate ranking improvements:

1. **Table of Contents** (anchor jumps)
   - Increases CTR by 15-20%
   - Helps with featured snippets

2. **Featured Image** (1200x630px)
   - Include in schema
   - Use in social shares

3. **Updated Date** (meta + schema)
   - Refresh old posts monthly
   - Signals freshness to Google

4. **Internal Links** (strategic placement)
   - First mention: contextual link
   - Sidebar: service/suburb cards
   - Bottom: related resources

5. **Lists & Tables**
   - Break up long text
   - Improve readability
   - Enable featured snippets

6. **Short Paragraphs** (2-3 sentences max)
   - Easier to scan
   - Lower bounce rate
   - Higher time on page

7. **Bolded Key Terms**
   - Highlights important concepts
   - Aids scanning
   - Helps with keyword emphasis

---

## CONTENT CHECKLIST

Before publishing:

### Structure
- [ ] One H1, 2-5 H2s, H3 subsections
- [ ] Table of Contents with jump links
- [ ] Clear intro paragraph
- [ ] Conclusion/CTA section

### Content
- [ ] Answers search intent fully
- [ ] Includes data/statistics/examples
- [ ] 40-60 word intro paragraph
- [ ] Short paragraphs (2-3 sentences)
- [ ] Bulleted/numbered lists where applicable
- [ ] Relevant images/icons for visual breaks

### SEO
- [ ] Title tag: 50-60 chars, primary keyword
- [ ] Meta description: 150-160 chars
- [ ] H1 includes primary keyword
- [ ] H2s include secondary keywords
- [ ] Canonical URL set
- [ ] OG tags for social

### Links (10-20 total)
- [ ] 2-4 service page links
- [ ] 3-8 suburb page links (if relevant)
- [ ] 3-5 related blog post links
- [ ] 1-2 CTA links (quote form)

### Schema
- [ ] BlogPosting schema
- [ ] FAQ schema (if applicable)
- [ ] HowTo schema (if applicable)
- [ ] BreadcrumbList schema
- [ ] Tested with Google's Schema Validator

### Conversion
- [ ] Clear CTA sections (minimum 2)
- [ ] Links to quote form
- [ ] Links to operator directory
- [ ] Links to related services
- [ ] Multiple conversion paths

### User Experience
- [ ] Images break up text
- [ ] Accessible color contrast
- [ ] Mobile-friendly formatting
- [ ] No auto-playing video/audio
- [ ] Fast page load time

---

## WRITING STYLE GUIDE

### Do's
- Write for humans first, search engines second
- Use "you/your" to address reader directly
- Include real data and statistics
- Answer questions comprehensively
- Use examples from Sydney context
- Bold key terms and important info
- Break paragraphs into 2-3 sentences
- Use action verbs in headers
- Include operator recommendations (generic, not specific)

### Don'ts
- Don't stuff keywords unnaturally
- Don't write for featured snippets only
- Don't link excessively to unrelated pages
- Don't use "click here" anchor text
- Don't write in passive voice
- Don't include unnecessary fluff
- Don't ignore E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness)
- Don't publish without proofreading

### Tone
- Helpful, not salesy
- Expert, not condescending
- Local, not generic
- Honest about tradeoffs
- Action-oriented in CTAs

---

## QUICK ANSWERS

**Q: How many blog posts should I publish per month?**
A: 2-4 posts/month (24-48/year). Start with 1-2 and scale up.

**Q: Should I interlink blog posts heavily?**
A: Yes, 3-5 links to other blog posts per post (topic clusters). This increases time on site and establishes topical authority.

**Q: How long before blog posts rank?**
A: 2-6 months for new posts. Older posts take 3-12 months to climb. Seasonal content ranks within 1-2 weeks of season start.

**Q: Can I link to multiple suburbs in one post?**
A: Yes! 3-8 suburb links per post is recommended. This drives traffic to all 600+ suburb pages.

**Q: Should I link to competitor websites?**
A: No. Only link internally and to EPA/regulatory sites. Avoid linking to competitors.

**Q: How do I update old blog posts?**
A: Update 1-2 posts monthly. Refresh statistics, add new examples, update links, and change modification date. This improves rankings.

**Q: What's the best day to publish?**
A: Tuesday-Thursday, 9am-12pm. But consistency matters more than timing.

**Q: How do I get blog posts to rank faster?**
A: 1) Internal links from homepage, 2) Service page mentions, 3) Suburb page mentions, 4) High-quality backlinks, 5) Recent publication date

---

## RESOURCES

**Schema Testing**
- https://schema.org/
- https://search.google.com/test/rich-results
- https://www.yoast.com/

**Keyword Research**
- Google Search Console
- SEMrush
- Ahrefs
- Google Ads Keyword Planner

**Content Tools**
- Grammarly (proofreading)
- Hemingway Editor (readability)
- Google Lighthouse (performance)

**Performance Tracking**
- Google Analytics 4
- Google Search Console
- Core Web Vitals

---

## FINAL CHECKLIST

Before publishing each blog post:

```
CONTENT
  [ ] 1,200-3,500 words (depends on type)
  [ ] One clear H1
  [ ] 2-5 H2 sections
  [ ] Table of Contents

SEO
  [ ] Title tag written (50-60 chars)
  [ ] Meta description written (150-160 chars)
  [ ] Keywords targeted naturally

LINKS
  [ ] Service page links (2-4)
  [ ] Suburb links (3-8, if relevant)
  [ ] Related blog links (3-5)
  [ ] CTA links (1-2)
  [ ] Total 10-20 links

SCHEMA
  [ ] BlogPosting schema added
  [ ] FAQ schema (if applicable)
  [ ] HowTo schema (if applicable)
  [ ] Breadcrumb schema

CONVERSION
  [ ] Quote form CTA
  [ ] Operator directory link
  [ ] Related service links
  [ ] Multiple CTAs throughout

FINAL
  [ ] Proofread (no typos, grammar)
  [ ] All links working
  [ ] Images optimized
  [ ] Mobile-friendly preview
  [ ] Load time acceptable
  [ ] Ready to publish!
```

---

**Last Updated**: November 2024
**Total Blog Posts in Strategy**: 12+ annually
**Estimated Organic Traffic**: 200-400 sessions/month from blog
**Funnel**: Blog (Awareness) → Services (Consideration) → Quote Form (Decision)
