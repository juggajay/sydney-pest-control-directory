import { Shield, Award, CheckCircle, ExternalLink, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ExpertReviewer({ reviewer }) {
  if (!reviewer || !reviewer.name) return null;

  const {
    name,
    role = 'EPA Licensed Pest Controller',
    license,
    licenseType = 'Pest Management Technician',
    yearsExperience,
    specialization,
    serviceAreas = [],
    image,
  } = reviewer;

  return (
    <div className="card p-6 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-emerald-600" />
        <h4 className="font-bold text-emerald-800">Expert Reviewer</h4>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Shield className="w-7 h-7 text-emerald-600" />
          )}
        </div>

        <div className="flex-1">
          <h5 className="font-bold text-neutral-900">{name}</h5>
          <p className="text-sm text-emerald-600 font-medium mb-3">{role}</p>

          <div className="space-y-2">
            {/* EPA License */}
            {license && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-neutral-700">
                  EPA License: <span className="font-medium">{license}</span>
                </span>
                <a
                  href={`https://apps.epa.nsw.gov.au/prpoeoapp/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* License Type */}
            {licenseType && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-600">{licenseType}</span>
              </div>
            )}

            {/* Experience */}
            {yearsExperience && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-600">{yearsExperience}+ years experience</span>
              </div>
            )}

            {/* Specialization */}
            {specialization && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-600">Specializes in {specialization}</span>
              </div>
            )}

            {/* Service Areas */}
            {serviceAreas.length > 0 && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {serviceAreas.slice(0, 4).map((area, index) => (
                    <Link
                      key={index}
                      href={`/pest-control/${area.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-emerald-200">
        <p className="text-xs text-neutral-500 italic">
          This article has been technically reviewed by an EPA-licensed pest control professional
          to ensure accuracy and adherence to industry standards.
        </p>
      </div>
    </div>
  );
}
