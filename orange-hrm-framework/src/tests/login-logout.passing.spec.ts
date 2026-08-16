import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages';
import { TestConfig } from '../config/test.config';

test.describe('OrangeHRM Login/Logout - Passing Tests', () => {
  test('should login with valid credentials and logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to login page
    await loginPage.goto();
    expect(await loginPage.isLoaded()).toBeTruthy();

    // Login with valid credentials
    await loginPage.login(TestConfig.username, TestConfig.password);

    // Verify dashboard is loaded
    expect(await dashboardPage.isLoaded()).toBeTruthy();

    // Logout
    await dashboardPage.logout();

    // Verify login page is displayed
    expect(await loginPage.isLoaded()).toBeTruthy();
  });
});
