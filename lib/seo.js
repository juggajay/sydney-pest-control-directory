// SEO Configuration and Utilities

export const siteConfig = {
  name: 'Pest Arrest',
  shortName: 'Pest Arrest',
  brandDisplay: 'Pest⚡Arrest',
  description: 'Find licensed pest control services near you. Compare quotes from EPA-verified pest controllers across Sydney.',
  url: 'https://pestarrest.com.au',
  ogImage: '/og-image.png',
  phone: '1300 ARREST',
  email: 'hello@pestarrest.com.au',
  address: 'Sydney, NSW, Australia',
};

export function generateMetadata({ 
  title, 
  description, 
  path = '', 
  type = 'website',
  image,
  noIndex = false 
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullUrl = `${siteConfig.url}${path}`;
  
  return {
    title: fullTitle,
    description: description || siteConfig.description,
    canonical: fullUrl,
    openGraph: {
      title: fullTitle,
      description: description || siteConfig.description,
      url: fullUrl,
      siteName: siteConfig.name,
      type: type,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Sydney suburb coordinates lookup for better local SEO
const suburbCoordinates = {
  'bondi': { lat: -33.891, lng: 151.274 },
  'bondi-beach': { lat: -33.8915, lng: 151.2767 },
  'bondi-junction': { lat: -33.8932, lng: 151.2477 },
  'coogee': { lat: -33.9209, lng: 151.2563 },
  'randwick': { lat: -33.9144, lng: 151.2413 },
  'maroubra': { lat: -33.9505, lng: 151.2418 },
  'newtown': { lat: -33.8966, lng: 151.1795 },
  'marrickville': { lat: -33.9105, lng: 151.1559 },
  'leichhardt': { lat: -33.8836, lng: 151.1553 },
  'balmain': { lat: -33.8575, lng: 151.1797 },
  'north-sydney': { lat: -33.8389, lng: 151.2069 },
  'chatswood': { lat: -33.7969, lng: 151.1813 },
  'mosman': { lat: -33.8293, lng: 151.2440 },
  'manly': { lat: -33.7977, lng: 151.2872 },
  'dee-why': { lat: -33.7516, lng: 151.2876 },
  'parramatta': { lat: -33.8151, lng: 151.0011 },
  'blacktown': { lat: -33.7710, lng: 150.9063 },
  'penrith': { lat: -33.7510, lng: 150.6875 },
  'liverpool': { lat: -33.9205, lng: 150.9238 },
  'hurstville': { lat: -33.9642, lng: 151.1004 },
  'sutherland': { lat: -34.0310, lng: 151.0581 },
  'cronulla': { lat: -34.0539, lng: 151.1519 },
  'sydney': { lat: -33.8688, lng: 151.2093 },
  'sydney-cbd': { lat: -33.8688, lng: 151.2093 },
  'surry-hills': { lat: -33.8838, lng: 151.2119 },
  'paddington': { lat: -33.8847, lng: 151.2269 },
  'redfern': { lat: -33.8929, lng: 151.2038 },
  'glebe': { lat: -33.8794, lng: 151.1833 },
  'pyrmont': { lat: -33.8699, lng: 151.1943 },
  'ultimo': { lat: -33.8784, lng: 151.1987 },
  'rozelle': { lat: -33.8619, lng: 151.1683 },
  'drummoyne': { lat: -33.8522, lng: 151.1545 },
  'five-dock': { lat: -33.8680, lng: 151.1291 },
  'burwood': { lat: -33.8775, lng: 151.1036 },
  'strathfield': { lat: -33.8796, lng: 151.0942 },
  'homebush': { lat: -33.8667, lng: 151.0833 },
  'auburn': { lat: -33.8490, lng: 151.0331 },
  'bankstown': { lat: -33.9177, lng: 151.0330 },
  'campsie': { lat: -33.9117, lng: 151.1037 },
  'lakemba': { lat: -33.9199, lng: 151.0757 },
  'kogarah': { lat: -33.9696, lng: 151.1334 },
  'rockdale': { lat: -33.9536, lng: 151.1373 },
  'arncliffe': { lat: -33.9368, lng: 151.1467 },
  'earlwood': { lat: -33.9198, lng: 151.1318 },
  'dulwich-hill': { lat: -33.9032, lng: 151.1393 },
  'ashfield': { lat: -33.8890, lng: 151.1260 },
  'castle-hill': { lat: -33.7317, lng: 151.0056 },
  'ryde': { lat: -33.8165, lng: 151.1047 },
  'eastwood': { lat: -33.7897, lng: 151.0810 },
  'epping': { lat: -33.7728, lng: 151.0827 },
  'hornsby': { lat: -33.7045, lng: 151.0990 },
  'lane-cove': { lat: -33.8175, lng: 151.1668 },
  'willoughby': { lat: -33.7986, lng: 151.2002 },
  'cremorne': { lat: -33.8285, lng: 151.2291 },
  'neutral-bay': { lat: -33.8331, lng: 151.2214 },
  'rose-bay': { lat: -33.8706, lng: 151.2690 },
  'double-bay': { lat: -33.8779, lng: 151.2439 },
  'woollahra': { lat: -33.8850, lng: 151.2402 },
  'vaucluse': { lat: -33.8589, lng: 151.2784 },
  'kensington': { lat: -33.9074, lng: 151.2245 },
  'kingsford': { lat: -33.9210, lng: 151.2269 },
};

// Get coordinates for operator based on suburb or service areas
function getOperatorCoordinates(operator) {
  // Try operator's suburb first
  const suburbSlug = operator.suburb?.toLowerCase().replace(/\s+/g, '-');
  if (suburbSlug && suburbCoordinates[suburbSlug]) {
    return suburbCoordinates[suburbSlug];
  }

  // Try first service area
  if (operator.serviceAreas?.length > 0) {
    for (const area of operator.serviceAreas) {
      const areaSlug = area.toLowerCase().replace(/\s+/g, '-');
      if (suburbCoordinates[areaSlug]) {
        return suburbCoordinates[areaSlug];
      }
    }
  }

  // Default to Sydney CBD
  return { lat: -33.8688, lng: 151.2093 };
}

// Generate LocalBusiness Schema for operators
// Uses PestControlService type for better SEO specificity
export function generateOperatorSchema(operator, reviews = []) {
  const coords = getOperatorCoordinates(operator);

  // Build service area list for areaServed
  const serviceAreasList = (operator.serviceAreas || []).slice(0, 20).map(area => ({
    '@type': 'City',
    name: area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    addressRegion: 'NSW',
    addressCountry: 'AU',
  }));

  // Format phone consistently
  const phoneFormatted = operator.phone?.replace(/\s/g, '') || '';

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.url}/operator/${operator.slug}#business`,
    name: operator.businessName,
    alternateName: operator.tradingName || undefined,
    description: operator.description,
    url: `${siteConfig.url}/operator/${operator.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/operator/${operator.slug}`,
    },
    // Contact information - NAP consistency
    telephone: operator.phone,
    email: operator.email,
    // Full postal address
    address: {
      '@type': 'PostalAddress',
      streetAddress: operator.address || undefined,
      addressLocality: operator.suburb || 'Sydney',
      postalCode: operator.postcode || undefined,
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    // Geographic coordinates for map
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    },
    // Areas served - important for local SEO
    areaServed: serviceAreasList.length > 0 ? serviceAreasList : {
      '@type': 'City',
      name: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    // Aggregate rating from reviews
    aggregateRating: operator.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: operator.rating,
      reviewCount: operator.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    // Individual reviews
    review: reviews.length > 0 ? reviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
      datePublished: r.date,
    })) : undefined,
    // Business details
    priceRange: '$$',
    currenciesAccepted: 'AUD',
    paymentAccepted: 'Cash, Credit Card, EFTPOS',
    // Operating hours
    openingHoursSpecification: operator.operatingHours ? Object.entries(operator.operatingHours).map(([day, hours]) => {
      if (hours.includes('Closed')) return null;
      const [opens, closes] = hours.split(' - ');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
        opens: opens || undefined,
        closes: closes || undefined,
      };
    }).filter(Boolean) : undefined,
    // External links
    sameAs: operator.website ? [operator.website] : undefined,
    // License/certification - important for pest control
    hasCredential: operator.licenseNumber ? {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: operator.licenseType || 'Pest Management License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'NSW Environment Protection Authority',
        url: 'https://www.epa.nsw.gov.au',
      },
    } : undefined,
    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pest Control Services',
      itemListElement: (operator.services || []).map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          serviceType: 'Pest Control',
          provider: {
            '@type': 'LocalBusiness',
            name: operator.businessName,
          },
          areaServed: {
            '@type': 'State',
            name: 'New South Wales',
            addressCountry: 'AU',
          },
        },
        position: index + 1,
      })),
    },
    // Additional properties for trust signals
    foundingDate: operator.yearsInBusiness ? `${new Date().getFullYear() - operator.yearsInBusiness}` : undefined,
    isAcceptingNewCustomers: true,
    knowsLanguage: 'English',
  };
}

