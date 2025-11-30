import Link from 'next/link';
import {
  Shield, CheckCircle, AlertTriangle, Bug, Home, Calendar,
  DollarSign, MapPin, ArrowRight, FileText, Thermometer,
  Droplets, Eye, Clock
} from 'lucide-react';
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from '../../../../lib/seo';

export const metadata = {
  title: 'Complete Termite Guide Sydney 2024 | Prevention, Signs & Treatment Costs',
  description: 'Everything Sydney homeowners need to know about termites. Identify signs, understand treatment options, costs ($250-$5000+), and find EPA-licensed inspectors. Updated for 2024.',
  keywords: ['termite guide sydney', 'termite inspection', 'termite treatment cost sydney', 'white ant control', 'termite prevention', 'termite signs', 'termite barrier sydney'],
  alternates: {
    canonical: 'https://sydneypestcontrol.com.au/resources/guides/termite-guide-sydney',
  },
};

// FAQ data for schema
const termiteFAQs = [
  {
    question: 'How much does a termite inspection cost in Sydney?',
    answer: 'A professional termite inspection in Sydney typically costs $250-$500 for a standard residential property. Factors affecting price include property size, accessibility (especially subfloor and roof void), and whether thermal imaging is included. Most reputable inspectors include thermal imaging as standard.'
  },
  {
    question: 'How often should I get a termite inspection in Sydney?',
    answer: 'Australian Standard AS 3660 recommends annual termite inspections for properties in termite-prone areas. Most of Sydney is classified as high-risk due to warm, humid climate. Properties with previous termite history or near bushland may benefit from 6-monthly inspections.'
  },
  {
    question: 'What are the signs of termites in my Sydney home?',
    answer: 'Common signs include: mud tubes on walls or foundations, hollow-sounding timber when tapped, bubbling or cracking paint on wood surfaces, tight-fitting doors or windows, discarded wings near windows, and visible damage to skirting boards or door frames. If you notice any signs, get an inspection immediately.'
  },
  {
    question: 'How much does termite treatment cost in Sydney?',
    answer: 'Termite treatment in Sydney typically costs $2,000-$5,000+ depending on the treatment method and property size. Chemical soil barriers cost $2,000-$4,000, baiting systems $3,000-$5,000, and physical barriers for new constructions $1,500-$3,000. Severe infestations may cost more.'
  },
  {
    question: 'What is the best termite treatment for Sydney homes?',
    answer: 'The best treatment depends on your situation. Chemical barriers (Termidor) are most common and effective for 5-8 years. Baiting systems are less invasive and ideal for homes where chemical barriers are difficult to install. Many professionals recommend combining both methods for maximum protection.'
  },
  {
    question: 'Are termites covered by home insurance in NSW?',
    answer: 'Standard home insurance in NSW does NOT cover termite damage. Termite damage is considered a maintenance issue. This is why regular inspections are crucial - catching termites early can save tens of thousands in repair costs that won\'t be covered by insurance.'
  },
  {
    question: 'Which Sydney suburbs have the highest termite risk?',
    answer: 'High-risk areas include suburbs with older homes, established trees, and bushland proximity: Eastern Suburbs (older homes), Northern Beaches (bushland), Hills District (trees), and Western Sydney (soil conditions). However, termites are found across all Sydney suburbs.'
  },
  {
    question: 'How long does termite treatment take?',
    answer: 'Chemical barrier installation typically takes 1-2 days. Baiting systems are installed in a few hours but require 3-12 months to eliminate the colony. Most treatments include follow-up inspections at 3 and 12 months to confirm elimination.'
  },
];

// Content sections
const termiteSigns = [
  {
    icon: Eye,
    title: 'Mud Tubes',
    description: 'Pencil-sized tunnels on walls, foundations, or in subfloor. Termites build these protected highways between their colony and food source.',
    severity: 'high'
  },
  {
    icon: Home,
    title: 'Hollow-Sounding Timber',
    description: 'Tap wooden surfaces - if they sound hollow or papery, termites may have eaten the inside while leaving the exterior intact.',
    severity: 'high'
  },
  {
    icon: Droplets,
    title: 'Bubbling Paint',
    description: 'Paint that appears bubbled, cracked, or uneven on wood surfaces often indicates moisture from termite activity underneath.',
    severity: 'medium'
  },
  {
    icon: Bug,
    title: 'Discarded Wings',
    description: 'Piles of small wings near windows or doors indicate a termite swarm has occurred - reproductive termites starting new colonies.',
    severity: 'medium'
  },
  {
    icon: AlertTriangle,
    title: 'Tight Doors/Windows',
    description: 'Doors or windows that suddenly stick or are hard to open may be warped from moisture produced by termites eating nearby timber.',
    severity: 'medium'
  },
  {
    icon: FileText,
    title: 'Damaged Skirting Boards',
    description: 'Visible damage, sagging, or crumbling of skirting boards, door frames, or window frames often indicates advanced termite damage.',
    severity: 'high'
  },
];

