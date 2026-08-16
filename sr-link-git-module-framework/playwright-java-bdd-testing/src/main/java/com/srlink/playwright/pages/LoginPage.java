package com.srlink.playwright.pages;

import com.microsoft.playwright.Page;

public class LoginPage {

  private final Page page;
  private final String usernameSelector = "input[name='username']";
  private final String passwordSelector = "input[name='password']";
  private final String submitSelector = "button[type='submit']";

  public LoginPage(Page page) {
    this.page = page;
  }

  public LoginPage open(String url) {
    page.navigate(url);
    return this;
  }

  public DashboardPage loginAs(String user, String pass) {
    page.fill(usernameSelector, user);
    page.fill(passwordSelector, pass);
    page.click(submitSelector);
    return new DashboardPage(page);
  }

  public boolean isLoaded() {
    return page.locator(usernameSelector).isVisible();
  }
}
