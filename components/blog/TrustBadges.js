import { Shield, Calendar, CheckCircle, FileCheck, Award, ExternalLink } from 'lucide-react';

export default function TrustBadges({
  publishedAt,
  updatedAt,
  factCheckedAt,
  reviewerName,
  reviewerLicense,
  sources = [],
  compact = false
}) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {updatedAt && (
          <span className="flex items-center gap-1.5 text-neutral-600">
            <Calendar className="w-4 h-4" />
            Updated {formatDate(updatedAt)}
          </span>
        )}
        {reviewerName && (
          <span className="flex items-center gap-1.5 text-emerald-600">
            <Shield className="w-4 h-4" />
            Expert Reviewed
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-primary-50 border border-emerald-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-emerald-600" />
        <span className="font-semibold text-emerald-800">Verified Content</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Last Updated */}
        {updatedAt && (
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-neutral-500">Last Updated</p>
              <p className="text-sm text-neutral-900">{formatDate(updatedAt)}</p>
            </div>
          </div>
        )}

        {/* Fact Checked */}
        {factCheckedAt && (
          <div className="flex items-start gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-neutral-500">Fact-Checked</p>
              <p className="text-sm text-emerald-700">{formatDate(factCheckedAt)}</p>
            </div>
          </div>
        )}

        {/* Expert Reviewed */}
        {reviewerName && (
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-primary-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-neutral-500">Expert Reviewed</p>
              <p className="text-sm text-primary-700">{reviewerName}</p>
              {reviewerLicense && (
                <p className="text-xs text-neutral-500">EPA #{reviewerLicense}</p>
              )}
            </div>
          </div>
        )}

        {/* EPA Verified */}
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-neutral-500">EPA Register</p>
            <p className="text-sm text-emerald-700">Verified Nov 2024</p>
          </div>
        </div>

        {/* Sources */}
        {sources.length > 0 && (
          <div className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-neutral-500">Sources</p>
              <p className="text-sm text-neutral-700">{sources.length} cited</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
