export const LICENSE_TYPES = {
  'PMT': {
    code: 'PMT',
    name: 'Pest Management Technician',
    description: 'General pest control license'
  },
  'PMT-TP': {
    code: 'PMT-TP',
    name: 'Timber Pest Management Technician',
    description: 'Termite and timber pest specialist'
  },
  'FUM': {
    code: 'FUM',
    name: 'Fumigator',
    description: 'Licensed to use fumigants'
  },
  'FTP': {
    code: 'FTP',
    name: 'Fumigator Training Permit',
    description: 'Trainee fumigator'
  },
  'GRN': {
    code: 'GRN',
    name: 'Ground Applicator',
    description: 'Ground-based pesticide application'
  },
  'AAB': {
    code: 'AAB',
    name: 'Aerial Applicator Business',
    description: 'Aerial pesticide application business'
  },
  'AAP': {
    code: 'AAP',
    name: 'Aerial Applicator Pilot',
    description: 'Licensed aerial application pilot'
  },
  'PTP': {
    code: 'PTP',
    name: 'PMT Training Permit',
    description: 'Trainee pest management technician'
  },
} as const;

export type LicenseTypeCode = keyof typeof LICENSE_TYPES;

export interface License {
  type: LicenseTypeCode;
  number: string;
  expiry?: string;
  verified_at?: string;
}
