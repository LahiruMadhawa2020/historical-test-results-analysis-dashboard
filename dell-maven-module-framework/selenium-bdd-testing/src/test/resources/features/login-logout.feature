Feature: DELL Selenium BDD login and logout

  Scenario: User logs in and logs out
    Given the DELL application login page is opened
    When the user logs in with valid credentials
    Then the dashboard should be displayed
    When the user logs out
    Then the login page should be displayed
