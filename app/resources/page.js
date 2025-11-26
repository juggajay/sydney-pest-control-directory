import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import {
  Bug,
  Shield,
  Calendar,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Home,
  Leaf,
  Thermometer,
  Phone,
  BookOpen,
  Search,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Pest Control Resources & Guides | Sydney Pest Control Directory',
  description: 'Comprehensive pest control resources for Sydney homeowners. Pest identification guides, DIY prevention tips, seasonal pest calendars, and expert FAQs.',
  keywords: 'pest control guide, pest identification Sydney, DIY pest prevention, seasonal pests Australia, pest control FAQ',
};

// Pest Identification Data
const pests = [
  {
    name: 'Termites',
    icon: '🪵',
    signs: ['Mud tubes on walls or foundations', 'Hollow-sounding timber', 'Discarded wings near windows', 'Frass (termite droppings)'],
    danger: 'high',
    action: 'Immediate professional inspection required. Do not disturb the area.',
    commonAreas: ['Subfloor', 'Wall cavities', 'Roof void', 'Garden beds near house']
  },
  {
    name: 'Cockroaches',
    icon: '🪳',
    signs: ['Droppings (small black specks)', 'Musty odour', 'Egg cases', 'Seeing live roaches at night'],
    danger: 'medium',
    action: 'Clean thoroughly, seal entry points. Professional treatment for infestations.',
    commonAreas: ['Kitchen', 'Bathroom', 'Laundry', 'Behind appliances']
  },
  {
    name: 'Rats & Mice',
    icon: '🐀',
    signs: ['Droppings', 'Gnaw marks', 'Scratching sounds', 'Nests made of shredded material'],
    danger: 'high',
    action: 'Set traps, seal entry points. Professional help for large infestations.',
    commonAreas: ['Roof void', 'Wall cavities', 'Garage', 'Under decking']
  },
  {
    name: 'Spiders',
    icon: '🕷️',
    signs: ['Webs in corners', 'Egg sacs', 'Seeing spiders regularly', 'Bite marks'],
    danger: 'medium',
    action: 'Most are harmless. Remove webs, reduce insects. Identify dangerous species.',
    commonAreas: ['Garages', 'Sheds', 'Under furniture', 'Outdoor areas']
  },
  {
    name: 'Ants',
    icon: '🐜',
    signs: ['Ant trails', 'Small piles of dirt', 'Winged ants indoors', 'Damage to wood (carpenter ants)'],
    danger: 'low',
    action: 'Identify species, remove food sources. Bait treatments effective.',
    commonAreas: ['Kitchen', 'Bathroom', 'Garden beds', 'Pavement cracks']
  },
  {
    name: 'Bed Bugs',
    icon: '🛏️',
    signs: ['Itchy bites in lines', 'Blood spots on sheets', 'Dark spots on mattress', 'Musty sweet smell'],
    danger: 'medium',
    action: 'Professional treatment essential. Wash bedding at 60°C.',
    commonAreas: ['Mattress seams', 'Bed frame', 'Furniture cracks', 'Luggage']
  }
];

// Seasonal Calendar Data
const seasonalPests = [
  {
    season: 'Summer',
    months: 'December - February',
    icon: '☀️',
    pests: ['Cockroaches', 'Ants', 'Flies', 'Mosquitoes', 'Wasps'],
    tips: ['Keep food sealed', 'Empty bins regularly', 'Fix leaky taps', 'Install fly screens', 'Remove standing water'],
    color: 'amber'
  },
  {
    season: 'Autumn',
    months: 'March - May',
    icon: '🍂',
    pests: ['Rodents', 'Spiders', 'Cockroaches', 'Silverfish'],
    tips: ['Seal entry points before winter', 'Clear leaf litter', 'Check roof for gaps', 'Store firewood away from house'],
    color: 'orange'
  },
  {
    season: 'Winter',
    months: 'June - August',
    icon: '❄️',
    pests: ['Rodents', 'Termites (less active)', 'Silverfish', 'Carpet beetles'],
    tips: ['Check for rodent entry points', 'Maintain ventilation', 'Keep areas dry', 'Store textiles properly'],
    color: 'blue'
  },
  {
    season: 'Spring',
    months: 'September - November',
    icon: '🌸',
    pests: ['Termites (swarming)', 'Bees', 'Wasps', 'Ants', 'Spiders'],
    tips: ['Schedule termite inspection', 'Check for new nests', 'Clear vegetation from house', 'Inspect outdoor areas'],
    color: 'green'
  }
];

