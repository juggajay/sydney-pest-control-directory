'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';

export default function SearchBox({ suburbs = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter suburbs for search
  const filteredSuburbs = searchQuery.length > 1
    ? suburbs.filter(s =>
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.postcode?.includes(searchQuery)
      ).slice(0, 6)
    : [];

  return (
    <div className="relative max-w-2xl animate-fade-in-up animate-delay-200">
      <div className={`search-box ${searchFocused ? 'ring-2 ring-white/30' : ''}`}>
        <div className="flex items-center gap-2 px-5 text-neutral-400">
          <MapPin className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Enter your suburb or postcode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          className="flex-1 py-5 pr-4 text-lg bg-transparent border-none outline-none text-neutral-800 placeholder:text-neutral-400"
        />
        <button className="btn btn-primary m-2 gap-2">
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {searchFocused && filteredSuburbs.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-elevated border border-neutral-100 overflow-hidden z-50 animate-fade-in">
          {filteredSuburbs.map((suburb) => (
            <Link
              key={suburb.id || suburb.slug}
              href={`/pest-control/${suburb.id || suburb.slug}`}
              className="flex items-center gap-3 px-5 py-3 hover:bg-primary-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary-500" />
              <div>
                <span className="font-medium text-neutral-900">{suburb.name}</span>
                <span className="text-sm text-neutral-500 ml-2">{suburb.postcode}</span>
              </div>
              <span className="ml-auto text-sm text-neutral-400">{suburb.region}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
