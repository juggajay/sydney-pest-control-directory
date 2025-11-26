import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, Shield, Star, Clock, Phone, ChevronRight, 
  Bug, CheckCircle, AlertTriangle, Calendar, ArrowRight,
  Home, Building, Thermometer
} from 'lucide-react';
import { 
  suburbs, 
  services, 
  getSuburbBySlug, 
  getOperatorsForSuburb,
  getReviewsForOperator 
} from '../../../lib/data';
import { 
  generateMetadata as genMeta, 
  generateItemListSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  siteConfig 
} from '../../../lib/seo';

// Generate static params for all suburbs
export async function generateStaticParams() {
  return suburbs.map((suburb) => ({
    suburb: suburb.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const suburb = getSuburbBySlug(params.suburb);
  
  if (!suburb) {
    return { title: 'Suburb Not Found' };
  }

  const operators = getOperatorsForSuburb(suburb.slug);
  
  return genMeta({
    title: `Pest Control ${suburb.name} - ${operators.length} Licensed Operators`,
    description: `Find licensed pest control in ${suburb.name} ${suburb.postcode}. Compare ${operators.length}+ EPA-verified operators. ${suburb.commonPests.slice(0, 3).join(', ')} treatment. Get free quotes today!`,
    path: `/pest-control/${suburb.slug}`,
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

// Operator Card Component
function OperatorCard({ operator, suburb }) {
  return (
    <div className={`card p-6 ${operator.featured ? 'card-premium' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-heading font-semibold text-lg text-neutral-900">
              {operator.businessName}
            </h3>
            {operator.badges.includes('epa-verified') && (
              <span className="badge badge-verified">
                <Shield className="w-3 h-3" />
                EPA Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm flex-wrap">
            <div className="flex items-center gap-1">
              <StarRating rating={operator.rating} />
              <span className="text-neutral-600 ml-1">{operator.rating}</span>
            </div>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-600">{operator.reviewCount} reviews</span>
            {operator.featured && (
              <>
                <span className="text-neutral-400">•</span>
                <span className="badge badge-accent text-xs">Featured</span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
        {operator.description}
      </p>

      {/* Services offered */}
      <div className="flex flex-wrap gap-2 mb-4">
        {operator.services.slice(0, 4).map((serviceSlug) => {
          const service = services.find(s => s.slug === serviceSlug);
          return service ? (
            <span key={serviceSlug} className="px-2 py-1 bg-primary-50 rounded-md text-xs text-primary-700">
              {service.shortName}
            </span>
          ) : null;
        })}
        {operator.services.length > 4 && (
          <span className="px-2 py-1 bg-neutral-100 rounded-md text-xs text-neutral-600">
            +{operator.services.length - 4} more
          </span>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {operator.badges.includes('same-day-service') && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
            <Clock className="w-3 h-3" />
            Same Day Service
          </span>
        )}
        {operator.badges.includes('response-guarantee') && (
          <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
            <CheckCircle className="w-3 h-3" />
            2hr Response
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Clock className="w-4 h-4" />
            <span>{operator.yearsInBusiness}+ yrs</span>
          </div>
          <a 
            href={`tel:${operator.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
        <Link
          href={`/operator/${operator.slug}`}
          className="btn btn-sm btn-primary"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

// Pest Info Card
function PestCard({ pest }) {
  const pestInfo = {
    cockroaches: { icon: Bug, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Common in Sydney kitchens and bathrooms' },
    termites: { icon: Home, color: 'text-red-600', bg: 'bg-red-50', desc: 'Major threat to timber structures' },
    rodents: { icon: Bug, color: 'text-neutral-600', bg: 'bg-neutral-100', desc: 'Health hazard and property damage' },
    ants: { icon: Bug, color: 'text-amber-700', bg: 'bg-amber-50', desc: 'Trail into homes seeking food' },
    spiders: { icon: Bug, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Including dangerous species' },
    'bed-bugs': { icon: Bug, color: 'text-rose-600', bg: 'bg-rose-50', desc: 'Spreading in high-density areas' },
    possums: { icon: Bug, color: 'text-green-600', bg: 'bg-green-50', desc: 'Protected species, humane removal' },
    mosquitoes: { icon: Bug, color: 'text-sky-600', bg: 'bg-sky-50', desc: 'Common near water sources' },
    birds: { icon: Bug, color: 'text-slate-600', bg: 'bg-slate-50', desc: 'Pigeons and pest birds' },
  };
  
  const info = pestInfo[pest] || { icon: Bug, color: 'text-neutral-600', bg: 'bg-neutral-50', desc: 'Common household pest' };
  const Icon = info.icon;
  
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${info.bg}`}>
      <Icon className={`w-5 h-5 ${info.color}`} />
      <div>
        <span className="font-medium text-neutral-900 capitalize">{pest.replace('-', ' ')}</span>
        <p className="text-xs text-neutral-600">{info.desc}</p>
      </div>
    </div>
  );
}

export default function SuburbPage({ params }) {
  const suburb = getSuburbBySlug(params.suburb);
  
  if (!suburb) {
    notFound();
  }

  const operators = getOperatorsForSuburb(suburb.slug);
  const featuredOperators = operators.filter(o => o.featured);
  const regularOperators = operators.filter(o => !o.featured);
  const sortedOperators = [...featuredOperators, ...regularOperators];

  // Schema data
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: suburb.region, path: `/locations/${suburb.region.toLowerCase().replace(/\s+/g, '-')}` },
    { name: suburb.name, path: `/pest-control/${suburb.slug}` },
  ];

  const faqData = [
    {
      question: `How much does pest control cost in ${suburb.name}?`,
      answer: `General pest control in ${suburb.name} typically costs $150-$350 for a standard home. Termite inspections range from $250-$500. Prices may vary based on property size and pest type.`,
    },
    {
      question: `What are the most common pests in ${suburb.name}?`,
      answer: `The most common pests in ${suburb.name} include ${suburb.commonPests.join(', ')}. ${suburb.description}`,
    },
    {
      question: `How do I find a licensed pest controller in ${suburb.name}?`,
      answer: `All pest controllers listed on our directory for ${suburb.name} are verified against the NSW EPA register. Look for the "EPA Verified" badge to ensure you're hiring a licensed professional.`,
    },
  ];

  const itemListSchema = generateItemListSchema(sortedOperators, suburb);
  const faqSchema = generateFAQSchema(faqData);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white/70 text-sm">{suburb.region}</span>
                  <span className="text-white/50 mx-2">•</span>
                  <span className="text-white/70 text-sm">{suburb.postcode}</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                Pest Control in {suburb.name}
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl">
                Compare {operators.length} licensed pest control operators serving {suburb.name}. 
                All operators are EPA verified.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="card p-4 text-center">
                <div className="text-3xl font-bold text-primary-600">{operators.length}</div>
                <div className="text-sm text-neutral-600">Operators</div>
              </div>
              <div className="card p-4 text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-accent-500">
                  4.7 <Star className="w-5 h-5 fill-accent-400" />
                </div>
                <div className="text-sm text-neutral-600">Avg Rating</div>
              </div>
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
            {/* Operators List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-neutral-900">
                  Pest Controllers in {suburb.name}
                </h2>
                <span className="text-sm text-neutral-500">{operators.length} results</span>
              </div>

              {sortedOperators.length > 0 ? (
                <div className="space-y-4">
                  {sortedOperators.map((operator) => (
                    <OperatorCard key={operator.id} operator={operator} suburb={suburb} />
                  ))}
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No operators found in {suburb.name}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    We're still building our network in this area. Try searching a nearby suburb or request quotes from operators serving the broader region.
                  </p>
                  <Link href="/quote" className="btn btn-primary">
                    Request Quotes
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Quote CTA */}
              <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">Get Free Quotes</h3>
                <p className="text-white/80 text-sm mb-4">
                  Describe your pest problem and receive quotes from up to 3 operators in {suburb.name}.
                </p>
                <Link href={`/quote?suburb=${suburb.slug}`} className="btn bg-white text-primary-600 hover:bg-neutral-100 w-full">
                  Request Quotes
                </Link>
              </div>

              {/* Common Pests */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                  Common Pests in {suburb.name}
                </h3>
                <div className="space-y-3">
                  {suburb.commonPests.map((pest) => (
                    <PestCard key={pest} pest={pest} />
                  ))}
                </div>
              </div>

              {/* Area Info */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                  About {suburb.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {suburb.description}
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Postcode</span>
                    <span className="font-medium text-neutral-900">{suburb.postcode}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Region</span>
                    <span className="font-medium text-neutral-900">{suburb.region}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-neutral-500">Population</span>
                    <span className="font-medium text-neutral-900">{suburb.population?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions About Pest Control in {suburb.name}
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

      {/* Nearby Suburbs */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-8">
            Nearby Suburbs
          </h2>
          <div className="flex flex-wrap gap-3">
            {suburbs
              .filter(s => s.region === suburb.region && s.slug !== suburb.slug)
              .slice(0, 12)
              .map((nearbySuburb) => (
                <Link
                  key={nearbySuburb.slug}
                  href={`/pest-control/${nearbySuburb.slug}`}
                  className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300 hover:text-primary-600 transition-colors"
                >
                  {nearbySuburb.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Need Pest Control in {suburb.name}?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get free quotes from licensed operators today. No obligation, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?suburb=${suburb.slug}`} className="btn btn-accent btn-lg gap-2 w-full sm:w-auto">
              Get Free Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:1300737834" className="btn btn-lg bg-white/10 text-white hover:bg-white/20 gap-2 w-full sm:w-auto">
              <Phone className="w-5 h-5" />
              1300 PEST FIND
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
