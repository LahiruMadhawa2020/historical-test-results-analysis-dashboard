package com.dell.testing.selenium.tdd;

import com.dell.testing.selenium.pages.DashboardPage;
import com.dell.testing.selenium.pages.LoginPage;
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
    if (DellTestConfig.headless()) {
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
        .open(DellTestConfig.applicationUrl())
        .loginAs(DellTestConfig.username(), DellTestConfig.password());

    assertTrue(dashboard.isLoaded(), "Dashboard should load after login");

    LoginPage loginPage = dashboard.logout();
    assertTrue(loginPage.isLoaded(), "Login page should load after logout");
  }
}
