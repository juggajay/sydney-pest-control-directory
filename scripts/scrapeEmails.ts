import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON!;
const jinaApiKey = process.env.JINA_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Email regex pattern
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Common non-business emails to filter out
const EXCLUDED_EMAILS = [
  'example.com',
  'domain.com',
  'email.com',
  'yourcompany.com',
  'company.com',
  'test.com',
  'sentry.io',
  'wixpress.com',
  'wordpress.com',
  'squarespace.com',
];

async function fetchPageContent(url: string): Promise<string | null> {
  try {
    // Use Jina Reader API to get clean text
    const jinaUrl = `https://r.jina.ai/${url}`;

    const response = await fetch(jinaUrl, {
      headers: {
        'Authorization': `Bearer ${jinaApiKey}`,
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      console.log(`    Failed to fetch: ${response.status}`);
      return null;
    }

    return await response.text();
  } catch (err) {
    console.log(`    Error fetching: ${err}`);
    return null;
  }
}

function extractEmails(content: string): string[] {
  const matches = content.match(EMAIL_REGEX) || [];

  // Filter and dedupe
  const uniqueEmails = Array.from(new Set(matches))
    .map(email => email.toLowerCase())
    .filter(email => {
      // Filter out excluded domains
      return !EXCLUDED_EMAILS.some(excluded => email.includes(excluded));
    })
    .filter(email => {
      // Filter out obvious non-business emails
      return !email.includes('noreply') &&
             !email.includes('no-reply') &&
             !email.includes('support@google') &&
             !email.includes('support@facebook');
    });

  return uniqueEmails;
}

function selectBestEmail(emails: string[], businessName: string): string | null {
  if (emails.length === 0) return null;
  if (emails.length === 1) return emails[0];

  // Prioritize emails that look like business emails
  const priorities = [
    // Emails containing 'info', 'contact', 'enquiries', 'admin'
    (e: string) => e.startsWith('info@') || e.startsWith('contact@') || e.startsWith('enquiries@') || e.startsWith('admin@'),
    // Emails with .com.au domain
    (e: string) => e.endsWith('.com.au'),
    // Emails containing parts of business name
    (e: string) => {
      const nameParts = businessName.toLowerCase().split(/\s+/);
      return nameParts.some(part => part.length > 3 && e.includes(part));
    },
  ];

  for (const priority of priorities) {
    const match = emails.find(priority);
    if (match) return match;
  }

  return emails[0];
}

async function scrapeEmails() {
  console.log('Fetching operators with websites but no email...\n');

  const { data: operators, error } = await supabase
    .from('operators')
    .select('id, business_name, website, email')
    .not('website', 'is', null)
    .neq('website', '')
    .eq('status', 'active')
    .or('email.is.null,email.eq.');

  if (error || !operators) {
    console.error('Error fetching operators:', error?.message);
    return;
  }

  console.log(`Found ${operators.length} operators to process\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < operators.length; i++) {
    const op = operators[i];
    console.log(`[${i + 1}/${operators.length}] ${op.business_name}`);
    console.log(`    Website: ${op.website}`);

    // Fetch page content
    const content = await fetchPageContent(op.website);

    if (!content) {
      console.log(`    SKIPPED - could not fetch\n`);
      failed++;
      continue;
    }

    // Extract emails
    const emails = extractEmails(content);

    if (emails.length === 0) {
      console.log(`    No emails found\n`);
      skipped++;
      continue;
    }

    console.log(`    Found emails: ${emails.join(', ')}`);

    // Select best email
    const bestEmail = selectBestEmail(emails, op.business_name);

    if (!bestEmail) {
      console.log(`    No suitable email\n`);
      skipped++;
      continue;
    }

    console.log(`    Selected: ${bestEmail}`);

    // Update database
    const { error: updateError } = await supabase
      .from('operators')
      .update({ email: bestEmail })
      .eq('id', op.id);

    if (updateError) {
      console.log(`    ERROR updating: ${updateError.message}\n`);
      failed++;
    } else {
      console.log(`    UPDATED\n`);
      updated++;
    }

    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Total processed: ${operators.length}`);
  console.log(`Updated with email: ${updated}`);
  console.log(`No email found: ${skipped}`);
  console.log(`Failed to fetch: ${failed}`);
}

scrapeEmails();
