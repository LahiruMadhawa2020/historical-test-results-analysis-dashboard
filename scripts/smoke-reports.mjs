/** Shared smoke report shapes aligned with Newman CRUD + UI login/logout flows. */

export const API_BASE = 'https://jsonplaceholder.typicode.com';

export const API_OPERATIONS = [
  {
    name: '1. Create Post',
    method: 'POST',
    url: `${API_BASE}/posts/`,
    assertions: [
      { name: 'Status code is 201', passed: true },
      { name: 'Response contains created post id', passed: true }
    ]
  },
  {
    name: '2. Get Post',
    method: 'GET',
    url: `${API_BASE}/posts/1`,
    assertions: [
      { name: 'Status code is 200', passed: true },
      { name: 'Post id is 1', passed: true }
    ]
  },
  {
    name: '3. Update Post',
    method: 'PUT',
    url: `${API_BASE}/posts/1`,
    assertions: [
      { name: 'Status code is 200', passed: true },
      { name: 'Post title updated', passed: true }
    ]
  },
  {
    name: '4. Delete Post',
    method: 'DELETE',
    url: `${API_BASE}/posts/1`,
    assertions: [
      { name: 'Status code is 200', passed: true },
      { name: 'Delete acknowledged', passed: true }
    ]
  }
];

export const UI_OPERATIONS = [
  {
    name: 'shouldLoadDashboardAfterLogin',
    method: 'UI',
    url: 'OrangeHRM Dashboard',
    assertions: [
      { name: 'Dashboard should load after login', passed: true },
      { name: 'User menu is visible', passed: true }
    ]
  },
  {
    name: 'shouldLoadLoginPageAfterLogout',
    method: 'UI',
    url: 'OrangeHRM Login',
    assertions: [
      { name: 'Login page should load after logout', passed: true },
      { name: 'Username field is visible', passed: true }
    ]
  }
];

export function junitXml(toolId, className, operations, timeSec = 0.42) {
  const cases = operations
    .map((op) => {
      const assertionXml = op.assertions
        .map(
          (a) =>
            `<assertion name="${a.name}" passed="${a.passed ? 'true' : 'false'}"${a.error ? ` error="${a.error}"` : ''}/>`
        )
        .join('');
      return `  <testcase name="${op.name}" classname="${className}" time="${timeSec}" method="${op.method}" url="${op.url}">${assertionXml}</testcase>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="${toolId}" tests="${operations.length}" failures="0" errors="0" skipped="0" time="${(operations.length * timeSec).toFixed(2)}">
${cases}
</testsuite>`;
}

export function playwrightJson(toolId, operations) {
  return {
    config: { rootDir: process.cwd() },
    suites: [
      {
        title: toolId,
        suites: [
          {
            title: 'smoke',
            specs: operations.map((op) => ({
              title: op.name,
              ok: true,
              tests: [
                {
                  projectName: toolId,
                  results: [
                    {
                      status: 'passed',
                      duration: 420,
                      steps: op.assertions.map((a) => ({
                        title: a.name,
                        duration: 100,
                        error: a.passed ? undefined : { message: a.error ?? 'failed' }
                      }))
                    }
                  ]
                }
              ]
            }))
          }
        ]
      }
    ]
  };
}

export const JUNIT_UI_TOOLS = [
  { toolId: 'selenium-java-tdd', className: 'com.wk.selenium.tdd.LoginLogoutTddTest' },
  { toolId: 'selenium-java-bdd', className: 'com.wk.selenium.bdd.RunCucumberTest' },
  { toolId: 'playwright-java-tdd', className: 'com.wk.playwright.tdd.ui.LoginLogoutTddTest' },
  { toolId: 'playwright-java-bdd', className: 'com.wk.playwright.bdd.ui.RunCucumberUiTest' },
  { toolId: 'cypress-tdd', className: 'cypress.ui.tdd.loginLogout' },
  { toolId: 'cypress-bdd', className: 'cypress.ui.bdd.loginLogout' },
  { toolId: 'wdio-java-tdd', className: 'wdio.ui.tdd.loginLogout' },
  { toolId: 'wdio-java-bdd', className: 'wdio.ui.bdd.loginLogout' }
];

export const JUNIT_API_TOOLS = [
  { toolId: 'playwright-java-tdd', className: 'com.wk.playwright.tdd.api.JsonPlaceholderCrudTddTest' },
  { toolId: 'playwright-java-bdd', className: 'com.wk.playwright.bdd.api.RunCucumberApiTest' },
  { toolId: 'cypress-tdd', className: 'cypress.api.tdd.jsonPlaceholderCrud' },
  { toolId: 'cypress-bdd', className: 'cypress.api.bdd.jsonPlaceholderCrud' }
];

export const PLAYWRIGHT_TS_TOOLS = [
  { toolId: 'playwright-ts-tdd', appType: 'UI' },
  { toolId: 'playwright-ts-tdd', appType: 'API' }
];
