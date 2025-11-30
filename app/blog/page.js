import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Tag, Search } from 'lucide-react';
import { getBlogPosts } from '../../lib/supabase';
import { generateBreadcrumbSchema, siteConfig } from '../../lib/seo';
import { BlogCard } from '../../components/blog';

// Static blog posts data for when Supabase is not available
import { blogPosts } from '../../data/blog-posts';

export const metadata = {
  title: 'Pest Control Blog | Expert Guides & Tips for Sydney Homeowners',
  description: 'Expert pest control advice for Sydney homeowners. Learn about termite prevention, cockroach control, rodent signs, and seasonal pest management from EPA-verified professionals.',
  keywords: ['pest control blog', 'pest control tips sydney', 'termite prevention guide', 'cockroach control tips', 'rodent prevention', 'pest control advice'],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: 'Pest Control Blog | Expert Guides for Sydney Homeowners',
    description: 'Expert pest control advice from EPA-verified professionals. Prevention tips, identification guides, and treatment information.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
};

const categories = [
  { slug: 'all', name: 'All Articles', count: 5 },
  { slug: 'pest-identification', name: 'Pest Identification', count: 2 },
  { slug: 'seasonal', name: 'Seasonal Guides', count: 1 },
  { slug: 'pricing', name: 'Pricing Guides', count: 1 },
  { slug: 'prevention', name: 'Prevention Tips', count: 1 },
];

export default async function BlogPage() {
  // Try to get posts from Supabase, fall back to static data
  let posts = await getBlogPosts();
  if (!posts || posts.length === 0) {
    posts = blogPosts;
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {index < breadcrumbs.length - 1 ? (
                  <Link href={crumb.path} className="hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Pest Control Blog
              </h1>
              <p className="text-primary-100">Expert guides for Sydney homeowners</p>
            </div>
          </div>

          <p className="text-lg text-primary-100 max-w-2xl mb-6">
            Learn how to identify, prevent, and deal with common pests in Sydney.
            Expert advice from EPA-licensed professionals to protect your home and family.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-white font-bold">{posts.length}</span>
              <span className="text-primary-100 ml-1">Articles</span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-white font-bold">5</span>
              <span className="text-primary-100 ml-1">Categories</span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-emerald-300 font-bold">Expert Reviewed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-thin pb-2">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat.slug === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                <Tag className="w-4 h-4" />
                {cat.name}
                <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                Featured Article
              </span>
            </div>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            Latest Articles
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">
                No articles yet
              </h3>
              <p className="text-neutral-500">
                Check back soon for expert pest control advice!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated on Pest Control Tips
          </h2>
          <p className="text-primary-100 mb-8">
            Get seasonal pest alerts, prevention tips, and exclusive guides delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="btn btn-accent btn-lg gap-2"
            >
              Get Free Pest Control Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            Popular Topics
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/services/termite-inspection"
              className="card p-4 hover:border-primary-300 transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-1">Termite Inspections</h3>
              <p className="text-sm text-neutral-600">Find licensed inspectors in Sydney</p>
            </Link>
            <Link
              href="/services/cockroach-control"
              className="card p-4 hover:border-primary-300 transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-1">Cockroach Control</h3>
              <p className="text-sm text-neutral-600">Professional treatment options</p>
            </Link>
            <Link
              href="/services/rodent-control"
              className="card p-4 hover:border-primary-300 transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-1">Rodent Control</h3>
              <p className="text-sm text-neutral-600">Rat & mouse removal services</p>
            </Link>
            <Link
              href="/resources/guides/termite-guide-sydney"
              className="card p-4 hover:border-primary-300 transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-1">Termite Guide</h3>
              <p className="text-sm text-neutral-600">Complete Sydney termite resource</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
