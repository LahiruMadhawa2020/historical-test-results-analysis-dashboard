Feature: Sr Link Playwright BDD JSONPlaceholder CRUD

  Scenario: CRUD operations on posts
    When a new post is created via Playwright API
    Then the Playwright API response status should be 201
    And the Playwright API response body should contain "id"
    When post 1 is fetched via Playwright API
    Then the Playwright API response status should be 200
    And the Playwright API response body should contain "\"id\": 1"
    When post 1 is updated via Playwright API
    Then the Playwright API response status should be 200
    And the Playwright API response body should contain "sr-link-bdd-updated"
    When post 1 is deleted via Playwright API
    Then the Playwright API response status should be 200
