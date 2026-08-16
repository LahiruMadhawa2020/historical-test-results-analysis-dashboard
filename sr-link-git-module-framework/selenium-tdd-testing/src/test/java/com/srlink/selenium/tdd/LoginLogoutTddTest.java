package com.srlink.selenium.tdd;

import com.srlink.common.SrLinkEnvConfig;
import com.srlink.selenium.pages.DashboardPage;
import com.srlink.selenium.pages.LoginPage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

class LoginLogoutTddTest {

  private WebDriver driver;

  @BeforeEach
  void setUp() {
    ChromeOptions options = new ChromeOptions();
    if (SrLinkEnvConfig.headless()) {
      options.addArguments("--headless=new");
    }
    driver = new ChromeDriver(options);
  }

  @AfterEach
  void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }

  @Test
  void shouldLoginAndLogout() {
    DashboardPage dashboard = new LoginPage(driver)
        .open(SrLinkEnvConfig.applicationUrl())
        .loginAs(SrLinkEnvConfig.username(), SrLinkEnvConfig.password());

    assertTrue(dashboard.isLoaded(), "Dashboard should load after login");

    LoginPage loginPage = dashboard.logout();
    assertTrue(loginPage.isLoaded(), "Login page should load after logout");
  }
}
