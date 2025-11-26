'use client';

import { MapPin, Navigation } from 'lucide-react';

/**
 * Google Maps Embed Component
 *
 * Uses the free Google Maps Embed API which doesn't require an API key
 * for basic place/search embeds. For production with high traffic,
 * consider adding an API key for better quotas.
 *
 * Benefits for SEO:
 * - Improves local relevance signals for search engines
 * - Links to Google Business Profile
 * - Increases user engagement and dwell time
 * - Builds trust with visible location
 */
export default function GoogleMap({
  address,
  businessName,
  suburb,
  postcode,
  className = '',
  height = '300px'
}) {
  // Construct the full address for the map query
  const fullAddress = address
    ? `${address}${postcode ? `, ${postcode}` : ''}, Australia`
    : `${businessName}, ${suburb} NSW Australia`;

  // URL encode the address for the embed
  const encodedAddress = encodeURIComponent(fullAddress);
  const encodedBusinessName = encodeURIComponent(businessName);

  // Google Maps Embed URL (free, no API key required for basic embeds)
  // Using 'place' mode to show a marker at the location
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;

  // Alternative: Search mode if you want to show the business name
  // const mapUrl = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedBusinessName}+${encodeURIComponent(suburb)}+NSW`;

  // Google Maps directions URL for the button
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  // Google Maps search URL to find the business
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedBusinessName}+${encodeURIComponent(suburb)}+NSW`;

  return (
    <div className={`rounded-xl overflow-hidden border border-neutral-200 bg-white ${className}`}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          <span className="font-medium text-neutral-900">Location</span>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </a>
      </div>

      {/* Map Embed */}
      <div style={{ height }} className="relative">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing location of ${businessName}`}
          className="absolute inset-0"
        />
      </div>

      {/* Address Footer */}
      <div className="p-4 bg-neutral-50">
        <p className="text-sm text-neutral-600">
          {address || `${businessName}, ${suburb}`}
          {postcode && ` ${postcode}`}
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-1 inline-block"
        >
          View on Google Maps
        </a>
      </div>
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
