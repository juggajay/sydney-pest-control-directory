'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="card p-5 sticky top-24">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
        <List className="w-5 h-5 text-primary-600" />
        <h4 className="font-bold text-neutral-900">In This Article</h4>
      </div>

      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`
                flex items-center gap-2 py-1.5 text-sm transition-colors
                ${level === 2 ? 'pl-0' : 'pl-4'}
                ${activeId === id
                  ? 'text-primary-600 font-medium'
                  : 'text-neutral-600 hover:text-primary-600'
                }
              `}
            >
              <ChevronRight className={`w-3 h-3 transition-transform ${activeId === id ? 'rotate-90' : ''}`} />
              <span className="line-clamp-1">{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
