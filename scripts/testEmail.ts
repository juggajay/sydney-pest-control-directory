import { Resend } from 'resend';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pestarrest.com.au';

const testEmails = [
  { email: 'jaysonryan21@hotmail.com', name: 'Test Operator 1' },
  { email: 'jaysonryan2107@gmail.com', name: 'Test Operator 2' },
];

const testProfileUrl = `${siteUrl}/operator/test-pest-control`;

// Ultra-simple personal email - no links in body, no footer
const getEmailBody = (operatorName: string) => `Hey there,

I'm Jayson. I run a small pest control directory for Sydney called Pest Arrest.

I came across ${operatorName} and created a free listing for you on the site. Wanted to check if you'd like me to send you the link to review it?

Happy to make any changes if needed.

Cheers,
Jayson`;

async function sendTestEmails() {
  console.log('Sending test emails (deliverability optimized)...\n');

  for (const recipient of testEmails) {
    const body = getEmailBody(recipient.name);

    try {
      // Ultra minimal - like a real personal email
      const { data, error } = await resend.emails.send({
        from: 'Jayson <jayson@pestarrest.com.au>',
        to: recipient.email,
        subject: `${recipient.name}`,
        text: body,
      });

      if (error) {
        console.error(`Failed to send to ${recipient.email}:`, error);
      } else {
        console.log(`✓ Sent to ${recipient.email} (ID: ${data?.id})`);
      }
    } catch (err) {
      console.error(`Error sending to ${recipient.email}:`, err);
    }

    // Small delay between sends
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\nDone!');
}

sendTestEmails();
