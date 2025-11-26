/**
 * Database Setup Script
 * Runs the Supabase schema via the REST API
 */

const https = require('https');

const SUPABASE_URL = 'https://xzjufqybcqucsnqrqplp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6anVmcXliY3F1Y3NucXJxcGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjYyMDksImV4cCI6MjA3OTcwMjIwOX0.I0Cr-Zr0CsyVuefF3G5BrR3VdUNJnL4Ea_BQKw2eGDE';

// SQL statements to run (broken into individual statements)
const sqlStatements = [
  // 1. Create operators table
  `CREATE TABLE IF NOT EXISTS operators (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    trading_name VARCHAR(255),
    license_number VARCHAR(50),
    license_type VARCHAR(100),
    license_status VARCHAR(50) DEFAULT 'active',
    license_expiry DATE,
    epa_verified BOOLEAN DEFAULT false,
    epa_verified_date TIMESTAMP,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(500),
    address_street VARCHAR(255),
    address_suburb VARCHAR(100),
    address_postcode VARCHAR(10),
    address_state VARCHAR(10) DEFAULT 'NSW',
    abn VARCHAR(20),
    years_in_business INTEGER,
    employee_count VARCHAR(20),
    insurance_verified BOOLEAN DEFAULT false,
    services JSONB DEFAULT '[]'::jsonb,
    service_areas JSONB DEFAULT '[]'::jsonb,
    google_rating DECIMAL(2,1),
    google_review_count INTEGER DEFAULT 0,
    pricing JSONB DEFAULT '{}'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    short_description VARCHAR(500),
    operating_hours JSONB DEFAULT '{}'::jsonb,
    logo_url VARCHAR(500),
    images JSONB DEFAULT '[]'::jsonb,
    listing_tier VARCHAR(20) DEFAULT 'basic',
    featured BOOLEAN DEFAULT false,
    claimed BOOLEAN DEFAULT false,
    claimed_by UUID,
    claimed_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    seo_title VARCHAR(70),
    seo_description VARCHAR(160),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )`,

  // 2. Create leads table
  `CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    suburb VARCHAR(100),
    postcode VARCHAR(10),
    service VARCHAR(100),
    property_type VARCHAR(50),
    urgency VARCHAR(50),
    message TEXT,
    source VARCHAR(50) DEFAULT 'website',
    source_url VARCHAR(500),
    ip_address VARCHAR(50),
    user_agent TEXT,
    distributed_to JSONB DEFAULT '[]'::jsonb,
    distributed_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )`,

  // 3. Create contacts table
  `CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    operator_id UUID,
    source_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
  )`,

  // 4. Create operator_claims table
  `CREATE TABLE IF NOT EXISTS operator_claims (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    operator_id UUID,
    claimant_name VARCHAR(255) NOT NULL,
    claimant_email VARCHAR(255) NOT NULL,
    claimant_phone VARCHAR(20),
    claimant_role VARCHAR(100),
    verification_method VARCHAR(50),
    verification_code VARCHAR(50),
    verification_status VARCHAR(20) DEFAULT 'pending',
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )`,

  // 5. Create subscriptions table
  `CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    operator_id UUID,
    tier VARCHAR(20) NOT NULL,
    price_monthly DECIMAL(10,2),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT NOW(),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )`,

  // 6. Create page_views table
  `CREATE TABLE IF NOT EXISTS page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_type VARCHAR(50),
    page_slug VARCHAR(255),
    operator_id UUID,
    ip_address VARCHAR(50),
    user_agent TEXT,
    referrer VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
  )`
];

async function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);

    // Try using the query endpoint instead
    const postData = JSON.stringify({ query: sql });

    const options = {
      hostname: 'xzjufqybcqucsnqrqplp.supabase.co',
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data });
        } else {
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testConnection() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'xzjufqybcqucsnqrqplp.supabase.co',
      port: 443,
      path: '/rest/v1/',
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔌 Testing Supabase connection...\n');

  try {
    const test = await testConnection();
    console.log(`Connection status: ${test.status}`);

    if (test.status === 200) {
      console.log('✅ Successfully connected to Supabase!\n');
      console.log('📋 Tables available:', test.data || 'None yet');
    } else {
      console.log('⚠️  Connected but got status:', test.status);
    }

    console.log('\n' + '='.repeat(50));
    console.log('DATABASE SCHEMA READY');
    console.log('='.repeat(50));
    console.log('\nThe SQL schema file has been created at:');
    console.log('  supabase-schema.sql\n');
    console.log('To set up your database:');
    console.log('1. Go to: https://supabase.com/dashboard/project/xzjufqybcqucsnqrqplp');
    console.log('2. Click "SQL Editor" in the left sidebar');
    console.log('3. Click "New Query"');
    console.log('4. Copy and paste the contents of supabase-schema.sql');
    console.log('5. Click "Run"\n');
    console.log('This will create all required tables:');
    console.log('  - operators (pest control businesses)');
    console.log('  - leads (quote requests)');
    console.log('  - contacts (direct messages)');
    console.log('  - operator_claims (business claims)');
    console.log('  - subscriptions (payments)');
    console.log('  - page_views (analytics)\n');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
