/**
 * Patterns Module Test Helpers for Playwright
 * 
 * Utilities for testing the Deactivation module functionality.
 * Includes plugin activation/deactivation helpers and survey interactions.
 */
import { createRequire } from 'module';
import { join } from 'path';
// Resolve plugin directory from PLUGIN_DIR env var (set by playwright.config.mjs) or process.cwd()
const pluginDir = process.env.PLUGIN_DIR || process.cwd();
const requireFromPlugin = createRequire(join(pluginDir, 'package.json'));
const pluginHelpers = requireFromPlugin('./tests/playwright/helpers/index.js');
// destructure pluginHelpers
let { auth, wordpress, newfold, a11y, utils } = pluginHelpers;

export {
  // Plugin helpers (re-exported for convenience)
  auth,
  wordpress,
  newfold,
  a11y,
  utils,
  
};
