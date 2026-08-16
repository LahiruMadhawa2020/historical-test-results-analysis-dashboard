Feature: WK Cypress API BDD CRUD

  Scenario: CRUD via Cypress request API
    Given the Cypress API client is ready
    When a Cypress API post is created
    Then the Cypress create response status is 201
    When Cypress fetches post 1
    Then the Cypress read response status is 200
    When Cypress updates post 1
    Then the Cypress update response status is 200
    When Cypress deletes post 1
    Then the Cypress delete response status is 200
