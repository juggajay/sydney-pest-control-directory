import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const categoryColors = {
  'pest-identification': 'bg-blue-100 text-blue-700',
  'seasonal': 'bg-amber-100 text-amber-700',
  'diy-vs-professional': 'bg-purple-100 text-purple-700',
  'pricing': 'bg-emerald-100 text-emerald-700',
  'prevention': 'bg-primary-100 text-primary-700',
  'general': 'bg-neutral-100 text-neutral-700',
};

const categoryLabels = {
  'pest-identification': 'Pest Identification',
  'seasonal': 'Seasonal Guide',
  'diy-vs-professional': 'DIY vs Professional',
  'pricing': 'Pricing Guide',
  'prevention': 'Prevention',
  'general': 'General',
};

export default function BlogCard({ post, featured = false }) {
  const {
    slug,
    title,
    excerpt,
    featured_image,
    category = 'general',
    published_at,
    reading_time_minutes = 5,
    author_name = 'Pest Arrest Editorial Team',
  } = post;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="block group">
        <article className="card overflow-hidden">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
              {featured_image ? (
                <img
                  src={featured_image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-6xl">🐜</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category] || categoryColors.general}`}>
                  {categoryLabels[category] || category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(published_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {reading_time_minutes} min read
                </span>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                {title}
              </h2>

              <p className="text-neutral-600 mb-4 flex-grow line-clamp-3">
                {excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-sm text-neutral-500">By {author_name}</span>
                <span className="flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="card overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          {featured_image ? (
            <img
              src={featured_image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <span className="text-4xl">🐜</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[category] || categoryColors.general}`}>
              {categoryLabels[category] || category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(published_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {reading_time_minutes} min
            </span>
          </div>

          <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-neutral-600 mb-4 flex-grow line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
            Read Article <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
