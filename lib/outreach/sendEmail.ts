import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pestarrest.com.au';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface SendEmailParams {
  queueItemId: string;
  recipientEmail: string;
  operatorName: string;
  profileUrl: string;
  emailType: 'initial' | 'followup';
}

interface SendEmailResult {
  success: boolean;
  error?: string;
  trackingId?: string;
}

export async function sendOutreachEmail({
  queueItemId,
  recipientEmail,
  operatorName,
  profileUrl,
  emailType,
}: SendEmailParams): Promise<SendEmailResult> {
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  try {
    // Fetch the queue item to get the campaign
    const { data: queueItem, error: queueError } = await supabase
      .from('outreach_queue')
      .select('campaign_id')
      .eq('id', queueItemId)
      .single();

    if (queueError || !queueItem) {
      return { success: false, error: `Failed to fetch queue item: ${queueError?.message}` };
    }

    // Fetch the campaign template
    const { data: campaign, error: campaignError } = await supabase
      .from('outreach_campaigns')
      .select('*')
      .eq('id', queueItem.campaign_id)
      .single();

    if (campaignError || !campaign) {
      return { success: false, error: `Failed to fetch campaign: ${campaignError?.message}` };
    }

    // Get subject and body based on email type
    // Database uses email_subject/email_body for initial, followup_subject/followup_body for followup
    const subject = emailType === 'initial'
      ? campaign.email_subject
      : campaign.followup_subject;

    const body = emailType === 'initial'
      ? campaign.email_body
      : campaign.followup_body;

    // Personalize the template
    const personalizedSubject = personalizeTemplate(subject, operatorName, profileUrl);
    let personalizedBody = personalizeTemplate(body, operatorName, profileUrl);

    // Generate plain text version for better deliverability
    const plainTextBody = generatePlainText(operatorName, profileUrl, emailType);

    // Generate unique tracking ID
    const trackingId = uuidv4();

    // Wrap pestarrest.com.au links with click tracking
    personalizedBody = wrapLinksWithTracking(personalizedBody, trackingId);

    // Append tracking pixel
    const trackingPixel = `<img src="${siteUrl}/api/outreach/track/open?id=${trackingId}" width="1" height="1" style="display:none;" alt="" />`;
    personalizedBody += trackingPixel;

    // Send email via Resend with both HTML and plain text
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Jayson <jayson@pestarrest.com.au>',
      to: recipientEmail,
      subject: personalizedSubject,
      html: personalizedBody,
      text: plainTextBody,
    });

    if (emailError) {
      return { success: false, error: `Failed to send email: ${emailError.message}` };
    }

    // Log email to outreach_emails table
    const { error: logError } = await supabase
      .from('outreach_emails')
      .insert({
        queue_id: queueItemId,
        tracking_id: trackingId,
        email_type: emailType,
        resend_id: emailData?.id,
        sent_at: new Date().toISOString(),
      });

    if (logError) {
      console.error('Failed to log email:', logError);
    }

    // Update outreach_queue
    const updateData: Record<string, any> = {
      status: 'sent',
    };

    if (emailType === 'initial') {
      updateData.initial_sent_at = new Date().toISOString();
    } else {
      updateData.followup_sent_at = new Date().toISOString();
    }

    const { error: updateError } = await supabase
      .from('outreach_queue')
      .update(updateData)
      .eq('id', queueItemId);

    if (updateError) {
      console.error('Failed to update queue item:', updateError);
    }

    return { success: true, trackingId };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

function personalizeTemplate(template: string, operatorName: string, profileUrl: string): string {
  return template
    .replace(/\{\{operator_name\}\}/g, operatorName)
    .replace(/\{\{profile_url\}\}/g, profileUrl);
}

function wrapLinksWithTracking(html: string, trackingId: string): string {
  // Match href attributes containing pestarrest.com.au
  const linkRegex = /href="(https?:\/\/(?:www\.)?pestarrest\.com\.au[^"]*)"/g;

  return html.replace(linkRegex, (match, url) => {
    const encodedUrl = encodeURIComponent(url);
    return `href="${siteUrl}/api/outreach/track/click?id=${trackingId}&url=${encodedUrl}"`;
  });
}

function generatePlainText(operatorName: string, profileUrl: string, emailType: 'initial' | 'followup'): string {
  if (emailType === 'initial') {
    return `Hey there!

I hope this finds you well. I'm Jayson — I run Pest Arrest, a new directory helping Sydney locals find trusted pest control operators.

I came across your business and thought you'd be a great fit, so I've created a free profile for you:

${profileUrl}

Have a look when you get a chance and let me know if anything needs updating — happy to tweak the description, add services, or fix any details.

One quick thing: if you'd like an "EPA Verified" badge on your listing (helps build trust with customers), just reply with your license number and I'll add it for you. No stress if not — your listing stays active either way.

Would love to hear how business is going for you at the moment. Always keen to chat with local operators.

Cheers,
Jayson

P.S. If this isn't relevant to you, no worries at all — just let me know and I won't email again.`.trim();
  } else {
    return `Hey ${operatorName},

Just wanted to check in — did you get a chance to see your listing on Pest Arrest?

${profileUrl}

Happy to make any updates if needed. And the offer still stands for the verified badge if you want to send through your license number.

Hope you're having a good week!

Cheers,
Jayson
https://www.pestarrest.com.au`.trim();
  }
}

export async function getPendingEmails(limit: number = 20) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('outreach_queue')
    .select('*')
    .eq('status', 'pending')
    .lte('send_after', new Date().toISOString())
    .limit(limit);

  if (error) {
    console.error('Error fetching pending emails:', error);
    return [];
  }

  return data || [];
}

export async function getFollowupsDue(limit: number = 20) {
  if (!supabase) return [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('outreach_queue')
    .select('*')
    .eq('status', 'sent')
    .lt('initial_sent_at', sevenDaysAgo.toISOString())
    .is('followup_sent_at', null)
    .is('replied_at', null)
    .limit(limit);

  if (error) {
    console.error('Error fetching followups due:', error);
    return [];
  }

  return data || [];
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
