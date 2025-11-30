import { NextRequest, NextResponse } from 'next/server';
import { sendOutreachEmail, getPendingEmails, getFollowupsDue, delay } from '@/lib/outreach/sendEmail';

const CRON_SECRET = process.env.CRON_SECRET;
// TODO: Increase DAILY_LIMIT to 20 after 2 weeks of sending
// Starting with 10 for domain warm-up period
const MAX_EMAILS_PER_RUN = 10;
const DELAY_BETWEEN_SENDS = 2000; // 2 seconds

export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get('authorization');
  const cronSignature = request.headers.get('x-vercel-cron-signature');

  if (!cronSignature && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = {
    initialSent: 0,
    followupsSent: 0,
    errors: [] as string[],
  };

  try {
    // Process initial emails
    const pendingEmails = await getPendingEmails(MAX_EMAILS_PER_RUN);

    for (const queueItem of pendingEmails) {
      const sendResult = await sendOutreachEmail({
        queueItemId: queueItem.id,
        recipientEmail: queueItem.operator_email,
        operatorName: queueItem.operator_name,
        profileUrl: queueItem.profile_url,
        emailType: 'initial',
      });

      if (sendResult.success) {
        result.initialSent++;
      } else {
        result.errors.push(`Initial email to ${queueItem.operator_email}: ${sendResult.error}`);
      }

      // Rate limiting
      await delay(DELAY_BETWEEN_SENDS);
    }

    // Process follow-ups
    const followupsDue = await getFollowupsDue(MAX_EMAILS_PER_RUN);

    for (const queueItem of followupsDue) {
      const sendResult = await sendOutreachEmail({
        queueItemId: queueItem.id,
        recipientEmail: queueItem.operator_email,
        operatorName: queueItem.operator_name,
        profileUrl: queueItem.profile_url,
        emailType: 'followup',
      });

      if (sendResult.success) {
        result.followupsSent++;
      } else {
        result.errors.push(`Followup email to ${queueItem.operator_email}: ${sendResult.error}`);
      }

      // Rate limiting
      await delay(DELAY_BETWEEN_SENDS);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    result.errors.push(`Unexpected error: ${errorMessage}`);
  }

  return NextResponse.json(result);
}
