import Link from 'next/link';
import { MapPin, ChevronRight, Building, TreeDeciduous, Waves, Home, Users } from 'lucide-react';
import { suburbs, operators } from '../../lib/data';

export const metadata = {
  title: 'Pest Control by Location | All Sydney Suburbs | Sydney Pest Control Directory',
  description: 'Find pest control services across all Sydney suburbs and regions. Browse Eastern Suburbs, Inner West, North Shore, Northern Beaches, Western Sydney, Hills District and more.',
  keywords: 'pest control Sydney suburbs, pest control locations, Sydney pest control areas, Eastern Suburbs pest control, Inner West pest control, North Shore pest control',
  openGraph: {
    title: 'Pest Control by Location | All Sydney Suburbs',
    description: 'Find licensed pest control operators in your Sydney suburb. Browse by region or search for your specific suburb.',
    type: 'website',
  },
};

// Region data with icons and descriptions
const regions = [
  {
    id: 'eastern-suburbs',
    name: 'Eastern Suburbs',
    icon: Waves,
    description: 'Bondi, Randwick, Coogee, Double Bay, and surrounding coastal suburbs',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'inner-west',
    name: 'Inner West',
    icon: Building,
    description: 'Newtown, Marrickville, Leichhardt, Ashfield, and surrounding suburbs',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 'north-shore',
    name: 'North Shore',
    icon: TreeDeciduous,
    description: 'Chatswood, North Sydney, Mosman, Lane Cove, and surrounding suburbs',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'northern-beaches',
    name: 'Northern Beaches',
    icon: Waves,
    description: 'Manly, Dee Why, Mona Vale, Avalon, and surrounding coastal suburbs',
    color: 'from-sky-500 to-blue-500',
    bgColor: 'from-sky-50 to-blue-50',
    borderColor: 'border-sky-200',
  },
  {
    id: 'western-sydney',
    name: 'Western Sydney',
    icon: Home,
    description: 'Parramatta, Blacktown, Penrith, Liverpool, and surrounding suburbs',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
  },
  {
    id: 'south-sydney',
    name: 'South Sydney',
    icon: Building,
    description: 'Sutherland Shire, Hurstville, Kogarah, Bankstown, and surrounding suburbs',
    color: 'from-rose-500 to-red-500',
    bgColor: 'from-rose-50 to-red-50',
    borderColor: 'border-rose-200',
  },
  {
    id: 'hills-district',
    name: 'Hills District',
    icon: TreeDeciduous,
    description: 'Castle Hill, Baulkham Hills, Rouse Hill, Kellyville, and surrounding suburbs',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
  },
];

export default function LocationsPage() {
  // Group suburbs by region
  const suburbsByRegion = regions.map(region => {
    const regionSuburbs = suburbs.filter(s =>
      s.region?.toLowerCase().replace(/\s+/g, '-') === region.id ||
      s.region === region.name
    );
    return {
      ...region,
      suburbs: regionSuburbs,
      suburbCount: regionSuburbs.length,
    };
  });

  // Get total suburbs count
  const totalSuburbs = suburbs.length;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Locations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pest Control by Location
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-8">
            Find licensed pest control operators across {totalSuburbs}+ Sydney suburbs.
            Browse by region or search for your specific suburb.
          </p>
          <div className="flex items-center gap-6 text-primary-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{totalSuburbs}+ Suburbs</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{operators.length}+ Licensed Operators</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Browse by Region</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Select a region to view all suburbs and find pest control operators in your area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suburbsByRegion.map((region) => {
              const Icon = region.icon;
              return (
                <Link
                  key={region.id}
                  href={`/locations/${region.id}`}
                  className={`group bg-white rounded-2xl border ${region.borderColor} p-6 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${region.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {region.name}
                      </h3>
                      <span className="text-sm text-neutral-500">
                        {region.suburbCount} suburbs
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-4">
                    {region.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {region.suburbs.slice(0, 4).map((suburb) => (
                      <span
                        key={suburb.id || suburb.slug}
                        className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm"
                      >
                        {suburb.name}
                      </span>
                    ))}
                    {region.suburbCount > 4 && (
                      <span className="px-3 py-1 text-primary-600 text-sm font-medium">
                        +{region.suburbCount - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-primary-600 font-medium">
                    View all suburbs
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Suburbs A-Z */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">All Sydney Suburbs A-Z</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Browse our complete list of suburbs with pest control coverage
            </p>
          </div>

          {/* Alphabet navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
              const hasSuburbs = suburbs.some(s => s.name.toUpperCase().startsWith(letter));
              return (
                <a
                  key={letter}
                  href={hasSuburbs ? `#letter-${letter}` : undefined}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-colors ${
                    hasSuburbs
                      ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      : 'bg-neutral-100 text-neutral-400 cursor-default'
                  }`}
                >
                  {letter}
                </a>
              );
            })}
          </div>

          {/* Suburbs grouped by letter */}
          <div className="space-y-8">
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
              const letterSuburbs = suburbs
                .filter(s => s.name.toUpperCase().startsWith(letter))
                .sort((a, b) => a.name.localeCompare(b.name));

              if (letterSuburbs.length === 0) return null;

              return (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                  <h3 className="text-2xl font-bold text-primary-600 mb-4 pb-2 border-b border-neutral-200">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {letterSuburbs.map((suburb) => (
                      <Link
                        key={suburb.id || suburb.slug}
                        href={`/pest-control/${suburb.id || suburb.slug}`}
                        className="px-4 py-2 rounded-lg bg-neutral-50 hover:bg-primary-50 text-neutral-700 hover:text-primary-700 transition-colors text-sm"
                      >
                        {suburb.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Suburb?</h2>
          <p className="text-xl text-primary-200 mb-8">
            We're constantly expanding our coverage. Contact us and we'll help you find
            a licensed pest controller in your area.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contact Us
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
