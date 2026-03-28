import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1, // 👈 Ensures files run one after another
  reporter: 'html',

  use: {
    baseURL: 'https://qream-hrms.web.app',
    permissions: ['geolocation', 'camera', 'microphone'],
    headless: false,
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});

