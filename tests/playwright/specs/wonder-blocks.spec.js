const { test, expect } = require('@playwright/test');
const path = require('path');

// Use environment variable to resolve plugin helpers
const pluginDir = process.env.PLUGIN_DIR || path.resolve(__dirname, '../../../../../../');
const { auth } = require(path.join(pluginDir, 'tests/playwright/helpers'));

test.describe('WonderBlocks', () => {
  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);
    
    // Navigate to new post page
    await page.goto('/wp-admin/post-new.php');
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
  });

  test('WonderBlocks button present and modal functions', async ({ page }) => {
    // Verify toolbar button exists
    const toolbarButton = page.locator('#nfd-wba-toolbar-button');
    await expect(toolbarButton).toBeVisible();
    
    // Wait a bit for initialization
    await page.waitForTimeout(1000);
    
    // Disable welcome guide if it's active (using WordPress data API)
    await page.evaluate(() => {
      if (window.wp?.data?.select('core/edit-post')?.isFeatureActive('welcomeGuide')) {
        window.wp.data.dispatch('core/edit-post').toggleFeature('welcomeGuide');
      }
    });
    
    await page.waitForTimeout(100);
    
    // Click the toolbar button to open modal
    await toolbarButton.locator('button').click();
    await page.waitForTimeout(100);
    
    // Verify body has modal-open class
    await expect(page.locator('body')).toHaveClass(/modal-open/);
    
    // Verify modal window exists and is visible
    const modal = page.locator('.nfd-wba-modal[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Test close button functionality
    const closeButton = modal.locator('.nfd-wba-modal__header button[aria-label="Close dialog"]');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await page.waitForTimeout(100);
    
    // Verify modal is closed
    await expect(page.locator('body')).not.toHaveClass(/modal-open/);
    await expect(modal).not.toBeVisible();
    
    // Test ESC key functionality
    await toolbarButton.locator('button').click();
    await page.waitForTimeout(100);
    await expect(modal).toBeVisible();
    
    // Press ESC key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    
    // Verify modal is closed
    await expect(modal).not.toBeVisible();
  });
});

