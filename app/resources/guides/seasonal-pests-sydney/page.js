import Link from 'next/link';
import {
  ChevronRight, Bug, Calendar, Sun, Cloud, Snowflake, Leaf,
  AlertTriangle, CheckCircle, ArrowRight, ThermometerSun,
  Droplets, Home, Shield, Search
} from 'lucide-react';
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  siteConfig
} from '../../../../lib/seo';

export const metadata = genMeta({
  title: 'Seasonal Pest Guide Sydney 2024 | When Pests Are Most Active',
  description: 'Complete Sydney seasonal pest calendar. Learn when cockroaches, spiders, ants, rodents & termites are most active. Prevention tips for each season from local experts.',
  path: '/resources/guides/seasonal-pests-sydney',
});

// FAQ Schema for seasonal pest questions
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What pests are most common in Sydney summer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sydney summers (December-February) see peak activity for cockroaches, ants, flies, mosquitoes, and termites. The warm, humid conditions create ideal breeding environments. German cockroaches can produce 6 generations in a single summer.'
      }
    },
    {
      '@type': 'Question',
      name: 'When is termite season in Sydney?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Termites are most active in Sydney from October to March, with swarming typically occurring in spring and early summer (October-December). However, termites remain active year-round in Sydney\'s mild climate, making annual inspections essential.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why do rodents increase in winter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rodents seek warmth and food sources indoors during Sydney\'s cooler months (June-August). They enter through gaps as small as 6mm, often nesting in wall cavities, roof spaces, and garages. Winter is peak time for rodent call-outs in Sydney.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the best time to get pest control in Sydney?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best time for preventive pest control in Sydney is early spring (September) before pest populations explode. For termites, annual inspections in spring catch early activity. For rodents, autumn treatments prevent winter invasions.'
      }
    }
  ]
};

