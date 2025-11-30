'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const INITIAL_COUNT = 10;

export default function ServiceAreasCard({ serviceAreas }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedAreas = isExpanded ? serviceAreas : serviceAreas.slice(0, INITIAL_COUNT);
  const hasMore = serviceAreas.length > INITIAL_COUNT;
  const remainingCount = serviceAreas.length - INITIAL_COUNT;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-neutral-900">Service Areas</h2>
        <span className="text-sm text-neutral-500">{serviceAreas.length} suburbs</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {displayedAreas.map((suburb) => (
          <Link
            key={suburb.id || suburb.slug}
            href={`/pest-control/${suburb.id || suburb.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors text-sm"
          >
            <MapPin className="w-3 h-3" />
            {suburb.name}
          </Link>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show {remainingCount} more suburbs
            </>
          )}
        </button>
      )}
    </div>
  );
}
