/**
 * Final Cleanup Script - Remove non-company names
 * Keep only entries that look like real business names
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPERATORS_DIR = path.join(__dirname, '..', 'public', 'operators');

// Patterns that indicate marketing text, not company names
const INVALID_PATTERNS = [
  /^looking for/i,
  /^need /i,
  /^for more/i,
  /^for expert/i,
  /^for skilled/i,
  /^ready to/i,
  /^when you/i,
  /^why choose/i,
  /^so why/i,
  /^speak to/i,
  /^hire /i,
  /^make an/i,
  /^choose /i,
  /^schedule/i,
  /^about us/i,
  /^menu /i,
  /^our expert/i,
  /^s most/i,
  /^s number/i,
  /^years /i,
  /^ants /i,
  /^birds /i,
  /^cockroach /i,
  /^possum /i,
  /^termite /i,
  /^professional safe/i,
  /^quality /i,
  /comau/i,
  /faqs$/i,
  /^pest control$/i,
  /^general pest control$/i,
  /^\d+u$/i,  // Like "4u"
  /^(safe|now|true|rip) pest control$/i,  // Keep the full company ones
];

// Valid company names to keep (override patterns above)
const VALID_COMPANY_SLUGS = new Set([
  'a1pestcontrol',
  'micropest',
  'safepestcontrol',
  'dropdeadpest',
  'trustpestcontrolsydney',
  'mandmpest',
  'iconicpestsolutions',
  'epest',
  'tomspestcontrolsydney',
  'northshorepestcontrolcompany',
  'reliancepest',
  'northsydneypestmanagement',
  'killitpest',
  'samedaypestcontrolliverpool',
  'attackpestcontrol',
  'oncallpestcontrol',
  'krpestcontrol',
  'ocgpestcontrol',
  'dynamitepestcontrol',
  'penrithpestcontrolservices',
  'alphapestmanagement',
  'buzzofftermites',
  'wilsonspestcontrol',
  'roamingpest',
  'knockdownpestcontrol',
  'dependablepestcontrol',
  'shirepestcontrol',
  'impactpestcontrol',
  'nowpestcontrol',
  'b2bpestcontrol',
  'sspestcontrol',
  'pestfreepestandtermitecontrol',
  'bugtasticpestmanagement',
  'petriespestcontrol',
  'mrpestcontroller',
  'dylancopepestcontrol',
  'newtownpestcontrol',
  'innerwestpestcontrol',
  'essentialpestsolutions',
  'activepestcontrolmanagement',
  'randwickpestcontrol',
  'insightpestcontrol',
  'sydneypestcontrol',
  'rippestmanagement',
  'rydepestcontrolcompany',
  'goliathpestcontrol',
  'dawsonspest',
  'seniorpestmanagement',
  'campbelltownpestcontrol',
  'tahmoorpestcontrol',
  'macarthurpestsolution',
  'rippestcontrol',
  'pictonpestcontrol',
  'truepestcontrol',
  'sydneypestcrew',
  'southsydneypestcontrol',
  'stewartspestcontrol',
  'abcpestcontrolsydney',
  'deewhypestcontrol',
  'certified-pestmanagement',
  'wwwprovenpestnet',
  'fumapest',
  'scopepestsolutions',
]);

function isValidBusinessName(slug, businessName) {
  // First check if it's in our whitelist
  if (VALID_COMPANY_SLUGS.has(slug)) {
    return true;
  }

  // Check against invalid patterns
  for (const pattern of INVALID_PATTERNS) {
    if (pattern.test(businessName)) {
      return false;
    }
  }

  // Additional checks
  if (businessName.split(' ').length > 6) {
    return false; // Too many words, likely marketing text
  }

  return true;
}

async function cleanup() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('FINAL CLEANUP - Remove Non-Company Names');
  console.log('════════════════════════════════════════════════════════════\n');

  const files = fs.readdirSync(OPERATORS_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
  console.log(`Found ${files.length} operator files\n`);

  const validOperators = [];
  const deletedFiles = [];

  for (const file of files) {
    const filePath = path.join(OPERATORS_DIR, file);
    const slug = file.replace('.json', '');

    try {
      const operator = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const businessName = operator.businessName;

      if (isValidBusinessName(slug, businessName)) {
        // Clean up business name - remove duplicated company type suffixes
        let cleanName = businessName
          .replace(/\s+(Pest Control|Pest Management)\s+(Pest Control|Pest Management)/gi, ' Pest Control')
          .replace(/^(Micropest|Fumapest|Safepestcontrol|Samedaypestcontrol\w+)\s+Pest Control$/i, '$1')
          .trim();

        // Format camelCase slugs properly
        if (/^[a-z]+pest|pest[a-z]+$/i.test(cleanName) && !cleanName.includes(' ')) {
          cleanName = cleanName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/(pest)(control|management|solutions|free)/gi, '$1 $2')
            .replace(/(same)(day)/gi, '$1 $2')
            .replace(/(inner)(west)/gi, '$1 $2')
            .replace(/(north)(shore|sydney)/gi, '$1 $2')
            .replace(/(south)(sydney)/gi, '$1 $2')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }

        operator.businessName = cleanName;
        operator.tradingName = cleanName;
        fs.writeFileSync(filePath, JSON.stringify(operator, null, 2));
        validOperators.push(operator);
        console.log(`✅ ${cleanName}`);
      } else {
        console.log(`❌ Removing: ${businessName} (${slug})`);
        fs.unlinkSync(filePath);
        deletedFiles.push(file);
      }
    } catch (error) {
      console.log(`❌ Error: ${file} - ${error.message}`);
      fs.unlinkSync(filePath);
      deletedFiles.push(file);
    }
  }

  // Update index.json
  const indexPath = path.join(OPERATORS_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify({
    total: validOperators.length,
    lastUpdated: new Date().toISOString(),
    operators: validOperators.map(op => ({
      slug: op.slug,
      businessName: op.businessName,
      rating: op.rating,
      reviewCount: op.reviewCount,
      suburb: op.suburb
    }))
  }, null, 2));

  console.log('\n════════════════════════════════════════════════════════════');
  console.log('CLEANUP COMPLETE');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`Valid operators: ${validOperators.length}`);
  console.log(`Deleted: ${deletedFiles.length}`);
  console.log('════════════════════════════════════════════════════════════');
}

cleanup().catch(console.error);
