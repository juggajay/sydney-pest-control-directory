import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pestarrest.com.au';

const testEmails = [
  { email: 'jaysonryan21@hotmail.com', name: 'Test Operator 1' },
  { email: 'jaysonryan2107@gmail.com', name: 'Test Operator 2' },
];

const testProfileUrl = `${siteUrl}/operator/test-pest-control`;

const emailBody = `Hi {{operator_name}},

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
https://www.pestarrest.com.au`;

async function sendTestEmails() {
  console.log('Sending test emails...\n');

  for (const recipient of testEmails) {
    const trackingId = uuidv4();

    // Personalize
    let body = emailBody
      .replace(/\{\{operator_name\}\}/g, recipient.name)
      .replace(/\{\{profile_url\}\}/g, testProfileUrl);

    // Add tracking pixel
    body += `\n\n<img src="${siteUrl}/api/outreach/track/open?id=${trackingId}" width="1" height="1" style="display:none;" alt="" />`;

    // Wrap links with click tracking
    body = body.replace(
      /href="(https?:\/\/(?:www\.)?pestarrest\.com\.au[^"]*)"/g,
      (match, url) => `href="${siteUrl}/api/outreach/track/click?id=${trackingId}&url=${encodeURIComponent(url)}"`
    );

    try {
      const { data, error } = await resend.emails.send({
        from: 'Jayson <jayson@pestarrest.com.au>',
        to: recipient.email,
        subject: `Your free listing on Pest Arrest + verification badge, ${recipient.name}`,
        html: body.replace(/\n/g, '<br>'),
      });

      if (error) {
        console.error(`Failed to send to ${recipient.email}:`, error);
      } else {
        console.log(`✓ Sent to ${recipient.email} (ID: ${data?.id})`);
        console.log(`  Tracking ID: ${trackingId}\n`);
      }
    } catch (err) {
      console.error(`Error sending to ${recipient.email}:`, err);
    }

    // Small delay between sends
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('Done!');
}

sendTestEmails();
