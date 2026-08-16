package com.dell.testing.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {

  private final WebDriver driver;
  private final By username = By.name("username");
  private final By password = By.name("password");
  private final By submit = By.cssSelector("button[type='submit']");

  public LoginPage(WebDriver driver) {
    this.driver = driver;
  }

  public LoginPage open(String url) {
    driver.get(url);
    return this;
  }

  public DashboardPage loginAs(String user, String pass) {
    driver.findElement(username).sendKeys(user);
    driver.findElement(password).sendKeys(pass);
    driver.findElement(submit).click();
    return new DashboardPage(driver);
  }

  public boolean isLoaded() {
    return !driver.findElements(username).isEmpty();
  }
}
