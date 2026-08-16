package com.dell.testing.selenium.bdd;

public final class DellTestConfig {

  private DellTestConfig() {
  }

  public static String applicationUrl() {
    return env("DELL_APPLICATION_URL", "https://opensource-demo.orangehrmlive.com/");
  }

  public static String username() {
    return env("DELL_APPLICATION_USERNAME", "Admin");
  }

  public static String password() {
    return env("DELL_APPLICATION_PASSWORD", "admin123");
  }

  public static String browserName() {
    return env("DELL_BROWSER", "chrome");
  }

  public static boolean headless() {
    return Boolean.parseBoolean(env("DELL_HEADLESS", "true"));
  }

  private static String env(String key, String defaultValue) {
    String value = System.getenv(key);
    return value == null || value.isBlank() ? defaultValue : value;
  }
}
