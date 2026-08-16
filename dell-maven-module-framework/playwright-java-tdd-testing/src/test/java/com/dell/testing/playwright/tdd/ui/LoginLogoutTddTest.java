package com.dell.testing.playwright.tdd.ui;

import com.dell.testing.playwright.pages.DashboardPage;
import com.dell.testing.playwright.pages.LoginPage;
import com.dell.testing.playwright.tdd.DellTestConfig;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class LoginLogoutTddTest {

  private Playwright playwright;
  private Browser browser;
  private Page page;

  @BeforeEach
  void setUp() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch(
        new BrowserType.LaunchOptions().setHeadless(DellTestConfig.headless())
    );
    page = browser.newPage();
  }

  @AfterEach
  void tearDown() {
    if (browser != null) {
      browser.close();
    }
    if (playwright != null) {
      playwright.close();
    }
  }

  @Test
  void shouldLoginAndLogout() {
    DashboardPage dashboard = new LoginPage(page)
        .open(DellTestConfig.applicationUrl())
        .loginAs(DellTestConfig.username(), DellTestConfig.password());

    assertTrue(dashboard.isLoaded(), "Dashboard should load after login");

    LoginPage loginPage = dashboard.logout();
    assertTrue(loginPage.isLoaded(), "Login page should load after logout");
  }
}
