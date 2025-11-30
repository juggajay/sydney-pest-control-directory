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

I'm Jayson from Pest Arrest — Sydney's EPA-verified pest control directory.

We've created a free profile for your business:
{{profile_url}}

Your profile shows your EPA license verification, service areas, and helps Sydney homeowners find you when searching for pest control.

Quick favor: Would you consider adding a link to your profile from your website? This helps your customers verify your EPA credentials and builds trust.

You can either:
1. Link directly to your profile: {{profile_url}}
2. Embed our "EPA Verified" badge (code below)

Badge Embed Code:
<a href="{{profile_url}}" target="_blank">
  <img src="https://www.pestarrest.com.au/badges/epa-verified.png" alt="EPA Verified - Pest Arrest" width="150">
</a>

If you'd like any changes to your profile — updated services, contact info, or photos — just reply to this email.

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
        subject: `Your free EPA-verified profile on Pest Arrest, ${recipient.name}`,
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
