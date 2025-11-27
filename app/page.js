import Link from 'next/link';
import {
  Search, MapPin, Shield, Star, Clock, Phone, ChevronRight,
  Bug, CheckCircle, Users, Award, Zap, ArrowRight, Building,
  Home, TreeDeciduous, Waves
} from 'lucide-react';
import { suburbs, services, getFeaturedOperators, getRegions } from '../lib/data';
import { generateHowToSchema } from '../lib/seo';
import SearchBox from '../components/SearchBox';

// Star Rating Component
function StarRating({ rating, size = 'sm' }) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses} ${
            star <= rating ? 'text-accent-400 fill-accent-400' : 'text-neutral-200'
          }`}
        />
      ))}
    </div>
  );
}

// Operator Card Component
function OperatorCard({ operator, featured = false }) {
  return (
    <div className={`card p-6 ${featured ? 'card-premium' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-heading font-semibold text-lg text-neutral-900">
              {operator.businessName}
            </h4>
            {operator.features?.includes('epa-verified') && (
              <span className="badge badge-verified">
                <Shield className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <StarRating rating={operator.rating} />
              <span className="text-neutral-600 ml-1">{operator.rating}</span>
            </div>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-600">{operator.reviewCount} reviews</span>
          </div>
        </div>
        {featured && (
          <span className="badge badge-accent">Featured</span>
        )}
      </div>

      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
        {operator.description || operator.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {operator.services?.slice(0, 3).map((service, i) => (
          <span key={i} className="px-2.5 py-1 bg-primary-50 border border-primary-100 rounded-lg text-xs font-medium text-primary-700 capitalize">
            {service.replace(/-/g, ' ')}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Clock className="w-4 h-4" />
          <span>{operator.yearsInBusiness}+ years</span>
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

// Service Card Component
function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.id || service.slug}`}
      className="card p-6 group hover:border-primary-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-emerald-50 border border-primary-100 flex items-center justify-center mb-4 group-hover:from-primary-100 group-hover:to-emerald-100 group-hover:border-primary-200 transition-all group-hover:scale-105">
        <Bug className="w-7 h-7 text-primary-600" />
      </div>
      <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
        {service.name}
      </h4>
      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
        {service.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-lg font-bold text-primary-600">{service.priceRange}</span>
        <span className="flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-primary-700">
          Learn more
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

// Region Card Component
function RegionCard({ region, icon: Icon, suburbCount, regionSuburbs }) {
  return (
    <div className="card p-6 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-emerald-50 border border-primary-100 flex items-center justify-center group-hover:from-primary-100 group-hover:to-emerald-100 transition-colors">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg text-neutral-900">{region}</h4>
          <span className="text-sm text-neutral-500">{suburbCount} suburbs covered</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {regionSuburbs.slice(0, 4).map((suburb) => (
          <Link
            key={suburb.id || suburb.slug}
            href={`/pest-control/${suburb.id || suburb.slug}`}
            className="px-3 py-1.5 rounded-full text-sm bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all"
          >
            {suburb.name}
          </Link>
        ))}
        <Link
          href={`/locations/${region.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-3 py-1.5 rounded-full text-sm text-primary-600 hover:text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
        >
          View all →
        </Link>
      </div>
    </div>
  );
}

// FAQ data for schema and display
const faqData = [
  {
    question: 'How much does pest control cost in Sydney?',
    answer: 'General pest control in Sydney typically costs $150-$350 for a standard 3-4 bedroom home. Termite inspections range from $250-$500, while termite treatments can cost $2,000-$5,000+ depending on the property size and treatment method required. Factors affecting price include property size, pest type, severity of infestation, and whether it\'s a one-time treatment or ongoing service plan.',
  },
  {
    question: 'Are all operators on this site licensed?',
    answer: 'Yes, all operators listed on our platform are verified against the NSW EPA pesticide license register. We verify each operator\'s license status before they can appear in our directory, and continuously monitor for any changes. Look for the "EPA Verified" badge on operator profiles to confirm their license is current and valid.',
  },
  {
    question: 'How do I get a quote for pest control?',
    answer: 'Simply enter your suburb to find operators in your area. You can request quotes directly through operator profiles, or use our quote request form to receive quotes from up to 3 operators at once. All quotes are free and no-obligation. Most operators respond within 2 hours during business hours.',
  },
  {
    question: 'What should I look for when choosing a pest controller?',
    answer: 'Look for the EPA Verified badge, read customer reviews, check their years of experience, and ensure they offer the specific service you need. We also recommend getting multiple quotes to compare pricing and service inclusions. Ask about warranties, what chemicals they use, and whether they offer ongoing maintenance plans.',
  },
  {
    question: 'How long does pest control treatment last?',
    answer: 'The effectiveness of pest control treatment varies by pest type and treatment method. General pest control typically provides protection for 3-6 months. Termite barriers can last 5-8 years. For best results, most professionals recommend annual pest inspections and treatments 2-3 times per year for ongoing protection.',
  },
  {
    question: 'Is pest control safe for pets and children?',
    answer: 'Modern pest control treatments are designed to be safe when applied correctly by licensed professionals. Most treatments require you to vacate the property for 2-4 hours and keep pets away from treated areas until dry. Always inform your pest controller about pets, children, or anyone with sensitivities so they can use appropriate products.',
  },
  {
    question: 'Do I need to prepare my home before pest control?',
    answer: 'Yes, basic preparation helps ensure effective treatment. This typically includes: clearing items away from walls and under sinks, covering or removing food and pet bowls, vacuuming floors, and providing access to all rooms including roof spaces. Your pest controller will provide specific instructions based on the treatment type.',
  },
  {
    question: 'What is the best time of year for pest control in Sydney?',
    answer: 'Spring (September-November) is ideal for preventative treatments before summer pest activity peaks. However, pest control can be done year-round. Summer brings more cockroaches, ants, and termites. Winter sees increased rodent activity as they seek shelter indoors. Regular treatments every 3-4 months provide the best year-round protection.',
  },
];

// Generate FAQ Schema for SEO
function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function HomePage() {
  const featuredOperators = getFeaturedOperators().slice(0, 3);
  const topServices = services.slice(0, 6);
  const faqSchema = generateFAQSchema();
  const howToSchema = generateHowToSchema();

  const regions = [
    { name: 'Eastern Suburbs', icon: Waves, suburbs: suburbs.filter(s => s.region === 'Eastern Suburbs') },
    { name: 'Inner West', icon: Building, suburbs: suburbs.filter(s => s.region === 'Inner West') },
    { name: 'Lower North Shore', icon: TreeDeciduous, suburbs: suburbs.filter(s => s.region === 'Lower North Shore') },
    { name: 'Northern Beaches', icon: Waves, suburbs: suburbs.filter(s => s.region === 'Northern Beaches') },
    { name: 'Western Sydney', icon: Home, suburbs: suburbs.filter(s => s.region === 'Western Sydney') },
    { name: 'Hills District', icon: TreeDeciduous, suburbs: suburbs.filter(s => s.region === 'Hills District') },
  ];

  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* HowTo Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient hero-pattern overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white/90 text-sm mb-8 animate-fade-in">
              <Shield className="w-4 h-4 text-accent-400" />
              <span>{suburbs.length}+ Suburbs Covered Across Sydney</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
              Pest Control Sydney
              <span className="block text-accent-400">100+ EPA-Verified Operators</span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl animate-fade-in-up animate-delay-100">
              Compare quotes from Sydney's verified pest control experts in your suburb.
              All operators are NSW EPA licensed for termites, cockroaches, rodents, and more.
              Same-day service available across Greater Sydney.
            </p>

            {/* Search Box (Client Component) */}
            <SearchBox suburbs={suburbs} />

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-3 mt-6 animate-fade-in-up animate-delay-300">
              <span className="text-white/60 text-sm">Popular:</span>
              {['Bondi', 'Sydney CBD', 'North Sydney', 'Parramatta'].map((suburb) => (
                <Link
                  key={suburb}
                  href={`/pest-control/${suburb.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm hover:bg-white/20 transition-colors"
                >
                  {suburb}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-10 border-b border-neutral-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-primary-50/50 to-emerald-50/50 border border-primary-100/50">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-3xl text-neutral-900">100+</div>
                <div className="text-sm font-medium text-neutral-600">Licensed Operators</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border border-amber-100/50">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-amber-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-3xl text-neutral-900">4.8★</div>
                <div className="text-sm font-medium text-neutral-600">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border border-emerald-100/50">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-3xl text-neutral-900">10K+</div>
                <div className="text-sm font-medium text-neutral-600">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100/50">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-3xl text-neutral-900">{suburbs.length}+</div>
                <div className="text-sm font-medium text-neutral-600">Sydney Suburbs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Operators */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-heading">Featured Sydney Pest Controllers</h2>
              <p className="section-subheading">Top-rated pest control operators in Sydney, verified by NSW EPA</p>
            </div>
            <Link href="/operators" className="hidden sm:flex btn btn-secondary">
              View All Operators
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOperators.map((operator) => (
              <OperatorCard key={operator.id || operator.slug} operator={operator} featured />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/operators" className="btn btn-secondary">
              View All Operators
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-heading">Sydney Pest Control Services</h2>
            <p className="section-subheading mx-auto">
              From termite inspections to rodent control in Sydney. Find urgent same-day pest removal or scheduled treatments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service) => (
              <ServiceCard key={service.id || service.slug} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services" className="btn btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading mx-auto">
              Get connected with licensed pest controllers in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Search Your Suburb',
                description: 'Enter your suburb or postcode to find licensed pest control operators serving your area.',
                icon: Search,
                color: 'from-primary-500 to-emerald-500',
              },
              {
                step: '02',
                title: 'Compare & Choose',
                description: 'Review operator profiles, check EPA licenses, read verified reviews, and compare pricing.',
                icon: Users,
                color: 'from-blue-500 to-indigo-500',
              },
              {
                step: '03',
                title: 'Get Free Quotes',
                description: 'Request free, no-obligation quotes from up to 3 operators. Choose the best fit for your needs.',
                icon: CheckCircle,
                color: 'from-accent-500 to-amber-500',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center group">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-primary-300 rotate-45" />
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-9 h-9" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-sm font-bold text-primary-600 mb-3">Step {item.step}</div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-heading">Find Pest Control Across Sydney</h2>
            <p className="section-subheading mx-auto">
              Browse local pest control services across Greater Sydney regions - Eastern Suburbs, North Shore, Western Sydney & more
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <RegionCard
                key={region.name}
                region={region.name}
                icon={region.icon}
                suburbCount={region.suburbs.length}
                regionSuburbs={region.suburbs}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Why Choose Sydney Pest Control Directory?</h2>
              <p className="text-lg text-neutral-600 mb-8">
                We make finding trusted pest control simple. Every operator on our platform is verified
                against the NSW EPA register, ensuring you're always dealing with licensed professionals.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'EPA License Verification',
                    description: 'Every operator is verified against the NSW EPA public register. Look for the verified badge.',
                    color: 'from-emerald-500 to-teal-500',
                    bg: 'from-emerald-50 to-teal-50',
                  },
                  {
                    icon: Star,
                    title: 'Genuine Customer Reviews',
                    description: 'Read real reviews from verified customers. We don\'t allow fake or incentivized reviews.',
                    color: 'from-amber-500 to-orange-500',
                    bg: 'from-amber-50 to-orange-50',
                  },
                  {
                    icon: Zap,
                    title: 'Fast Response Times',
                    description: 'Featured operators commit to responding within 2 hours. Get same-day service when you need it.',
                    color: 'from-blue-500 to-indigo-500',
                    bg: 'from-blue-50 to-indigo-50',
                  },
                  {
                    icon: Award,
                    title: 'No Hidden Costs',
                    description: 'Get transparent pricing upfront. Compare quotes from multiple operators before you decide.',
                    color: 'from-purple-500 to-pink-500',
                    bg: 'from-purple-50 to-pink-50',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-neutral-50 to-white border border-neutral-100 hover:shadow-md transition-shadow">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-display font-bold mb-4">4.8</div>
                  <StarRating rating={5} size="lg" />
                  <p className="mt-4 text-white/80">Average customer rating across all operators</p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 card p-4 shadow-elevated animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">EPA Verified</div>
                    <div className="text-sm text-neutral-500">License #PMT-2024</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 card p-4 shadow-elevated animate-float animate-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Same Day</div>
                    <div className="text-sm text-neutral-500">Service Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-pattern" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Need Pest Control in Sydney Today?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Get free quotes from licensed Sydney pest control operators. Same-day emergency service available.
            Compare prices, read reviews, and book your pest treatment today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn btn-accent btn-lg gap-2 w-full sm:w-auto">
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

      {/* FAQ Section */}
      <section className="section bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="section-subheading mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <details key={index} className="group card p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-heading font-semibold text-neutral-900 pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-neutral-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/resources/faq" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
