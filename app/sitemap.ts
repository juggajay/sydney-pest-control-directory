import { MetadataRoute } from 'next';
import { getAllSuburbs, getAllOperatorSlugs } from '../lib/data';
import { blogPosts } from '../data/blog-posts';

const BASE_URL = 'https://pestarrest.com.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/operators`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Service pages
  const services = [
    'general-pest-control',
    'termite-inspection',
    'termite-treatment',
    'cockroach-control',
    'rodent-control',
    'spider-control',
    'bed-bug-treatment',
    'ant-control',
    'wasp-removal',
    'possum-removal',
    'flea-treatment',
    'bird-control',
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Location/Region pages
  const regions = [
    'eastern-suburbs',
    'inner-west',
    'north-shore',
    'northern-beaches',
    'western-sydney',
    'south-sydney',
    'hills-district',
  ];

  const regionPages: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${BASE_URL}/locations/${region}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Suburb pages (pest-control/[suburb])
  let suburbPages: MetadataRoute.Sitemap = [];
  try {
    const suburbsData = getAllSuburbs();
    if (suburbsData.suburbs && Array.isArray(suburbsData.suburbs)) {
      suburbPages = suburbsData.suburbs.map((suburb: { id: string }) => ({
        url: `${BASE_URL}/pest-control/${suburb.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error generating suburb sitemap entries:', error);
  }

  // Operator pages
  let operatorPages: MetadataRoute.Sitemap = [];
  try {
    const operatorSlugs = getAllOperatorSlugs();
    if (Array.isArray(operatorSlugs)) {
      operatorPages = operatorSlugs.map((slug: string) => ({
        url: `${BASE_URL}/operator/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error generating operator sitemap entries:', error);
  }

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_at || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...regionPages,
    ...suburbPages,
    ...operatorPages,
    ...blogPages,
  ];
}
