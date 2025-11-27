# KEYWORD STRATEGY - CODE IMPLEMENTATION EXAMPLES
## Ready-to-Use Code & Configuration

---

## 1. HOMEPAGE ENHANCEMENTS

### 1.1 Updated Meta Tags (lib/seo.js or app/layout.js)

```javascript
// For Homepage Specifically

export const homepageMetadata = {
  // SEO Title - Tier 1 Keyword Focus
  title: "Pest Control Sydney | Compare Free Quotes from 100+ EPA-Verified Operators",
  // Length: 75 characters
  // Keywords: pest control, sydney, free quotes, EPA-verified, operators

  // Meta Description - Tier 1 & 2 Keywords
  description: "Find trusted pest control in Sydney. Compare free quotes from 100+ EPA-verified operators. Termite, cockroach & rodent control. 4.8★ rated, same-day service available.",
  // Length: 156 characters
  // Keywords: pest control, sydney, free quotes, EPA-verified, termite, cockroach, rodent, same-day

  // Canonical URL
  canonical: "https://sydneypestcontrol.com.au/",

  // Additional Meta Tags
  alternates: {
    canonical: "https://sydneypestcontrol.com.au/",
  },
  robots: "index, follow",

  // Open Graph (Social Sharing)
  openGraph: {
    title: "Pest Control Sydney | Compare Free Quotes",
    description: "Find 100+ EPA-verified pest control operators in Sydney",
    url: "https://sydneypestcontrol.com.au/",
    type: "website",
  }
};
```

### 1.2 H1 Tag Update (app/page.js)

```javascript
// Current (Line 238-240):
/*
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
  Find Trusted Pest Control
  <span className="block text-accent-400">Near You</span>
</h1>
*/

// Option A: Add "in Sydney"
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
  Find Trusted Pest Control
  <span className="block text-accent-400">in Sydney Near You</span>
</h1>

// Option B: More keyword-focused
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
  Pest Control in Sydney
  <span className="block text-accent-400">100+ EPA-Verified Operators</span>
</h1>

// Recommendation: Option A (maintains brand voice, adds location)
```

### 1.3 New "Trust Indicators" Section Enhancement

```javascript
// Add after line 275 (after Trust Indicators section)
// New section emphasizing keyword targets

<section className="bg-white py-12 border-t border-neutral-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
          Why Choose Our Sydney Pest Control Directory?
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary-600 font-bold">✓</span>
            <span><strong>EPA License Verification:</strong> Every operator verified against NSW EPA register</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 font-bold">✓</span>
            <span><strong>Compare Free Quotes:</strong> Get 3 quotes in under 60 seconds</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 font-bold">✓</span>
            <span><strong>Transparent Pricing:</strong> See costs before you book</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 font-bold">✓</span>
            <span><strong>Real Customer Reviews:</strong> No fake ratings</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 font-bold">✓</span>
            <span><strong>Fast Response Times:</strong> Licensed operators within 2 hours</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-8 rounded-2xl border border-primary-100">
        <h3 className="font-heading font-bold text-lg text-neutral-900 mb-6">
          Services Available Across Sydney
        </h3>
        <ul className="grid grid-cols-2 gap-3 text-sm">
          <li>✓ Termite Inspection & Treatment</li>
          <li>✓ Cockroach Control</li>
          <li>✓ Rodent & Rat Removal</li>
          <li>✓ Spider Control</li>
          <li>✓ Bed Bug Removal</li>
          <li>✓ Ant Treatment</li>
          <li>✓ Wasp & Bee Removal</li>
          <li>✓ Possum Removal</li>
          <li>✓ Emergency Pest Control</li>
          <li>✓ Preventative Treatments</li>
        </ul>
      </div>
    </div>
  </div>
</section>

// Keywords in this section:
// Primary: pest control sydney (2x)
// Service keywords: termite, cockroach, rodent, spider, bed bug, ant, wasp
// Transactional: compare quotes, free quotes, booking
// Trust: EPA verified, licensed operators, fast response
// Coverage: "across sydney"
```

### 1.4 Voice Search CTA Enhancement

