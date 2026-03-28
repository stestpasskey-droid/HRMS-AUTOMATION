/**
 * tests/permissions.test.ts
 *
 * Verifies that browser permissions (geolocation, camera, microphone)
 * are silently granted — no pop-ups should block the user session.
 *
 * Permissions are pre-granted via playwright.config.ts `permissions: [...]`.
 * These tests confirm the grants are actually in effect after login.
 */

import { test, expect } from '@playwright/test';

test.describe('Browser Permissions', () => {

  test('geolocation permission is granted silently', async ({ page, context }) => {
    await context.grantPermissions(['geolocation'], {
      origin: 'https://qream-hrms.web.app',
    });
    await page.goto('/');

    const state = await page.evaluate(async () => {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state;
    });

    expect(state).toBe('granted');
  });

  test('camera permission is granted silently', async ({ page, context }) => {
    await context.grantPermissions(['camera'], {
      origin: 'https://qream-hrms.web.app',
    });
    await page.goto('/');

    const state = await page.evaluate(async () => {
      const result = await navigator.permissions.query({
        name: 'camera' as PermissionName,
      });
      return result.state;
    });

    expect(state).toBe('granted');
  });

  test('microphone permission is granted silently', async ({ page, context }) => {
    await context.grantPermissions(['microphone'], {
      origin: 'https://qream-hrms.web.app',
    });
    await page.goto('/');

    const state = await page.evaluate(async () => {
      const result = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });
      return result.state;
    });

    expect(state).toBe('granted');
  });

});
