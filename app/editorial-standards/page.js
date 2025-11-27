import Link from 'next/link';
import {
  Shield, CheckCircle, Users, FileText, Clock, AlertCircle,
  Eye, RefreshCw, Mail, ExternalLink
} from 'lucide-react';

export const metadata = {
  title: 'Editorial Standards | Sydney Pest Control Directory',
  description: 'Learn about our editorial standards, fact-checking process, and how we verify pest control operators. We maintain rigorous standards for accuracy and trust.',
  keywords: ['editorial standards', 'fact checking', 'pest control verification', 'EPA license verification'],
};

export default function EditorialStandardsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Editorial Standards</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Editorial Standards & Guidelines
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            We maintain rigorous standards to ensure all information on Sydney Pest Control
            Directory is accurate, up-to-date, and trustworthy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Our Commitment */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary-600" />
              Our Commitment to Accuracy
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Sydney Pest Control Directory is committed to providing accurate, helpful information
              to Sydney homeowners seeking pest control services. As a Your Money Your Life (YMYL)
              topic involving health, safety, and financial decisions, we hold ourselves to the
              highest standards of editorial integrity.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Every piece of content on our platform is reviewed for accuracy, and all operator
              listings are verified against official NSW EPA records before publication.
            </p>
          </div>

          {/* Verification Process */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              Operator Verification Process
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Before any pest control operator appears on our directory, they must pass our
              multi-step verification process:
            </p>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'EPA License Verification',
                  description: 'We verify every operator\'s license against the NSW EPA public pesticide license register to confirm they hold a valid, current license.'
                },
                {
                  step: '2',
                  title: 'Business Verification',
                  description: 'We confirm ABN registration through the Australian Business Register and verify business legitimacy through multiple data sources.'
                },
                {
                  step: '3',
                  title: 'Insurance Confirmation',
                  description: 'We request proof of public liability insurance to ensure customers are protected.'
                },
                {
                  step: '4',
                  title: 'Ongoing Monitoring',
                  description: 'We continuously monitor license status, customer feedback, and complaint records. Operators are re-verified monthly.'
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="font-bold text-primary-600">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-sm text-emerald-800">
                <strong>Verification Badge:</strong> Operators who pass our verification display
                the "EPA Verified" badge. You can independently verify any operator's license at{' '}
                <a
                  href="https://apps.epa.nsw.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-emerald-900"
                >
                  apps.epa.nsw.gov.au
                </a>
              </p>
            </div>
          </div>

          {/* Content Standards */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Content Standards
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Sources & Citations</h3>
                <p className="text-neutral-600 text-sm">
                  Technical information about pests, treatments, and regulations is sourced from:
                </p>
                <ul className="mt-2 text-sm text-neutral-600 list-disc list-inside space-y-1">
                  <li>NSW Environment Protection Authority (EPA)</li>
                  <li>Australian Pesticides and Veterinary Medicines Authority (APVMA)</li>
                  <li>Australian Environmental Pest Managers Association (AEPMA)</li>
                  <li>CSIRO pest research publications</li>
                  <li>Australian Standards (AS 3660, AS 4349.3)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Expert Review</h3>
                <p className="text-neutral-600 text-sm">
                  All technical content about pest control methods, chemical safety, and treatment
                  effectiveness is reviewed by licensed pest control professionals with relevant
                  EPA certifications before publication.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Pricing Information</h3>
                <p className="text-neutral-600 text-sm">
                  Price ranges are compiled from actual quotes submitted through our platform
                  and updated quarterly. Prices are indicative only - actual costs may vary based
                  on property size, pest severity, and specific treatment requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Review & Update Schedule */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-amber-600" />
              Review & Update Schedule
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Monthly</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• EPA license status verification</li>
                  <li>• New operator onboarding</li>
                  <li>• Review flagged operators</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Quarterly</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Pricing data refresh</li>
                  <li>• Service information review</li>
                  <li>• Customer feedback analysis</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Annually</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Full content audit</li>
                  <li>• Regulatory compliance check</li>
                  <li>• Insurance verification</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-2">As Needed</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Regulation changes</li>
                  <li>• Customer complaints</li>
                  <li>• Operator status changes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Corrections Policy */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-600" />
              Corrections Policy
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We take accuracy seriously. If you notice any incorrect information on our platform:
            </p>
            <ul className="text-neutral-600 space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Minor factual errors are corrected within 24 hours of being reported</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Significant corrections are noted at the top of the affected page</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>All corrections are timestamped and logged</span>
              </li>
            </ul>
            <p className="text-sm text-neutral-500">
              To report an error, please contact us at{' '}
              <a href="mailto:corrections@sydneypestcontrol.com.au" className="text-primary-600 hover:underline">
                corrections@sydneypestcontrol.com.au
              </a>
            </p>
          </div>

          {/* Transparency */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-purple-600" />
              How We Make Money
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              In the interest of full transparency, here's how Sydney Pest Control Directory generates revenue:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Operator Subscriptions:</strong>
                  <span className="text-neutral-600 text-sm ml-2">
                    Pest controllers pay $49-199/month for enhanced listings with more visibility
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Lead Fees:</strong>
                  <span className="text-neutral-600 text-sm ml-2">
                    Operators pay $15-25 when they respond to quote requests
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <h4 className="font-semibold text-red-900 mb-2">What We Don't Do:</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>✗ We don't sell your personal data to third parties</li>
                <li>✗ We don't accept payment to manipulate reviews</li>
                <li>✗ We don't list unverified operators regardless of payment</li>
                <li>✗ Paid operators don't receive preferential verification</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-emerald-50 border-primary-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Questions About Our Standards?</h2>
            <p className="text-neutral-600 mb-6">
              We're committed to transparency. If you have questions about our editorial process,
              verification methods, or content standards, please contact us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center text-sm text-neutral-500">
            <p>These editorial standards were last updated on November 27, 2024.</p>
          </div>

        </div>
      </section>
    </div>
  );
}