```javascript
// Add after Search Box (around line 250)

<div className="mt-8 flex flex-col items-start gap-4">
  <span className="text-white/60 text-sm font-medium">Or try asking:</span>
  <div className="flex flex-wrap gap-2">
    {[
      "Find pest control near me",
      "How much does termite inspection cost?",
      "What pests are in my suburb?",
      "Get a free pest control quote",
    ].map((query) => (
      <button
        key={query}
        onClick={() => {
          // Could trigger search or voice assistant
          window.location.href = `/quote?q=${encodeURIComponent(query)}`;
        }}
        className="px-4 py-2 bg-white/15 backdrop-blur text-white/90 text-sm
          rounded-full hover:bg-white/25 transition-colors border border-white/20"
      >
        {query}
      </button>
    ))}
  </div>
</div>

// Keywords targeted (voice search):
// - "find pest control near me" (conversational)
// - "termite inspection cost" (transactional + question)
// - "[suburb] pests" (location-specific)
// - "free quote" (action-based)
```

---

## 2. SUBURB PAGE TEMPLATE ENHANCEMENTS

### 2.1 New Section: Pest Seasons

```javascript
// Add after FAQ section (around line 434 in [suburb]/page.js)

<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-8">
      Pest Seasons in {suburb.name}
    </h2>

    <div className="grid md:grid-cols-4 gap-4">
      {[
        {
          season: "Spring",
          months: "Sept-Nov",
          pests: "Termites (swarm), Ants",
          detail: "White ant swarming season. Pre-purchase inspections peak. Most active after rain.",
          icon: "🌱"
        },
        {
          season: "Summer",
          months: "Dec-Feb",
          pests: "Cockroaches, Mosquitoes",
          detail: "Heat accelerates breeding. Cockroaches thrive in warm weather. Highest demand season.",
          icon: "☀️"
        },
        {
          season: "Autumn",
          months: "Mar-May",
          pests: "Reduced Activity",
          detail: "Good time for preventative treatments. Post-summer cleanups. Moderate pest activity.",
          icon: "🍂"
        },
        {
          season: "Winter",
          months: "Jun-Aug",
          pests: "Rodents, Spiders",
          detail: "Pests seek shelter indoors. Mice and rats most active. Preventative focus.",
          icon: "❄️"
        },
      ].map((season) => (
        <div key={season.season} className="card p-6 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-2">{season.icon}</div>
          <h3 className="font-heading font-bold text-neutral-900 mb-1">{season.season}</h3>
          <p className="text-xs text-neutral-500 mb-3">{season.months}</p>
          <p className="text-sm font-medium text-neutral-900 mb-2">{season.pests}</p>
          <p className="text-xs text-neutral-600">{season.detail}</p>
        </div>
      ))}
    </div>
  </div>
</section>

// Keywords in section:
// Seasonal: spring, summer, autumn, winter
// Location: [suburb] (in context)
// Service: termite, cockroach, rodent, spider, preventative
// Transactional: treatment, control
// Intent: when to treat, best time for pest control
```

### 2.2 New Section: "Why Hire Licensed in This Suburb"

```javascript
// Add after Nearby Suburbs section (around line 456)

<section className="py-16 bg-neutral-50">
  <div className="max-w-3xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-8">
      Why Hire a Licensed Pest Controller in {suburb.name}
    </h2>

    <div className="space-y-4">
      {[
        {
          title: "EPA License Verification",
          desc: "All operators listed are verified against NSW EPA pesticide license register. Look for the EPA Verified badge."
        },
        {
          title: "Insurance & Liability",
          desc: "Licensed professionals carry insurance, protecting you if anything goes wrong during treatment."
        },
        {
          title: "Proper Training",
          desc: "EPA-licensed operators undergo formal training in pest identification, treatment methods, and chemical safety."
        },
        {
          title: "Treatment Warranty",
          desc: "Licensed operators guarantee their work. If pests return, they'll retreat at no additional cost."
        },
        {
          title: "Safe Chemical Use",
          desc: "Professionals use EPA-approved chemicals safely. They know which products are effective for {suburb.name}'s specific pest challenges."
        },
        {
          title: "Faster Results",
          desc: "Professional treatment eliminates pests 3-5x faster than DIY methods. Licensed operators have access to commercial-grade solutions."
        },
      ].map((item, idx) => (
        <div key={idx} className="flex gap-4 p-4 bg-white rounded-lg border border-neutral-200">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-bold">✓</span>
            </div>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-neutral-900">{item.title}</h3>
            <p className="text-sm text-neutral-600 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

// Keywords in section:
// Primary: licensed pest controller, [suburb]
// Trust: EPA verified, insurance, warranty, safe
// Intent: why hire professional
// Comparison: professional vs DIY
```

---

## 3. SERVICE PAGE TEMPLATE (TERMITE INSPECTION EXAMPLE)

### 3.1 Enhanced Title & Meta