// Generate Service Schema
export function generateServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.longDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    areaServed: {
      '@type': 'City',
      name: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: service.avgPrice,
        priceCurrency: 'AUD',
      },
    },
  };
}

// Generate FAQ Schema
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

// Generate Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
  };
}

// Generate HowTo Schema for homepage
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Find Pest Control in Sydney',
    'description': 'Step-by-step guide to finding EPA-verified pest control operators in Sydney',
    'totalTime': 'PT5M',
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Search Your Suburb',
        'text': 'Enter your suburb or postcode to find licensed pest control operators serving your area.',
        'url': `${siteConfig.url}/#search`
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Compare & Choose',
        'text': 'Review operator profiles, check EPA licenses, read verified reviews, and compare pricing.',
        'url': `${siteConfig.url}/operators`
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Get Free Quotes',
        'text': 'Request free, no-obligation quotes from up to 3 operators. Choose the best fit for your needs.',
        'url': `${siteConfig.url}/quote`
      }
    ]
  };
}

// Generate ItemList Schema for suburb pages with AggregateRating
export function generateItemListSchema(operators, suburb) {
  // Calculate aggregate stats across all operators
  const totalReviews = operators.reduce((sum, op) => sum + (op.reviewCount || 0), 0);
  const avgRating = operators.length > 0
    ? (operators.reduce((sum, op) => sum + (op.rating || 0), 0) / operators.length).toFixed(1)
    : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/pest-control/${suburb.slug}#itemlist`,
    name: `Pest Control Services in ${suburb.name}`,
    description: `${operators.length} licensed pest control operators serving ${suburb.name}, ${suburb.postcode}. Average rating: ${avgRating}/5 from ${totalReviews} reviews.`,
    url: `${siteConfig.url}/pest-control/${suburb.slug}`,
    numberOfItems: operators.length,
    // Aggregate rating for the entire list
    aggregateRating: totalReviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: '5',
      worstRating: '1',
      itemReviewed: {
        '@type': 'Service',
        name: `Pest Control in ${suburb.name}`,
        description: `Professional pest control services in ${suburb.name}, ${suburb.region}`,
      }
    } : undefined,
    itemListElement: operators.map((operator, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/operator/${operator.slug}`,
      item: {
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}/operator/${operator.slug}`,
        name: operator.businessName,
        description: operator.description,
        telephone: operator.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: suburb.name,
          postalCode: suburb.postcode,
          addressRegion: 'NSW',
          addressCountry: 'AU',
        },
        aggregateRating: operator.reviewCount > 0 ? {
          '@type': 'AggregateRating',
          ratingValue: operator.rating,
          reviewCount: operator.reviewCount,
          bestRating: '5',
          worstRating: '1',
        } : undefined,
        priceRange: '$$',
      },
    })),
  };
}

