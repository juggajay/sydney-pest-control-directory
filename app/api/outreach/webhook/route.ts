import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Resend webhook secret (configure in Resend dashboard)
const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;

interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
  };
}

async function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  timestamp: string | null
): Promise<boolean> {
  if (!RESEND_WEBHOOK_SECRET || !signature || !timestamp) {
    // If no secret configured, skip verification (for development)
    return true;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac('sha256', RESEND_WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex');

  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('resend-signature');
    const timestamp = request.headers.get('resend-timestamp');

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(payload, signature, timestamp);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: ResendWebhookEvent = JSON.parse(payload);

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Find the email record by resend_id
    const { data: emailRecord, error: fetchError } = await supabase
      .from('outreach_emails')
      .select('queue_id')
      .eq('resend_id', event.data.email_id)
      .single();

    if (fetchError || !emailRecord) {
      // Email not found - might not be an outreach email
      return NextResponse.json({ ok: true });
    }

    switch (event.type) {
      case 'email.bounced':
        await supabase
          .from('outreach_queue')
          .update({
            status: 'bounced',
            bounced_at: new Date().toISOString(),
          })
          .eq('id', emailRecord.queue_id);
        break;

      case 'email.complained':
        await supabase
          .from('outreach_queue')
          .update({
            status: 'unsubscribed',
            unsubscribed_at: new Date().toISOString(),
          })
          .eq('id', emailRecord.queue_id);
        break;

      case 'email.delivered':
        // Log delivery confirmation
        await supabase
          .from('outreach_emails')
          .update({
            delivered_at: new Date().toISOString(),
          })
          .eq('resend_id', event.data.email_id);
        break;

      default:
        // Unknown event type, ignore
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
