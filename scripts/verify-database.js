const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xzjufqybcqucsnqrqplp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6anVmcXliY3F1Y3NucXJxcGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjYyMDksImV4cCI6MjA3OTcwMjIwOX0.I0Cr-Zr0CsyVuefF3G5BrR3VdUNJnL4Ea_BQKw2eGDE'
);

async function verifyTables() {
  console.log('🔍 Verifying database tables...\n');

  const tables = ['operators', 'leads', 'contacts', 'operator_claims', 'subscriptions', 'page_views'];

  for (const table of tables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ ${table}: Error - ${error.message}`);
    } else {
      console.log(`✅ ${table}: Ready (${count || 0} rows)`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('DATABASE VERIFICATION COMPLETE');
  console.log('='.repeat(50));
}

verifyTables();