// Prevention Tips Data
const preventionCategories = [
  {
    title: 'Kitchen & Food Storage',
    icon: Home,
    tips: [
      'Store food in airtight containers',
      'Clean up crumbs and spills immediately',
      'Empty kitchen bin daily',
      'Don\'t leave pet food out overnight',
      'Clean behind and under appliances monthly',
      'Fix dripping taps promptly'
    ]
  },
  {
    title: 'Building Maintenance',
    icon: Shield,
    tips: [
      'Seal gaps around pipes and cables',
      'Install door sweeps on external doors',
      'Repair damaged fly screens',
      'Fix cracks in walls and foundations',
      'Ensure good drainage around property',
      'Keep gutters clean and flowing'
    ]
  },
  {
    title: 'Garden & Outdoor',
    icon: Leaf,
    tips: [
      'Keep vegetation trimmed away from house',
      'Remove leaf litter and debris',
      'Store firewood away from the house',
      'Eliminate standing water',
      'Keep compost bins sealed',
      'Maintain garden beds away from foundations'
    ]
  },
  {
    title: 'General Hygiene',
    icon: CheckCircle,
    tips: [
      'Vacuum regularly, especially carpets',
      'Wash bedding weekly in hot water',
      'Reduce clutter where pests can hide',
      'Clean and rotate stored items',
      'Ventilate damp areas',
      'Inspect second-hand furniture before bringing inside'
    ]
  }
];

// FAQ Data
const faqs = [
  {
    question: 'How often should I have a termite inspection?',
    answer: 'Annual termite inspections are recommended for all Sydney properties. High-risk properties (near bushland, older homes, previous termite activity) should consider 6-monthly inspections. Regular inspections can detect termite activity early and potentially save thousands in repair costs.'
  },
  {
    question: 'Are pest control treatments safe for my family and pets?',
    answer: 'Professional pest control treatments are designed to be safe when applied correctly. Modern products are targeted and low-toxicity. Your pest controller will provide specific instructions, which typically include staying out of treated areas for 2-4 hours and keeping pets away until products dry. Always inform your technician about pets, children, or health concerns.'
  },
  {
    question: 'How do I know if I have termites?',
    answer: 'Warning signs include: mud tubes on walls or foundations, hollow-sounding timber when tapped, doors or windows that suddenly stick, visible damage to wood, discarded wings near windows, and small piles of frass (termite droppings). If you notice any signs, avoid disturbing the area and contact a professional immediately.'
  },
  {
    question: 'What\'s the difference between termite barriers and baiting systems?',
    answer: 'Chemical barriers create a treated zone around your property that kills or repels termites. Baiting systems use stations placed around your property containing bait that termites carry back to their colony. Both methods are effective - barriers provide immediate protection while baiting systems can eliminate entire colonies. Many pest controllers recommend a combination approach.'
  },
  {
    question: 'Why do cockroaches keep coming back?',
    answer: 'Cockroaches return due to: available food and water sources, entry points not being sealed, neighbouring infestations, or incomplete treatment. Effective control requires both professional treatment AND addressing hygiene issues. German cockroaches in particular breed rapidly and may require multiple treatments.'
  },
  {
    question: 'How much does pest control cost in Sydney?',
    answer: 'Costs vary by service: General pest control typically ranges $150-$300 for an average home. Termite inspections cost $250-$500. Termite treatment systems can range from $2,000-$5,000+ depending on property size and treatment type. Always get multiple quotes and ensure operators are licensed.'
  },
  {
    question: 'Can I do pest control myself?',
    answer: 'DIY methods work for minor issues like occasional ants or spiders. However, professional treatment is recommended for: termites (always), cockroach infestations, rodent problems, bed bugs, and any recurring pest issue. Professionals have access to more effective products and the expertise to identify the source of problems.'
  },
  {
    question: 'What should I do to prepare for a pest control treatment?',
    answer: 'Preparation typically includes: clearing items from under sinks, moving furniture away from walls (for cockroach treatment), removing pets during treatment, covering fish tanks, storing food and dishes, and vacating the property for the recommended time. Your pest controller will provide specific instructions based on the treatment.'
  },
  {
    question: 'Are all pest control operators the same?',
    answer: 'No. In NSW, pest controllers must hold a licence issued by NSW Fair Trading. Always verify their licence, check reviews, get written quotes, and ask about warranties. Specialists (like timber pest specialists) have additional qualifications. Members of industry associations like AEPMA follow a code of ethics.'
  },
  {
    question: 'What attracts pests to my home?',
    answer: 'Common attractants include: food sources (crumbs, pet food, garbage), water (leaky pipes, condensation, pet bowls), shelter (clutter, gaps in walls, vegetation against house), and environmental factors (nearby bushland, neighbouring infestations). Reducing these attractants is key to long-term pest prevention.'
  }
];

