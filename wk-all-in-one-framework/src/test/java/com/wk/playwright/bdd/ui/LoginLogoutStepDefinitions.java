package com.wk.playwright.bdd.ui;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.wk.common.WkEnvConfig;
import com.wk.playwright.pages.DashboardPage;
import com.wk.playwright.pages.LoginPage;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginLogoutStepDefinitions {

  private Playwright playwright;
  private Browser browser;
  private Page page;
  private DashboardPage dashboardPage;

  @Before
  public void setUp() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch(
        new BrowserType.LaunchOptions().setHeadless(WkEnvConfig.headless())
    );
    page = browser.newPage();
  }

  @After
  public void tearDown() {
    if (browser != null) {
      browser.close();
    }
    if (playwright != null) {
      playwright.close();
    }
  }

  @Given("the WK Playwright login page is opened")
  public void openLoginPage() {
    new LoginPage(page).open(WkEnvConfig.applicationUrl());
  }

  @When("the Playwright user logs in with valid credentials")
  public void login() {
    dashboardPage = new LoginPage(page).loginAs(WkEnvConfig.username(), WkEnvConfig.password());
  }

  @Then("the Playwright dashboard should be displayed")
  public void verifyDashboard() {
    assertTrue(dashboardPage.isLoaded(), "Dashboard should be visible");
  }

  @When("the Playwright user logs out")
  public void logout() {
    dashboardPage.logout();
  }

  @Then("the Playwright login page should be displayed")
  public void verifyLoginPage() {
    assertTrue(new LoginPage(page).isLoaded(), "Login page should be visible");
  }
}