```javascript
// app/services/[service]/page.js

export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.service);

  // For termite-inspection specifically
  if (params.service === 'termite-inspection') {
    return {
      title: "Termite Inspection Sydney - Cost & EPA-Verified Inspectors",
      // Length: 61 characters
      // Keywords: termite inspection, sydney, cost, EPA-verified

      description: "Professional termite inspections in Sydney from EPA-verified inspectors. Pre-purchase inspections, termite damage assessment, treatment quotes. $250-$500 cost guide.",
      // Length: 156 characters
      // Keywords: termite inspection, sydney, EPA-verified, pre-purchase, cost

      canonical: "https://sydneypestcontrol.com.au/services/termite-inspection",
    };
  }

  // Generic service template
  return {
    title: `${service.name} Sydney - ${service.priceRange} | EPA-Verified Operators`,
    description: `Professional ${service.name.toLowerCase()} in Sydney. Compare quotes from EPA-verified operators. Free assessments, transparent pricing, same-day service available.`,
    canonical: `https://sydneypestcontrol.com.au/services/${service.slug}`,
  };
}
```

### 3.2 Enhanced Service Page Structure

```javascript
// Core sections with keyword density

function TermiteInspectionPage() {
  return (
    <>
      {/* Section 1: What Is (Research Intent) */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2>What is Termite Inspection?</h2>
          {/* Keywords: "what is termite inspection", "termite inspection process", "how termite inspection works" */}
          <p>A professional termite inspection is a visual assessment of your property...</p>
        </div>
      </section>

      {/* Section 2: Cost/Pricing (Transactional Intent) */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2>Termite Inspection Cost in Sydney</h2>
          {/* Keywords: "termite inspection cost", "how much termite inspection", "termite inspection price" */}

          <table className="w-full">
            <thead>
              <tr>
                <th>Inspection Type</th>
                <th>Cost</th>
                <th>Duration</th>
                <th>Includes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard Inspection</td>
                <td>$250-$400</td>
                <td>1-2 hours</td>
                <td>Visual assessment, report</td>
              </tr>
              <tr>
                <td>Pre-Purchase Inspection</td>
                <td>$300-$500</td>
                <td>2-3 hours</td>
                <td>Detailed report for buyers</td>
              </tr>
              <tr>
                <td>Thermal Imaging Inspection</td>
                <td>$500-$700</td>
                <td>2-3 hours</td>
                <td>Includes thermal imaging</td>
              </tr>
            </tbody>
          </table>
          {/* Keywords embedded in table: cost, price, inspection types */}
        </div>
      </section>

      {/* Section 3: When to Get (Decision Intent) */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2>When Should You Get a Termite Inspection in Sydney?</h2>
          {/* Keywords: "when to get termite inspection", "do I need termite inspection" */}

          <ul className="space-y-3">
            <li><strong>Before Buying a Home:</strong> Pre-purchase inspections are non-negotiable...</li>
            <li><strong>Signs of Termites:</strong> If you see mud tubes, wings, or hollow timber...</li>
            <li><strong>Annual Preventative:</strong> Homeowners should get annual inspections...</li>
            <li><strong>Nearby Discovery:</strong> If termites found in neighboring properties...</li>
          </ul>
        </div>
      </section>

      {/* Section 4: Types (Informational Intent) */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2>Types of Termite Inspections Available</h2>
          {/* Keywords: "types of termite inspection", "inspection methods" */}

          <div className="space-y-4">
            <div className="card p-6">
              <h3>Visual Inspection</h3>
              <p>Basic visual assessment of accessible areas. Fastest, most affordable option.</p>
            </div>
            <div className="card p-6">
              <h3>Moisture Meter Inspection</h3>
              <p>Uses moisture detection to find hidden termite activity. Better for areas prone to termites.</p>
            </div>
            <div className="card p-6">
              <h3>Thermal Imaging Inspection</h3>
              <p>Advanced heat detection to identify termite damage through walls. Most thorough option.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ (PAA Keywords) */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2>Termite Inspection FAQs</h2>
          {/* Keywords: "how often termite inspection", "do I need termite inspection", etc. */}

          <div className="space-y-4">
            <details className="card p-6">
              <summary className="font-bold">How often should I get a termite inspection?</summary>
              <p className="mt-4">Annually for most homes. More frequently (every 6 months) if you've had termite issues previously.</p>
            </details>

            <details className="card p-6">
              <summary className="font-bold">Do I need a termite barrier after inspection?</summary>
              <p className="mt-4">If inspection finds termites or active mud tubes, treatment is recommended...</p>
            </details>

            <details className="card p-6">
              <summary className="font-bold">How long does a termite inspection take?</summary>
              <p className="mt-4">Typical inspection takes 1-3 hours depending on property size and inspection type...</p>
            </details>
          </div>
        </div>
      </section>

      {/* Section 6: CTA (Transactional) */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2>Book Your Termite Inspection Today</h2>
          {/* Keywords: "book inspection", "get inspection", "schedule inspection" */}
          <p className="mt-4">Get a free quote from EPA-verified inspectors in your area. No obligation.</p>
          <Link href="/quote?service=termite-inspection" className="btn btn-accent mt-6">
            Get Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
```

---

## 4. FAQ PAGE STRUCTURE

### 4.1 Voice Search Optimized FAQ Page

```javascript
// app/resources/faq/page.js

export const metadata = {
  title: "Pest Control FAQs - Questions & Answers | Sydney Directory",
  description: "Find answers to common pest control questions in Sydney. FAQs about cost, safety, types of pests, treatment duration, and more.",
  canonical: "https://sydneypestcontrol.com.au/resources/faq",
};

const faqCategories = [
  {
    title: "General Pest Control Questions",
    faqs: [
      {
        question: "How much does pest control cost in Sydney?",
        answer: "General pest control costs $150-$350 for a standard home. Termite inspections cost $250-$500. Termite treatments range from $2,000-$5,000+. Get free quotes from licensed operators for exact pricing based on your property size and pest type."
      },
      {
        question: "How do I get a free pest control quote?",
        answer: "Enter your suburb on our homepage and describe your pest problem. You'll receive free, no-obligation quotes from up to 3 EPA-verified operators within 2 hours."
      },
      {
        question: "Are all operators on this site licensed?",
        answer: "Yes. Every operator is verified against the NSW EPA pesticide license register. Look for the 'EPA Verified' badge on operator profiles."
      },
      // ... 7 more questions
    ]
  },
  {
    title: "Service & Safety Questions",
    faqs: [
      {
        question: "Is pest control safe for children?",
        answer: "Modern pest control is safe when applied by licensed professionals. Most treatments require vacating for 2-4 hours and keeping children away from treated areas until dry. Inform your operator about children and sensitivities."
      },
      // ... more questions
    ]
  },
  // ... more categories
];

export default function FAQPage() {
  return (
    <>
      {/* Meta */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(cat =>
              cat.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            )
          })
        }}
      />

      {/* Page Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Pest Control FAQs
          </h1>
          <p className="text-lg text-neutral-600 mb-12">
            Find answers to common questions about pest control services in Sydney.
          </p>

          {/* FAQ Categories */}
          {faqCategories.map((category) => (
            <div key={category.title} className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6">
                {category.title}
              </h2>

              <div className="space-y-4">
                {category.faqs.map((faq, idx) => (
                  <details key={idx} className="card p-6 group">
                    <summary className="flex items-center justify-between cursor-pointer font-bold text-neutral-900">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-4 text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

---

## 5. SCHEMA MARKUP ENHANCEMENTS

### 5.1 Enhanced Service Schema

```javascript
// lib/seo.js - Update generateServiceSchema()

export function generateServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.longDescription,
    "provider": {
      "@type": "Organization",
      "name": siteConfig.name,
      "telephone": siteConfig.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sydney",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Sydney",
      "addressRegion": "NSW",
      "addressCountry": "AU"
    },
    "availableLanguage": {
      "@type": "Language",
      "name": "English"
    },
    "offers": {
      "@type": "Offer",
      "price": service.avgPrice || service.priceRange,
      "priceCurrency": "AUD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": service.avgPrice || service.priceRange,
        "priceCurrency": "AUD",
        "validFrom": "2025-01-01"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "image": service.image || `${siteConfig.url}/services/${service.slug}.jpg`,
    "url": `${siteConfig.url}/services/${service.slug}`
  };
}
```

### 5.2 Enhanced FAQ Schema with Voice Keywords

```javascript
// Generate FAQPage schema with voice search optimization

export function generateFAQSchemaWithVoice(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "headline": "Pest Control FAQs - Sydney Directory",
    "description": "Common questions and answers about pest control in Sydney",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question, // Conversational for voice search
      "keywords": faq.keywords || [], // LSI keywords
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "url": faq.answerUrl, // Link to detailed page
        "image": faq.image // Optional image
      },
      "dateModified": new Date().toISOString(),
      "inLanguage": "en-AU"
    }))
  };
}
```

---

## 6. INTERNAL LINKING STRATEGY

### 6.1 Service-to-Suburb Linking

```javascript
// Component to add to suburb pages
// Suggests relevant service pages

function ServiceLinksForSuburb({ suburb, services }) {
  const relevantServices = services.filter(s =>
    suburb.commonPests.some(pest =>
      s.slug.includes(pest.replace(/\s+/g, '-'))
    )
  );

  return (
    <section className="py-8 bg-blue-50 rounded-lg">
      <h3 className="font-bold mb-4">Popular Pest Control Services in {suburb.name}</h3>
      <ul className="space-y-2">
        {relevantServices.map(service => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className="text-blue-600 hover:underline">
              {service.name} in {suburb.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### 6.2 Operator-to-Service Linking

```javascript
// Component for operator pages

function OperatorServiceLinks({ operator }) {
  return (
    <div className="mt-8">
      <h3 className="font-bold mb-4">Services Offered</h3>
      <div className="flex flex-wrap gap-2">
        {operator.services.map(serviceSlug => (
          <Link
            key={serviceSlug}
            href={`/services/${serviceSlug}`}
            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 text-sm"
          >
            {serviceSlug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

---

## 7. KEYWORD TRACKING UTILITY

### 7.1 Setup Google Search Console Export

```javascript
// Utility to track keyword performance

// Track key keywords in your analytics
const trackingKeywords = [
  // Tier 1
  { keyword: "pest control sydney", target: "Top 5", priority: 1 },
  { keyword: "termite inspection sydney", target: "Top 10", priority: 1 },
  { keyword: "pest control near me", target: "Top 20", priority: 1 },

  // Tier 2
  { keyword: "cockroach control sydney", target: "Top 10", priority: 2 },
  { keyword: "rodent control sydney", target: "Top 10", priority: 2 },
  { keyword: "compare pest control quotes", target: "Top 15", priority: 2 },

  // Service Keywords
  { keyword: "termite inspection cost", target: "Top 10", priority: 2 },
  { keyword: "termite treatment sydney", target: "Top 10", priority: 2 },

  // Voice Search
  { keyword: "find pest control near me", target: "Top 20", priority: 3 },
  { keyword: "how much does termite inspection cost", target: "Top 15", priority: 3 },
];

// Monitor in Google Search Console weekly
// Export data to spreadsheet for tracking
```

---

## 8. MOBILE & VOICE OPTIMIZATION

### 8.1 Mobile-First Keyword Structure

```javascript
// Ensure mobile pages are optimized

const mobileOptimizations = [
  "Fast loading (< 2s)",
  "Tap-friendly CTAs (44px minimum)",
  "One-hand navigation",
  "Voice search CTA visible above fold",
  "Click-to-call buttons",
  "Local operator listings with star ratings",
  "FAQ section expanded by default",
];

// Add to mobile pages:
<a href="tel:1300737834" className="btn btn-primary w-full mb-4">
  Call Now: 1300 PEST FIND
</a>
```

### 8.2 Voice Search Text Optimization

```javascript
// Use natural language for voice

// Instead of: "Pest Control Bondi 2026"
// Use: "Find Pest Control in Bondi"

// Instead of: "$150-350 Treatment"
// Use: "Treatment costs $150 to $350"

// Instead of: "EPA Lic #PMT-2024"
// Use: "EPA Licensed, License Number PMT-2024"

// Example in code:
<p>
  Find pest control services in {suburb.name}. Treatment typically costs
  between ${minCost} and ${maxCost} for a standard home.
</p>
```

---

## 9. IMPLEMENTATION CHECKLIST

```javascript
// Week 1 - Critical Implementations
TASKS = [
  "Update homepage title tag", // 15 min
  "Update homepage meta description", // 15 min
  "Add/verify FAQ schema", // 30 min
  "Create /resources/faq page", // 2 hours
  "Add voice search CTA", // 30 min
  "Verify robots.txt and sitemap", // 30 min
  "Update H1 tags (add Sydney location)", // 1 hour
  "Add trust section with service list", // 1 hour
];

// Week 2-3 - High Priority
TASKS = [
  "Enhance termite service page (3500+ words)", // 4 hours
  "Enhance cockroach service page", // 3 hours
  "Enhance rodent service page", // 3 hours
  "Add seasonal guides", // 2 hours
  "Implement service schema markup", // 2 hours
  "Create internal linking plan", // 2 hours
];

// Week 4+ - Medium Priority
TASKS = [
  "Enhance top 50 suburb pages", // 20 hours
  "Add LSI keyword variations", // 5 hours
  "Create comparison guides", // 4 hours
  "Expand FAQ to 60+ questions", // 5 hours
  "Monitor keyword rankings", // 2 hours/week
];
```

---

**Last Updated:** November 2025
**Status:** Ready for Implementation
**Estimated Time:** 40-50 hours (comprehensive), 16 hours (quick wins only)
