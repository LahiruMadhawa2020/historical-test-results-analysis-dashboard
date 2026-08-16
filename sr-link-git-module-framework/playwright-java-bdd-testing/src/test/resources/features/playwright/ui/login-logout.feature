Feature: Sr Link Playwright BDD login and logout

  Scenario: User logs in and logs out with Playwright
    Given the Sr Link Playwright login page is opened
    When the Playwright user logs in with valid credentials
    Then the Playwright dashboard should be displayed
    When the Playwright user logs out
    Then the Playwright login page should be displayed
