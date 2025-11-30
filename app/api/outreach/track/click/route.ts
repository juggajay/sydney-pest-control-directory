import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pestarrest.com.au';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackingId = searchParams.get('id');
  const destinationUrl = searchParams.get('url');

  if (trackingId && supabase) {
    try {
      // Fetch the email record
      const { data: emailRecord, error: fetchError } = await supabase
        .from('outreach_emails')
        .select('queue_id, email_type, clicked_at')
        .eq('tracking_id', trackingId)
        .single();

      if (!fetchError && emailRecord && !emailRecord.clicked_at) {
        // Update outreach_emails - only first click
        await supabase
          .from('outreach_emails')
          .update({ clicked_at: new Date().toISOString() })
          .eq('tracking_id', trackingId);

        // Update outreach_queue
        const updateData: Record<string, any> = {
          status: 'clicked',
        };

        if (emailRecord.email_type === 'initial') {
          updateData.initial_clicked_at = new Date().toISOString();
        } else {
          updateData.followup_clicked_at = new Date().toISOString();
        }

        await supabase
          .from('outreach_queue')
          .update(updateData)
          .eq('id', emailRecord.queue_id);
      }
    } catch (err) {
      console.error('Error tracking click:', err);
    }
  }

  // Redirect to destination URL or homepage
  const redirectUrl = destinationUrl ? decodeURIComponent(destinationUrl) : siteUrl;

  return NextResponse.redirect(redirectUrl, { status: 302 });
}
