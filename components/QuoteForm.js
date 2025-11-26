'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  MapPin, Shield, Star, Clock, ChevronRight, ChevronLeft,
  Bug, CheckCircle, Home, Building, Calendar, Phone, Mail,
  User, MessageSquare, ArrowRight, Loader2
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Service', icon: Bug },
  { id: 2, name: 'Property', icon: Home },
  { id: 3, name: 'Details', icon: MessageSquare },
  { id: 4, name: 'Contact', icon: User },
];

function QuoteFormContent({ suburbs = [], services = [] }) {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');
  const preselectedSuburb = searchParams.get('suburb');
  const preselectedOperator = searchParams.get('operator');

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    service: preselectedService || '',
    urgency: '',
    propertyType: '',
    suburb: preselectedSuburb || '',
    postcode: '',
    problemDescription: '',
    preferredTime: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    specificOperator: preselectedOperator || '',
  });

  // Update suburb postcode when suburb changes
  useEffect(() => {
    if (formData.suburb) {
      const selectedSuburb = suburbs.find(s => s.slug === formData.suburb);
      if (selectedSuburb) {
        setFormData(prev => ({ ...prev, postcode: selectedSuburb.postcode }));
      }
    }
  }, [formData.suburb]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          suburb: formData.suburb,
          postcode: formData.postcode,
          propertyType: formData.propertyType,
          urgency: formData.urgency,
          problemDescription: formData.problemDescription,
          preferredTime: formData.preferredTime,
          preferredContact: formData.preferredContact,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service && formData.urgency;
      case 2:
        return formData.propertyType && formData.suburb;
      case 3:
        return formData.problemDescription.length >= 20;
      case 4:
        return formData.name && formData.email && formData.phone;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Quote Request Sent!
          </h2>
          <p className="text-neutral-600 mb-8">
            We've sent your request to licensed pest control operators in {formData.suburb ? suburbs.find(s => s.slug === formData.suburb)?.name : 'your area'}. 
            Expect to hear back within 2-4 hours during business hours.
          </p>
          <div className="space-y-4">
            <Link href="/" className="btn btn-primary w-full">
              Back to Home
            </Link>
            <Link href="/operators" className="btn btn-secondary w-full">
              Browse Operators
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    currentStep >= step.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-primary-600' : 'text-neutral-400'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                  currentStep > step.id ? 'bg-primary-500' : 'bg-neutral-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              What pest problem do you have?
            </h2>
            <p className="text-neutral-600 mb-8">
              Select the service you need and how urgent it is.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Service Type *
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => handleChange('service', service.slug)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        formData.service === service.slug
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <Bug className={`w-5 h-5 ${
                        formData.service === service.slug ? 'text-primary-600' : 'text-neutral-400'
                      }`} />
                      <div>
                        <div className="font-medium text-neutral-900">{service.name}</div>
                        <div className="text-sm text-neutral-500">{service.priceRange}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  How urgent is this? *
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { value: 'emergency', label: 'Emergency', desc: 'Today' },
                    { value: 'soon', label: 'Soon', desc: 'This week' },
                    { value: 'flexible', label: 'Flexible', desc: 'No rush' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('urgency', option.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.urgency === option.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-medium text-neutral-900">{option.label}</div>
                      <div className="text-sm text-neutral-500">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {currentStep === 2 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Tell us about your property
            </h2>
            <p className="text-neutral-600 mb-8">
              This helps us match you with the right operators.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Property Type *
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { value: 'house', label: 'House', icon: Home },
                    { value: 'apartment', label: 'Apartment/Unit', icon: Building },
                    { value: 'townhouse', label: 'Townhouse', icon: Home },
                    { value: 'commercial', label: 'Commercial', icon: Building },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('propertyType', option.value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        formData.propertyType === option.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <option.icon className={`w-5 h-5 ${
                        formData.propertyType === option.value ? 'text-primary-600' : 'text-neutral-400'
                      }`} />
                      <span className="font-medium text-neutral-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Suburb *
                </label>
                <select
                  value={formData.suburb}
                  onChange={(e) => handleChange('suburb', e.target.value)}
                  className="input"
                >
                  <option value="">Select suburb...</option>
                  {suburbs.map((suburb) => (
                    <option key={suburb.slug} value={suburb.slug}>
                      {suburb.name} ({suburb.postcode}) - {suburb.region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Postcode
                </label>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => handleChange('postcode', e.target.value)}
                  placeholder="e.g. 2026"
                  className="input"
                  readOnly={!!formData.suburb}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Problem Details */}
        {currentStep === 3 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Describe your pest problem
            </h2>
            <p className="text-neutral-600 mb-8">
              The more detail you provide, the more accurate your quotes will be.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Problem Description * (minimum 20 characters)
                </label>
                <textarea
                  value={formData.problemDescription}
                  onChange={(e) => handleChange('problemDescription', e.target.value)}
                  placeholder="Describe what you've seen, where in the property, how long the problem has been occurring..."
                  rows={5}
                  className="input"
                />
                <div className="mt-2 text-sm text-neutral-500">
                  {formData.problemDescription.length}/20 characters minimum
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Preferred Time
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { value: 'morning', label: 'Morning', desc: '8am - 12pm' },
                    { value: 'afternoon', label: 'Afternoon', desc: '12pm - 5pm' },
                    { value: 'anytime', label: 'Anytime', desc: 'Flexible' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('preferredTime', option.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.preferredTime === option.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-medium text-neutral-900">{option.label}</div>
                      <div className="text-sm text-neutral-500">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Details */}
        {currentStep === 4 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Your contact details
            </h2>
            <p className="text-neutral-600 mb-8">
              Operators will use these details to send you quotes.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Smith"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="0412 345 678"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'phone', label: 'Phone', icon: Phone },
                    { value: 'email', label: 'Email', icon: Mail },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('preferredContact', option.value)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${
                        formData.preferredContact === option.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <option.icon className={`w-5 h-5 ${
                        formData.preferredContact === option.value ? 'text-primary-600' : 'text-neutral-400'
                      }`} />
                      <span className="font-medium text-neutral-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-ghost gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className="btn btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canProceed() || isSubmitting}
              className="btn btn-accent gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Get Free Quotes
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {submitError}
          </div>
        )}
      </form>

      {/* Trust Indicators */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>EPA Licensed Operators Only</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary-500" />
          <span>Free & No Obligation</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Response within 2-4 hours</span>
        </div>
      </div>
    </div>
  );
}

export default function QuoteForm({ suburbs = [], services = [] }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    }>
      <QuoteFormContent suburbs={suburbs} services={services} />
    </Suspense>
  );
}
