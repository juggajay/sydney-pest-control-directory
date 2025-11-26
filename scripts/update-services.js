/**
 * Update service JSON files to include all required fields
 */

const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'public', 'services');

// Common pests mapping for each service
const commonPestsMap = {
  'general-pest-control': ['Cockroaches', 'Spiders', 'Ants', 'Silverfish'],
  'termite-inspection': ['Termites', 'White Ants', 'Timber Pests'],
  'termite-treatment': ['Subterranean Termites', 'Drywood Termites', 'Dampwood Termites'],
  'cockroach-control': ['German Cockroaches', 'American Cockroaches', 'Australian Cockroaches', 'Smokybrown Cockroaches'],
  'rodent-control': ['Rats', 'Mice', 'Roof Rats', 'Norway Rats'],
  'spider-control': ['Redback Spiders', 'Huntsman Spiders', 'Funnel-web Spiders', 'White-tail Spiders'],
  'ant-control': ['Black Ants', 'Coastal Brown Ants', 'Bull Ants', 'Carpenter Ants', 'Fire Ants'],
  'bed-bug-treatment': ['Bed Bugs', 'Cimex lectularius'],
  'flea-treatment': ['Cat Fleas', 'Dog Fleas', 'Human Fleas'],
  'possum-removal': ['Brushtail Possums', 'Ringtail Possums'],
  'bird-control': ['Pigeons', 'Indian Mynas', 'Starlings', 'Sparrows'],
  'wasp-bee-removal': ['European Wasps', 'Paper Wasps', 'Mud Wasps', 'Native Bees', 'Honey Bees'],
  'commercial-pest-control': ['Cockroaches', 'Rodents', 'Stored Product Pests', 'Flies', 'Birds'],
  'pre-purchase-inspection': ['Termites', 'Timber Borers', 'Wood Decay Fungi', 'Timber Pests'],
  'mosquito-control': ['Aedes Mosquitoes', 'Anopheles Mosquitoes', 'Culex Mosquitoes']
};

// Frequency mapping for each service
const frequencyMap = {
  'general-pest-control': 'Every 6-12 months',
  'termite-inspection': 'Annual inspection',
  'termite-treatment': 'One-time + monitoring',
  'cockroach-control': 'Every 3-6 months',
  'rodent-control': 'As needed + prevention',
  'spider-control': 'Every 6-12 months',
  'ant-control': 'Every 6-12 months',
  'bed-bug-treatment': 'One-time treatment',
  'flea-treatment': 'As needed',
  'possum-removal': 'One-time service',
  'bird-control': 'Installation + maintenance',
  'wasp-bee-removal': 'One-time removal',
  'commercial-pest-control': 'Monthly or quarterly',
  'pre-purchase-inspection': 'Pre-purchase',
  'mosquito-control': 'Seasonal treatment'
};

// Read all service JSON files
const indexPath = path.join(servicesDir, 'index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

let updatedCount = 0;

indexData.services.forEach(serviceMeta => {
  const slug = serviceMeta.slug || serviceMeta.id;
  const filePath = path.join(servicesDir, `${slug}.json`);

  try {
    const service = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add missing fields
    const updatedService = {
      ...service,
      // Ensure description field exists (alias of shortDescription)
      description: service.description || service.shortDescription,
      // Ensure priceRange is a string
      priceRange: typeof service.priceRange === 'object'
        ? service.priceRange.display
        : service.priceRange,
      // Add commonPests
      commonPests: service.commonPests || commonPestsMap[slug] || [],
      // Add frequency
      frequency: service.frequency || frequencyMap[slug] || 'As needed'
    };

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(updatedService, null, 2));
    console.log(`✓ Updated ${slug}`);
    updatedCount++;
  } catch (error) {
    console.error(`✗ Error updating ${slug}:`, error.message);
  }
});

console.log(`\nUpdated ${updatedCount} service files`);