const treatmentOptions = [
  {
    name: 'Chemical Soil Barrier',
    description: 'Liquid termiticide (usually Termidor) applied to soil around and under the building creates an undetectable barrier that kills termites on contact.',
    priceRange: '$2,000 - $4,000',
    duration: '5-8 years',
    pros: ['Highly effective', 'Long-lasting protection', 'Quick installation'],
    cons: ['Requires drilling/trenching', 'Chemicals in soil', 'May need reapplication'],
    bestFor: 'Established homes, active infestations'
  },
  {
    name: 'Baiting System',
    description: 'Monitoring stations installed around the property contain bait that termites carry back to the colony, eliminating the entire colony over time.',
    priceRange: '$3,000 - $5,000',
    duration: 'Ongoing (requires maintenance)',
    pros: ['No chemicals around home', 'Eliminates entire colony', 'Low disruption'],
    cons: ['Slower to work (3-12 months)', 'Ongoing monitoring costs', 'Requires regular checking'],
    bestFor: 'Prevention, sensitive environments, difficult access'
  },
  {
    name: 'Physical Barriers',
    description: 'Stainless steel mesh or crusite stone barriers installed during construction that termites cannot penetrate or move through.',
    priceRange: '$1,500 - $3,000',
    duration: '50+ years',
    pros: ['Permanent solution', 'No chemicals', 'No maintenance'],
    cons: ['Only for new builds/extensions', 'Higher upfront cost', 'Professional installation required'],
    bestFor: 'New constructions, renovations, extensions'
  },
  {
    name: 'Combination Treatment',
    description: 'Many professionals recommend combining chemical barriers with baiting systems for maximum protection, especially in high-risk areas.',
    priceRange: '$4,000 - $7,000',
    duration: 'Varies',
    pros: ['Maximum protection', 'Multiple modes of action', 'Best for high-risk'],
    cons: ['Higher cost', 'More complex', 'Ongoing maintenance'],
    bestFor: 'High-risk properties, previous infestations'
  },
];

const highRiskSuburbs = [
  { region: 'Eastern Suburbs', suburbs: ['Bondi', 'Randwick', 'Coogee', 'Maroubra'], reason: 'Older federation homes with timber construction' },
  { region: 'Northern Beaches', suburbs: ['Manly', 'Dee Why', 'Mona Vale', 'Avalon'], reason: 'Bushland proximity, high humidity' },
  { region: 'Hills District', suburbs: ['Castle Hill', 'Baulkham Hills', 'Kellyville'], reason: 'Established gardens, tree-lined streets' },
  { region: 'Western Sydney', suburbs: ['Parramatta', 'Penrith', 'Blacktown'], reason: 'Soil conditions favorable to termites' },
  { region: 'Inner West', suburbs: ['Marrickville', 'Newtown', 'Leichhardt'], reason: 'Older terrace homes, timber frames' },
];

