import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

async function createCampaign() {
  const { data, error } = await supabase
    .from('outreach_campaigns')
    .insert({
      name: 'December 2024 Verification Badge Campaign',
      status: 'active',
      initial_subject: 'Your free listing on Pest Arrest + verification badge, {{operator_name}}',
      initial_body: `Hi {{operator_name}},

I've added your business to Pest Arrest — Sydney's pest control directory.

Your free listing: {{profile_url}}

WANT TO STAND OUT?

Verified operators get an "EPA Verified" badge on their profile. This shows customers you're properly licensed.

To get verified, just do ONE of these:

1. Reply with your EPA license number(s) — PMT, Timber Pest, Fumigator, or any other licenses you hold

2. OR add a link to your Pest Arrest profile from your website

Either option takes 2 minutes.

If you have multiple licenses, send them all — we can add badges for each one.

Cheers,
Jayson
Pest Arrest
https://www.pestarrest.com.au`,
      followup_days: 7,
      followup_subject: 'Quick follow-up — free verification badge, {{operator_name}}',
      followup_body: `Hi {{operator_name}},

Quick follow-up — did you see your free listing on Pest Arrest?

{{profile_url}}

Want the "EPA Verified" badge? Just reply with your license number(s) or add a link to us from your site.

No pressure — your free listing stays active either way.

Cheers,
Jayson
https://www.pestarrest.com.au`,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('Campaign created successfully!');
  console.log('================================');
  console.log('Campaign ID:', data.id);
  console.log('Name:', data.name);
  console.log('Status:', data.status);
  console.log('');
  console.log('Next step - seed the queue:');
  console.log(`npm run seed-outreach ${data.id}`);
}

createCampaign();
