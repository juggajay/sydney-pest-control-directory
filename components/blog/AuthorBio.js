import { User, Linkedin, Shield, Award, CheckCircle } from 'lucide-react';

export default function AuthorBio({ author, isCompact = false }) {
  const {
    name = 'Pest Arrest Editorial Team',
    role = 'Content Team',
    bio,
    image,
    linkedin,
    expertise = [],
  } = author || {};

  if (isCompact) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-primary-600" />
          )}
        </div>
        <div>
          <div className="font-medium text-neutral-900 text-sm">{name}</div>
          <div className="text-xs text-neutral-500">{role}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 bg-gradient-to-br from-white to-primary-50/30">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-primary-600" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-neutral-900">{name}</h4>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] hover:text-[#005582] transition-colors"
                aria-label={`${name}'s LinkedIn profile`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-sm text-primary-600 font-medium mb-3">{role}</p>

          {bio && (
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              {bio}
            </p>
          )}

          {expertise.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Expertise Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {expertise.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
