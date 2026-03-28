import { test, expect, Page } from '@playwright/test';
import { login, openMenu, navigateTo } from './helpers';

test.describe.configure({ mode: 'serial' });

let sharedPage: Page;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
  await login(sharedPage);
});

test.afterAll(async () => {
  await sharedPage.close();
});

test.describe('Sidebar – My Activities', () => {

  test('navigate to Profile', async () => {
    await openMenu(sharedPage, 'My Activities');
    await navigateTo(sharedPage, 'Profile', { exact: true });
    await expect(sharedPage).toHaveURL(/profile|info/i);
  });

  test('navigate to Attendance', async () => {
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
    await navigateTo(sharedPage, 'Leaves', { nth: 0 });
    await expect(sharedPage).toHaveURL(/leaves/i);
  });

});