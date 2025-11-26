import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { operators, suburbs, services, getRegions } from '../../lib/data';
import OperatorsList from '../../components/OperatorsList';

export const metadata = {
  title: 'Find Pest Control Operators Sydney | Sydney Pest Control Directory',
  description: 'Browse 100+ EPA-licensed pest control operators serving Sydney. All operators verified against the NSW EPA register. Compare ratings, reviews, and services.',
};

export default function OperatorsPage() {
  const regions = getRegions();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 hero-gradient hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Operators</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Find Pest Control Operators
            </h1>
            <p className="text-xl text-white/80">
              Browse {operators.length} EPA-licensed pest control operators serving Sydney.
              All operators verified against the NSW EPA register.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30Q1200 0 720 30Q240 60 0 30L0 60Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Operators List (Client Component) */}
      <OperatorsList
        operators={operators}
        suburbs={suburbs}
        services={services}
        regions={regions}
      />
    </>
  );
}
