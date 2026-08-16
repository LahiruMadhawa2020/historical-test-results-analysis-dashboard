package com.dell.testing.playwright.tdd.api;

import com.dell.testing.playwright.tdd.DellTestConfig;
import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.RequestOptions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JsonPlaceholderCrudTddTest {

  private Playwright playwright;
  private APIRequestContext request;

  @BeforeEach
  void setUp() {
    playwright = Playwright.create();
    request = playwright.request().newContext(
        new APIRequest.NewContextOptions().setBaseURL(DellTestConfig.apiUrl())
    );
  }

  @AfterEach
  void tearDown() {
    if (request != null) {
      request.dispose();
    }
    if (playwright != null) {
      playwright.close();
    }
  }

  @Test
  void shouldPerformCrudOnPosts() {
    APIResponse create = request.post("/posts/", RequestOptions.create()
        .setData("{\"title\":\"dell\",\"body\":\"create\",\"userId\":1}"));
    assertEquals(201, create.status());
    assertTrue(create.text().contains("\"id\""));

    APIResponse read = request.get("/posts/1");
    assertEquals(200, read.status());
    assertTrue(read.text().contains("\"id\": 1"));

    APIResponse update = request.put("/posts/1", RequestOptions.create()
        .setData("{\"id\":1,\"title\":\"dell-updated\",\"body\":\"update\",\"userId\":1}"));
    assertEquals(200, update.status());
    assertTrue(update.text().contains("dell-updated"));

    APIResponse remove = request.delete("/posts/1");
    assertEquals(200, remove.status());
  }
}
