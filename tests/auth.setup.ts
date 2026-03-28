/**
 * tests/auth.setup.ts
 *
 * Runs ONCE before any test.
 * Logs in and saves the session (cookies + localStorage) to disk.
 * All other tests load that saved state — no repeated logins.
 */

import { test as setup, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

setup('authenticate', async ({ page }) => {
  // ── 1. Open login page ───────────────────────────────────────────────────
  await page.goto('/auth/login');

  // ── 2. Fill credentials ──────────────────────────────────────────────────
  await page.getByRole('textbox', { name: 'Email *' }).fill('admin@hiqelectronics.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Admin@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // ── 3. Optional: Dismiss post-login modal (2FA / intro prompt) ───────────
  const skipButton = page.getByRole('button', { name: 'Skip for Now' });
  if (await skipButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await skipButton.click();
  }

  // ── 4. Confirm we landed on the dashboard ───────────────────────────────
  await expect(page.getByRole('button', { name: 'My Activities' })).toBeVisible();

  // ── 5. PERSISTENCE FIX: Inspect storage ───────────────────────────────
  const storage = await page.evaluate(() => {
    return {
      localStorage: JSON.stringify(localStorage),
      cookies: document.cookie,
    };
  });
  console.log('--- DEBUG STORAGE START ---');
  console.log('LocalStorage:', storage.localStorage);
  console.log('Cookies:', storage.cookies);
  console.log('--- DEBUG STORAGE END ---');

  await page.waitForTimeout(2000); 

  // ── 6. Persist session to disk ───────────────────────────────────────────
  await page.context().storageState({ path: AUTH_FILE });
  console.log('✅ Session file size check:', (await require('fs').promises.stat(AUTH_FILE)).size, 'bytes');
});


