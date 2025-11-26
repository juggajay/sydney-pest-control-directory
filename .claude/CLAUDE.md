# SYDNEY PEST CONTROL DIRECTORY - ORCHESTRATOR

I am Claude Code, configured to orchestrate the Sydney Pest Control Directory build system. This directory targets 700+ licensed operators across 600+ Sydney suburbs, generating 1,300+ static pages optimized for local SEO.

## PROJECT OVERVIEW

**Goal**: Build Australia's leading pest control directory for Sydney
**Revenue Model**: Operator subscriptions ($49-199/month) + Lead generation ($15-25/lead)
**Data Advantage**: NSW EPA public license register (700+ operators)
**Target**: 120 paying operators, $65K+ revenue in Year 1

## DIRECTORY STRUCTURE

```
/public
  /suburbs          # 600+ suburb JSON files
  /services         # 15 service category JSON files
  /operators        # Operator JSON files (synced from Supabase)
/app
  /page.js                      # Homepage
  /pest-control/[suburb]/       # 600+ suburb pages
  /services/[service]/          # 15 service pages
  /operator/[slug]/             # 700+ operator pages
  /operators/                   # All operators listing
  /quote/                       # Quote request form
/.claude
  /agents                       # Agent configuration files
  CLAUDE.md                     # This file
```

## AVAILABLE AGENTS

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `suburb-generator` | Generate 600+ Sydney suburb JSON files | Initial setup, adding new suburbs |
| `service-generator` | Generate 15 pest control service JSON files | Initial setup, adding services |
| `operator-importer` | Scrape EPA registry, enrich data, import to Supabase | Initial setup, monthly refresh |
| `nextjs-builder` | Build/update Next.js pages and components | After data generation |
| `playwright-tester` | Run automated tests on all pages | Before deployment |

## WORKFLOW

### Phase 1: Data Generation (Run Once)

```
Step 1: Generate Suburbs
→ Invoke suburb-generator agent
→ Creates 600+ JSON files in /public/suburbs/
→ Creates /public/suburbs/index.json

Step 2: Generate Services
→ Invoke service-generator agent
→ Creates 15 JSON files in /public/services/
→ Creates /public/services/index.json

Step 3: Import Operators
→ Invoke operator-importer agent
→ Scrapes NSW EPA registry via Jina
→ Enriches with business details
→ Saves to Supabase `operators` table
→ Creates JSON backup in /public/operators/
```

### Phase 2: Website Build

```
Step 4: Build Next.js Site
→ Invoke nextjs-builder agent
→ Updates all page components
→ Implements data loading from JSON/Supabase
→ Adds SEO metadata and schema markup
→ Generates sitemap

Step 5: Test Everything
→ Invoke playwright-tester agent
→ Tests all page types
→ Validates forms
→ Checks SEO elements
→ Generates test report
```

### Phase 3: Deployment

```
Step 6: Deploy to Vercel
→ git add . && git commit -m "Build complete"
→ git push origin main
→ Vercel auto-deploys from GitHub
```

## API KEYS (Configured in .env.local)

- **Supabase URL**: `NEXT_PUBLIC_SUPABASE_URL`
- **Supabase Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Jina API Key**: `JINA_API_KEY`

## SUPABASE TABLES

### operators
Primary table for pest control businesses.

### leads
Quote requests and contact form submissions.

### operator_claims
Track operators claiming their listings.

## ADDING NEW OPERATORS

### Method 1: EPA Re-scrape (Bulk)
Run operator-importer agent monthly to catch new licenses.

### Method 2: Manual Addition
```sql
INSERT INTO operators (business_name, slug, license_number, ...)
VALUES ('New Pest Co', 'new-pest-co', 'PMT-99999', ...);
```

### Method 3: Self-Claim (Future)
Operators claim listings via `/claim/[operator-slug]` flow.

## ADDING NEW SUBURBS

1. Create JSON file in `/public/suburbs/[suburb-slug].json`
2. Add entry to `/public/suburbs/index.json`
3. Run `npm run build` to generate static page

## SEO TARGETS

### Tier 1 (Head Terms)
- "pest control sydney" - 8,100/month
- "termite inspection sydney" - 2,400/month

### Tier 2 (Service + Region)
- "termite treatment eastern suburbs" - 50-200/month
- "cockroach control north sydney" - 50-200/month

### Tier 3 (Suburb-Specific) ← WIN THESE FIRST
- "pest control parramatta" - 20-50/month
- "termite inspection bondi" - 10-30/month

## KEY COMMANDS

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Production build (generates static pages)

# Testing
npx playwright test      # Run all tests

# Database
npx supabase db push     # Push schema changes
```

## IMPORTANT NOTES

1. **Static First**: Suburb and service pages are static JSON → Fast, free hosting
2. **Operators from DB**: Operators load from Supabase for easy updates
3. **EPA is the Moat**: License verification is the key differentiator
4. **Parallel Agents**: When generating data, run multiple agents in parallel

## QUICK START

To build the complete directory from scratch:

1. Ensure `.env.local` has all API keys
2. Run Supabase schema migration
3. Invoke `suburb-generator` agent
4. Invoke `service-generator` agent
5. Invoke `operator-importer` agent
6. Invoke `nextjs-builder` agent
7. Invoke `playwright-tester` agent
8. Deploy to Vercel

Total estimated time: 2-4 hours (mostly agent execution)
