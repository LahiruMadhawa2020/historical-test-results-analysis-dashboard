import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'Sr Link - Historical Analytics Dashboard',
    theme: 'light',
    openBrowser: true,
    output: {
      htmlFile: 'reports/analytics-dashboard.html'
    },
    thresholds: {
      warningResponseTimeMs: 1000
    }
  },
  storage: {
    rootDir: '.analytics-data',
    maxHistoryEntries: 100,
    frameworks: {
      'cypress-tdd': {
        historyFile: 'history.json',
        resultsDir: 'runs'
      }
    }
  },

  importFormats: {
    'postman-collection': {
      enabled: false
    },
    'newman-json': {
      enabled: false
    },
    'junit-xml': {
      enabled: true
    },
    'playwright-json': {
      enabled: false
    },
    'cypress-mochawesome': {
      enabled: false
    }
  },
  project: {
    id: 'sr-link',
    name: 'Sr Link',
    frameworkName: 'sr-link-git-module-framework',
    applicationType: 'UI',
    methodology: 'TDD'
  }
};

export default config;