export default function TermiteGuidePage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Guides', path: '/resources/guides' },
    { name: 'Termite Guide Sydney', path: '/resources/guides/termite-guide-sydney' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(termiteFAQs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
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

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-accent-500/20 text-accent-200 rounded-full text-sm font-medium">
              Complete Guide
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
              Updated November 2024
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete Termite Guide for Sydney Homeowners
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-8">
            Everything you need to know about termites in Sydney: identification, prevention,
            treatment options, and costs. Protect your biggest investment with expert knowledge.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/services/termite-inspection"
              className="btn btn-accent btn-lg gap-2"
            >
              Find Termite Inspectors
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/quote?service=termite-inspection"
              className="btn btn-lg bg-white/10 text-white hover:bg-white/20"
            >
              Get Free Quotes
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">$8.9B</div>
              <div className="text-sm text-neutral-600">Annual damage in Australia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">1 in 3</div>
              <div className="text-sm text-neutral-600">Sydney homes affected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">$250-500</div>
              <div className="text-sm text-neutral-600">Inspection cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">Annual</div>
              <div className="text-sm text-neutral-600">Recommended inspections</div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="card p-6">
            <h2 className="font-bold text-lg text-neutral-900 mb-4">In This Guide</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { label: 'Termite Warning Signs', anchor: '#signs' },
                { label: 'Treatment Options & Costs', anchor: '#treatment' },
                { label: 'High-Risk Sydney Suburbs', anchor: '#suburbs' },
                { label: 'Prevention Tips', anchor: '#prevention' },
                { label: 'Inspection Process', anchor: '#inspection' },
                { label: 'FAQs', anchor: '#faqs' },
              ].map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary-50 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section id="signs" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Warning Signs of Termites
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Early detection is crucial. Learn to recognize these common signs of termite activity
            in Sydney homes. If you notice any of these, arrange an inspection immediately.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {termiteSigns.map((sign) => (
              <div
                key={sign.title}
                className={`card p-6 ${sign.severity === 'high' ? 'border-red-200 bg-red-50/50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    sign.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <sign.icon className={`w-6 h-6 ${
                      sign.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-neutral-900">{sign.title}</h3>
                      {sign.severity === 'high' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                          High Risk
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600">{sign.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Important: Don't Disturb Termites</h3>
                <p className="text-red-800">
                  If you find termites, don't disturb them or spray with insecticide. This can cause
                  them to scatter and establish new colonies elsewhere in your home. Contact a
                  professional immediately for proper treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section id="treatment" className="py-16 bg-neutral-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Termite Treatment Options & Costs
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Understanding your treatment options helps you make informed decisions.
            Here's what Sydney pest control professionals typically offer.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {treatmentOptions.map((treatment) => (
              <div key={treatment.name} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-900">{treatment.name}</h3>
                  <span className="text-lg font-bold text-primary-600">{treatment.priceRange}</span>
                </div>
                <p className="text-neutral-600 mb-4">{treatment.description}</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Pros
                    </h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      {treatment.pros.map((pro) => (
                        <li key={pro}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Cons
                    </h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      {treatment.cons.map((con) => (
                        <li key={con}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="text-sm">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="ml-2 font-medium text-neutral-900">{treatment.duration}</span>
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    Best for: {treatment.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services/termite-treatment"
              className="btn btn-primary btn-lg gap-2"
            >
              Find Termite Treatment Providers
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* High-Risk Suburbs */}
      <section id="suburbs" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            High-Risk Sydney Suburbs for Termites
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            While termites are found across Sydney, these areas have elevated risk factors.
            If you live in these suburbs, annual inspections are essential.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highRiskSuburbs.map((area) => (
              <div key={area.region} className="card p-6">
                <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  {area.region}
                </h3>
                <p className="text-sm text-neutral-500 mb-3">{area.reason}</p>
                <div className="flex flex-wrap gap-2">
                  {area.suburbs.map((suburb) => (
                    <Link
                      key={suburb}
                      href={`/pest-control/${suburb.toLowerCase().replace(' ', '-')}`}
                      className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      {suburb}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section id="prevention" className="py-16 bg-neutral-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Termite Prevention Tips
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Reduce your risk of termite infestation with these practical prevention measures.
          </p>

          <div className="space-y-4">
            {[
              { title: 'Eliminate moisture sources', description: 'Fix leaking taps, pipes, and air conditioning units. Ensure proper drainage away from foundations.' },
              { title: 'Maintain ventilation', description: 'Keep subfloor areas well-ventilated. Install additional vents if necessary.' },
              { title: 'Remove timber-to-ground contact', description: 'Don\'t store firewood, timber, or cardboard against your house. Keep garden beds away from walls.' },
              { title: 'Regular inspections', description: 'Schedule annual professional inspections, more frequently in high-risk areas.' },
              { title: 'Maintain chemical barriers', description: 'If you have a chemical barrier, ensure it\'s not breached by landscaping or construction.' },
              { title: 'Address landscaping', description: 'Avoid heavy mulching against walls. Keep trees and shrubs trimmed back from the house.' },
            ].map((tip, index) => (
              <div key={tip.title} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{tip.title}</h3>
                  <p className="text-sm text-neutral-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {termiteFAQs.map((faq, index) => (
              <details key={index} className="group card p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                  <ArrowRight className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-90 flex-shrink-0" />
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
            Protect Your Home from Termites
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a professional termite inspection from an EPA-licensed operator today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote?service=termite-inspection"
              className="btn btn-accent btn-lg gap-2 w-full sm:w-auto"
            >
              Get Free Inspection Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services/termite-inspection"
              className="btn btn-lg bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto"
            >
              Find Inspectors Near You
            </Link>
          </div>
        </div>
      </section>

      {/* Related Content - Topic Cluster Links */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Related Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/services/termite-inspection" className="card p-4 hover:border-primary-300 transition-colors">
              <h3 className="font-semibold text-neutral-900 mb-1">Termite Inspections</h3>
              <p className="text-sm text-neutral-600">Find licensed inspectors</p>
            </Link>
            <Link href="/services/termite-treatment" className="card p-4 hover:border-primary-300 transition-colors">
              <h3 className="font-semibold text-neutral-900 mb-1">Termite Treatment</h3>
              <p className="text-sm text-neutral-600">Treatment providers & costs</p>
            </Link>
            <Link href="/services/pre-purchase-inspection" className="card p-4 hover:border-primary-300 transition-colors">
              <h3 className="font-semibold text-neutral-900 mb-1">Pre-Purchase Inspection</h3>
              <p className="text-sm text-neutral-600">Buying a home? Check for termites</p>
            </Link>
            <Link href="/resources/case-studies" className="card p-4 hover:border-primary-300 transition-colors">
              <h3 className="font-semibold text-neutral-900 mb-1">Case Studies</h3>
              <p className="text-sm text-neutral-600">Real termite treatment results</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
