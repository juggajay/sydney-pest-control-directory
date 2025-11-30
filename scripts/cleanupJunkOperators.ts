import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

// Patterns that indicate junk entries (not real business names)
const JUNK_PATTERNS = [
  // Call to action phrases
  'looking-for-',
  'how-do-i-',
  'contact-our-',
  'contact-pest-control',
  'contact-pest-specialists',
  'contact-wilsons-pest-control',
  'contact-fumapest-termite-pest-control',
  'call-your-local-',
  'call-pest-blockers-pest-control',
  'call-roaming-pest-management-service',
  'for-a-free-quote',
  'for-skilled-pest-control',
  'for-more-information',
  'for-expert-pest-control',
  'get-your-free-pest',
  'hire-trusted-pest',
  'choose-active-pest-control',
  'friendly-solution-to-your',
  'make-an-online-enquiry',
  'need-pest-control',
  'need-reliable-pest-control',
  'ready-to-book',
  'ready-to-protect',
  'ready-to-take-control',
  'schedule-a-consultation',
  'speak-to-',
  'so-why-let-pest',
  'so-why-wait-for-pests',
  'timeliness-is-critical',
  'when-you-choose-safe-pest',
  // Generic descriptors
  'pest-control-services-in-sydney',
  'pest-control-and-termite-treatment',
  'pest-control-phone',
  'pest-control-on-61',
  'pest-services-provided',
  'quick-and-easy-solutions',
  'reliable-pest-control-services',
  'results-for-',
  'search-results',
  'sydney-pest-control-services',
  'termite-pest-control-phone',
  'the-best-pest-control',
  'trusted-pest-control-in',
  'what-makes-',
  'why-choose-',
  't-let-pests-take-over',
  'hi-we-at-pesta-shield',
  'pesta-shield-offers',
  'more-info-about-i-pest',
  'safe-and-effective-pest-management-solutions',
  'pest-management-solutions-safe-and-effective',
  'star-rated-commercial',
  'years-dependable-pest',
  's-most-trusted-pest',
  's-number-one-pest',
  'termites-white-ants-termite',
  // Generic location names (not business names) - exact slug matches
  'bargain-pest-control',
  'cbd-pest-control',
  'eastern-suburbs-pest-control',
  'eastern-suburbs',
  'epping-pest-control',
  'general-pest-control',
  'north-shore-pest-control',
  'northern-beaches-pest-control',
  'now-pest-control',
  'penrith-pest-control',
  'pest-control-bondi',
  'pest-control-company',
  'pest-control-hills-district',
  'pest-control-north-sydney',
  'pest-control-parramatta',
  'pest-control-penrith',
  'pest-control-ryde',
  'pest-control-service',
  'pest-control-sydney',
  'pest-control',
  'possum-pest-control',
  'rip-pest-control',
  'safe-pest-control',
  'sydney-pest-control',
  'termite-inspection',
  'termite-pest-control',
  'true-pest-control',
  // Additional patterns
  'pest-control-bondi-google-maps',
  'pest-control-eastern-suburbs-sydney',
  'pest-control-eastern-suburbs',
  'pest-control-hills-district-l-the-bug',
  'pest-control-inner-west-most-common',
  'pest-control-lane-cove-by-mm',
  'pest-control-newtown-faqs',
  'pest-control-parramatta-experts',
  'pest-control-residential-and-business',
  'pest-control-sydney-nsw',
  'pest-control-sydney-wide',
  'pest-control-4u',
  'pest-inspections-in-chatswood',
  'general-pest-control-penrith',
  'local-pest-control-the-hills',
  'north-sydney-termite-pest',
  'professional-pest-control-sydney',
  'quality-north-shore-pest',
  'reliable-pest-control-sydney',
  'termite-inspections-in-sydney',
  'termite-treatment-sydney',
  'safe-pest-control-north-sydney',
  'second-opinion-pest-control',
  'menu-sydney-pest-control',
  'affordable-pest-control-inspections-sydney',
  'now-pest-control-reviews',
  'possum-pest-control-cronulla',
  'possum-pest-control-lane-cove',
  'eastern-suburbs-pest-control-la-perouse',
  // Duplicate location variants
  'micropest-pest-control-bondi-beach',
  'micropest-pest-control-castle-hill',
  'micropest-pest-control-chatswood',
  'micropest-pest-control-coogee',
  'micropest-pest-control-dee-why',
  'micropest-pest-control-leichhardt',
  'micropest-pest-control-manly',
  'micropest-pest-control-marrickville',
  'micropest-pest-control-north-sydney',
  'micropest-pest-control-sydney',
  'fumapest-campbelltown-pest',
  'fumapest-lane-cove-pest',
  'fumapest-north-sydney-pest',
  'fumapest-termite-pest-control-bankstown',
  // Perth (wrong city)
  'a1pestcontrolperth',
  // Prefixed with numbers or generic
  '1-pest-control-in-sydney',
  'a1-pest-control-bondi',
  'a1-pest-control-sydney-cbd',
  'all-hills-pest-control',
  'birds-problems-pest-control',
  'cu-pest-control',
  'emerson-s-envirocare-eco',
  'evolution-pest-management',
  'gs-murphy-pest-control',
  'hills-guardian',
  'max-force-pest-control',
  'pestmac-hornsby',
  'redback-environmental-pest',
  'vina-pest-control',
  // Phone numbers and markers
  '-call-',
  '-phone-',
  '-please-call',
  '-on-02-',
  '-at-02-',
  '1300-241-500',
  '238138764',
  '9679-8398',
  'community-noticeboard',
  'offices-near-',
];

async function cleanupJunkOperators() {
  console.log('🧹 Cleaning up junk operator entries from Supabase...\n');

  // Fetch all operators
  const { data: operators, error } = await supabase
    .from('operators')
    .select('id, slug, business_name');

  if (error) {
    console.error('Error fetching operators:', error.message);
    process.exit(1);
  }

  if (!operators || operators.length === 0) {
    console.log('No operators found');
    return;
  }

  console.log(`Found ${operators.length} total operators\n`);

  // Find junk entries
  const junkOperators = operators.filter(op => {
    const slug = op.slug.toLowerCase();
    return JUNK_PATTERNS.some(pattern => slug.includes(pattern));
  });

  console.log(`Found ${junkOperators.length} junk entries to delete:\n`);

  if (junkOperators.length === 0) {
    console.log('No junk entries found!');
    return;
  }

  // Show first 20 entries
  junkOperators.slice(0, 20).forEach(op => {
    console.log(`  - ${op.slug}`);
  });

  if (junkOperators.length > 20) {
    console.log(`  ... and ${junkOperators.length - 20} more`);
  }

  console.log('\n');

  // Delete junk entries
  const junkIds = junkOperators.map(op => op.id);

  const { error: deleteError } = await supabase
    .from('operators')
    .delete()
    .in('id', junkIds);

  if (deleteError) {
    console.error('Error deleting junk operators:', deleteError.message);
    process.exit(1);
  }

  console.log(`✅ Deleted ${junkOperators.length} junk operators from database`);

  // Count remaining
  const { count, error: countError } = await supabase
    .from('operators')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  if (!countError) {
    console.log(`   Remaining active operators: ${count}`);
  }
}

cleanupJunkOperators().catch(console.error);
