import { test, expect, Page } from '@playwright/test';
import { login } from './helpers';

test.describe.configure({ mode: 'serial' });

// Add slow motion for better visibility during headed runs
test.use({ launchOptions: { slowMo: 1000 } });

let sharedPage: Page;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
  await login(sharedPage);
});

test.afterAll(async () => {
  await sharedPage.close();
});

test.describe('Employee Operations - Edit', () => {

  test('edit existing employee details', async () => {
    const page = sharedPage;

    await test.step('Navigate to Employees List', async () => {
      await expect(page.getByRole('button', { name: 'Employee Operations' })).toBeVisible();
      await page.getByRole('button', { name: 'Employee Operations' }).click();
      
      await expect(page.getByRole('link', { name: 'Employees' })).toBeVisible();
      await page.getByRole('link', { name: 'Employees' }).click();
    });

    await test.step('Open Edit Form', async () => {
      // Find the first available employee and click Edit
      await page.getByRole('cell').filter({ hasText: /^$/ }).first().click();
      await page.getByRole('button', { name: 'Edit' }).first().click();
      
      // Verify we are on the edit page by checking for a primary field
      await expect(page.locator('select[name="staffingCode"]')).toBeVisible({ timeout: 15000 });
    });

    await test.step('Update Employee Details', async () => {
      await page.locator('select[name="staffingCode"]').selectOption('5');
      
      await page.getByRole('spinbutton', { name: 'CTC (Cost to Company)' }).fill('12');
      await page.getByRole('spinbutton', { name: 'Billing Percentage' }).fill('10');
      
      await page.getByRole('textbox', { name: 'Temporary Address' }).fill('Dynamic Address Update');
      await page.locator('textarea[name="empSkills"]').fill('Playwright, Automation, Typescript');
      
      await page.getByRole('textbox', { name: 'Permanent Address' }).fill('Permanent Address Updated');
      await page.locator('textarea[name="aboutEmployee"]').fill('Automated edit test entry');
    });

    await test.step('Save and Verify Changes', async () => {
      await page.getByRole('button', { name: 'Save' }).click();

      // Handle success modal
      const successModal = page.getByRole('button', { name: 'OK' });
      await expect(successModal).toBeVisible({ timeout: 15000 });
      
      await page.screenshot({ path: 'test-results/employee-edit-final-success.png' });
      await successModal.click();
      
      // Allow a moment for the redirection or modal closure to complete
      await page.waitForTimeout(2000);
    });
  });

});
