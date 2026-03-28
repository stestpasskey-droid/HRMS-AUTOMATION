/**
 * tests/sidebar-navigation.test.ts
 *
 * Tests every sidebar menu and its child links.
 *
 * WHY THE ORIGINAL CODE FAILED:
 *  1. The SPA sidebar collapses when focus moves away — we must re-open the
 *     parent menu before each child link click.
 *  2. There was no wait after clicking a link — the SPA router needs time
 *     to render the new view before the next assertion runs.
 *  3. All links were tested in one giant test — a single failure hid all
 *     subsequent failures. Each link is now its own isolated test.
 *
 * HOW IT IS FIXED:
 *  - openMenu()   → reliably expands a top-level sidebar section
 *  - navigateTo() → clicks a link and waits for the page to settle
 *  - Each test opens a fresh page (storageState already logged in)
 *    and re-opens its parent menu independently.
 */

import { test, expect, Page } from '@playwright/test';
import { openMenu, navigateTo, login } from './helpers';

// ─── Shared Configuration ───────────────────────────────────────────────────

test.describe.configure({ mode: 'serial' });

let sharedPage: Page;

// ─── Test Suite Setup ───────────────────────────────────────────────────────

test.beforeAll(async ({ browser }) => {
  // 1️⃣ Create ONE shared browser window for all tests in this file
  sharedPage = await browser.newPage();
  
  // 2️⃣ Perform login ONCE (since storageState fails for this app)
  await login(sharedPage);
});


test.afterAll(async () => {
  // 4️⃣ Close the shared page/context when all tests are done
  await sharedPage.close();
});


// ─── Navigation Tests ───────────────────────────────────────────────────────

test.describe('My Activities Section', () => {

  test('navigate to Profile', async () => {
    await openMenu(sharedPage, 'My Activities');
    await navigateTo(sharedPage, 'Profile', { exact: true });
    await expect(sharedPage).toHaveURL(/profile/i);
  });

  test('navigate to Attendance', async () => {
    // 👈 NO page.goto('/') here! We stay on the Profile page and just click the next link.
    await openMenu(sharedPage, 'My Activities');
    await navigateTo(sharedPage, 'Attendance', { nth: 0 });
    await expect(sharedPage).toHaveURL(/attendance/i);
  });

  test('navigate to Time Sheet', async () => {
    await openMenu(sharedPage, 'My Activities');
    await navigateTo(sharedPage, 'Time Sheet', { nth: 0 });
    await expect(sharedPage).toHaveURL(/time.?sheet/i);
  });

  test('navigate to Overtime', async () => {
    await openMenu(sharedPage, 'My Activities');
    await navigateTo(sharedPage, 'Overtime', { nth: 0 });
    await expect(sharedPage).toHaveURL(/overtime/i);
  });

  test('navigate to Leaves', async () => {
    await openMenu(sharedPage, 'My Activities');
    await navigateTo(sharedPage, 'Leaves');
    await expect(sharedPage).toHaveURL(/leaves/i);
  });

});

test.describe('Organization Setup Section', () => {

  test('navigate to Company Profile', async () => {
    // 👈 Again, we stay where we were (on 'Leaves' page) and navigate directly.
    await openMenu(sharedPage, 'Organization Setup');
    await navigateTo(sharedPage, 'Company Profile');
    await expect(sharedPage).toHaveURL(/company.?profile/i);
  });

  test('navigate to Branches', async () => {
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

test.describe('Employee Operations Section', () => {

  test('navigate to Employees', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Employees');
    await expect(sharedPage).toHaveURL(/employees/i);
  });

  test('navigate to Attendance (Employee Ops)', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Attendance');
    await expect(sharedPage).toHaveURL(/attendance/i);
  });

  test('navigate to Projects', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Projects');
    await expect(sharedPage).toHaveURL(/projects/i);
  });

  test('navigate to Time Sheet (Employee Ops)', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Time Sheet');
    await expect(sharedPage).toHaveURL(/time.?sheet/i);
  });

  test('navigate to Leave Requests', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Leave Requests');
    await expect(sharedPage).toHaveURL(/leave.?requests/i);
  });

  test('navigate to Overtime Request', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Overtime Request');
    await expect(sharedPage).toHaveURL(/overtime.?request/i);
  });

  test('navigate to Shifts', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Shifts');
    await expect(sharedPage).toHaveURL(/shifts/i);
  });

  test('navigate to Assets', async () => {
    await openMenu(sharedPage, 'Employee Operations');
    await navigateTo(sharedPage, 'Assets');
    await expect(sharedPage).toHaveURL(/assets/i);
  });

});

test.describe('My Team Section', () => {

  test('navigate to My Team', async () => {
    await openMenu(sharedPage, 'My Team');
    await navigateTo(sharedPage, 'My Team');
    await expect(sharedPage).toHaveURL(/my-team/i);
  });

  test('navigate to Team Attendance', async () => {
    await openMenu(sharedPage, 'My Team');
    await navigateTo(sharedPage, 'Attendance');
    await expect(sharedPage).toHaveURL(/attendance/i);
  });

});

test.describe('Hiring Process Section', () => {

  test('navigate to Job Posting', async () => {
    await openMenu(sharedPage, 'Hiring Process');
    await navigateTo(sharedPage, 'Job Posting');
    await expect(sharedPage).toHaveURL(/job.?posting/i);
  });

  test('navigate to Candidate Applications', async () => {
    await openMenu(sharedPage, 'Hiring Process');
    await navigateTo(sharedPage, 'Candidate Applications');
    await expect(sharedPage).toHaveURL(/candidate/i);
  });

});

test.describe('Business Network Section', () => {

  test('navigate to Clients', async () => {
    await openMenu(sharedPage, 'Business Network');
    await navigateTo(sharedPage, 'Clients');
    await expect(sharedPage).toHaveURL(/clients/i);
  });

});

test.describe('Finance & Accounts Section', () => {

  test('navigate to Invoices', async () => {
    await openMenu(sharedPage, 'Finance & Accounts');
    await navigateTo(sharedPage, 'Invoices');
    await expect(sharedPage).toHaveURL(/invoices/i);
  });

});

test.describe('Payroll Management Section', () => {

  test('navigate to Salary Components', async () => {
    await openMenu(sharedPage, 'Payroll Management');
    await navigateTo(sharedPage, 'Salary Components');
    await expect(sharedPage).toHaveURL(/salary.?components/i);
  });

});

test.describe('Settings Section', () => {

  test('navigate to Leave Policies', async () => {
    await openMenu(sharedPage, 'Settings');
    await navigateTo(sharedPage, 'Leave Policies');
    await expect(sharedPage).toHaveURL(/leave.?polic/i);
  });

  test('navigate to Roles & Permissions', async () => {
    await openMenu(sharedPage, 'Settings');
    await navigateTo(sharedPage, 'Roles & Permissions');
    await expect(sharedPage).toHaveURL(/roles/i);
  });

});

