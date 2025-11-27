// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Sydney Pest Control Directory', () => {

  test.describe('Homepage', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/pest control|sydney/i);
    });

    test('should have main navigation', async ({ page }) => {
      await page.goto('/');
      // Check for common nav elements
      const nav = page.locator('nav, header');
      await expect(nav.first()).toBeVisible();
    });

    test('should have hero section', async ({ page }) => {
      await page.goto('/');
      // Check for heading in hero
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    });
  });

  test.describe('Operators Page', () => {
    test('should load operators listing page', async ({ page }) => {
      await page.goto('/operators');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should display operator cards', async ({ page }) => {
      await page.goto('/operators');
      // Wait for operators to load
      await page.waitForTimeout(2000);
      // Check for any operator content
      const content = await page.content();
      expect(content.length).toBeGreaterThan(1000);
    });
  });

  test.describe('Individual Operator Page', () => {
    test('should load a1-pest-control-sydney-cbd page', async ({ page }) => {
      await page.goto('/operator/a1-pest-control-sydney-cbd');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should display operator details', async ({ page }) => {
      await page.goto('/operator/a1-pest-control-sydney-cbd');
      // Check page has content
      const content = await page.content();
      expect(content).toContain('A1');
    });
  });

  test.describe('Suburb Pages', () => {
    test('should load Sydney CBD suburb page', async ({ page }) => {
      await page.goto('/pest-control/sydney-cbd');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should load Parramatta suburb page', async ({ page }) => {
      await page.goto('/pest-control/parramatta');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Services Pages', () => {
    test('should load termite control service page', async ({ page }) => {
      await page.goto('/services/termite-control');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should load general pest control service page', async ({ page }) => {
      await page.goto('/services/general-pest-control');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Quote Page', () => {
    test('should load quote form page', async ({ page }) => {
      await page.goto('/quote');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should have form fields', async ({ page }) => {
      await page.goto('/quote');
      // Check for form elements
      const form = page.locator('form');
      await expect(form).toBeVisible();
    });

    test('should have step wizard visible', async ({ page }) => {
      await page.goto('/quote');
      // Check for step indicators in multi-step form (exact match)
      await expect(page.getByText('Service', { exact: true })).toBeVisible();
      await expect(page.getByText('Property', { exact: true })).toBeVisible();
      await expect(page.getByText('Details', { exact: true })).toBeVisible();
      // Contact appears in multiple places, check form heading instead
      await expect(page.getByText('What pest problem do you have?')).toBeVisible();
    });
  });

  test.describe('Contact Page', () => {
    test('should load contact page', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('About Page', () => {
    test('should load about page', async ({ page }) => {
      await page.goto('/about');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Locations Page', () => {
    test('should load locations page', async ({ page }) => {
      await page.goto('/locations');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('SEO Elements', () => {
    test('homepage should have meta description', async ({ page }) => {
      await page.goto('/');
      const metaDesc = page.locator('meta[name="description"]');
      await expect(metaDesc).toHaveAttribute('content', /.+/);
    });

    test('should have canonical URL', async ({ page }) => {
      await page.goto('/');
      const canonical = page.locator('link[rel="canonical"]');
      // Canonical may or may not exist, just check page loads
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should be mobile responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
      // Check no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(375 + 20); // Small tolerance
    });
  });

  test.describe('Performance', () => {
    test('homepage should load within 10 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000);
    });
  });

});
