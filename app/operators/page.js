import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { operators, suburbs, services, getRegions } from '../../lib/data';
import OperatorsList from '../../components/OperatorsList';

// Dynamic metadata handled via generateMetadata
export async function generateMetadata() {
  const { operators } = await import('../../lib/data');
  return {
    title: `${operators.length} EPA-Licensed Pest Control Operators Sydney | Pest Arrest`,
    description: `Browse ${operators.length} EPA-verified pest control operators serving Sydney. Compare licensed professionals for termites, cockroaches, rodents, spiders and more. Get free quotes today.`,
  };
}

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

      {/* Intro Section */}
      <section className="py-8 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-lg text-stone-600 max-w-4xl">
            Browse our directory of EPA-licensed pest control operators serving Greater Sydney.
            Every operator is verified against the NSW EPA pesticide register, so you can book with confidence.
            Compare profiles, check service areas, and request free quotes from multiple operators.
          </p>
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
