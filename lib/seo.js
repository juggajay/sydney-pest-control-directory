// SEO Configuration and Utilities

export const siteConfig = {
  name: 'Sydney Pest Control Directory',
  shortName: 'PestFind Sydney',
  description: 'Find licensed pest control services near you. Compare quotes from EPA-verified pest controllers across Sydney.',
  url: 'https://sydneypestcontrol.com.au',
  ogImage: '/og-image.jpg',
  phone: '1300 PEST FIND',
  email: 'hello@sydneypestcontrol.com.au',
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

// Generate LocalBusiness Schema for operators
export function generateOperatorSchema(operator, reviews = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/operator/${operator.slug}`,
    name: operator.businessName,
    description: operator.description,
    url: operator.website,
    telephone: operator.phone,
    email: operator.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: operator.address,
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.8688,
      longitude: 151.2093,
    },
    aggregateRating: operator.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: operator.rating,
      reviewCount: operator.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: reviews.map(r => ({
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
    })),
    priceRange: '$$',
    openingHoursSpecification: operator.operatingHours ? Object.entries(operator.operatingHours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hours.includes('Closed') ? undefined : hours.split(' - ')[0],
      closes: hours.includes('Closed') ? undefined : hours.split(' - ')[1],
    })).filter(h => h.opens) : [],
    sameAs: operator.website ? [operator.website] : [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pest Control Services',
      itemListElement: operator.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        },
        position: index + 1,
      })),
    },
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

// Generate ItemList Schema for suburb pages
export function generateItemListSchema(operators, suburb) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Pest Control Services in ${suburb.name}`,
    description: `Licensed pest control operators serving ${suburb.name}, ${suburb.postcode}`,
    numberOfItems: operators.length,
    itemListElement: operators.map((operator, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LocalBusiness',
        name: operator.businessName,
        description: operator.description,
        telephone: operator.phone,
        aggregateRating: operator.reviewCount > 0 ? {
          '@type': 'AggregateRating',
          ratingValue: operator.rating,
          reviewCount: operator.reviewCount,
        } : undefined,
      },
    })),
  };
}
