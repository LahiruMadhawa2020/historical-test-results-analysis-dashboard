package com.wk.common;

public final class WkEnvConfig {

  private WkEnvConfig() {
  }

  public static String applicationUrl() {
    return env("WK_APPLICATION_URL", "https://opensource-demo.orangehrmlive.com/");
  }

  public static String username() {
    return env("WK_APPLICATION_USERNAME", "Admin");
  }

  public static String password() {
    return env("WK_APPLICATION_PASSWORD", "admin123");
  }

  public static String apiUrl() {
    return env("WK_API_URL", "https://jsonplaceholder.typicode.com/");
  }

  public static boolean headless() {
    return Boolean.parseBoolean(env("WK_HEADLESS", "true"));
  }

  private static String env(String key, String defaultValue) {
    String value = System.getenv(key);
    return value == null || value.isBlank() ? defaultValue : value;
  }
}
