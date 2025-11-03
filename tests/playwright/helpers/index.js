/**
 * Patterns Module Test Helpers for Playwright
 * 
 * Utilities for testing the Patterns module (WonderBlocks) functionality.
 * Module-specific helpers for pattern/wonder-blocks testing.
 */

const path = require('path');

// Use environment variable to resolve plugin helpers
const pluginDir = process.env.PLUGIN_DIR || path.resolve(__dirname, '../../../../../../');
const { wordpress } = require(path.join(pluginDir, 'tests/playwright/helpers'));
const { wpCli } = wordpress;

// Note: This module currently uses minimal helpers since tests are straightforward
// and can use plugin-level helpers directly. Additional module-specific helpers
// can be added here as needed.

module.exports = {
  // Placeholder for future module-specific helpers
};

