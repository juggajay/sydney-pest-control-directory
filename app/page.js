'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Shield, Star, Clock, Phone, ChevronRight, 
  Bug, CheckCircle, Users, Award, Zap, ArrowRight, Building,
  Home, TreeDeciduous, Waves
} from 'lucide-react';
import { suburbs, services, getFeaturedOperators, getRegions } from '../lib/data';

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
            <h3 className="font-heading font-semibold text-lg text-neutral-900">
              {operator.businessName}
            </h3>
            {operator.badges.includes('epa-verified') && (
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
        {operator.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {operator.specialties.slice(0, 3).map((specialty, i) => (
          <span key={i} className="px-2 py-1 bg-neutral-100 rounded-md text-xs text-neutral-600">
            {specialty}
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
      href={`/services/${service.slug}`}
      className="card p-6 group hover:border-primary-200"
    >
      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
        <Bug className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
        {service.name}
      </h3>
      <p className="text-sm text-neutral-600 mb-4">
        {service.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-primary-600">{service.priceRange}</span>
        <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

// Region Card Component
function RegionCard({ region, icon: Icon, suburbCount }) {
  const regionSuburbs = suburbs.filter(s => s.region === region).slice(0, 4);
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-500" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-neutral-900">{region}</h3>
          <span className="text-sm text-neutral-500">{suburbCount} suburbs</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {regionSuburbs.map((suburb) => (
          <Link
            key={suburb.slug}
            href={`/pest-control/${suburb.slug}`}
            className="px-3 py-1.5 rounded-full text-sm bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-700 transition-colors"
          >
            {suburb.name}
          </Link>
        ))}
        <Link
          href={`/locations/${region.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-3 py-1.5 rounded-full text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View all →
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const featuredOperators = getFeaturedOperators().slice(0, 3);
  const topServices = services.slice(0, 6);
  
  // Filter suburbs for search
  const filteredSuburbs = searchQuery.length > 1
    ? suburbs.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.postcode.includes(searchQuery)
      ).slice(0, 6)
    : [];

  const regions = [
    { name: 'Eastern Suburbs', icon: Waves, count: suburbs.filter(s => s.region === 'Eastern Suburbs').length },
    { name: 'Inner West', icon: Building, count: suburbs.filter(s => s.region === 'Inner West').length },
    { name: 'Lower North Shore', icon: TreeDeciduous, count: suburbs.filter(s => s.region === 'Lower North Shore').length },
    { name: 'Northern Beaches', icon: Waves, count: suburbs.filter(s => s.region === 'Northern Beaches').length },
    { name: 'Western Sydney', icon: Home, count: suburbs.filter(s => s.region === 'Western Sydney').length },
    { name: 'Hills District', icon: TreeDeciduous, count: suburbs.filter(s => s.region === 'Hills District').length },
  ];

  return (
    <>
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
              <span>500+ EPA Licensed Operators Across Sydney</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
              Find Trusted Pest Control
              <span className="block text-accent-400">Near You</span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl animate-fade-in-up animate-delay-100">
              Compare quotes from verified pest control experts in your suburb. 
              All operators are EPA licensed and reviewed by real customers.
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl animate-fade-in-up animate-delay-200">
              <div className={`search-box ${searchFocused ? 'ring-2 ring-white/30' : ''}`}>
                <div className="flex items-center gap-2 px-5 text-neutral-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your suburb or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="flex-1 py-5 pr-4 text-lg bg-transparent border-none outline-none text-neutral-800 placeholder:text-neutral-400"
                />
                <button className="btn btn-primary m-2 gap-2">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>

              {/* Search Results Dropdown */}
              {searchFocused && filteredSuburbs.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-elevated border border-neutral-100 overflow-hidden z-50 animate-fade-in">
                  {filteredSuburbs.map((suburb) => (
                    <Link
                      key={suburb.slug}
                      href={`/pest-control/${suburb.slug}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-primary-50 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <div>
                        <span className="font-medium text-neutral-900">{suburb.name}</span>
                        <span className="text-sm text-neutral-500 ml-2">{suburb.postcode}</span>
                      </div>
                      <span className="ml-auto text-sm text-neutral-400">{suburb.region}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
      <section className="bg-neutral-50 py-8 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-neutral-900">500+</div>
                <div className="text-sm text-neutral-600">Licensed Operators</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-neutral-900">4.8★</div>
                <div className="text-sm text-neutral-600">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-neutral-900">10K+</div>
                <div className="text-sm text-neutral-600">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-neutral-900">100+</div>
                <div className="text-sm text-neutral-600">Sydney Suburbs</div>
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
              <h2 className="section-heading">Featured Pest Controllers</h2>
              <p className="section-subheading">Top-rated operators verified by the NSW EPA</p>
            </div>
            <Link href="/operators" className="hidden sm:flex btn btn-secondary">
              View All Operators
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOperators.map((operator) => (
              <OperatorCard key={operator.id} operator={operator} featured />
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
            <h2 className="section-heading">Pest Control Services</h2>
            <p className="section-subheading mx-auto">
              From termite inspections to rodent control, find the right service for your pest problem
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search Your Suburb',
                description: 'Enter your suburb or postcode to find licensed pest control operators serving your area.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Compare & Choose',
                description: 'Review operator profiles, check EPA licenses, read verified reviews, and compare pricing.',
                icon: Users,
              },
              {
                step: '03',
                title: 'Get Free Quotes',
                description: 'Request free, no-obligation quotes from up to 3 operators. Choose the best fit for your needs.',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center group">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-neutral-200 -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-neutral-300 rotate-45" />
                  </div>
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 mb-6 group-hover:bg-primary-100 transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-sm font-semibold text-primary-500 mb-2">Step {item.step}</div>
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-heading">Find Pest Control By Region</h2>
            <p className="section-subheading mx-auto">
              Browse pest control services across all Sydney regions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <RegionCard
                key={region.name}
                region={region.name}
                icon={region.icon}
                suburbCount={region.count}
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
                  },
                  {
                    icon: Star,
                    title: 'Genuine Customer Reviews',
                    description: 'Read real reviews from verified customers. We don\'t allow fake or incentivized reviews.',
                  },
                  {
                    icon: Zap,
                    title: 'Fast Response Times',
                    description: 'Featured operators commit to responding within 2 hours. Get same-day service when you need it.',
                  },
                  {
                    icon: Award,
                    title: 'No Hidden Costs',
                    description: 'Get transparent pricing upfront. Compare quotes from multiple operators before you decide.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600">{item.description}</p>
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
            Ready to Get Rid of Pests?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Get free quotes from licensed pest control operators in your area. 
            Compare prices, read reviews, and choose the best fit for your needs.
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
            {[
              {
                q: 'How much does pest control cost in Sydney?',
                a: 'General pest control in Sydney typically costs $150-$350 for a standard 3-4 bedroom home. Termite inspections range from $250-$500, while termite treatments can cost $2,000-$5,000+ depending on the property size and treatment method required.',
              },
              {
                q: 'Are all operators on this site licensed?',
                a: 'Yes, all operators listed on our platform are verified against the NSW EPA pesticide license register. We verify each operator\'s license status before they can appear in our directory, and continuously monitor for any changes.',
              },
              {
                q: 'How do I get a quote?',
                a: 'Simply enter your suburb to find operators in your area. You can request quotes directly through operator profiles, or use our quote request form to receive quotes from up to 3 operators at once. All quotes are free and no-obligation.',
              },
              {
                q: 'What should I look for when choosing a pest controller?',
                a: 'Look for the EPA Verified badge, read customer reviews, check their years of experience, and ensure they offer the specific service you need. We also recommend getting multiple quotes to compare pricing and service inclusions.',
              },
            ].map((faq, index) => (
              <details key={index} className="group card p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-heading font-semibold text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-neutral-600 leading-relaxed">{faq.a}</p>
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
