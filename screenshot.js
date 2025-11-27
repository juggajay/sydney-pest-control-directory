const { chromium } = require('playwright');

async function takeScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Take screenshots of key pages
  const pages = [
    { url: 'http://localhost:3000/', name: 'home' },
    { url: 'http://localhost:3000/services', name: 'services' },
    { url: 'http://localhost:3000/operators', name: 'operators' },
    { url: 'http://localhost:3000/quote', name: 'quote' },
  ];

  for (const p of pages) {
    await page.goto(p.url, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1000); // Wait for CSS to load
    await page.screenshot({ path: `screenshot-${p.name}.png`, fullPage: false });
    console.log(`Screenshot saved: screenshot-${p.name}.png`);
  }

  await browser.close();
}

takeScreenshots().catch(console.error);
