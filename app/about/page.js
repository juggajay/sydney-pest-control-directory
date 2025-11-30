import Link from 'next/link';
import {
  Shield, Users, Award, Target, CheckCircle, Star,
  Building, MapPin, Clock, ArrowRight
} from 'lucide-react';
import { operators, suburbs } from '../../lib/data';

export const metadata = {
  title: 'About Us | Sydney Pest Control Directory',
  description: 'Sydney Pest Control Directory connects homeowners with pest control professionals across Sydney. Learn about our mission to make finding trusted pest control simple.',
  keywords: 'about sydney pest control directory, pest control Sydney, pest controllers',
  openGraph: {
    title: 'About Us | Sydney Pest Control Directory',
    description: 'Connecting Sydney homeowners with pest control professionals since 2024.',
    type: 'website',
  },
};

export default function AboutPage() {
  const stats = [
    { number: `${operators.length}+`, label: 'Local Operators', icon: Shield },
    { number: `${suburbs.length}+`, label: 'Suburbs Covered', icon: MapPin },
    { number: '4.8', label: 'Average Rating', icon: Star },
    { number: '10K+', label: 'Happy Customers', icon: Users },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Operators can verify their EPA license to earn a trusted badge. Look for the verified badge on profiles for extra confidence.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our platform is designed to help homeowners make informed decisions with genuine reviews and transparent pricing.',
    },
    {
      icon: Target,
      title: 'Local Focus',
      description: 'We specialise exclusively in Sydney, ensuring deep local knowledge and connections with the best pest controllers in every suburb.',
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain high standards for listed operators including response time commitments and service quality expectations.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Sydney Pest Control Directory
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            We're on a mission to make finding trusted pest control in Sydney simple,
            transparent, and stress-free. Operators can earn verification by confirming their EPA license.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 mb-4">
                  <stat.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-neutral-900">{stat.number}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Sydney Pest Control Directory was founded with a simple goal: to help Sydney
                  homeowners find trustworthy pest control services without the guesswork.
                </p>
                <p>
                  We noticed that finding a reliable pest controller was often a frustrating
                  experience. How do you know if an operator is properly licensed? Are those
                  reviews genuine? Is the quote fair?
                </p>
                <p>
                  That's why we built a platform that verifies every operator against the
                  NSW EPA public register, displays genuine customer reviews, and makes it
                  easy to compare quotes from multiple providers.
                </p>
                <p>
                  Today, we connect thousands of Sydney homeowners with over {operators.length} licensed
                  pest control professionals across more than {suburbs.length} suburbs.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-primary-100 text-lg leading-relaxed mb-6">
                To be Sydney's most trusted platform for connecting homeowners with licensed,
                professional pest control services - making every step from search to booking
                simple and transparent.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">100% Verified Operators</div>
                  <div className="text-primary-200 text-sm">Every listing is EPA-checked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Values</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Verify */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">How We Verify Operators</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our rigorous verification process ensures you're always dealing with licensed professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'License Check',
                description: 'We verify every operator against the NSW EPA public pesticide license register to confirm they hold a valid license.',
              },
              {
                step: '02',
                title: 'Business Verification',
                description: 'We confirm ABN registration, insurance coverage, and business legitimacy before any operator can be listed.',
              },
              {
                step: '03',
                title: 'Ongoing Monitoring',
                description: 'We continuously monitor license status and customer feedback to maintain our quality standards.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-bold text-sm mb-4">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Trusted Pest Control?</h2>
          <p className="text-xl text-primary-200 mb-8">
            Connect with verified pest control professionals in your suburb today.
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
    </div>
  );
}
