import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages';
import { TestConfig } from '../config/test.config';

test.describe('OrangeHRM Login/Logout - Failing Tests', () => {
  test('should fail when expecting wrong dashboard header text', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to login page
    await loginPage.goto();
    expect(await loginPage.isLoaded()).toBeTruthy();

    // Login with valid credentials
    await loginPage.login(TestConfig.username, TestConfig.password);

    // Verify dashboard is loaded
    expect(await dashboardPage.isLoaded()).toBeTruthy();

    // This assertion will FAIL - expecting wrong header text
    const headerText = await dashboardPage.getHeaderText();
    expect(headerText).toContain('Wrong Dashboard Header Text That Does Not Exist');

    // Logout (this won't be reached due to failing assertion above)
    await dashboardPage.logout();
  });

  test('should fail when trying to login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();
    expect(await loginPage.isLoaded()).toBeTruthy();

    // Try to login with invalid credentials
    await loginPage.login('InvalidUser', 'InvalidPassword');

    // This assertion will FAIL - expecting no error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeNull();
  });
});
