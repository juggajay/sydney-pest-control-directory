import { suburbs, services } from '../../lib/data';
import QuoteForm from '../../components/QuoteForm';

export const metadata = {
  title: 'Get Free Pest Control Quotes | Sydney Pest Control Directory',
  description: 'Request free quotes from up to 3 licensed pest control operators in Sydney. Fast response, no obligation.',
};

export default function QuotePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 hero-gradient hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Get Free Pest Control Quotes
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Tell us about your pest problem and receive quotes from up to 3 licensed operators.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30Q1200 0 720 30Q240 60 0 30L0 60Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <QuoteForm suburbs={suburbs} services={services} />
        </div>
      </section>
    </>
  );
}
