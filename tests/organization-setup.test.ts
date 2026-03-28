/**
 * tests/organization-setup.test.ts
 *
 * Tests every link inside the "Organization Setup" sidebar section.
 * Each link gets its own test so failures are isolated.
 */

import { test, expect, Page } from '@playwright/test';
import { openMenu, navigateTo, login } from './helpers';

// ── Run tests sequentially in one browser window ──────────────────────────────
test.describe.configure({ mode: 'serial' });

let sharedPage: Page;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
  await login(sharedPage);
});


test.afterAll(async () => {
  await sharedPage.close();
});

test.describe('Sidebar – Organization Setup (Sequential)', () => {

  test('navigate to Company Profile', async () => {
    await openMenu(sharedPage, 'Organization Setup');
    await navigateTo(sharedPage, 'Company Profile');
    await expect(sharedPage).toHaveURL(/company.?profile/i);
  });

  test('navigate to Branches', async () => {
    // We stay where we are and just click the next link!
    await openMenu(sharedPage, 'Organization Setup');
    await navigateTo(sharedPage, 'Branches');
    await expect(sharedPage).toHaveURL(/branches/i);
  });

  test('navigate to Departments', async () => {
    await openMenu(sharedPage, 'Organization Setup');
    await navigateTo(sharedPage, 'Departments');
    await expect(sharedPage).toHaveURL(/departments/i);
  });

  test('navigate to Designations', async () => {
    await openMenu(sharedPage, 'Organization Setup');
    await navigateTo(sharedPage, 'Designations');
    await expect(sharedPage).toHaveURL(/designations/i);
  });

});

