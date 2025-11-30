import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar, Clock, ArrowRight, ArrowLeft, Share2, Bookmark,
  Shield, CheckCircle, AlertTriangle, ExternalLink, Tag
} from 'lucide-react';
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedPosts } from '../../../lib/supabase';
import {
  generateBreadcrumbSchema,
  generateBlogArticleSchema,
  generateBlogFAQSchema,
  siteConfig
} from '../../../lib/seo';
import { AuthorBio, TrustBadges, ExpertReviewer, RelatedPosts } from '../../../components/blog';

// Static blog posts data for when Supabase is not available
import { blogPosts, getBlogPostBySlugStatic } from '../../../data/blog-posts';

export async function generateStaticParams() {
  // Try Supabase first, fall back to static
  let slugs = await getAllBlogSlugs();
  if (!slugs || slugs.length === 0) {
    slugs = blogPosts.map(post => post.slug);
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = await getBlogPostBySlug(slug);
  if (!post) {
    post = getBlogPostBySlugStatic(slug);
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords || post.tags,
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      url: `${siteConfig.url}/blog/${slug}`,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      images: post.featured_image ? [post.featured_image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // Try Supabase first, fall back to static data
  let post = await getBlogPostBySlug(slug);
  if (!post) {
    post = getBlogPostBySlugStatic(slug);
  }

  if (!post) {
    notFound();
  }

  // Get related posts
  let relatedPosts = await getRelatedPosts(slug, post.tags || [], 3);
  if (!relatedPosts || relatedPosts.length === 0) {
    relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchema = generateBlogArticleSchema(post);
  const faqSchema = post.faqs?.length > 0 ? generateBlogFAQSchema(post.faqs) : null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {index < breadcrumbs.length - 1 ? (
                  <Link href={crumb.path} className="hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white line-clamp-1">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.category && (
              <span className="px-3 py-1 bg-primary-400/20 text-primary-100 rounded-full text-sm font-medium">
                {post.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )}
            <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
              {formatDate(post.updated_at || post.published_at)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <AuthorBio
              author={{
                name: post.author_name,
                role: post.author_role,
                image: post.author_image,
              }}
              isCompact
            />
            <span className="flex items-center gap-1.5 text-primary-100">
              <Clock className="w-4 h-4" />
              {post.reading_time_minutes || 5} min read
            </span>
            {post.reviewer_name && (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Shield className="w-4 h-4" />
                Expert Reviewed
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <TrustBadges
            publishedAt={post.published_at}
            updatedAt={post.updated_at}
            factCheckedAt={post.last_fact_checked}
            reviewerName={post.reviewer_name}
            reviewerLicense={post.reviewer_license}
            sources={post.sources || []}
          />
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="lg:flex lg:gap-8">
            {/* Article Content */}
            <div className="lg:flex-1">
              {/* Featured Image */}
              {post.featured_image && (
                <div className="mb-8 rounded-2xl overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="prose-custom bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* FAQs Section */}
              {post.faqs && post.faqs.length > 0 && (
                <section className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, index) => (
                      <details key={index} className="group border border-neutral-200 rounded-xl">
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                          <span className="font-semibold text-neutral-900 pr-4">
                            {faq.question}
                          </span>
                          <ArrowRight className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                        </summary>
                        <div className="px-4 pb-4 text-neutral-600">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Sources */}
              {post.sources && post.sources.length > 0 && (
                <section className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-primary-600" />
                    Sources & References
                  </h3>
                  <ul className="space-y-2">
                    {post.sources.map((source, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-neutral-400">[{index + 1}]</span>
                        <div>
                          <span className="text-neutral-700">{source.title}</span>
                          {source.publisher && (
                            <span className="text-neutral-500"> - {source.publisher}</span>
                          )}
                          {source.url && (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink className="w-3 h-3 inline" />
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Author Bio (Full) */}
              <section className="mt-8">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">About the Author</h3>
                <AuthorBio
                  author={{
                    name: post.author_name,
                    role: post.author_role,
                    bio: post.author_bio,
                    image: post.author_image,
                    linkedin: post.author_linkedin,
                    expertise: ['Pest Control Research', 'EPA License Verification', 'Sydney Property'],
                  }}
                />
              </section>

              {/* Expert Reviewer */}
              {post.reviewer_name && (
                <section className="mt-6">
                  <ExpertReviewer
                    reviewer={{
                      name: post.reviewer_name,
                      role: post.reviewer_role,
                      license: post.reviewer_license,
                      licenseType: post.reviewer_license_type,
                      yearsExperience: post.reviewer_years_experience,
                      specialization: post.reviewer_specialization,
                    }}
                  />
                </section>
              )}

              {/* Disclaimer */}
              <section className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Important Disclaimer</h4>
                    <p className="text-sm text-amber-800">
                      This article provides educational information about pest control in Sydney.
                      It is not a substitute for professional pest inspection and treatment.
                      Always use EPA-licensed pest controllers for chemical applications.
                      For pest emergencies, contact a licensed operator immediately.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-12 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Professional Pest Control?
          </h2>
          <p className="text-primary-100 mb-8">
            Get free quotes from EPA-licensed operators in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn btn-accent btn-lg gap-2">
              Get Free Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/operators" className="btn btn-lg bg-white/10 text-white hover:bg-white/20">
              Find Local Operators
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Internal Links */}
      {(post.related_services?.length > 0 || post.related_suburbs?.length > 0) && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Related Services & Locations</h2>
            <div className="flex flex-wrap gap-2">
              {post.related_services?.map((service) => (
                <Link
                  key={service}
                  href={`/services/${service}`}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
                >
                  {service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
              {post.related_suburbs?.map((suburb) => (
                <Link
                  key={suburb}
                  href={`/pest-control/${suburb}`}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
                >
                  {suburb.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-8 bg-neutral-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>
    </>
  );
}
