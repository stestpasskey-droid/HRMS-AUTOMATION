import { test, expect, Page } from '@playwright/test';
import { login } from './helpers';

test.describe.configure({ mode: 'serial' });

// Hardcoded slow motion (1000ms delay between actions)
test.use({ launchOptions: { slowMo: 1000 } });

let sharedPage: Page;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
  await login(sharedPage);
});

test.afterAll(async () => {
  await sharedPage.close();
});

test.describe('Employee Operations', () => {

  test('add employee', async () => {
    const page = sharedPage;
    
    // Generate dynamic data to make the test repeatable
    const timestamp = Date.now();
    const employeeCode = `E${timestamp}`;
    const workEmail = `test${timestamp}@gmail.com`;

    await test.step('Navigate to Employee Addition Page', async () => {
      await expect(page.getByRole('button', { name: 'Employee Operations' })).toBeVisible();
      await page.getByRole('button', { name: 'Employee Operations' }).click();
      
      await expect(page.getByRole('link', { name: 'Employees' })).toBeVisible();
      await page.getByRole('link', { name: 'Employees' }).click();
      
      await expect(page.getByRole('button', { name: 'plus Add Employee' })).toBeVisible();
      await page.getByRole('button', { name: 'plus Add Employee' }).click();
      
      await expect(page.getByRole('heading', { name: /Add Employee/i })).toBeVisible();
    });

    await test.step('Enter Staffing & Personal Details', async () => {
      await page.locator('select[name="staffingCode"]').selectOption('3');
      await page.getByRole('textbox', { name: 'First Name *' }).fill('akak');
      await page.getByRole('textbox', { name: 'Middle Name' }).fill('ak');
      await page.getByRole('textbox', { name: 'Last Name' }).fill('ak');
      
      await page.locator('input[name="dateOfBirth"]').fill('2003-12-29');
      await page.locator('input[name="dateOfBirth"]').press('Tab');
      
      await page.locator('select[name="gender"]').selectOption('263');
      await page.locator('select[name="bloodGroup"]').selectOption('265');
      await page.locator('select[name="religion"]').selectOption('268');
      await page.locator('select[name="nationality"]').selectOption('271');
    });

    await test.step('Enter Credentials & Work Info', async () => {
      await page.getByRole('textbox', { name: 'Employee Code *' }).fill(employeeCode);
      await page.getByRole('textbox', { name: 'Work Email *' }).fill(workEmail);
      await page.locator('input[name="password"]').fill('123456Admin@321');
      await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('3234533211');
      
      await page.locator('select[name="branchId"]').selectOption('45');
      await page.locator('select[name="departmentId"]').selectOption('89');
      await page.locator('select[name="designationId"]').selectOption('101');
      await page.locator('select[name="roleId"]').selectOption('37');
    });

    await test.step('Assign Reporting Manager', async () => {
      await page.locator('div').filter({ hasText: /^-Select-$/ }).nth(1).click();
      await page.getByRole('textbox', { name: 'Search...' }).click();
      await page.locator('.py-1 > div:nth-child(2)').click();
    });

    await test.step('Enter Employment History & Verification', async () => {
      await page.locator('select[name="experienceType"]').selectOption('Fresher');
      await page.locator('input[name="joinDate"]').fill('2026-03-28');
      await page.locator('select[name="employmentType"]').selectOption('Contract');
      await page.locator('select[name="employmentStatusId"]').selectOption('276');
      await page.locator('select[name="backgroundVerificationStatusId"]').selectOption('278');
      await page.locator('input[name="lastWorkingDate"]').fill('2026-03-30');
    });

    await test.step('Submit Form and Verify success', async () => {
      await page.locator('#sec-contact').getByRole('button').filter({ hasText: /^$/ }).click();
      await page.getByRole('button', { name: 'Create Employee' }).click();
      
      const successModal = page.getByRole('button', { name: 'OK' });
      await expect(successModal).toBeVisible({ timeout: 15000 });
      await page.screenshot({ path: 'test-results/employee-created-success.png' });
      await successModal.click();
    });

    await test.step('Verify new employee in the list', async () => {
      await expect(page).toHaveURL(/.*employees/);
      await page.waitForLoadState('load');
      const searchBox = page.getByPlaceholder(/search/i).first();
      await expect(searchBox).toBeVisible({ timeout: 15000 });
      await searchBox.fill(employeeCode);
      await page.waitForTimeout(2000); 
      await expect(page.getByText(employeeCode)).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('akak')).toBeVisible();
    });
  });

});
