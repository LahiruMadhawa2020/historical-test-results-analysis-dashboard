import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'DELL - Historical Analytics Dashboard',
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
    rootDir: '../.analytics-data',
    maxHistoryEntries: 100,
    frameworks: {
      'wdio-bdd': {
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
    id: 'dell',
    name: 'DELL',
    frameworkName: 'dell-maven-module-framework',
    applicationType: 'UI',
    methodology: 'BDD'
  }
};

export default config;
