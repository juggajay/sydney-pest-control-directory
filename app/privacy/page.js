import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Sydney Pest Control Directory',
  description: 'Privacy Policy for Sydney Pest Control Directory. Learn how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, personal information, Sydney pest control directory',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-primary-100">
            Last updated: November 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-12">
            <div className="prose prose-neutral max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
              <p className="text-neutral-600 mb-6">
                Sydney Pest Control Directory ("we", "our", or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website sydneypestcontrol.com.au.
              </p>
              <p className="text-neutral-600 mb-8">
                Please read this privacy policy carefully. By using our website, you consent to the
                practices described in this policy.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Personal Information</h3>
              <p className="text-neutral-600 mb-4">
                We may collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>Submit a quote request form</li>
                <li>Contact us via email or phone</li>
                <li>Sign up for our newsletter</li>
                <li>Leave a review for a pest control operator</li>
                <li>Register as a pest control operator</li>
              </ul>
              <p className="text-neutral-600 mb-4">
                This information may include:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>Name and contact details (email, phone number, address)</li>
                <li>Property details relevant to pest control services</li>
                <li>Communication preferences</li>
                <li>Business information (for operators)</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Automatically Collected Information</h3>
              <p className="text-neutral-600 mb-4">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device information</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-neutral-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>Connect you with pest control operators in your area</li>
                <li>Process and respond to your enquiries</li>
                <li>Send you quotes from pest control operators</li>
                <li>Improve our website and services</li>
                <li>Send relevant marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure website security</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Information Sharing</h2>
              <p className="text-neutral-600 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>
                  <strong>Pest Control Operators:</strong> When you request a quote, we share your contact
                  details and service requirements with the operators you select or who service your area.
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party companies that help us operate our website,
                  process payments, or provide customer service.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights.
                </li>
              </ul>
              <p className="text-neutral-600 mb-8">
                We do not sell your personal information to third parties.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-neutral-600 mb-4">
                Our website uses cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve user experience</li>
                <li>Provide relevant advertising</li>
              </ul>
              <p className="text-neutral-600 mb-8">
                You can control cookies through your browser settings. Disabling cookies may affect
                some website functionality.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Data Security</h2>
              <p className="text-neutral-600 mb-8">
                We implement appropriate technical and organisational measures to protect your personal
                information against unauthorised access, alteration, disclosure, or destruction. However,
                no method of transmission over the internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Your Rights</h2>
              <p className="text-neutral-600 mb-4">
                Under Australian Privacy Principles, you have the right to:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with the OAIC if you believe your privacy has been breached</li>
              </ul>
              <p className="text-neutral-600 mb-8">
                To exercise these rights, please contact us using the details below.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Third-Party Links</h2>
              <p className="text-neutral-600 mb-8">
                Our website may contain links to third-party websites. We are not responsible for the
                privacy practices of these websites. We encourage you to read their privacy policies.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Children's Privacy</h2>
              <p className="text-neutral-600 mb-8">
                Our services are not directed to individuals under 18 years of age. We do not knowingly
                collect personal information from children.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-neutral-600 mb-8">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Contact Us</h2>
              <p className="text-neutral-600 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                <p className="text-neutral-700 font-medium mb-2">Sydney Pest Control Directory</p>
                <p className="text-neutral-600">Email: privacy@sydneypestcontrol.com.au</p>
                <p className="text-neutral-600">Phone: 1300 737 834</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
