'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Save, RefreshCw } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const DEFAULT_INITIAL_BODY = `Hi {{operator_name}},

I'm Jayson from Pest Arrest — we've listed your business on our Sydney pest control directory.

Your profile: {{profile_url}}

We verify all operators against the NSW EPA register, so homeowners know they're hiring licensed professionals.

Would you consider linking to your profile from your website? It helps build trust with your customers.

If you'd like to add our verification badge to your site, here's the code:

&lt;a href="{{profile_url}}"&gt;&lt;img src="https://www.pestarrest.com.au/badges/epa-verified.png" alt="EPA Verified - Pest Arrest" width="150"&gt;&lt;/a&gt;

Happy to make any updates to your listing — just reply to this email.

Cheers,
Jayson
https://www.pestarrest.com.au`;

const DEFAULT_FOLLOWUP_BODY = `Hi {{operator_name}},

Just checking in — did you see your Pest Arrest profile?

{{profile_url}}

If you have a moment, adding a link from your website would help both of us. No pressure either way.

Let me know if you'd like any changes to your listing.

Cheers,
Jayson
https://www.pestarrest.com.au`;

export default function NewCampaignPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    initial_subject: 'Your free EPA-verified profile on Pest Arrest, {{operator_name}}',
    initial_body: DEFAULT_INITIAL_BODY,
    followup_days: 7,
    followup_subject: 'Quick follow-up: Your Pest Arrest profile',
    followup_body: DEFAULT_FOLLOWUP_BODY,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'followup_days' ? parseInt(value) || 7 : value,
    }));
  };

  const handleSubmit = async (status: 'draft' | 'active') => {
    if (!supabase) {
      setError('Database not configured');
      return;
    }

    if (!formData.name.trim()) {
      setError('Campaign name is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('outreach_campaigns')
        .insert({
          name: formData.name,
          status,
          initial_subject: formData.initial_subject,
          initial_body: formData.initial_body,
          followup_days: formData.followup_days,
          followup_subject: formData.followup_subject,
          followup_body: formData.followup_body,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      router.push('/admin/outreach/campaigns');
    } catch (err: any) {
      setError(err.message || 'Failed to create campaign');
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/outreach/campaigns" className="p-2 hover:bg-neutral-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">New Campaign</h1>
            <p className="text-neutral-600 mt-1">Create a new outreach campaign</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-800 border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="card p-6 space-y-6">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Q1 2024 Backlink Outreach"
            />
          </div>

          {/* Initial Email Section */}
          <div className="border-t border-neutral-200 pt-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Initial Email</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  name="initial_subject"
                  value={formData.initial_subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="Use {{operator_name}} for personalization"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Available variables: {'{{operator_name}}'}, {'{{profile_url}}'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Body (HTML)
                </label>
                <textarea
                  name="initial_body"
                  value={formData.initial_body}
                  onChange={handleChange}
                  rows={15}
                  className="input font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Follow-up Email Section */}
          <div className="border-t border-neutral-200 pt-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Follow-up Email</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Days After Initial Email
                </label>
                <input
                  type="number"
                  name="followup_days"
                  value={formData.followup_days}
                  onChange={handleChange}
                  className="input w-32"
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  name="followup_subject"
                  value={formData.followup_subject}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Body (HTML)
                </label>
                <textarea
                  name="followup_body"
                  value={formData.followup_body}
                  onChange={handleChange}
                  rows={12}
                  className="input font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-neutral-200 pt-6 flex gap-3">
            <button
              onClick={() => handleSubmit('draft')}
              disabled={saving}
              className="btn btn-secondary"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit('active')}
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save & Activate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
