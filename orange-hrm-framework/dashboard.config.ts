import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'OrangeHRM Playwright Test Results',
    theme: 'light',
    openBrowser: true,
    output: {
      htmlFile: 'reports/analytics-dashboard.html',
    },
    thresholds: {
      warningResponseTimeMs: 1000,
    },
  },
  storage: {
    rootDir: '.analytics-data',
    maxHistoryEntries: 100,
    frameworks: {
      'playwright-ts-tdd': {
        historyFile: 'history.json',
        resultsDir: 'runs',
      },
    },
  },
  tools: {
    newman: {
      enabled: false,
      reporter: 'cli',
    },
    'playwright-ts-tdd': {
      enabled: true,
      reporter: 'cli',
    },
  },
  importFormats: {
    'postman-collection': { enabled: true },
    'newman-json': { enabled: false },
    'junit-xml': { enabled: true },
    'playwright-json': { enabled: true },
    'cypress-mochawesome': { enabled: true },
  },
  project: {
    id: 'orangehrm',
    name: 'OrangeHRM Testing',
    frameworkName: 'orange-hrm-framework',
    applicationType: 'UI',
    methodology: 'TDD',
  },
  filters: {
    applicationTypes: ['UI'],
    toolNames: [
      'cypress-bdd', 'cypress-tdd', 'newman',
      'playwright-java-bdd', 'playwright-java-tdd', 'playwright-ts-tdd',
      'selenium-java-bdd', 'selenium-java-tdd',
      'wdio-java-bdd', 'wdio-java-tdd',
    ],
    showFrameworkFilter: true,
    showToolFilter: true,
    showProjectFilter: true,
  },
};

export default config;
