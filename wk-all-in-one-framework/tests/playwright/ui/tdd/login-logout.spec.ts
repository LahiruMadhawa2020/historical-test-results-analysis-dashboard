import { test, expect } from '@playwright/test';

const username = process.env.WK_APPLICATION_USERNAME ?? 'Admin';
const password = process.env.WK_APPLICATION_PASSWORD ?? 'admin123';

test('WK Playwright TS UI login and logout', async ({ page }) => {
  await page.goto('/');
  await page.fill("input[name='username']", username);
  await page.fill("input[name='password']", password);
  await page.click("button[type='submit']");
  await expect(page.locator('.oxd-userdropdown-tab')).toBeVisible();
  await page.click('.oxd-userdropdown-tab');
  await page.click("a:has-text('Logout')");
  await expect(page.locator("input[name='username']")).toBeVisible();
});
