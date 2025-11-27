/**
 * Upload Operators to Supabase
 *
 * This script reads all operator JSON files from /public/operators/
 * and uploads them to the Supabase operators table.
 *
 * PREREQUISITE: Run this SQL in Supabase SQL Editor first:
 * CREATE POLICY "Allow insert operators" ON operators FOR INSERT WITH CHECK (true);
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Map JSON field names to database column names
function mapOperatorToDb(op) {
  return {
    business_name: op.businessName,
    slug: op.slug,
    trading_name: op.tradingName,
    license_number: op.licenseNumber,
    license_type: op.licenseType,
    license_status: op.licenseStatus?.toLowerCase() || 'active',
    license_expiry: op.licenseExpiry,
    epa_verified: op.epaVerified || false,
    phone: op.phone,
    email: op.email,
    website: op.website,
    address_suburb: op.suburb,
    address_postcode: op.postcode,
    services: op.services || [],
    service_areas: op.serviceAreas || [],
    google_rating: op.rating,
    google_review_count: op.reviewCount || 0,
    features: op.features || [],
    description: op.description,
    short_description: op.shortDescription,
    operating_hours: op.operatingHours,
    pricing: op.pricing,
    listing_tier: op.tier || 'basic',
    featured: op.featured || false,
    status: 'active'
  };
}

async function uploadOperators() {
  console.log('='.repeat(60));
  console.log('UPLOAD OPERATORS TO SUPABASE');
  console.log('='.repeat(60));

  const operatorsDir = path.join(__dirname, '..', 'public', 'operators');

  // Read all JSON files (excluding index.json)
  const files = fs.readdirSync(operatorsDir)
    .filter(f => f.endsWith('.json') && f !== 'index.json');

  console.log(`\nFound ${files.length} operator JSON files`);

  // Load all operators
  const operators = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(operatorsDir, file), 'utf-8');
      const op = JSON.parse(content);
      operators.push(op);
    } catch (e) {
      console.log(`Error reading ${file}: ${e.message}`);
    }
  }

  console.log(`Loaded ${operators.length} operators`);

  // First, try to delete existing operators to avoid duplicates
  console.log('\nClearing existing operators...');
  const { error: deleteError } = await supabase
    .from('operators')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.log(`Note: Could not clear existing operators: ${deleteError.message}`);
    console.log('Will try upsert instead...');
  } else {
    console.log('Cleared existing operators');
  }

  // Upload in batches of 10
  const batchSize = 10;
  let successCount = 0;
  let errorCount = 0;

  console.log(`\nUploading ${operators.length} operators in batches of ${batchSize}...`);

  for (let i = 0; i < operators.length; i += batchSize) {
    const batch = operators.slice(i, i + batchSize);
    const dbRecords = batch.map(mapOperatorToDb);

    const { data, error } = await supabase
      .from('operators')
      .upsert(dbRecords, { onConflict: 'slug' })
      .select();

    if (error) {
      console.log(`\nBatch ${Math.floor(i/batchSize) + 1} ERROR: ${error.message}`);
      errorCount += batch.length;

      // If RLS error, give instructions
      if (error.message.includes('row-level security')) {
        console.log('\n' + '='.repeat(60));
        console.log('RLS POLICY MISSING!');
        console.log('='.repeat(60));
        console.log('\nRun this SQL in Supabase SQL Editor:');
        console.log('\nCREATE POLICY "Allow insert operators" ON operators');
        console.log('FOR INSERT WITH CHECK (true);');
        console.log('\nCREATE POLICY "Allow update operators" ON operators');
        console.log('FOR UPDATE USING (true);');
        console.log('\nCREATE POLICY "Allow delete operators" ON operators');
        console.log('FOR DELETE USING (true);');
        console.log('\n' + '='.repeat(60));
        process.exit(1);
      }
    } else {
      successCount += data?.length || batch.length;
      process.stdout.write(`\rUploaded: ${successCount}/${operators.length}`);
    }
  }

  console.log('\n');
  console.log('='.repeat(60));
  console.log('UPLOAD COMPLETE');
  console.log('='.repeat(60));
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log('='.repeat(60));
}

uploadOperators().catch(console.error);
