import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin, Shield, Star, Clock, ChevronRight,
  Bug, CheckCircle, AlertCircle, Calendar, ArrowRight,
  DollarSign, Repeat, Users, Search
} from 'lucide-react';
import {
  services,
  suburbs,
  operators,
  getServiceBySlug,
  getOperatorsByService
} from '../../../lib/data';
import {
  generateMetadata as genMeta,
  generateServiceSchema,
  generateServiceListSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  siteConfig
} from '../../../lib/seo';

// Blog post mapping for related articles by service
const serviceBlogMapping = {
  'termite-inspection': [
    { slug: 'how-to-identify-termites-sydney', title: 'How to Identify Termites in Your Sydney Home', excerpt: 'Learn to spot the early warning signs of termite infestation. Our expert guide covers mud tubes, timber damage, swarmers, and when to call a professional.' },
    { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does pest control cost in Sydney? See real pricing for termite inspections, treatments, and more.' },
  ],
  'termite-treatment': [
    { slug: 'how-to-identify-termites-sydney', title: 'How to Identify Termites in Your Sydney Home', excerpt: 'Learn to spot the early warning signs of termite infestation. Our expert guide covers mud tubes, timber damage, swarmers, and when to call a professional.' },
    { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does pest control cost in Sydney? See real pricing for termite inspections, treatments, and more.' },
  ],
  'general-pest-control': [
    { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does pest control cost in Sydney? Our comprehensive guide covers pricing for all services.' },
    { slug: 'spring-pest-prevention-checklist-sydney', title: 'Spring Pest Prevention Checklist for Sydney Homeowners', excerpt: 'Spring is peak pest season in Sydney. Our expert checklist covers termite swarm prevention, cockroach control, spider management, and rodent exclusion.' },
  ],
  'cockroach-control': [
    { slug: 'cockroach-infestation-identification-treatment-sydney', title: 'Cockroach Infestation: Identification & Treatment Sydney', excerpt: 'Learn to identify different cockroach species and discover effective treatment options from EPA-licensed experts.' },
    { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does cockroach treatment cost in Sydney? See real pricing based on 1,000+ quotes.' },
  ],
  'rodent-control': [
    { slug: 'signs-rodents-in-roof-sydney', title: 'Signs You Have Rodents in Your Roof Sydney', excerpt: 'Hearing scratching in your ceiling? Learn how to identify rats vs possums, understand the health risks, and discover effective solutions.' },
    { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does rodent control cost in Sydney? See real pricing for rat and mouse treatments.' },
  ],
  'spider-control': [
    { slug: 'spring-pest-prevention-checklist-sydney', title: 'Spring Pest Prevention Checklist for Sydney Homeowners', excerpt: 'Spring triggers spider mating season. Learn how to reduce spider habitat and when to call a professional.' },
    { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does spider control cost in Sydney? See real pricing from EPA-licensed operators.' },
  ],
};

// Default blog posts for services without specific mapping
const defaultBlogPosts = [
  { slug: 'pest-control-cost-sydney-pricing-guide', title: 'Pest Control Cost Sydney 2025: Complete Pricing Guide', excerpt: 'How much does pest control cost in Sydney? Our comprehensive guide covers pricing for all services.' },
  { slug: 'spring-pest-prevention-checklist-sydney', title: 'Spring Pest Prevention Checklist for Sydney Homeowners', excerpt: 'Spring is peak pest season in Sydney. Our expert checklist covers prevention tips for all common pests.' },
];

function getRelatedBlogPosts(serviceSlug) {
  return serviceBlogMapping[serviceSlug] || defaultBlogPosts;
}

// Generate static params for all services
export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug || service.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const serviceOperators = getOperatorsByService(service.slug || service.id);
  
  return genMeta({
    title: `${service.name} Services Sydney | Local Operators from ${service.priceRange}`,
    description: `Professional ${service.name.toLowerCase()} services across Sydney from ${service.priceRange}. Compare ${serviceOperators.length}+ local operators. Free same-day quotes, 4.8★ customer rating.`,
    path: `/services/${service.slug}`,
  });
}

// Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-accent-400 fill-accent-400' : 'text-neutral-200'
          }`}
        />
      ))}
    </div>
  );
}

// Operator Card
function OperatorCard({ operator }) {
  return (
    <Link href={`/operator/${operator.slug}`} className="card p-5 group hover:border-primary-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-heading font-semibold text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
              {operator.businessName}
            </h4>
            {(operator.features?.includes('epa-verified') || operator.epaVerified) && (
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <StarRating rating={operator.rating} />
            <span className="text-neutral-600">{operator.rating}</span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500">{operator.reviewCount} reviews</span>
          </div>
          <p className="text-sm text-neutral-600 line-clamp-2">{operator.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  const serviceOperators = getOperatorsByService(service.slug || service.id);

  // Schema data
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  // Service-specific FAQs
  const faqData = [
    {
      question: `How much does ${service.name.toLowerCase()} cost in Sydney?`,
      answer: `${service.name} in Sydney typically costs ${service.priceRange}. Prices vary based on property size, severity of infestation, and specific treatment requirements. We recommend getting multiple quotes to compare.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} treatment take?`,
      answer: `Most ${service.name.toLowerCase()} treatments take 1-3 hours depending on property size and the extent of the infestation. Your technician will provide a specific timeframe during the initial inspection.`,
    },
    {
      question: `Is ${service.name.toLowerCase()} safe for pets and children?`,
      answer: `Modern ${service.name.toLowerCase()} treatments are designed to be safe when applied by licensed professionals. Most treatments require you to vacate for 2-4 hours. Always inform your technician about pets, children, or sensitivities.`,
    },
    {
      question: `How often should I get ${service.name.toLowerCase()} treatment?`,
      answer: `${service.frequency}. However, if you notice signs of re-infestation, contact your pest controller immediately. Many operators offer ongoing maintenance plans for continuous protection.`,
    },
  ];

  const serviceSchema = generateServiceSchema(service);
  const serviceListSchema = generateServiceListSchema(serviceOperators, service);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      {/* Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 hero-gradient hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                {index < breadcrumbs.length - 1 ? (
                  <Link href={crumb.path} className="hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Bug className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                {service.name} Services in Sydney
              </h1>
              
              <p className="text-xl text-white/80 mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                  <DollarSign className="w-5 h-5 text-accent-400" />
                  <span className="text-white font-semibold">{service.priceRange}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                  <Repeat className="w-5 h-5 text-white/70" />
                  <span className="text-white/90">{service.frequency}</span>
                </div>
                {serviceOperators.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                    <Users className="w-5 h-5 text-white/70" />
                    <span className="text-white/90">{serviceOperators.length} Operators</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/quote?service=${service.slug}`}
                className="btn btn-accent btn-lg gap-2"
              >
                Get Free Quotes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30Q1200 0 720 30Q240 60 0 30L0 60Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About This Service */}
              <div className="card p-8">
                <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                  About {service.name}
                </h2>
                <div className="prose-custom">
                  <p>{service.longDescription}</p>
                </div>

                {/* Common Pests */}
                <div className="mt-8">
                  <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                    Pests Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.commonPests.map((pest) => (
                      <span
                        key={pest}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700"
                      >
                        <Bug className="w-4 h-4" />
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Operators - Only show if operators exist */}
              {serviceOperators.length > 0 && (
                <div>
                  <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
                    Operators Offering {service.name}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {serviceOperators.map((operator) => (
                      <OperatorCard key={operator.id} operator={operator} />
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              <div className="card p-8">
                <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                  Related Articles
                </h2>
                <div className="space-y-4">
                  {getRelatedBlogPosts(service.slug || service.id).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                        <Bug className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-neutral-600 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6" aria-label="Service details and pricing">
              {/* Pricing Card */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                  Pricing Guide
                </h3>
                <div className="text-center py-4 mb-4 bg-primary-50 rounded-xl">
                  <div className="text-3xl font-bold text-primary-600">{service.priceRange}</div>
                  <div className="text-sm text-neutral-500">Typical price range</div>
                </div>
                <p className="text-sm text-neutral-600 mb-4">
                  Prices vary based on property size, severity of infestation, and specific treatment requirements. Always get multiple quotes to compare.
                </p>
                <Link
                  href={`/quote?service=${service.slug}`}
                  className="btn btn-primary w-full"
                >
                  Get Free Quotes
                </Link>
              </div>

              {/* Service Details */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                  Service Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Repeat className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">Frequency</div>
                      <div className="text-sm text-neutral-500">{service.frequency}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">Verification Available</div>
                      <div className="text-sm text-neutral-500">Look for the Verified badge</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">Free Quotes</div>
                      <div className="text-sm text-neutral-500">No obligation to book</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Locations */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                  Popular Locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suburbs.slice(0, 10).map((suburb) => (
                    <Link
                      key={suburb.id || suburb.slug}
                      href={`/pest-control/${suburb.id || suburb.slug}`}
                      className="px-3 py-1.5 rounded-full text-sm bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      {suburb.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                  Related Services
                </h3>
                <div className="space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 5)
                    .map((relatedService) => (
                      <Link
                        key={relatedService.slug}
                        href={`/services/${relatedService.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <span className="text-neutral-700">{relatedService.name}</span>
                        <span className="text-sm text-primary-600">{relatedService.priceRange}</span>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions About {service.name}
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <details key={index} className="group card p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-heading font-semibold text-neutral-900 pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <p className="mt-4 text-neutral-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Need {service.name}?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get free quotes from licensed pest control operators today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?service=${service.slug}`} className="btn btn-accent btn-lg gap-2 w-full sm:w-auto">
              Get Free Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/operators" className="btn btn-lg bg-white/10 text-white hover:bg-white/20 gap-2 w-full sm:w-auto">
              <Search className="w-5 h-5" />
              Find Operators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
