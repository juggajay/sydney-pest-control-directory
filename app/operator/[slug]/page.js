import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, Shield, Star, Clock, Phone, ChevronRight, 
  Bug, CheckCircle, Globe, Mail, Calendar, Award,
  ArrowRight, ExternalLink, MessageSquare, Zap
} from 'lucide-react';
import { 
  operators, 
  services, 
  suburbs,
  getOperatorBySlug,
  getReviewsForOperator 
} from '../../../lib/data';
import { 
  generateMetadata as genMeta, 
  generateOperatorSchema,
  generateBreadcrumbSchema,
  siteConfig 
} from '../../../lib/seo';

// Generate static params for all operators
export async function generateStaticParams() {
  return operators.map((operator) => ({
    slug: operator.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const operator = getOperatorBySlug(params.slug);
  
  if (!operator) {
    return { title: 'Operator Not Found' };
  }

  const reviews = getReviewsForOperator(operator.id);
  
  return genMeta({
    title: `${operator.businessName} - EPA Licensed Pest Control`,
    description: `${operator.description} ★ ${operator.rating}/5 (${operator.reviewCount} reviews). EPA License: ${operator.licenseNumber}. Serving ${operator.serviceAreas.length} Sydney suburbs.`,
    path: `/operator/${operator.slug}`,
  });
}

// Star Rating Component
function StarRating({ rating, size = 'md' }) {
  const sizeClass = size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating ? 'text-accent-400 fill-accent-400' : 'text-neutral-200'
          }`}
        />
      ))}
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="font-semibold text-primary-600">{review.author.charAt(0)}</span>
          </div>
          <div>
            <div className="font-medium text-neutral-900">{review.author}</div>
            <div className="text-sm text-neutral-500">{review.suburb}</div>
          </div>
        </div>
        <div className="text-sm text-neutral-400">{review.date}</div>
      </div>
      <div className="mb-3">
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-neutral-600">{review.text}</p>
    </div>
  );
}

export default function OperatorPage({ params }) {
  const operator = getOperatorBySlug(params.slug);
  
  if (!operator) {
    notFound();
  }

  const reviews = getReviewsForOperator(operator.id);
  const operatorServices = operator.services.map(slug => services.find(s => s.slug === slug)).filter(Boolean);
  const serviceAreas = operator.serviceAreas.map(slug => suburbs.find(s => s.slug === slug)).filter(Boolean);

  // Schema data
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Operators', path: '/operators' },
    { name: operator.businessName, path: `/operator/${operator.slug}` },
  ];

  const operatorSchema = generateOperatorSchema(operator, reviews);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(operatorSchema) }}
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

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Business Name & Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {operator.badges.includes('epa-verified') && (
                  <span className="badge bg-emerald-500/20 text-emerald-100 border border-emerald-400/30">
                    <Shield className="w-3 h-3" />
                    EPA Verified
                  </span>
                )}
                {operator.featured && (
                  <span className="badge bg-accent-500/20 text-accent-200 border border-accent-400/30">
                    <Award className="w-3 h-3" />
                    Featured
                  </span>
                )}
                {operator.badges.includes('same-day-service') && (
                  <span className="badge bg-white/10 text-white/80 border border-white/20">
                    <Zap className="w-3 h-3" />
                    Same Day Service
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                {operator.businessName}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <StarRating rating={operator.rating} size="lg" />
                  <span className="text-2xl font-bold text-white">{operator.rating}</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-white/80">{operator.reviewCount} reviews</span>
                <span className="text-white/60">•</span>
                <span className="text-white/80">{operator.yearsInBusiness}+ years in business</span>
              </div>

              <p className="text-xl text-white/80 max-w-2xl mb-8">
                {operator.description}
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${operator.phone.replace(/\s/g, '')}`}
                  className="btn btn-accent btn-lg gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {operator.phone}
                </a>
                <Link
                  href={`/quote?operator=${operator.slug}`}
                  className="btn btn-lg bg-white text-primary-600 hover:bg-neutral-100 gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Request Quote
                </Link>
              </div>
            </div>

            {/* License Card */}
            <div className="lg:w-80">
              <div className="card p-6 bg-white/95 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">EPA Licensed</div>
                    <div className="text-sm text-neutral-500">Verified Operator</div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">License Number</span>
                    <span className="font-mono font-medium text-neutral-900">{operator.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">License Type</span>
                    <span className="font-medium text-neutral-900">{operator.licenseType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Status</span>
                    <span className="badge badge-success">{operator.licenseStatus}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Expiry</span>
                    <span className="font-medium text-neutral-900">{operator.licenseExpiry}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-500">Last Verified</span>
                    <span className="text-neutral-600">{operator.verifiedAt}</span>
                  </div>
                </div>

                <a
                  href="https://apps.epa.nsw.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-4 text-sm text-primary-600 hover:text-primary-700"
                >
                  Verify on EPA Website
                  <ExternalLink className="w-4 h-4" />
                </a>
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
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Services */}
              <div className="card p-6">
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
              </div>

              {/* Service Areas */}
              <div className="card p-6">
                <h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">Service Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((suburb) => (
                    <Link
                      key={suburb.slug}
                      href={`/pest-control/${suburb.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors text-sm"
                    >
                      <MapPin className="w-3 h-3" />
                      {suburb.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-bold text-neutral-900">Customer Reviews</h2>
                  <div className="flex items-center gap-2">
                    <StarRating rating={operator.rating} />
                    <span className="font-semibold text-neutral-900">{operator.rating}</span>
                    <span className="text-neutral-500">({operator.reviewCount})</span>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500">No reviews yet. Be the first to leave a review!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${operator.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{operator.phone}</span>
                  </a>
                  
                  {operator.email && (
                    <a
                      href={`mailto:${operator.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">{operator.email}</span>
                    </a>
                  )}
                  
                  {operator.website && (
                    <a
                      href={operator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span className="text-sm">Visit Website</span>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Working Hours</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(operator.workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                      <span className="text-neutral-500 capitalize">{day}</span>
                      <span className={`font-medium ${hours === 'Closed' ? 'text-neutral-400' : 'text-neutral-900'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">{operator.yearsInBusiness}+ Years</div>
                      <div className="text-sm text-neutral-500">In Business</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">{operator.reviewCount} Reviews</div>
                      <div className="text-sm text-neutral-500">{operator.rating} Average Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">{operator.serviceAreas.length} Suburbs</div>
                      <div className="text-sm text-neutral-500">Service Coverage</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">Need a Quote?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get a free, no-obligation quote from {operator.businessName}.
                </p>
                <Link 
                  href={`/quote?operator=${operator.slug}`}
                  className="btn bg-white text-primary-600 hover:bg-neutral-100 w-full"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Looking for More Options?
          </h2>
          <p className="text-neutral-600 mb-8">
            Compare quotes from other licensed pest control operators in your area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/operators" className="btn btn-primary btn-lg">
              View All Operators
            </Link>
            <Link href="/quote" className="btn btn-secondary btn-lg">
              Get Multiple Quotes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
