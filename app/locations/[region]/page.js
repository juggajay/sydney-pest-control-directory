import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ChevronRight, Star, Shield, Clock, Building, TreeDeciduous, Waves, Home, ArrowRight, Search } from 'lucide-react';
import { suburbs, operators } from '../../../lib/data';

// Region data
const regionsData = {
  'eastern-suburbs': {
    name: 'Eastern Suburbs',
    icon: Waves,
    description: 'Pest control services for Bondi, Randwick, Coogee, Double Bay, and all Eastern Suburbs locations.',
    longDescription: 'The Eastern Suburbs of Sydney are known for their beautiful beaches, historic architecture, and high property values. From Bondi to Vaucluse, the area presents unique pest control challenges including coastal pests, termites in older homes, and rodents in urban areas. Our licensed operators understand the specific needs of Eastern Suburbs properties.',
    commonPests: ['Termites', 'Cockroaches', 'Rodents', 'Spiders', 'Ants'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
  },
  'inner-west': {
    name: 'Inner West',
    icon: Building,
    description: 'Pest control services for Newtown, Marrickville, Leichhardt, Ashfield, and surrounding Inner West suburbs.',
    longDescription: 'The Inner West is characterized by its mix of Victorian terraces, Federation homes, and modern apartments. The area\'s older building stock and urban density create specific pest control needs. Cockroaches, rodents, and termites are common concerns. Our operators have extensive experience with the unique challenges of Inner West properties.',
    commonPests: ['Cockroaches', 'Rodents', 'Termites', 'Bed Bugs', 'Ants'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
  },
  'north-shore': {
    name: 'North Shore',
    icon: TreeDeciduous,
    description: 'Pest control services for Chatswood, North Sydney, Mosman, Lane Cove, and North Shore suburbs.',
    longDescription: 'The North Shore spans from North Sydney to Hornsby, featuring leafy suburbs with established homes and gardens. The tree-lined streets and proximity to bushland make the area particularly susceptible to termites, possums, and spiders. Professional pest control is essential for protecting North Shore homes.',
    commonPests: ['Termites', 'Spiders', 'Possums', 'Rodents', 'Ants'],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50',
  },
  'northern-beaches': {
    name: 'Northern Beaches',
    icon: Waves,
    description: 'Pest control services for Manly, Dee Why, Mona Vale, Avalon, and Northern Beaches suburbs.',
    longDescription: 'The Northern Beaches stretch from Manly to Palm Beach, combining coastal living with bushland settings. The humid coastal climate and proximity to national parks create ideal conditions for various pests. Termites, cockroaches, and spiders are common concerns for Northern Beaches residents.',
    commonPests: ['Termites', 'Cockroaches', 'Spiders', 'Wasps', 'Rodents'],
    color: 'from-sky-500 to-blue-500',
    bgColor: 'from-sky-50 to-blue-50',
  },
  'western-sydney': {
    name: 'Western Sydney',
    icon: Home,
    description: 'Pest control services for Parramatta, Blacktown, Penrith, Liverpool, and Western Sydney suburbs.',
    longDescription: 'Western Sydney is one of Australia\'s fastest-growing regions, with a mix of established suburbs and new developments. The area\'s hot summers and varied housing stock create diverse pest control needs. From termites in new builds to rodents in established areas, our operators cover all of Western Sydney.',
    commonPests: ['Termites', 'Cockroaches', 'Rodents', 'Ants', 'Spiders'],
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
  },
  'south-sydney': {
    name: 'South Sydney',
    icon: Building,
    description: 'Pest control services for Sutherland Shire, Hurstville, Kogarah, Bankstown, and South Sydney suburbs.',
    longDescription: 'South Sydney encompasses diverse areas from the urban centers of Hurstville and Bankstown to the coastal Sutherland Shire. The region\'s mix of housing types and proximity to waterways creates varied pest control challenges. Our operators service all southern suburbs with comprehensive pest management solutions.',
    commonPests: ['Termites', 'Cockroaches', 'Rodents', 'Spiders', 'Ants'],
    color: 'from-rose-500 to-red-500',
    bgColor: 'from-rose-50 to-red-50',
  },
  'hills-district': {
    name: 'Hills District',
    icon: TreeDeciduous,
    description: 'Pest control services for Castle Hill, Baulkham Hills, Rouse Hill, Kellyville, and Hills District suburbs.',
    longDescription: 'The Hills District is known for its family-friendly suburbs, new developments, and established garden areas. The semi-rural character of some areas and rapid new construction creates unique pest control needs. Termites are a particular concern in both new and established Hills District homes.',
    commonPests: ['Termites', 'Spiders', 'Rodents', 'Ants', 'Wasps'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
  },
};

// Generate static params for all regions
export async function generateStaticParams() {
  return Object.keys(regionsData).map((region) => ({
    region: region,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const region = regionsData[params.region];
  if (!region) return {};

  return {
    title: `Pest Control ${region.name} Sydney | Licensed Operators | Sydney Pest Control Directory`,
    description: `Find licensed pest control operators in ${region.name}, Sydney. Compare reviews, get free quotes from verified exterminators. ${region.description}`,
    keywords: `pest control ${region.name}, ${region.name} pest control Sydney, exterminators ${region.name}, termite inspection ${region.name}`,
    openGraph: {
      title: `Pest Control ${region.name} Sydney | Licensed Operators`,
      description: region.description,
      type: 'website',
    },
  };
}

export default function RegionPage({ params }) {
  const regionData = regionsData[params.region];

  if (!regionData) {
    notFound();
  }

  // Get suburbs for this region
  const regionSuburbs = suburbs.filter(s => {
    const suburbRegion = s.region?.toLowerCase().replace(/\s+/g, '-');
    return suburbRegion === params.region || s.region === regionData.name;
  }).sort((a, b) => a.name.localeCompare(b.name));

  // Get operators that service this region (simplified - in production would be more sophisticated)
  const regionOperators = operators.slice(0, 6);

  const Icon = regionData.icon;

  // Generate schema markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Pest Control Services in ${regionData.name}`,
    description: regionData.description,
    areaServed: {
      '@type': 'Place',
      name: `${regionData.name}, Sydney, NSW, Australia`,
    },
    provider: {
      '@type': 'Organization',
      name: 'Sydney Pest Control Directory',
      url: 'https://sydneypestcontrol.com.au',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-primary-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
              <span>/</span>
              <span className="text-white">{regionData.name}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${regionData.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Pest Control {regionData.name}
                </h1>
                <p className="text-primary-200 mt-1">{regionSuburbs.length} suburbs covered</p>
              </div>
            </div>

            <p className="text-xl text-primary-100 max-w-3xl">
              {regionData.description}
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-white py-8 border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">{regionSuburbs.length}</div>
                <div className="text-neutral-600">Suburbs Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">50+</div>
                <div className="text-neutral-600">Local Operators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">4.8</div>
                <div className="text-neutral-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">2hr</div>
                <div className="text-neutral-600">Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Region */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Pest Control in {regionData.name}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {regionData.longDescription}
                </p>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Common Pests in {regionData.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {regionData.commonPests.map((pest) => (
                      <span
                        key={pest}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get Free Quotes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Featured Operators */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Featured Local Operators</h3>
                <div className="space-y-4">
                  {regionOperators.slice(0, 3).map((op) => (
                    <Link
                      key={op.id || op.slug}
                      href={`/operator/${op.slug}`}
                      className="block bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-neutral-900">{op.businessName}</h4>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                              <span>{op.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{op.reviewCount} reviews</span>
                          </div>
                        </div>
                        {op.features?.includes('epa-verified') && (
                          <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                            <Shield className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {op.yearsInBusiness}+ years
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          EPA Verified
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/operators"
                  className="block text-center mt-4 text-primary-600 font-medium hover:text-primary-700"
                >
                  View all operators →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Suburbs Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Suburbs in {regionData.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Click on a suburb to find pest control operators in your area
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {regionSuburbs.map((suburb) => (
                <Link
                  key={suburb.id || suburb.slug}
                  href={`/pest-control/${suburb.id || suburb.slug}`}
                  className="flex items-center gap-2 px-4 py-3 bg-neutral-50 hover:bg-primary-50 rounded-lg text-neutral-700 hover:text-primary-700 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
                  <span className="text-sm font-medium">{suburb.name}</span>
                </Link>
              ))}
            </div>

            {regionSuburbs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600">
                  No suburbs found for this region. Please try another region or
                  <Link href="/contact" className="text-primary-600 ml-1">contact us</Link>.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Pest Control in {regionData.name}?
            </h2>
            <p className="text-xl text-primary-200 mb-8">
              Get free quotes from licensed, verified pest control operators today.
              Compare prices, read reviews, and choose the best fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get Free Quotes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/operators"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                <Search className="w-5 h-5" />
                Find Operators
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
