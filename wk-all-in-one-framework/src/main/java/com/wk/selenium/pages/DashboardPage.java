package com.wk.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class DashboardPage {

  private final WebDriver driver;
  private final By userMenu = By.cssSelector(".oxd-userdropdown-tab");
  private final By logoutLink = By.xpath("//a[contains(text(),'Logout')]");

  public DashboardPage(WebDriver driver) {
    this.driver = driver;
  }

  public boolean isLoaded() {
    return new WebDriverWait(driver, Duration.ofSeconds(15))
        .until(d -> d.findElements(userMenu).size() > 0);
  }

  public LoginPage logout() {
    driver.findElement(userMenu).click();
    new WebDriverWait(driver, Duration.ofSeconds(10))
        .until(ExpectedConditions.elementToBeClickable(logoutLink))
        .click();
    return new LoginPage(driver);
  }
}
