Feature: WK WDIO BDD login logout

  Scenario: Login and logout
    Given the WDIO login page is opened
    When the WDIO user logs in
    Then the WDIO dashboard is visible
    When the WDIO user logs out
    Then the WDIO login page is visible
