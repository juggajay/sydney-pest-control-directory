'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Shield, Bug, Search, MapPin, Zap } from 'lucide-react';
import { siteConfig } from '../lib/seo';

const services = [
  { name: 'General Pest Control', href: '/services/general-pest-control', icon: Bug },
  { name: 'Termite Inspection', href: '/services/termite-inspection', icon: Search },
  { name: 'Termite Treatment', href: '/services/termite-treatment', icon: Shield },
  { name: 'Rodent Control', href: '/services/rodent-control', icon: Bug },
  { name: 'Cockroach Control', href: '/services/cockroach-control', icon: Bug },
  { name: 'Bed Bug Treatment', href: '/services/bed-bug-treatment', icon: Bug },
];

const regions = [
  { name: 'Eastern Suburbs', suburbs: ['bondi', 'randwick', 'maroubra', 'coogee'] },
  { name: 'Inner West', suburbs: ['newtown', 'marrickville', 'leichhardt', 'balmain'] },
  { name: 'North Shore', suburbs: ['north-sydney', 'mosman', 'chatswood', 'lane-cove'] },
  { name: 'Northern Beaches', suburbs: ['manly', 'dee-why', 'mona-vale', 'freshwater'] },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-primary-500' : 'bg-white/20 backdrop-blur'
            }`}>
              <Zap className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <span className={`font-heading font-bold text-lg transition-colors ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`}>
                Pest<Zap className="inline w-4 h-4 text-amber-400" />Arrest
              </span>
              <span className={`hidden sm:block text-xs transition-colors ${
                isScrolled ? 'text-neutral-500' : 'text-white/70'
              }`}>
                Sydney's Trusted Pest Control
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in">
                  <div className="bg-white rounded-xl shadow-elevated border border-neutral-100 py-2 overflow-hidden">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        <service.icon className="w-4 h-4 text-primary-500" />
                        {service.name}
                      </Link>
                    ))}
                    <div className="border-t border-neutral-100 mt-2 pt-2">
                      <Link
                        href="/services"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('locations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Locations
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'locations' && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-fade-in">
                  <div className="bg-white rounded-xl shadow-elevated border border-neutral-100 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {regions.map((region) => (
                        <div key={region.name}>
                          <h4 className="font-medium text-sm text-neutral-900 mb-2">{region.name}</h4>
                          <ul className="space-y-1">
                            {region.suburbs.map((suburb) => (
                              <li key={suburb}>
                                <Link
                                  href={`/pest-control/${suburb}`}
                                  className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                                >
                                  {suburb.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-neutral-100 mt-4 pt-3">
                      <Link
                        href="/locations"
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        View All 100+ Sydney Suburbs →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/operators"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isScrolled
                  ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Find Operators
            </Link>

            <Link
              href="/resources"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isScrolled
                  ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Resources
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:1300277378"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isScrolled
                  ? 'text-neutral-700 hover:text-primary-600'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
            </a>
            <Link
              href="/quote"
              className="btn btn-primary btn-sm"
            >
              Get Free Quotes
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-neutral-700 hover:bg-neutral-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-white border-t border-neutral-100 shadow-elevated animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Services</h3>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-3 rounded-lg text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    <service.icon className="w-4 h-4 text-primary-500" />
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-4">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Popular Locations</h3>
              <div className="flex flex-wrap gap-2">
                {['bondi', 'sydney-cbd', 'north-sydney', 'parramatta', 'manly', 'newtown'].map((suburb) => (
                  <Link
                    key={suburb}
                    href={`/pest-control/${suburb}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-neutral-600 bg-neutral-100 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    {suburb.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-4 space-y-2">
              <Link
                href="/operators"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-3 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Find Operators
              </Link>
              <Link
                href="/resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-3 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Resources
              </Link>
            </div>

            <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
              <a
                href="tel:1300277378"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-neutral-200 text-neutral-700 font-medium"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>
              <Link
                href="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                Get Free Quotes
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
