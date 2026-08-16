package com.srlink.common;

public final class SrLinkEnvConfig {

  private SrLinkEnvConfig() {
  }

  public static String applicationUrl() {
    return env("SR_LINK_APPLICATION_URL", "https://opensource-demo.orangehrmlive.com/");
  }

  public static String username() {
    return env("SR_LINK_APPLICATION_USERNAME", "Admin");
  }

  public static String password() {
    return env("SR_LINK_APPLICATION_PASSWORD", "admin123");
  }

  public static String apiUrl() {
    return env("SR_LINK_API_URL", "https://jsonplaceholder.typicode.com/");
  }

  public static boolean headless() {
    return Boolean.parseBoolean(env("SR_LINK_HEADLESS", "true"));
  }

  private static String env(String key, String defaultValue) {
    String value = System.getenv(key);
    return value == null || value.isBlank() ? defaultValue : value;
  }
}
