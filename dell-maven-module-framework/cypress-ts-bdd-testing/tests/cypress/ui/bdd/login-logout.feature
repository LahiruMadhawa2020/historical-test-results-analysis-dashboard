Feature: DELL Cypress BDD login logout

  Scenario: Login and logout
    Given the Cypress login page is opened
    When the Cypress user logs in
    Then the Cypress dashboard is visible
    When the Cypress user logs out
    Then the Cypress login page is visible
