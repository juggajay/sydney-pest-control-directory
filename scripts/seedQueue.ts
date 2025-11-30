import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pestarrest.com.au';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedQueue(campaignId: string) {
  console.log(`Seeding queue for campaign: ${campaignId}`);

  // Verify campaign exists
  const { data: campaign, error: campaignError } = await supabase
    .from('outreach_campaigns')
    .select('id, name, status')
    .eq('id', campaignId)
    .single();

  if (campaignError || !campaign) {
    console.error('Campaign not found:', campaignError?.message);
    process.exit(1);
  }

  console.log(`Found campaign: ${campaign.name} (${campaign.status})`);

  // Fetch all operators with email addresses
  const { data: operators, error: operatorsError } = await supabase
    .from('operators')
    .select('id, business_name, email, slug')
    .not('email', 'is', null)
    .neq('email', '');

  if (operatorsError) {
    console.error('Error fetching operators:', operatorsError.message);
    process.exit(1);
  }

  console.log(`Found ${operators?.length || 0} operators with email addresses`);

  if (!operators || operators.length === 0) {
    console.log('No operators to add to queue.');
    return;
  }

  // Check which operators are already in queue for this campaign
  const { data: existingQueue } = await supabase
    .from('outreach_queue')
    .select('operator_id')
    .eq('campaign_id', campaignId);

  const existingOperatorIds = new Set(existingQueue?.map(q => q.operator_id) || []);

  console.log(`${existingOperatorIds.size} operators already in queue`);

  // Filter out operators already in queue
  const newOperators = operators.filter(op => !existingOperatorIds.has(op.id));

  console.log(`${newOperators.length} new operators to add`);

  if (newOperators.length === 0) {
    console.log('All operators already in queue.');
    return;
  }

  // Warm-up schedule: gradual increase in sends per day
  // Day 1-2: 5 emails each, Day 3-4: 10 emails each, then 15/day ongoing
  const operatorsPerDay = [5, 5, 10, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];

  // Prepare queue items with staggered send dates
  const queueItems: any[] = [];
  let dayOffset = 0;
  let countForDay = 0;
  let dayLimit = operatorsPerDay[0];

  for (const operator of newOperators) {
    const sendAfter = new Date();
    sendAfter.setDate(sendAfter.getDate() + dayOffset);
    sendAfter.setHours(9, 0, 0, 0); // Start at 9am Sydney time

    queueItems.push({
      campaign_id: campaignId,
      operator_id: operator.id,
      operator_email: operator.email,
      operator_name: operator.business_name,
      profile_url: `${siteUrl}/operator/${operator.slug}`,
      status: 'pending',
      send_after: sendAfter.toISOString(),
      created_at: new Date().toISOString(),
    });

    countForDay++;
    if (countForDay >= dayLimit) {
      dayOffset++;
      countForDay = 0;
      // Use schedule if available, otherwise default to 15/day
      dayLimit = operatorsPerDay[dayOffset] || 15;
    }
  }

  // Log the warm-up schedule
  console.log('\nWarm-up schedule:');
  let scheduled = 0;
  for (let d = 0; d <= dayOffset; d++) {
    const limit = operatorsPerDay[d] || 15;
    const remaining = newOperators.length - scheduled;
    const forThisDay = Math.min(limit, remaining);
    if (forThisDay > 0) {
      const date = new Date();
      date.setDate(date.getDate() + d);
      console.log(`  Day ${d + 1} (${date.toLocaleDateString('en-AU')}): ${forThisDay} emails`);
      scheduled += forThisDay;
    }
  }

  // Insert in batches of 100
  const batchSize = 100;
  let inserted = 0;

  for (let i = 0; i < queueItems.length; i += batchSize) {
    const batch = queueItems.slice(i, i + batchSize);
    const { error: insertError } = await supabase
      .from('outreach_queue')
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError.message);
    } else {
      inserted += batch.length;
      console.log(`Inserted batch ${i / batchSize + 1}: ${batch.length} items`);
    }
  }

  console.log(`\nComplete! Added ${inserted} operators to the queue.`);
  console.log(`Emails will be sent over ${dayOffset + 1} days with gradual warm-up.`);
}

// Get campaign ID from command line args
const campaignId = process.argv[2];

if (!campaignId) {
  console.error('Usage: npx tsx scripts/seedQueue.ts <campaign_id>');
  console.error('\nTo get a campaign ID:');
  console.error('1. Go to /admin/outreach/campaigns');
  console.error('2. Create or select a campaign');
  console.error('3. Copy the campaign ID from the URL or database');
  process.exit(1);
}

seedQueue(campaignId);
