import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export default function RelatedPosts({ posts = [], title = 'Related Articles' }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{title}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card p-5 group hover:border-primary-300"
            >
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full">
                  {post.category || 'Guide'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.reading_time_minutes || 5} min
                </span>
              </div>

              <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
              )}

              <span className="flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