// Generate Blog Article Schema
export function generateBlogArticleSchema(post) {
  const {
    title,
    slug,
    excerpt,
    content,
    author_name,
    author_role,
    author_linkedin,
    reviewer_name,
    reviewer_license,
    reviewer_role,
    published_at,
    updated_at,
    reading_time_minutes,
    word_count,
    category,
    tags = [],
    sources = [],
    faqs = [],
  } = post;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteConfig.url}/blog/${slug}#article`,
    headline: title,
    description: excerpt,
    image: post.featured_image || `${siteConfig.url}/og-image.jpg`,
    datePublished: published_at,
    dateModified: updated_at || published_at,
    wordCount: word_count,
    articleSection: category,
    keywords: tags.join(', '),
    author: {
      '@type': 'Person',
      name: author_name || 'Pest Arrest Editorial Team',
      jobTitle: author_role || 'Content Team',
      url: author_linkedin || undefined,
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${slug}`,
    },
    isAccessibleForFree: true,
    inLanguage: 'en-AU',
  };

  // Add reviewer if present
  if (reviewer_name) {
    schema.reviewedBy = {
      '@type': 'Person',
      name: reviewer_name,
      jobTitle: reviewer_role || 'EPA Licensed Pest Controller',
      hasCredential: reviewer_license ? {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'NSW EPA Pest Management License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'NSW Environment Protection Authority',
          url: 'https://www.epa.nsw.gov.au',
        },
      } : undefined,
    };
  }

  // Add citations if sources present
  if (sources.length > 0) {
    schema.citation = sources.map(source => ({
      '@type': 'CreativeWork',
      name: source.title,
      url: source.url,
      publisher: source.publisher,
      datePublished: source.date,
    }));
  }

  return schema;
}

// Generate FAQ Schema for blog posts
export function generateBlogFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate HowTo Schema for blog posts
export function generateBlogHowToSchema(post) {
  if (!post.how_to_steps || post.how_to_steps.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.excerpt,
    totalTime: `PT${post.reading_time_minutes || 10}M`,
    step: post.how_to_steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      url: `${siteConfig.url}/blog/${post.slug}#step-${index + 1}`,
    })),
  };
}

// Generate AggregateRating schema for service list pages
export function generateServiceListSchema(operators, service) {
  const totalReviews = operators.reduce((sum, op) => sum + (op.reviewCount || 0), 0);
  const avgRating = operators.length > 0
    ? (operators.reduce((sum, op) => sum + (op.rating || 0), 0) / operators.length).toFixed(1)
    : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/services/${service.slug}#service`,
    name: `${service.name} Sydney`,
    description: service.longDescription || service.description,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'City',
      name: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    aggregateRating: totalReviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: service.priceRange?.split('-')[0]?.replace(/[^0-9]/g, '') || '100',
      highPrice: service.priceRange?.split('-')[1]?.replace(/[^0-9]/g, '') || '500',
      offerCount: operators.length,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Providers`,
      itemListElement: operators.slice(0, 10).map((operator, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: `${service.name} by ${operator.businessName}`,
          provider: {
            '@type': 'LocalBusiness',
            name: operator.businessName,
            url: `${siteConfig.url}/operator/${operator.slug}`,
          },
        },
      })),
    },
  };
}