// Dangerous Spiders Data
const dangerousSpiders = [
  {
    name: 'Funnel-web Spider',
    appearance: 'Large, black, shiny, aggressive when threatened',
    habitat: 'Moist, cool areas, under rocks, in gardens',
    danger: 'Potentially fatal - seek immediate medical attention',
    action: 'Do not attempt to catch. Keep victim calm, apply pressure bandage, call 000.'
  },
  {
    name: 'Redback Spider',
    appearance: 'Black with distinctive red stripe on abdomen',
    habitat: 'Sheltered spots - sheds, letterboxes, outdoor furniture',
    danger: 'Painful bite, can be serious. Antivenom available.',
    action: 'Apply ice pack, seek medical attention. Clean area, do not bandage.'
  },
  {
    name: 'White-tail Spider',
    appearance: 'Dark grey with white spot on tail',
    habitat: 'Inside homes, in clothing, bedding',
    danger: 'Painful bite, localised swelling. Rarely serious.',
    action: 'Clean bite area, apply ice, see doctor if symptoms worsen.'
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pest Control Resources & Guides
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Everything Sydney homeowners need to know about pest identification, prevention,
            and when to call a professional. Expert advice to protect your home.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 overflow-x-auto py-4 text-sm">
            <a href="#pest-identification" className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 whitespace-nowrap transition-colors">
              <Search className="w-4 h-4" />
              Pest Identification
            </a>
            <a href="#prevention-tips" className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 whitespace-nowrap transition-colors">
              <Shield className="w-4 h-4" />
              Prevention Tips
            </a>
            <a href="#seasonal-calendar" className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 whitespace-nowrap transition-colors">
              <Calendar className="w-4 h-4" />
              Seasonal Calendar
            </a>
            <a href="#dangerous-spiders" className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 whitespace-nowrap transition-colors">
              <AlertTriangle className="w-4 h-4" />
              Dangerous Spiders
            </a>
            <a href="#faq" className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 whitespace-nowrap transition-colors">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>
          </nav>
        </div>
      </section>

      {/* Pest Identification Section */}
      <section id="pest-identification" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Search className="w-4 h-4" />
              Identification Guide
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Identify Common Sydney Pests
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Learn to recognise the signs of pest activity and understand what action to take.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pests.map((pest) => (
              <div key={pest.name} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{pest.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{pest.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      pest.danger === 'high' ? 'bg-red-100 text-red-700' :
                      pest.danger === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {pest.danger === 'high' ? 'High Risk' : pest.danger === 'medium' ? 'Moderate Risk' : 'Low Risk'}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">Warning Signs:</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {pest.signs.map((sign, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">Common Areas:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pest.commonAreas.map((area, index) => (
                      <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">Recommended Action:</h4>
                  <p className="text-sm text-primary-700">{pest.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention Tips Section */}
      <section id="prevention-tips" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Prevention Guide
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              DIY Pest Prevention Tips
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Simple steps you can take to make your home less attractive to pests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {preventionCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Prevention Not Working?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              If you're still experiencing pest problems despite following prevention tips,
              it may be time for professional help.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Free Quotes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Calendar Section */}
      <section id="seasonal-calendar" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Seasonal Guide
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Sydney Seasonal Pest Calendar
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Know what pests to expect each season and how to prepare your home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalPests.map((season) => (
              <div key={season.season} className={`bg-white rounded-2xl border-2 overflow-hidden ${
                season.color === 'amber' ? 'border-amber-200' :
                season.color === 'orange' ? 'border-orange-200' :
                season.color === 'blue' ? 'border-blue-200' :
                'border-green-200'
              }`}>
                <div className={`p-4 text-center ${
                  season.color === 'amber' ? 'bg-amber-50' :
                  season.color === 'orange' ? 'bg-orange-50' :
                  season.color === 'blue' ? 'bg-blue-50' :
                  'bg-green-50'
                }`}>
                  <span className="text-4xl">{season.icon}</span>
                  <h3 className="text-xl font-bold text-neutral-900 mt-2">{season.season}</h3>
                  <p className="text-sm text-neutral-600">{season.months}</p>
                </div>

                <div className="p-4">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">Active Pests:</h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {season.pests.map((pest, index) => (
                      <span key={index} className={`px-2 py-1 rounded text-xs font-medium ${
                        season.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                        season.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        season.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {pest}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">Prevention Tips:</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {season.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dangerous Spiders Section */}
      <section id="dangerous-spiders" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4" />
              Safety Information
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Dangerous Spiders in Sydney
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Learn to identify dangerous spider species and know what to do if bitten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Emergency Information</h3>
                  <p className="text-red-700 text-sm">
                    For any suspected funnel-web spider bite, call <strong>000 immediately</strong>.
                    Apply a pressure immobilisation bandage and keep the victim calm and still.
                    For other bites causing severe symptoms, seek medical attention.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {dangerousSpiders.map((spider) => (
                <div key={spider.name} className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{spider.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-700 mb-1">Appearance:</h4>
                      <p className="text-neutral-600 text-sm mb-3">{spider.appearance}</p>

                      <h4 className="text-sm font-semibold text-neutral-700 mb-1">Habitat:</h4>
                      <p className="text-neutral-600 text-sm">{spider.habitat}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-700 mb-1">Danger Level:</h4>
                      <p className="text-red-600 text-sm mb-3">{spider.danger}</p>

                      <h4 className="text-sm font-semibold text-primary-700 mb-1">If Bitten:</h4>
                      <p className="text-primary-600 text-sm">{spider.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Expert answers to the most common pest control questions from Sydney homeowners.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-neutral-200 group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-neutral-900 pr-4">{faq.question}</h3>
                  <span className="text-primary-600 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Professional Help?
          </h2>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Connect with licensed pest control operators in Sydney.
            Get up to 3 free quotes and compare services.
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
              Browse Operators
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
