'use client';

import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';

/**
 * Google Maps Embed Component - SEO Optimized
 *
 * Uses the standard Google Maps iframe embed code for maximum SEO benefit.
 *
 * SEO Benefits:
 * - Improves local relevance signals for search engines
 * - Links to Google Business Profile
 * - Increases user engagement and dwell time
 * - Builds trust with visible location
 * - Supports NAP (Name, Address, Phone) consistency
 *
 * Best Practices Implemented:
 * - Responsive iframe with CSS
 * - loading="lazy" for performance
 * - Get Directions link opens in Google Maps app on mobile
 * - Click-to-call functionality
 * - Crawlable NAP text
 */
export default function GoogleMap({
  address,
  businessName,
  suburb,
  postcode,
  phone,
  state = 'NSW',
  className = '',
  height = '300px',
  showNAP = true
}) {
  // Construct the full address for the map query
  const fullAddress = address
    ? `${address}, ${suburb || ''} ${state} ${postcode || ''}, Australia`.replace(/\s+/g, ' ').trim()
    : `${businessName}, ${suburb || 'Sydney'} ${state} Australia`;

  // URL encode for the embed
  const encodedAddress = encodeURIComponent(fullAddress);
  const encodedBusinessName = encodeURIComponent(businessName || '');
  const encodedSuburb = encodeURIComponent(suburb || 'Sydney');

  // Google Maps Embed URL - using place mode for business marker
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;

  // Google Maps directions URL - opens in Google Maps app on mobile
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  // Google Maps search URL to find the business
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedBusinessName}+${encodedSuburb}+${state}`;

  // Format phone for tel: link
  const phoneClean = phone?.replace(/\s/g, '') || '';

  return (
    <div className={`rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm ${className}`}>
      {/* Map Header with Get Directions */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          <span className="font-medium text-neutral-900">Location</span>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          aria-label={`Get directions to ${businessName}`}
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </a>
      </div>

      {/* Responsive Map Embed with lazy loading */}
      <div
        style={{ height }}
        className="relative w-full"
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing location of ${businessName} in ${suburb || 'Sydney'}`}
          className="absolute inset-0"
          aria-label={`Google Map showing ${businessName} location`}
        />
      </div>

      {/* NAP (Name, Address, Phone) Section - Crawlable text for SEO */}
      {showNAP && (
        <div className="p-4 bg-neutral-50 space-y-3">
          {/* Business Name */}
          <p className="font-semibold text-neutral-900" itemProp="name">
            {businessName}
          </p>

          {/* Address - crawlable plain text */}
          <address className="text-sm text-neutral-600 not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            {address && <span itemProp="streetAddress">{address}</span>}
            {address && <br />}
            <span itemProp="addressLocality">{suburb || 'Sydney'}</span>
            {postcode && <>, <span itemProp="postalCode">{postcode}</span></>}
            {' '}<span itemProp="addressRegion">{state}</span>
            {' '}<span itemProp="addressCountry">Australia</span>
          </address>

          {/* Click-to-call button */}
          {phone && (
            <a
              href={`tel:${phoneClean}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
              itemProp="telephone"
              aria-label={`Call ${businessName} at ${phone}`}
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
          )}

          {/* View on Google Maps link */}
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            aria-label={`View ${businessName} on Google Maps`}
          >
            <ExternalLink className="w-4 h-4" />
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * Alternative: Static Map Image (no iframe, faster loading)
 * Use this if you need better performance or have API key limits
 */
export function StaticGoogleMap({
  address,
  businessName,
  suburb,
  postcode,
  width = 600,
  height = 300,
  zoom = 15,
  className = ''
}) {
  const fullAddress = address
    ? `${address}${postcode ? `, ${postcode}` : ''}, Australia`
    : `${businessName}, ${suburb} NSW Australia`;

  const encodedAddress = encodeURIComponent(fullAddress);

  // Static Maps API URL (requires API key with billing enabled)
  // const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=${zoom}&size=${width}x${height}&markers=color:red%7C${encodedAddress}&key=YOUR_API_KEY`;

  // For now, use the embed version which is free
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 transition-colors ${className}`}
    >
      <div className="aspect-video bg-neutral-100 flex items-center justify-center">
        <div className="text-center p-4">
          <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-600">{address || `${suburb} NSW`}</p>
          <p className="text-xs text-primary-600 mt-1">Click to view on Google Maps</p>
        </div>
      </div>
    </a>
  );
}
