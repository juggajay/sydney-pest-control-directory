import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Sydney Pest Control Directory',
  description: 'Terms of Service for Sydney Pest Control Directory. Read our terms and conditions for using our pest control directory platform.',
  keywords: 'terms of service, terms and conditions, Sydney pest control directory, user agreement',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-600 mb-6">
                By accessing and using Sydney Pest Control Directory ("the Website"), you accept and agree
                to be bound by these Terms of Service. If you do not agree to these terms, please do not
                use the Website.
              </p>
              <p className="text-neutral-600 mb-8">
                We reserve the right to modify these terms at any time. Continued use of the Website
                after any changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Description of Service</h2>
              <p className="text-neutral-600 mb-6">
                Sydney Pest Control Directory is an online platform that connects homeowners and property
                managers with licensed pest control operators in the Sydney metropolitan area. Our services include:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>A searchable directory of pest control operators</li>
                <li>Operator profiles with reviews and ratings</li>
                <li>Quote request functionality</li>
                <li>Educational resources about pest control</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Responsibilities</h2>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">For Consumers</h3>
              <p className="text-neutral-600 mb-4">As a user of the Website, you agree to:</p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>Provide accurate information when requesting quotes</li>
                <li>Not misuse the quote request system</li>
                <li>Conduct your own due diligence when selecting an operator</li>
                <li>Leave honest and fair reviews based on genuine experiences</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">For Pest Control Operators</h3>
              <p className="text-neutral-600 mb-4">Listed operators agree to:</p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>Maintain valid NSW EPA pesticide licenses</li>
                <li>Provide accurate business information</li>
                <li>Respond to quote requests promptly</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in misleading or deceptive conduct</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Verification and Accuracy</h2>
              <p className="text-neutral-600 mb-6">
                We verify pest control operators against the NSW EPA public register. However:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>
                  Verification is conducted at the time of listing and periodically thereafter.
                  License status may change between verifications.
                </li>
                <li>
                  We do not guarantee the accuracy of all information provided by operators.
                </li>
                <li>
                  Reviews and ratings are provided by users and may not reflect our views.
                </li>
                <li>
                  Pricing information is provided by operators and may vary from actual quotes.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-neutral-600 mb-6">
                The Website is provided "as is" without warranties of any kind. We specifically disclaim:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
                <li>Any warranty that the Website will be uninterrupted or error-free</li>
                <li>Any warranty regarding the quality or reliability of services provided by listed operators</li>
                <li>Any warranty that information on the Website is accurate or complete</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-neutral-600 mb-6">
                Sydney Pest Control Directory acts solely as an intermediary connecting users with pest
                control operators. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>The quality, safety, or legality of services provided by listed operators</li>
                <li>Any disputes between users and operators</li>
                <li>Any damages arising from the use of services provided by listed operators</li>
                <li>Any loss or damage resulting from reliance on information on the Website</li>
              </ul>
              <p className="text-neutral-600 mb-8">
                To the maximum extent permitted by law, our liability is limited to the amount paid
                by you (if any) for using our services.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Intellectual Property</h2>
              <p className="text-neutral-600 mb-8">
                All content on the Website, including text, graphics, logos, and software, is the
                property of Sydney Pest Control Directory or its content suppliers and is protected
                by Australian and international copyright laws.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Reviews and User Content</h2>
              <p className="text-neutral-600 mb-4">By posting reviews or other content, you:</p>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>Grant us a non-exclusive right to use, display, and distribute your content</li>
                <li>Confirm that your review is based on genuine experience</li>
                <li>Agree not to post false, misleading, defamatory, or abusive content</li>
              </ul>
              <p className="text-neutral-600 mb-8">
                We reserve the right to remove any content that violates these terms or is otherwise
                objectionable.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Third-Party Services</h2>
              <p className="text-neutral-600 mb-8">
                The Website may contain links to third-party websites or services. We do not control
                and are not responsible for the content or practices of these third parties.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Indemnification</h2>
              <p className="text-neutral-600 mb-8">
                You agree to indemnify and hold harmless Sydney Pest Control Directory, its directors,
                employees, and agents from any claims, damages, losses, or expenses arising from your
                use of the Website or violation of these terms.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Termination</h2>
              <p className="text-neutral-600 mb-8">
                We may terminate or suspend your access to the Website at any time, without notice,
                for conduct that we believe violates these terms or is harmful to other users or the Website.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Governing Law</h2>
              <p className="text-neutral-600 mb-8">
                These Terms of Service are governed by the laws of New South Wales, Australia. Any
                disputes arising from these terms shall be subject to the exclusive jurisdiction of
                the courts of New South Wales.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">13. Contact Information</h2>
              <p className="text-neutral-600 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                <p className="text-neutral-700 font-medium mb-2">Sydney Pest Control Directory</p>
                <p className="text-neutral-600">Email: legal@sydneypestcontrol.com.au</p>
                <p className="text-neutral-600">Phone: 1300 737 834</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
