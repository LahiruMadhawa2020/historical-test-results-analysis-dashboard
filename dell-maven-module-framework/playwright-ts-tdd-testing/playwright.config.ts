import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
  reporter: [['list'], ['json', { outputFile: 'reports/playwright/results.json' }]],
  use: {
    baseURL: process.env.DELL_APPLICATION_URL ?? 'https://opensource-demo.orangehrmlive.com/',
    headless: (process.env.DELL_HEADLESS ?? 'true') !== 'false',
    trace: 'off'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
