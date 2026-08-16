package com.srlink.playwright.pages;

import com.microsoft.playwright.Page;

public class DashboardPage {

  private final Page page;
  private final String userMenuSelector = ".oxd-userdropdown-tab";
  private final String logoutSelector = "a:has-text('Logout')";

  public DashboardPage(Page page) {
    this.page = page;
  }

  public boolean isLoaded() {
    return page.locator(userMenuSelector).isVisible();
  }

  public LoginPage logout() {
    page.click(userMenuSelector);
    page.click(logoutSelector);
    return new LoginPage(page);
  }
}
