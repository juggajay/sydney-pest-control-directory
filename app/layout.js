import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateWebsiteSchema, generateOrganizationSchema, siteConfig } from '../lib/seo';

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Pest Arrest | Sydney Pest Control Directory | EPA-Verified Operators',
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Find licensed pest control in Sydney. Compare 200+ EPA-verified operators. Get free quotes in 24hrs for termite, cockroach & rodent control. 4.8★ rated!',
  keywords: ['pest control sydney', 'pest arrest', 'pest control directory sydney', 'find pest control sydney', 'compare pest control sydney', 'licensed pest control', 'EPA verified pest control', 'pest control near me', 'sydney pest control services'],
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
    title: `${siteConfig.name} | Find Licensed Pest Controllers in Sydney`,
    description: 'Find EPA-verified pest control services across Sydney. Compare quotes from 200+ licensed operators.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
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