// Seasonal pest data
const seasons = [
  {
    name: 'Summer',
    months: 'December - February',
    icon: Sun,
    color: 'amber',
    bgClass: 'bg-amber-50',
    iconClass: 'text-amber-500',
    borderClass: 'border-amber-200',
    conditions: 'Hot (25-35°C), humid, frequent storms',
    pests: [
      {
        name: 'Cockroaches',
        activity: 'Peak',
        description: 'German and American cockroaches breed rapidly. Humidity drives them indoors.',
        serviceLink: '/services/cockroach-control',
        tips: ['Seal entry points', 'Fix leaky taps', 'Store food in sealed containers', 'Empty bins regularly']
      },
      {
        name: 'Ants',
        activity: 'Peak',
        description: 'Black ants and coastal brown ants swarm. Heavy rain drives colonies indoors.',
        serviceLink: '/services/ant-control',
        tips: ['Clean up food spills immediately', 'Seal cracks around windows/doors', 'Trim vegetation touching house']
      },
      {
        name: 'Termites',
        activity: 'High',
        description: 'Swarming season. Warm soil temperatures accelerate colony growth.',
        serviceLink: '/services/termite-inspection',
        tips: ['Book annual inspection', 'Remove wood debris from yard', 'Check for mud tubes', 'Maintain ventilation']
      },
      {
        name: 'Flies',
        activity: 'Peak',
        description: 'House flies and blowflies breed in organic waste and pet droppings.',
        serviceLink: '/services/fly-control',
        tips: ['Install fly screens', 'Clean pet areas daily', 'Secure bins with lids', 'Remove fallen fruit']
      },
      {
        name: 'Mosquitoes',
        activity: 'Peak',
        description: 'Breed in standing water after summer storms. Active dusk to dawn.',
        serviceLink: null,
        tips: ['Empty pot plant trays', 'Clear gutters', 'Cover water tanks', 'Use screens on windows']
      }
    ]
  },
  {
    name: 'Autumn',
    months: 'March - May',
    icon: Leaf,
    color: 'orange',
    bgClass: 'bg-orange-50',
    iconClass: 'text-orange-500',
    borderClass: 'border-orange-200',
    conditions: 'Mild (18-25°C), decreasing humidity',
    pests: [
      {
        name: 'Rodents',
        activity: 'Rising',
        description: 'Mice and rats start seeking indoor shelter as temperatures drop.',
        serviceLink: '/services/rodent-control',
        tips: ['Seal gaps around pipes', 'Store food in containers', 'Check garage and shed', 'Trim overhanging branches']
      },
      {
        name: 'Spiders',
        activity: 'High',
        description: 'Funnel-webs and redbacks become more visible seeking mates.',
        serviceLink: '/services/spider-control',
        tips: ['Check shoes before wearing', 'Wear gloves in garden', 'Remove web buildup', 'Keep grass short']
      },
      {
        name: 'Cockroaches',
        activity: 'Moderate',
        description: 'Still active but breeding slows. May move to warmer indoor areas.',
        serviceLink: '/services/cockroach-control',
        tips: ['Maintain hygiene practices', 'Check under appliances', 'Fix moisture issues']
      },
      {
        name: 'Wasps',
        activity: 'High',
        description: 'Paper wasps become aggressive defending established nests.',
        serviceLink: '/services/wasp-removal',
        tips: ['Don\'t disturb nests', 'Check eaves and gutters', 'Professional removal only']
      }
    ]
  },
  {
    name: 'Winter',
    months: 'June - August',
    icon: Cloud,
    color: 'slate',
    bgClass: 'bg-slate-50',
    iconClass: 'text-slate-500',
    borderClass: 'border-slate-200',
    conditions: 'Cool (8-17°C), occasional rain',
    pests: [
      {
        name: 'Rodents',
        activity: 'Peak',
        description: 'Peak invasion season. Mice and rats nest in roof voids and walls.',
        serviceLink: '/services/rodent-control',
        tips: ['Inspect roof space', 'Check for droppings', 'Set traps in garage', 'Block entry points']
      },
      {
        name: 'Cockroaches',
        activity: 'Low-Moderate',
        description: 'Seek warm areas - behind fridges, in wall cavities, near hot water systems.',
        serviceLink: '/services/cockroach-control',
        tips: ['Check warm spots', 'Maintain kitchen hygiene', 'Ventilate bathroom']
      },
      {
        name: 'Possums',
        activity: 'Moderate',
        description: 'Shelter in roof spaces for warmth. Noisy at night, can damage insulation.',
        serviceLink: '/services/possum-removal',
        tips: ['Install possum box', 'Trim tree access', 'Check roof for entry', 'Humane removal only']
      },
      {
        name: 'Silverfish',
        activity: 'Moderate',
        description: 'Active in dark, damp areas - wardrobes, bookcases, bathrooms.',
        serviceLink: null,
        tips: ['Reduce humidity', 'Store books properly', 'Check stored clothes', 'Use dehumidifier']
      }
    ]
  },
  {
    name: 'Spring',
    months: 'September - November',
    icon: Snowflake,
    color: 'emerald',
    bgClass: 'bg-emerald-50',
    iconClass: 'text-emerald-500',
    borderClass: 'border-emerald-200',
    conditions: 'Warming (15-25°C), variable weather',
    pests: [
      {
        name: 'Termites',
        activity: 'Peak Swarming',
        description: 'Primary swarming season. Winged alates emerge to start new colonies.',
        serviceLink: '/services/termite-inspection',
        tips: ['Book inspection NOW', 'Watch for swarmers', 'Check timber structures', 'Review barrier status']
      },
      {
        name: 'Spiders',
        activity: 'Rising',
        description: 'Funnel-web males wander seeking females. Redbacks emerge from hiding.',
        serviceLink: '/services/spider-control',
        tips: ['Check garden before working', 'Inspect outdoor furniture', 'Clear debris piles']
      },
      {
        name: 'Bees & Wasps',
        activity: 'Rising',
        description: 'New nests established. Swarming bees look for new hive locations.',
        serviceLink: '/services/bee-removal',
        tips: ['Don\'t spray swarms', 'Call bee relocator', 'Check wall cavities', 'Inspect garden sheds']
      },
      {
        name: 'Ants',
        activity: 'Rising',
        description: 'Colonies expand rapidly. Flying ants may swarm after rain.',
        serviceLink: '/services/ant-control',
        tips: ['Treat nest locations', 'Seal entry points', 'Monitor kitchen areas']
      },
      {
        name: 'Fleas',
        activity: 'Rising',
        description: 'Breeding accelerates with warmth. Pet infestations spread to home.',
        serviceLink: '/services/flea-control',
        tips: ['Treat pets preventively', 'Wash pet bedding hot', 'Vacuum regularly', 'Treat yard areas']
      }
    ]
  }
];

