import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// 1x1 transparent GIF
const TRANSPARENT_GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackingId = searchParams.get('id');

  if (trackingId && supabase) {
    try {
      // Fetch the email record
      const { data: emailRecord, error: fetchError } = await supabase
        .from('outreach_emails')
        .select('queue_id, email_type, opened_at')
        .eq('tracking_id', trackingId)
        .single();

      if (!fetchError && emailRecord && !emailRecord.opened_at) {
        // Update outreach_emails - only first open
        await supabase
          .from('outreach_emails')
          .update({ opened_at: new Date().toISOString() })
          .eq('tracking_id', trackingId);

        // Update outreach_queue
        const updateData: Record<string, any> = {
          status: 'opened',
        };

        if (emailRecord.email_type === 'initial') {
          updateData.initial_opened_at = new Date().toISOString();
        } else {
          updateData.followup_opened_at = new Date().toISOString();
        }

        await supabase
          .from('outreach_queue')
          .update(updateData)
          .eq('id', emailRecord.queue_id);
      }
    } catch (err) {
      console.error('Error tracking open:', err);
    }
  }

  return new NextResponse(TRANSPARENT_GIF, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
