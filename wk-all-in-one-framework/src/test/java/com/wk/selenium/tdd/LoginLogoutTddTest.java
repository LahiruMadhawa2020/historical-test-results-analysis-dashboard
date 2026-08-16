package com.wk.selenium.tdd;

import com.wk.common.WkEnvConfig;
import com.wk.selenium.pages.DashboardPage;
import com.wk.selenium.pages.LoginPage;
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
    if (WkEnvConfig.headless()) {
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
  void shouldLoadDashboardAfterLogin() {
    DashboardPage dashboard = new LoginPage(driver)
        .open(WkEnvConfig.applicationUrl())
        .loginAs(WkEnvConfig.username(), WkEnvConfig.password());

    assertTrue(dashboard.isLoaded(), "Dashboard should load after login");
  }

  @Test
  void shouldLoadLoginPageAfterLogout() {
    DashboardPage dashboard = new LoginPage(driver)
        .open(WkEnvConfig.applicationUrl())
        .loginAs(WkEnvConfig.username(), WkEnvConfig.password());

    LoginPage loginPage = dashboard.logout();
    assertTrue(loginPage.isLoaded(), "Login page should load after logout");
  }
}
