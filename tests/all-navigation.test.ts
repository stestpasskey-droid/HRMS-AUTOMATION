import { test, expect, Page } from '@playwright/test';
import { openMenu, navigateTo, login } from './helpers';

test.describe.configure({ mode: 'serial' });

let sharedPage: Page;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
  await login(sharedPage);
});

test.afterAll(async () => {
  await sharedPage.close();
});

test('Slow Full Sidebar Navigation Walkthrough', async () => {
  // ── 1. MY ACTIVITIES ──────────────────────────────────────────
  await openMenu(sharedPage, 'My Activities');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Profile', { exact: true });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Attendance', { nth: 0 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Time Sheet', { nth: 0 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Overtime', { nth: 0 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Leaves', { nth: 0 });
  await sharedPage.waitForTimeout(2000);

  // ── 2. ORGANIZATION SETUP ──────────────────────────────────────
  await openMenu(sharedPage, 'Organization Setup');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Company Profile');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Branches');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Departments');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Designations');
  await sharedPage.waitForTimeout(2000);

  // ── 3. EMPLOYEE OPERATIONS ─────────────────────────────────────
  await openMenu(sharedPage, 'Employee Operations');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Employees');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Attendance', { nth: 1 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Projects');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Time Sheet', { nth: 1 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Leave Requests', { nth: 0 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Overtime Request');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Shifts');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Assets');
  await sharedPage.waitForTimeout(2000);

  // ── 4. MY TEAM ─────────────────────────────────────────────────
  await openMenu(sharedPage, 'My Team');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'My Team', { nth: 0 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Attendance', { nth: 2 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Time Sheet', { nth: 2 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Leave Requests', { nth: 1 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Overtime', { nth: 2 });
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Assigned Candidates');
  await sharedPage.waitForTimeout(2000);

  // ── 5. HIRING PROCESS ──────────────────────────────────────────
  await openMenu(sharedPage, 'Hiring Process');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Job Posting');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Candidate Applications');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Interview Schedule');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Empanelment');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Appointment Letter');
  await sharedPage.waitForTimeout(2000);

  // ── 6. BUSINESS NETWORK ────────────────────────────────────────
  await openMenu(sharedPage, 'Business Network');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Clients');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Vendors');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Assignments');
  await sharedPage.waitForTimeout(2000);

  // ── 7. FINANCE & ACCOUNTS ──────────────────────────────────────
  await openMenu(sharedPage, 'Finance & Accounts');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Invoices');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Payment Tracking');
  await sharedPage.waitForTimeout(2000);

  // ── 8. PAYROLL MANAGEMENT ──────────────────────────────────────
  await openMenu(sharedPage, 'Payroll Management');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Salary Components');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Salary Structures');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Generate Payroll');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Payroll History');
  await sharedPage.waitForTimeout(2000);

  // ── 9. SETTINGS ────────────────────────────────────────────────
  await openMenu(sharedPage, 'Settings');
  await sharedPage.waitForTimeout(1500);

  await navigateTo(sharedPage, 'Leave Policies');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Roles & Permissions');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Master Data');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'Geo Configurations');
  await sharedPage.waitForTimeout(2000);

  await navigateTo(sharedPage, 'System Logs');
  await sharedPage.waitForTimeout(2000);
});
