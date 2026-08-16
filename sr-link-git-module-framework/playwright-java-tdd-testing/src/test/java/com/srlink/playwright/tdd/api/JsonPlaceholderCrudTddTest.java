package com.srlink.playwright.tdd.api;

import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.RequestOptions;
import com.srlink.common.SrLinkEnvConfig;
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
        new APIRequest.NewContextOptions().setBaseURL(SrLinkEnvConfig.apiUrl())
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
  void shouldCreatePost() {
    APIResponse create = request.post("/posts/", RequestOptions.create()
        .setData("{\"title\":\"sr-link\",\"body\":\"create\",\"userId\":1}"));
    assertEquals(201, create.status());
    assertTrue(create.text().contains("\"id\""));
  }

  @Test
  void shouldGetPost() {
    APIResponse read = request.get("/posts/1");
    assertEquals(200, read.status());
    assertTrue(read.text().contains("\"id\": 1"));
  }

  @Test
  void shouldUpdatePost() {
    APIResponse update = request.put("/posts/1", RequestOptions.create()
        .setData("{\"id\":1,\"title\":\"sr-link-updated\",\"body\":\"update\",\"userId\":1}"));
    assertEquals(200, update.status());
    assertTrue(update.text().contains("sr-link-updated"));
  }

  @Test
  void shouldDeletePost() {
    APIResponse remove = request.delete("/posts/1");
    assertEquals(200, remove.status());
    assertTrue(remove.status() == 200);
  }
}
