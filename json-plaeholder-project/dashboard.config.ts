import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'JSONPlaceholder Newman Test Results',
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
      'newman': {
        historyFile: 'history.json',
        resultsDir: 'runs',
      },
    },
  },
  tools: {
    newman: {
      enabled: true,
      reporter: 'cli',
    },
    'playwright-ts-tdd': {
      enabled: false,
      reporter: 'cli',
    },
  },
  importFormats: {
    'postman-collection': { enabled: true },
    'newman-json': { enabled: true },
    'junit-xml': { enabled: true },
    'playwright-json': { enabled: true },
    'cypress-mochawesome': { enabled: true },
  },
  project: {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder API Testing',
    frameworkName: 'json-plaeholder-project',
    applicationType: 'API',
    methodology: 'TDD',
  },
  filters: {
    applicationTypes: ['UI', 'API', 'Mobile'],
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
