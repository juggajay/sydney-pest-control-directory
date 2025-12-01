import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

async function cleanJunk() {
  // Get all operators
  const { data: all } = await supabase
    .from('operators')
    .select('id, business_name, slug, website');

  if (!all) {
    console.log('No operators found');
    return;
  }

  console.log('Total operators before cleanup:', all.length);

  // Identify junk entries - no website and name contains junk patterns
  const junk = all.filter(op => {
    const name = op.business_name.toLowerCase();
    return !op.website && (
      name.includes('.com.au') ||
      name.includes('call us') ||
      name.includes('these rates') ||
      name.includes("won't") ||
      name.includes('about us') ||
      name.includes('case studies') ||
      name.includes('pest control in') ||
      name.includes('be pest-free') ||
      name.includes('friendly advice') ||
      name.includes('for your home') ||
      name.includes('for your business') ||
      name.length > 60
    );
  });

  console.log('Junk entries found:', junk.length);
  console.log('\nDeleting junk entries:');

  for (const op of junk) {
    const { error } = await supabase
      .from('operators')
      .delete()
      .eq('id', op.id);

    if (!error) {
      console.log('  Deleted:', op.business_name.substring(0, 50) + (op.business_name.length > 50 ? '...' : ''));
    } else {
      console.log('  Error deleting:', op.business_name.substring(0, 30), '-', error.message);
    }
  }

  // Count remaining
  const { count } = await supabase
    .from('operators')
    .select('*', { count: 'exact', head: true });

  console.log('\n=== CLEANUP COMPLETE ===');
  console.log('Operators remaining:', count);
}

cleanJunk();
