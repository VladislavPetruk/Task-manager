import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  timeout: 10000,
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: require.resolve('./e2e/setup/globalSetup'),
  use: {
    storageState: path.join(__dirname, './e2e/setup/state.json'),
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',  // Для налагодження можна зробити скріншоти на помилках
    video: 'retain-on-failure',
  },
  // use: {
  //   storageState: path.join(__dirname, 'e2e/setup/state.json'),
  //   baseURL: 'http://localhost:3000',
  //   trace: 'on-first-retry',
  // },
  // globalSetup: require.resolve('./e2e/setup/globalSetup'),

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
});
