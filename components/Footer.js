import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'General Pest Control', href: '/services/general-pest-control' },
    { name: 'Termite Inspection', href: '/services/termite-inspection' },
    { name: 'Termite Treatment', href: '/services/termite-treatment' },
    { name: 'Rodent Control', href: '/services/rodent-control' },
    { name: 'Cockroach Control', href: '/services/cockroach-control' },
    { name: 'Bed Bug Treatment', href: '/services/bed-bug-treatment' },
    { name: 'Spider Control', href: '/services/spider-control' },
    { name: 'Possum Removal', href: '/services/possum-removal' },
  ],
  locations: [
    { name: 'Eastern Suburbs', href: '/locations/eastern-suburbs' },
    { name: 'Inner West', href: '/locations/inner-west' },
    { name: 'North Shore', href: '/locations/north-shore' },
    { name: 'Northern Beaches', href: '/locations/northern-beaches' },
    { name: 'South Sydney', href: '/locations/south-sydney' },
    { name: 'Western Sydney', href: '/locations/western-sydney' },
    { name: 'Hills District', href: '/locations/hills-district' },
    { name: 'All Locations', href: '/locations' },
  ],
  popularSuburbs: [
    { name: 'Bondi', href: '/pest-control/bondi' },
    { name: 'Sydney CBD', href: '/pest-control/sydney-cbd' },
    { name: 'North Sydney', href: '/pest-control/north-sydney' },
    { name: 'Parramatta', href: '/pest-control/parramatta' },
    { name: 'Manly', href: '/pest-control/manly' },
    { name: 'Chatswood', href: '/pest-control/chatswood' },
    { name: 'Newtown', href: '/pest-control/newtown' },
    { name: 'Cronulla', href: '/pest-control/cronulla' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'For Operators', href: '/for-operators' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">PestFind</span>
                <span className="block text-xs text-neutral-400">Sydney's Pest Control Directory</span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 mb-6 max-w-xs">
              Australia's most trusted pest control directory. Find EPA-verified operators and get free quotes from licensed professionals.
            </p>
            
            <div className="space-y-3">
              <a href="tel:1300737834" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary-400" />
                1300 PEST FIND
              </a>
              <a href="mailto:hello@sydneypestcontrol.com.au" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary-400" />
                hello@sydneypestcontrol.com.au
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-400" />
                Sydney, NSW, Australia
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Regions</h4>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Suburbs */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Popular Suburbs</h4>
            <ul className="space-y-2">
              {footerLinks.popularSuburbs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-neutral-300 font-medium">EPA Licensed</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50">
              <span className="text-amber-400">★★★★★</span>
              <span className="text-neutral-300 font-medium">500+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50">
              <span className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">✓</span>
              <span className="text-neutral-300 font-medium">Free Quotes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50">
              <span className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">✓</span>
              <span className="text-neutral-300 font-medium">No Obligation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} Sydney Pest Control Directory. All rights reserved.</p>
            <p>
              All pest control operators are independently licensed by the{' '}
              <a href="https://www.epa.nsw.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">
                NSW EPA
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
