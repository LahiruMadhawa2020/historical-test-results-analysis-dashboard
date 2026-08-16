# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-logout.failing.spec.ts >> OrangeHRM Login/Logout - Failing Tests >> should fail when expecting wrong dashboard header text
- Location: src/tests/login-logout.failing.spec.ts:6:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Wrong Dashboard Header Text That Does Not Exist"
Received string:    "Dashboard"
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic:
    - complementary [ref=f1e4]:
      - navigation "Sidepanel" [ref=f1e5]:
        - generic [ref=f1e6]:
          - link [ref=f1e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f1e9]
          - text: 
        - generic [ref=f1e10]:
          - generic [ref=f1e11]:
            - generic [ref=f1e12]:
              - textbox "Search" [ref=f1e15]
              - button "" [ref=f1e16] [cursor=pointer]
            - separator [ref=f1e18]
          - list [ref=f1e19]:
            - listitem [ref=f1e20]:
              - link "Admin" [ref=f1e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
            - listitem [ref=f1e25]:
              - link "PIM" [ref=f1e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
            - listitem [ref=f1e41]:
              - link "Leave" [ref=f1e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
            - listitem [ref=f1e46]:
              - link "Time" [ref=f1e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
            - listitem [ref=f1e54]:
              - link "Recruitment" [ref=f1e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
            - listitem [ref=f1e62]:
              - link "My Info" [ref=f1e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f1e70]:
              - link "Performance" [ref=f1e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
            - listitem [ref=f1e80]:
              - link "Dashboard" [ref=f1e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f1e85]:
              - link "Directory" [ref=f1e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
            - listitem [ref=f1e90]:
              - link "Maintenance" [ref=f1e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
            - listitem [ref=f1e96]:
              - link "Claim" [ref=f1e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
            - listitem [ref=f1e105]:
              - link "Buzz" [ref=f1e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
    - banner [ref=f1e110]:
      - generic [ref=f1e111]:
        - generic [ref=f1e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=f1e114]
        - link [ref=f1e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f1e117] [cursor=pointer]
        - list [ref=f1e123]:
          - listitem [ref=f1e124]:
            - generic [ref=f1e125] [cursor=pointer]:
              - img "profile picture" [ref=f1e126]
              - paragraph [ref=f1e127]: manda user
              - generic [ref=f1e128]: 
      - navigation "Topbar Menu" [ref=f1e130]:
        - list [ref=f1e131]:
          - button "" [ref=f1e133] [cursor=pointer]
  - generic [ref=f1e135]:
    - generic [ref=f1e137]:
      - generic [ref=f1e139]:
        - generic [ref=f1e141]:
          - generic [ref=f1e142]: 
          - paragraph [ref=f1e143]: Time at Work
        - separator [ref=f1e144]
      - generic [ref=f1e148]:
        - generic [ref=f1e150]:
          - generic [ref=f1e151]: 
          - paragraph [ref=f1e152]: My Actions
        - separator [ref=f1e153]
        - generic [ref=f1e155]:
          - generic [ref=f1e156]:
            - button [ref=f1e157] [cursor=pointer]
            - paragraph [ref=f1e163] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=f1e164]:
            - button [ref=f1e165] [cursor=pointer]
            - paragraph [ref=f1e174] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=f1e176]:
        - generic [ref=f1e178]:
          - generic [ref=f1e179]: 
          - paragraph [ref=f1e180]: Quick Launch
        - separator [ref=f1e181]
      - generic [ref=f1e185]:
        - generic [ref=f1e187]:
          - generic [ref=f1e188]: 
          - paragraph [ref=f1e189]: Buzz Latest Posts
        - separator [ref=f1e190]
        - generic [ref=f1e192]:
          - generic [ref=f1e193]:
            - generic [ref=f1e194] [cursor=pointer]:
              - img "profile picture" [ref=f1e196]
              - generic [ref=f1e197]:
                - paragraph [ref=f1e198]: manda akhil user
                - paragraph [ref=f1e199]: 2026-16-08 11:46 PM
            - separator [ref=f1e200]
            - paragraph [ref=f1e201]: Automation Test Post - 1786904218531
          - generic [ref=f1e202]:
            - generic [ref=f1e203] [cursor=pointer]:
              - img "profile picture" [ref=f1e205]
              - generic [ref=f1e206]:
                - paragraph [ref=f1e207]: manda akhil user
                - paragraph [ref=f1e208]: 2026-16-08 11:39 PM
            - separator [ref=f1e209]
            - paragraph [ref=f1e210]: Automation Test Post - 1786903765251
          - generic [ref=f1e211]:
            - generic [ref=f1e212] [cursor=pointer]:
              - img "profile picture" [ref=f1e214]
              - generic [ref=f1e215]:
                - paragraph [ref=f1e216]: manda akhil user
                - paragraph [ref=f1e217]: 2020-08-10 09:08 AM
            - separator [ref=f1e218]
            - paragraph [ref=f1e219]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
          - generic [ref=f1e220]:
            - generic [ref=f1e221] [cursor=pointer]:
              - img "profile picture" [ref=f1e223]
              - generic [ref=f1e224]:
                - paragraph [ref=f1e225]: Sania Shaheen
                - paragraph [ref=f1e226]: 2020-08-10 09:08 AM
            - separator [ref=f1e227]
            - paragraph [ref=f1e228]: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
          - generic [ref=f1e229]:
            - generic [ref=f1e230] [cursor=pointer]:
              - img "profile picture" [ref=f1e232]
              - generic [ref=f1e233]:
                - paragraph [ref=f1e234]: Rebecca Harmony
                - paragraph [ref=f1e235]: 2020-08-10 09:04 AM
            - separator [ref=f1e236]
            - paragraph [ref=f1e237]: Throwback Thursdays!!
      - generic [ref=f1e239]:
        - generic [ref=f1e240]:
          - paragraph [ref=f1e245]: Employees on Leave Today
          - generic [ref=f1e246] [cursor=pointer]: 
        - separator [ref=f1e247]
      - generic [ref=f1e251]:
        - generic [ref=f1e253]:
          - generic [ref=f1e254]: 
          - paragraph [ref=f1e255]: Employee Distribution by Sub Unit
        - separator [ref=f1e256]
        - list [ref=f1e261]:
          - listitem [ref=f1e262] [cursor=pointer]:
            - generic "Engineering" [ref=f1e264]
          - listitem [ref=f1e265] [cursor=pointer]:
            - generic "Human Resources" [ref=f1e267]
          - listitem [ref=f1e268] [cursor=pointer]:
            - generic "Administration" [ref=f1e270]
          - listitem [ref=f1e271] [cursor=pointer]:
            - generic "Client Services" [ref=f1e273]
          - listitem [ref=f1e274] [cursor=pointer]:
            - generic "Unassigned" [ref=f1e276]
      - generic [ref=f1e278]:
        - generic [ref=f1e280]:
          - generic [ref=f1e281]: 
          - paragraph [ref=f1e282]: Employee Distribution by Location
        - separator [ref=f1e283]
    - generic [ref=f1e286]:
      - paragraph [ref=f1e287]: OrangeHRM OS 5.9
      - paragraph [ref=f1e288]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f1e289] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
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
> 22 |     expect(headerText).toContain('Wrong Dashboard Header Text That Does Not Exist');
     |                        ^ Error: expect(received).toContain(expected) // indexOf
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
  40 |     expect(errorMessage).toBeNull();
  41 |   });
  42 | });
  43 | 
```