// Monthly pest calendar data
const monthlyCalendar = [
  { month: 'Jan', termites: 'high', cockroaches: 'peak', ants: 'peak', spiders: 'moderate', rodents: 'low' },
  { month: 'Feb', termites: 'high', cockroaches: 'peak', ants: 'peak', spiders: 'moderate', rodents: 'low' },
  { month: 'Mar', termites: 'moderate', cockroaches: 'high', ants: 'high', spiders: 'high', rodents: 'rising' },
  { month: 'Apr', termites: 'moderate', cockroaches: 'moderate', ants: 'moderate', spiders: 'high', rodents: 'rising' },
  { month: 'May', termites: 'low', cockroaches: 'moderate', ants: 'low', spiders: 'moderate', rodents: 'high' },
  { month: 'Jun', termites: 'low', cockroaches: 'low', ants: 'low', spiders: 'low', rodents: 'peak' },
  { month: 'Jul', termites: 'low', cockroaches: 'low', ants: 'low', spiders: 'low', rodents: 'peak' },
  { month: 'Aug', termites: 'low', cockroaches: 'low', ants: 'low', spiders: 'low', rodents: 'high' },
  { month: 'Sep', termites: 'peak', cockroaches: 'rising', ants: 'rising', spiders: 'rising', rodents: 'moderate' },
  { month: 'Oct', termites: 'peak', cockroaches: 'moderate', ants: 'moderate', spiders: 'high', rodents: 'moderate' },
  { month: 'Nov', termites: 'high', cockroaches: 'high', ants: 'high', spiders: 'high', rodents: 'low' },
  { month: 'Dec', termites: 'high', cockroaches: 'peak', ants: 'peak', spiders: 'moderate', rodents: 'low' },
];

const activityColors = {
  peak: 'bg-red-500',
  high: 'bg-orange-400',
  rising: 'bg-yellow-400',
  moderate: 'bg-blue-400',
  low: 'bg-slate-200',
};

