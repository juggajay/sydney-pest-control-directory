import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateWebsiteSchema, generateOrganizationSchema, siteConfig } from '../lib/seo';

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Sydney Pest Control Directory | Find Licensed Pest Controllers Near You',
    template: '%s | Sydney Pest Control Directory',
  },
  description: 'Find EPA-verified pest control services across Sydney. Compare quotes from 500+ licensed operators. Termite inspections, general pest control, rodent removal & more.',
  keywords: ['pest control sydney', 'termite inspection', 'pest control near me', 'cockroach control', 'rodent control', 'bed bug treatment', 'licensed pest controller'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Sydney Pest Control Directory | Find Licensed Pest Controllers',
    description: 'Find EPA-verified pest control services across Sydney. Compare quotes from 500+ licensed operators.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sydney Pest Control Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sydney Pest Control Directory',
    description: 'Find EPA-verified pest control services across Sydney',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en-AU">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a5d3a" />
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="Sydney" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
