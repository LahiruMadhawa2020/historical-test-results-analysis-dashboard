import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.locator('a:has-text("Logout")');
    this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.userDropdown.waitFor({ timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }

  async getHeaderText(): Promise<string | null> {
    try {
      return await this.dashboardHeader.textContent();
    } catch {
      return null;
    }
  }
}
