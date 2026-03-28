/**
 * tests/helpers.ts
 */

import { Page, expect } from '@playwright/test';

export async function openMenu(page: Page, menuName: string): Promise<void> {
  const menuButton = page.getByRole('button', { name: menuName });
  await menuButton.waitFor({ state: 'visible' });
  await menuButton.click();
  await page.waitForTimeout(500);
}

export async function navigateTo(
  page: Page,
  linkName: string,
  options: { exact?: boolean; nth?: number } = {}
): Promise<void> {
  const target = page.getByRole('link', {
    name: linkName,
    exact: options.exact ?? false,
  }).nth(options.nth ?? 0);

  await target.waitFor({ state: 'visible' });
  await target.click({ force: true });
}

export async function login(page: Page): Promise<void> {
  await page.goto('/');

  const myActivities = page.getByRole('button', { name: 'My Activities' });
  if (await myActivities.isVisible({ timeout: 5000 }).catch(() => false)) {
    return;
  }

  if (!page.url().includes('login')) {
    await page.goto('/auth/login');
  }

  await page.getByRole('textbox', { name: 'Email *' }).fill('admin@hiqelectronics.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Admin@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  const skipButton = page.getByRole('button', { name: 'Skip for Now' });
  if (await skipButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await skipButton.click();
  }

  await expect(myActivities).toBeVisible({ timeout: 15_000 });
}