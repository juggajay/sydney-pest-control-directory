const { chromium } = require('playwright');

async function testGoogleMap() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to desktop size
  await page.setViewportSize({ width: 1400, height: 900 });

  console.log('Navigating to operator page...');
  await page.goto('http://localhost:3000/operator/sydneys-best-pest-control', {
    waitUntil: 'networkidle'
  });

  // Wait for the page to fully load
  await page.waitForTimeout(2000);

  // Take a full page screenshot
  await page.screenshot({
    path: 'screenshot-operator-page.png',
    fullPage: true
  });
  console.log('Full page screenshot saved: screenshot-operator-page.png');

  // Check if Google Maps iframe exists
  const mapIframe = await page.locator('iframe[src*="google.com/maps"]');
  const mapExists = await mapIframe.count() > 0;
  console.log(`Google Maps iframe found: ${mapExists}`);

  if (mapExists) {
    // Scroll to the map and take a focused screenshot
    await mapIframe.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Get the map container and take a screenshot
    const mapContainer = await page.locator('iframe[src*="google.com/maps"]').locator('..');
    await mapContainer.screenshot({ path: 'screenshot-google-map.png' });
    console.log('Google Map screenshot saved: screenshot-google-map.png');

    // Get the map URL to verify it's correct
    const mapSrc = await mapIframe.getAttribute('src');
    console.log(`Map iframe src: ${mapSrc}`);
  }

  // Check for Get Directions link
  const directionsLink = await page.locator('a:has-text("Get Directions")');
  const directionsExists = await directionsLink.count() > 0;
  console.log(`Get Directions link found: ${directionsExists}`);

  // Check for View on Google Maps link
  const viewMapLink = await page.locator('a:has-text("View on Google Maps")');
  const viewMapExists = await viewMapLink.count() > 0;
  console.log(`View on Google Maps link found: ${viewMapExists}`);

  // Take a screenshot of the sidebar area
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshot-sidebar-area.png'
  });
  console.log('Sidebar area screenshot saved: screenshot-sidebar-area.png');

  await browser.close();
  console.log('\nTest completed successfully!');
}

testGoogleMap().catch(console.error);
