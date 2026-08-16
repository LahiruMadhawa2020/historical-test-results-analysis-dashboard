package com.wk.selenium.bdd;

import com.wk.common.WkEnvConfig;
import com.wk.selenium.pages.DashboardPage;
import com.wk.selenium.pages.LoginPage;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginLogoutStepDefinitions {

  private WebDriver driver;
  private DashboardPage dashboardPage;

  @Before
  public void setUp() {
    ChromeOptions options = new ChromeOptions();
    if (WkEnvConfig.headless()) {
      options.addArguments("--headless=new");
    }
    driver = new ChromeDriver(options);
  }

  @After
  public void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }

  @Given("the WK application login page is opened")
  public void openLoginPage() {
    new LoginPage(driver).open(WkEnvConfig.applicationUrl());
  }

  @When("the user logs in with valid credentials")
  public void login() {
    dashboardPage = new LoginPage(driver).loginAs(WkEnvConfig.username(), WkEnvConfig.password());
  }

  @Then("the dashboard should be displayed")
  public void verifyDashboard() {
    assertTrue(dashboardPage.isLoaded(), "Dashboard should be visible");
  }

  @When("the user logs out")
  public void logout() {
    dashboardPage.logout();
  }

  @Then("the login page should be displayed")
  public void verifyLoginPage() {
    assertTrue(new LoginPage(driver).isLoaded(), "Login page should be visible");
  }
}