export default function SeasonalPestsGuidePage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Guides', path: '/resources' },
    { name: 'Seasonal Pest Guide', path: '/resources/guides/seasonal-pests-sydney' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* Schema Scripts */}
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

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <span className="px-3 py-1 bg-accent-400 text-primary-900 text-sm font-semibold rounded-full">
                2024 Guide
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Sydney Seasonal Pest Guide
            </h1>

            <p className="text-xl text-white/80 mb-6">
              Know when pests are most active in Sydney. Plan your prevention and treatment
              schedule with our comprehensive seasonal calendar from local pest control experts.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                <ThermometerSun className="w-5 h-5 text-accent-400" />
                <span className="text-white">Climate-Specific</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                <Bug className="w-5 h-5 text-white/70" />
                <span className="text-white/90">12+ Pest Types</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                <CheckCircle className="w-5 h-5 text-white/70" />
                <span className="text-white/90">Expert Prevention Tips</span>
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

      {/* Quick Navigation */}
      <section className="py-8 bg-neutral-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-neutral-500">Jump to:</span>
            {seasons.map((season) => (
              <a
                key={season.name}
                href={`#${season.name.toLowerCase()}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${season.bgClass} ${season.iconClass} font-medium hover:opacity-80 transition-opacity`}
              >
                <season.icon className="w-4 h-4" />
                {season.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Calendar Overview */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="card p-8">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
              Sydney Pest Activity Calendar
            </h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              {Object.entries(activityColors).map(([level, color]) => (
                <div key={level} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${color}`}></div>
                  <span className="text-sm text-neutral-600 capitalize">{level}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-neutral-700">Pest</th>
                    {monthlyCalendar.map((m) => (
                      <th key={m.month} className="text-center py-3 px-1 text-sm font-semibold text-neutral-700">
                        {m.month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['termites', 'cockroaches', 'ants', 'spiders', 'rodents'].map((pest) => (
                    <tr key={pest} className="border-b last:border-0">
                      <td className="py-3 px-2 text-sm font-medium text-neutral-800 capitalize">{pest}</td>
                      {monthlyCalendar.map((m) => (
                        <td key={m.month} className="py-3 px-1 text-center">
                          <div className={`w-6 h-6 mx-auto rounded ${activityColors[m[pest]]}`} title={m[pest]}></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Sections */}
      {seasons.map((season) => (
        <section
          key={season.name}
          id={season.name.toLowerCase()}
          className={`py-16 ${season.name === 'Autumn' || season.name === 'Spring' ? 'bg-white' : 'bg-neutral-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Season Header */}
            <div className={`flex items-center gap-4 mb-8 p-6 rounded-2xl ${season.bgClass} border ${season.borderClass}`}>
              <div className={`w-16 h-16 rounded-xl bg-white flex items-center justify-center`}>
                <season.icon className={`w-8 h-8 ${season.iconClass}`} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-neutral-900">
                  {season.name} in Sydney
                </h2>
                <p className="text-neutral-600">
                  <span className="font-semibold">{season.months}</span> • {season.conditions}
                </p>
              </div>
            </div>

            {/* Pests Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {season.pests.map((pest) => (
                <div key={pest.name} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Bug className={`w-6 h-6 ${season.iconClass}`} />
                      <h3 className="text-xl font-heading font-semibold text-neutral-900">
                        {pest.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pest.activity === 'Peak' || pest.activity === 'Peak Swarming'
                        ? 'bg-red-100 text-red-700'
                        : pest.activity === 'High'
                        ? 'bg-orange-100 text-orange-700'
                        : pest.activity === 'Rising'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {pest.activity}
                    </span>
                  </div>

                  <p className="text-neutral-600 mb-4">{pest.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-2">Prevention Tips:</h4>
                    <ul className="space-y-1">
                      {pest.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pest.serviceLink && (
                    <Link
                      href={pest.serviceLink}
                      className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
                    >
                      View {pest.name} Services
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Prevention Planning Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8 text-center">
            Annual Pest Prevention Schedule
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Snowflake className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Spring (Sep)</h3>
              <p className="text-sm text-neutral-600">Book termite inspection before swarming season peaks</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Summer (Dec)</h3>
              <p className="text-sm text-neutral-600">General pest treatment for cockroaches, ants, spiders</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Autumn (Apr)</h3>
              <p className="text-sm text-neutral-600">Rodent-proof your home before winter invasion</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Winter (Jul)</h3>
              <p className="text-sm text-neutral-600">Monitor for rodents, check stored items for silverfish</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sydney Climate Info */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="card p-8">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
              Why Sydney Has Year-Round Pest Pressure
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <ThermometerSun className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Mild Climate</h3>
                  <p className="text-sm text-neutral-600">
                    Sydney's subtropical climate means pests remain active year-round.
                    Unlike southern cities, we don't get extended freezes that naturally reduce populations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">High Humidity</h3>
                  <p className="text-sm text-neutral-600">
                    Coastal humidity creates ideal breeding conditions for cockroaches,
                    termites, and other moisture-loving pests, especially in summer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Urban Density</h3>
                  <p className="text-sm text-neutral-600">
                    Sydney's dense housing and older building stock provide numerous
                    entry points and harbourage areas for common urban pests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Related Pest Guides
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/resources/guides/termite-guide-sydney" className="card p-6 hover:border-primary-200 transition-colors group">
              <Bug className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                Complete Termite Guide
              </h3>
              <p className="text-sm text-neutral-600">
                Everything Sydney homeowners need to know about termite prevention and treatment.
              </p>
            </Link>

            <Link href="/resources/case-studies" className="card p-6 hover:border-primary-200 transition-colors group">
              <Shield className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                Case Studies
              </h3>
              <p className="text-sm text-neutral-600">
                Real pest control success stories from across Sydney suburbs.
              </p>
            </Link>

            <Link href="/services" className="card p-6 hover:border-primary-200 transition-colors group">
              <CheckCircle className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                All Services
              </h3>
              <p className="text-sm text-neutral-600">
                Browse all pest control services available through our verified operators.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">
                  {faq.name}
                </h3>
                <p className="text-neutral-600">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to Schedule Pest Prevention?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Connect with EPA-licensed operators who understand Sydney's seasonal pest patterns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn btn-accent btn-lg gap-2 w-full sm:w-auto">
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
