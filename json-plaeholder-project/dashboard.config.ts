import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'JSONPlaceholder API Testing',
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
      newman: {
        historyFile: 'history.json',
        resultsDir: 'runs',
      },
    },
  },
  tools: {
    newman: {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1,
    },
  },
  importFormats: {
    'postman-collection': { enabled: true },
    'newman-json': { enabled: true },
    'junit-xml': { enabled: false },
    'playwright-json': { enabled: false },
    'cypress-mochawesome': { enabled: false },
  },
  project: {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder API Testing',
    frameworkName: 'json-plaeholder-project',
    applicationType: 'API',
    methodology: 'TDD',
  },
  filters: {
    applicationTypes: ['API'],
    toolNames: ['newman'],
    showFrameworkFilter: true,
    showToolFilter: true,
    showProjectFilter: true,
  },
};

export default config;
