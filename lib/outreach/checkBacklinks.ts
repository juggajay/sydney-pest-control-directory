import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface BacklinkCheckResult {
  checked: number;
  backlinksFound: number;
  errors: string[];
}

export async function checkBacklinks(): Promise<BacklinkCheckResult> {
  if (!supabase) {
    return { checked: 0, backlinksFound: 0, errors: ['Supabase client not initialized'] };
  }

  const result: BacklinkCheckResult = {
    checked: 0,
    backlinksFound: 0,
    errors: [],
  };

  try {
    // Fetch operators from outreach_queue with status in ('sent', 'opened', 'clicked') who haven't converted
    const { data: queueItems, error: queueError } = await supabase
      .from('outreach_queue')
      .select('id, operator_id, profile_url')
      .in('status', ['sent', 'opened', 'clicked']);

    if (queueError || !queueItems) {
      result.errors.push(`Failed to fetch queue items: ${queueError?.message}`);
      return result;
    }

    // Get operator IDs
    const operatorIds = queueItems.map(q => q.operator_id).filter(Boolean);

    if (operatorIds.length === 0) {
      return result;
    }

    // Fetch operators with their websites
    const { data: operators, error: operatorsError } = await supabase
      .from('operators')
      .select('id, website, slug')
      .in('id', operatorIds);

    if (operatorsError || !operators) {
      result.errors.push(`Failed to fetch operators: ${operatorsError?.message}`);
      return result;
    }

    // Create a map of operator ID to queue item
    const queueMap = new Map(queueItems.map(q => [q.operator_id, q]));

    // Process each operator with a website
    for (const operator of operators) {
      if (!operator.website) {
        continue;
      }

      try {
        const backlinkFound = await checkOperatorWebsite(operator.website);
        result.checked++;

        // Upsert to backlink_checks table
        const { error: upsertError } = await supabase
          .from('backlink_checks')
          .upsert({
            operator_id: operator.id,
            website_url: operator.website,
            backlink_found: backlinkFound,
            last_checked_at: new Date().toISOString(),
          }, {
            onConflict: 'operator_id',
          });

        if (upsertError) {
          result.errors.push(`Failed to upsert backlink check for ${operator.slug}: ${upsertError.message}`);
        }

        if (backlinkFound) {
          result.backlinksFound++;

          // Update outreach_queue status to 'converted'
          const queueItem = queueMap.get(operator.id);
          if (queueItem) {
            const { error: updateError } = await supabase
              .from('outreach_queue')
              .update({
                status: 'converted',
                converted_at: new Date().toISOString(),
              })
              .eq('id', queueItem.id);

            if (updateError) {
              result.errors.push(`Failed to update queue status for ${operator.slug}: ${updateError.message}`);
            }
          }
        }

        // Be polite - wait 3 seconds between requests
        await delay(3000);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        result.errors.push(`Error checking ${operator.slug}: ${errorMessage}`);
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    result.errors.push(`Unexpected error: ${errorMessage}`);
  }

  return result;
}

async function checkOperatorWebsite(websiteUrl: string): Promise<boolean> {
  try {
    // Normalize URL
    let url = websiteUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PestArrest-BacklinkChecker/1.0',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return false;
    }

    const html = await response.text();

    // Search for any link containing 'pestarrest.com.au'
    const backlinkPattern = /pestarrest\.com\.au/i;
    return backlinkPattern.test(html);
  } catch (err) {
    console.error(`Error fetching ${websiteUrl}:`, err);
    return false;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
