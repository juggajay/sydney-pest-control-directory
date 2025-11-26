'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin, Shield, Star, Clock, Phone, ChevronRight, ChevronDown,
  Bug, CheckCircle, Search, Filter, X, ArrowRight
} from 'lucide-react';

// Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-accent-400 fill-accent-400' : 'text-neutral-200'
          }`}
        />
      ))}
    </div>
  );
}

function OperatorCard({ operator, services }) {
  const operatorServices = operator.services.map(slug => services.find(s => s.slug === slug)).filter(Boolean);

  return (
    <div className={`card p-6 ${operator.featured ? 'card-premium' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-heading font-semibold text-lg text-neutral-900">
              {operator.businessName}
            </h3>
            {(operator.features?.includes('epa-verified') || operator.epaVerified) && (
              <span className="badge badge-verified">
                <Shield className="w-3 h-3" />
                EPA Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm flex-wrap">
            <div className="flex items-center gap-1">
              <StarRating rating={operator.rating} />
              <span className="text-neutral-600 ml-1">{operator.rating}</span>
            </div>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-600">{operator.reviewCount} reviews</span>
          </div>
        </div>
        {operator.featured && (
          <span className="badge badge-accent">Featured</span>
        )}
      </div>

      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
        {operator.description}
      </p>

      {/* Services */}
      <div className="flex flex-wrap gap-2 mb-4">
        {operatorServices.slice(0, 4).map((service) => (
          <span key={service.slug} className="px-2 py-1 bg-primary-50 rounded-md text-xs text-primary-700">
            {service.shortName || service.name}
          </span>
        ))}
        {operatorServices.length > 4 && (
          <span className="px-2 py-1 bg-neutral-100 rounded-md text-xs text-neutral-600">
            +{operatorServices.length - 4} more
          </span>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {operator.features?.includes('same-day-service') && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
            <Clock className="w-3 h-3" />
            Same Day
          </span>
        )}
        {operator.features?.includes('response-guarantee') && (
          <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
            <CheckCircle className="w-3 h-3" />
            2hr Response
          </span>
        )}
      </div>

      {/* Service Areas Preview */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
        <MapPin className="w-4 h-4" />
        <span>Serves {operator.serviceAreas?.length || 0} suburbs</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Clock className="w-4 h-4" />
            <span>{operator.yearsInBusiness || '5'}+ yrs</span>
          </div>
          {operator.phone && (
            <a
              href={`tel:${operator.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          )}
        </div>
        <Link
          href={`/operator/${operator.slug}`}
          className="btn btn-sm btn-primary"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default function OperatorsList({ operators = [], suburbs = [], services = [], regions = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredOperators = useMemo(() => {
    let result = [...operators];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(op =>
        op.businessName?.toLowerCase().includes(query) ||
        op.description?.toLowerCase().includes(query)
      );
    }

    // Region filter
    if (selectedRegion) {
      const regionSuburbs = suburbs.filter(s => s.region === selectedRegion).map(s => s.slug);
      result = result.filter(op =>
        op.serviceAreas?.some(area => regionSuburbs.includes(area))
      );
    }

    // Service filter
    if (selectedService) {
      result = result.filter(op => op.services?.includes(selectedService));
    }

    // Sorting
    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'experience':
        result.sort((a, b) => (b.yearsInBusiness || 0) - (a.yearsInBusiness || 0));
        break;
    }

    return result;
  }, [operators, suburbs, searchQuery, selectedRegion, selectedService, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedService('');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || selectedRegion || selectedService;

  return (
    <>
      {/* Filters Section */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search operators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn btn-secondary gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary-500" />
              )}
            </button>

            {/* Desktop Filters */}
            <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="input"
              >
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="input"
              >
                <option value="">All Services</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>{service.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="experience">Most Experience</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost gap-2 text-neutral-600"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-heading font-semibold text-neutral-900">
              {filteredOperators.length} Operator{filteredOperators.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {filteredOperators.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredOperators.map((operator) => (
                <OperatorCard key={operator.id || operator.slug} operator={operator} services={services} />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No operators found
              </h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your filters or search terms.
              </p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-neutral-600 mb-8">
            Request a quote and we'll match you with the right operators for your pest problem.
          </p>
          <Link href="/quote" className="btn btn-primary btn-lg gap-2">
            Get Free Quotes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
