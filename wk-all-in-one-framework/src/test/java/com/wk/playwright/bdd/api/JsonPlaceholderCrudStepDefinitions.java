package com.wk.playwright.bdd.api;

import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.RequestOptions;
import com.wk.common.WkEnvConfig;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class JsonPlaceholderCrudStepDefinitions {

  private Playwright playwright;
  private APIRequestContext request;
  private APIResponse lastResponse;

  @Before
  public void setUp() {
    playwright = Playwright.create();
    request = playwright.request().newContext(
        new APIRequest.NewContextOptions().setBaseURL(WkEnvConfig.apiUrl())
    );
  }

  @After
  public void tearDown() {
    if (request != null) {
      request.dispose();
    }
    if (playwright != null) {
      playwright.close();
    }
  }

  @When("a new post is created via Playwright API")
  public void createPost() {
    lastResponse = request.post("/posts/", RequestOptions.create()
        .setData("{\"title\":\"wk-bdd\",\"body\":\"create\",\"userId\":1}"));
  }

  @When("post {int} is fetched via Playwright API")
  public void fetchPost(int id) {
    lastResponse = request.get("/posts/" + id);
  }

  @When("post {int} is updated via Playwright API")
  public void updatePost(int id) {
    lastResponse = request.put("/posts/" + id, RequestOptions.create()
        .setData("{\"id\":" + id + ",\"title\":\"wk-bdd-updated\",\"body\":\"update\",\"userId\":1}"));
  }

  @When("post {int} is deleted via Playwright API")
  public void deletePost(int id) {
    lastResponse = request.delete("/posts/" + id);
  }

  @Then("the Playwright API response status should be {int}")
  public void verifyStatus(int status) {
    assertEquals(status, lastResponse.status());
  }

  @Then("the Playwright API response body should contain {string}")
  public void verifyBodyContains(String text) {
    assertTrue(lastResponse.text().contains(text));
  }
}
