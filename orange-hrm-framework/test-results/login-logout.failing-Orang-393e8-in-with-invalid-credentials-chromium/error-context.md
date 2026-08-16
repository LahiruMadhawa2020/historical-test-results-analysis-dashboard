# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-logout.failing.spec.ts >> OrangeHRM Login/Logout - Failing Tests >> should fail when trying to login with invalid credentials
- Location: src/tests/login-logout.failing.spec.ts:28:7

# Error details

```
Error: expect(received).toBeNull()

Received: "Invalid credentials"
```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic [ref=f1e6]:
    - img "company-branding" [ref=f1e8]
    - generic [ref=f1e9]:
      - heading "Login" [level=5] [ref=f1e10]
      - generic [ref=f1e11]:
        - generic [ref=f1e12]:
          - alert [ref=f1e13]:
            - generic [ref=f1e14]:
              - generic [ref=f1e15]: 
              - paragraph [ref=f1e16]: Invalid credentials
          - generic [ref=f1e18]:
            - paragraph [ref=f1e19]: "Username : Admin"
            - paragraph [ref=f1e20]: "Password : admin123"
        - generic [ref=f1e21]:
          - generic [ref=f1e23]:
            - generic [ref=f1e24]:
              - generic [ref=f1e25]: 
              - generic [ref=f1e26]: Username
            - textbox "Username" [active] [ref=f1e28]
          - generic [ref=f1e30]:
            - generic [ref=f1e31]:
              - generic [ref=f1e32]: 
              - generic [ref=f1e33]: Password
            - textbox "Password" [ref=f1e35]
          - button "Login" [ref=f1e37] [cursor=pointer]
          - paragraph [ref=f1e39] [cursor=pointer]: Forgot your password?
      - generic [ref=f1e40]:
        - generic [ref=f1e41]:
          - link [ref=f1e42] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=f1e45] [cursor=pointer]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=f1e48] [cursor=pointer]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=f1e51] [cursor=pointer]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=f1e54]:
          - paragraph [ref=f1e55]: OrangeHRM OS 5.9
          - paragraph [ref=f1e56]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=f1e57] [cursor=pointer]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - img "orangehrm-logo" [ref=f1e59]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage, DashboardPage } from '../pages';
  3  | import { TestConfig } from '../config/test.config';
  4  | 
  5  | test.describe('OrangeHRM Login/Logout - Failing Tests', () => {
  6  |   test('should fail when expecting wrong dashboard header text', async ({ page }) => {
  7  |     const loginPage = new LoginPage(page);
  8  |     const dashboardPage = new DashboardPage(page);
  9  | 
  10 |     // Navigate to login page
  11 |     await loginPage.goto();
  12 |     expect(await loginPage.isLoaded()).toBeTruthy();
  13 | 
  14 |     // Login with valid credentials
  15 |     await loginPage.login(TestConfig.username, TestConfig.password);
  16 | 
  17 |     // Verify dashboard is loaded
  18 |     expect(await dashboardPage.isLoaded()).toBeTruthy();
  19 | 
  20 |     // This assertion will FAIL - expecting wrong header text
  21 |     const headerText = await dashboardPage.getHeaderText();
  22 |     expect(headerText).toContain('Wrong Dashboard Header Text That Does Not Exist');
  23 | 
  24 |     // Logout (this won't be reached due to failing assertion above)
  25 |     await dashboardPage.logout();
  26 |   });
  27 | 
  28 |   test('should fail when trying to login with invalid credentials', async ({ page }) => {
  29 |     const loginPage = new LoginPage(page);
  30 | 
  31 |     // Navigate to login page
  32 |     await loginPage.goto();
  33 |     expect(await loginPage.isLoaded()).toBeTruthy();
  34 | 
  35 |     // Try to login with invalid credentials
  36 |     await loginPage.login('InvalidUser', 'InvalidPassword');
  37 | 
  38 |     // This assertion will FAIL - expecting no error message
  39 |     const errorMessage = await loginPage.getErrorMessage();
> 40 |     expect(errorMessage).toBeNull();
     |                          ^ Error: expect(received).toBeNull()
  41 |   });
  42 | });
  43 | 
```