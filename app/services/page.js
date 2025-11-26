import Link from 'next/link';
import { Bug, Shield, ChevronRight, Search, DollarSign, ArrowRight, Phone } from 'lucide-react';
import { services } from '../../lib/data';
import { generateMetadata as genMeta } from '../../lib/seo';

export const metadata = genMeta({
  title: 'Pest Control Services Sydney - Prices & Service Guide',
  description: 'Compare all pest control services available in Sydney. Termite inspections, general pest control, rodent control, bed bugs & more. View prices and find licensed operators.',
  path: '/services',
});

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card p-6 group hover:border-primary-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
          <Bug className="w-7 h-7 text-primary-500" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {service.name}
          </h2>
          <p className="text-neutral-600 mb-4 line-clamp-2">
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary-500" />
              <span className="text-lg font-semibold text-primary-600">{service.priceRange}</span>
            </div>
            <span className="flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 hero-gradient hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Services</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Pest Control Services
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Browse all pest control services available in Sydney. Compare prices, understand 
              what's included, and find licensed operators for each service type.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="btn btn-accent btn-lg gap-2">
                Get Free Quotes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:1300737834" className="btn btn-lg bg-white/10 text-white hover:bg-white/20 gap-2">
                <Phone className="w-5 h-5" />
                1300 PEST FIND
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30Q1200 0 720 30Q240 60 0 30L0 60Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
              Sydney Pest Control Pricing Guide
            </h2>
            <p className="text-neutral-600">
              Average prices for common pest control services in Sydney
            </p>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Price Range</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {services.map((service) => (
                  <tr key={service.slug} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/services/${service.slug}`} className="font-medium text-neutral-900 hover:text-primary-600 transition-colors">
                        {service.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-primary-600 font-semibold">{service.priceRange}</td>
                    <td className="px-6 py-4 text-neutral-600">{service.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-neutral-500 text-center">
            Prices are estimates only and may vary based on property size, severity, and specific requirements.
            Always get multiple quotes before booking.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Need Help Choosing a Service?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Not sure which service you need? Request a quote and our operators will help identify your pest problem.
          </p>
          <Link href="/quote" className="btn btn-accent btn-lg gap-2">
            Get Free Quotes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
