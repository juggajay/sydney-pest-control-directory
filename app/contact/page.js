import Link from 'next/link';
import {
  Phone, Mail, MapPin, Clock, MessageSquare,
  HelpCircle, Building, ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Sydney Pest Control Directory',
  description: 'Get in touch with Sydney Pest Control Directory. Contact us for support, business enquiries, or to list your pest control business. We\'re here to help.',
  keywords: 'contact sydney pest control directory, pest control enquiry, list pest control business Sydney',
  openGraph: {
    title: 'Contact Us | Sydney Pest Control Directory',
    description: 'Get in touch with Sydney Pest Control Directory for support or business enquiries.',
    type: 'website',
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      description: 'Speak to our team',
      value: '1300 PEST FIND',
      subValue: '1300 737 834',
      action: 'tel:1300737834',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us a message',
      value: 'hello@sydneypestcontrol.com.au',
      action: 'mailto:hello@sydneypestcontrol.com.au',
    },
    {
      icon: Clock,
      title: 'Hours',
      description: 'Customer support',
      value: 'Mon-Fri: 8am - 6pm',
      subValue: 'Sat: 9am - 2pm',
    },
  ];

  const faqs = [
    {
      question: 'How do I get a quote for pest control?',
      answer: 'Simply search for operators in your suburb and click "Request Quote" on their profile, or use our quote request form to receive quotes from multiple operators at once.',
    },
    {
      question: 'How do I list my pest control business?',
      answer: 'If you\'re a licensed pest control operator in NSW, contact us to discuss listing your business. We\'ll verify your EPA license and set up your profile.',
    },
    {
      question: 'How do I leave a review?',
      answer: 'After receiving service from an operator found through our directory, you can leave a review on their profile page. Reviews help other homeowners make informed decisions.',
    },
    {
      question: 'Is the directory free to use?',
      answer: 'Yes! Our directory is completely free for homeowners. Browse operators, read reviews, and request quotes at no cost.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Have a question or need assistance? Our team is here to help.
            Reach out via phone, email, or the form below.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <div key={method.title} className="text-center p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 mb-4">
                  <method.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{method.title}</h3>
                <p className="text-sm text-neutral-500 mb-3">{method.description}</p>
                {method.action ? (
                  <a
                    href={method.action}
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <div className="text-neutral-900 font-semibold">{method.value}</div>
                )}
                {method.subValue && (
                  <div className="text-sm text-neutral-600 mt-1">{method.subValue}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Enquiry</option>
                    <option value="operator">List My Business</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Enquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* FAQ & Business Info */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  <HelpCircle className="w-6 h-6 inline-block mr-2 text-primary-600" />
                  Common Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="bg-white rounded-xl border border-neutral-200 group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                        <span className="font-medium text-neutral-900 pr-4">{faq.question}</span>
                        <span className="text-primary-600 group-open:rotate-180 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-neutral-600">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* For Operators */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Are You a Pest Controller?</h3>
                </div>
                <p className="text-primary-100 mb-6">
                  Join Sydney's trusted pest control directory. List your business and connect
                  with homeowners actively looking for your services.
                </p>
                <ul className="space-y-2 mb-6">
                  {['EPA License verification', 'Customer lead generation', 'Profile with reviews', 'Featured listing options'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-primary-100">
                      <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:operators@sydneypestcontrol.com.au?subject=List My Pest Control Business"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  List Your Business
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
