import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pestarrest.com.au';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Warm, friendly email template
const getEmailBody = (operatorName: string, profileUrl: string) => `Hey there!

I hope this finds you well. I'm Jayson — I run Pest Arrest, a new directory helping Sydney locals find trusted pest control operators.

I came across your business and thought you'd be a great fit, so I've created a free profile for you:

${profileUrl}

Have a look when you get a chance and let me know if anything needs updating — happy to tweak the description, add services, or fix any details.

One quick thing: if you'd like an "EPA Verified" badge on your listing (helps build trust with customers), just reply with your license number and I'll add it for you. No stress if not — your listing stays active either way.

Would love to hear how business is going for you at the moment. Always keen to chat with local operators.

Cheers,
Jayson
Pest Arrest
www.pestarrest.com.au

P.S. If this isn't relevant to you, no worries at all — just let me know and I won't email again.`;

interface Operator {
  id: string;
  business_name: string;
  slug: string;
  email: string;
}

async function sendFirstBatch() {
  console.log('Fetching operators with emails from Supabase...\n');

  // Get operators with emails who haven't been contacted yet
  const { data: operators, error } = await supabase
    .from('operators')
    .select('id, business_name, slug, email')
    .not('email', 'is', null)
    .neq('email', '')
    .eq('status', 'active')
    .limit(50); // Get first 50 operators with emails

  if (error || !operators) {
    console.error('Error fetching operators:', error?.message);
    return;
  }

  console.log(`Found ${operators.length} operators with emails\n`);

  if (operators.length === 0) {
    console.log('No operators with emails found. Run scrapeEmails first.');
    return;
  }

  // Display what we're about to send
  console.log('=== FIRST BATCH PREVIEW ===\n');
  operators.forEach((op, i) => {
    const profileUrl = `${siteUrl}/operator/${op.slug}`;
    console.log(`${i + 1}. ${op.business_name}`);
    console.log(`   Email: ${op.email}`);
    console.log(`   Profile: ${profileUrl}`);
    console.log('');
  });

  // Ask for confirmation
  console.log('\n=== READY TO SEND ===');
  console.log(`Total emails to send: ${operators.length}`);
  console.log('');
  console.log('Press Ctrl+C to cancel, or wait 10 seconds to continue...\n');

  await new Promise(resolve => setTimeout(resolve, 10000));

  console.log('Starting to send emails...\n');

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < operators.length; i++) {
    const op = operators[i] as Operator;
    const profileUrl = `${siteUrl}/operator/${op.slug}`;

    console.log(`[${i + 1}/${operators.length}] Sending to ${op.business_name}...`);

    try {
      const { data, error: sendError } = await resend.emails.send({
        from: 'Jayson <jayson@pestarrest.com.au>',
        to: op.email,
        replyTo: 'jayson@pestarrest.com.au',
        subject: `Quick question about ${op.business_name}`,
        text: getEmailBody(op.business_name, profileUrl),
        headers: {
          'List-Unsubscribe': `<mailto:unsubscribe@pestarrest.com.au?subject=Unsubscribe>`,
        },
      });

      if (sendError) {
        console.log(`   FAILED: ${sendError.message}`);
        failed++;
      } else {
        console.log(`   SENT (ID: ${data?.id})`);
        sent++;
      }
    } catch (err: any) {
      console.log(`   ERROR: ${err.message}`);
      failed++;
    }

    // Rate limit - 2 seconds between emails
    if (i < operators.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Sent: ${sent}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${operators.length}`);
}

sendFirstBatch();
