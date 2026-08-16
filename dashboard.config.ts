import type { DashboardConfig } from 'historical-analytics-dashboard';
import { STANDARD_TOOL_IDS } from 'historical-analytics-dashboard';

const config: DashboardConfig = {
  dashboard: {
    title: 'Historical Test Results Analysis Dashboard',
    theme: 'light',
    openBrowser: true,
    outputHtml: 'reports/analytics-dashboard.html',
    warningResponseTime: 1000,
  },
  storage: {
    rootDir: '.analytics-data',
    maxHistoryEntries: 100,
    frameworks: {
      [STANDARD_TOOL_IDS.PLAYWRIGHT_TS_TDD]: {
        historyFile: 'history.json',
        resultsDir: 'runs',
      },
      [STANDARD_TOOL_IDS.NEWMAN]: {
        historyFile: 'history.json',
        resultsDir: 'runs',
      },
    },
  },
  tools: {
    [STANDARD_TOOL_IDS.PLAYWRIGHT_TS_TDD]: {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1,
    },
    [STANDARD_TOOL_IDS.NEWMAN]: {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1,
    },
  },
  importFormats: {
    'postman-collection': true,
    'newman-json': true,
    'junit-xml': true,
    'playwright-json': true,
  },
  project: {
    id: 'orangehrm',
    name: 'OrangeHRM Testing',
    frameworkName: 'orange-hrm-framework',
    applicationType: 'UI',
    methodology: 'TDD',
  },
  filters: {
    applicationTypes: ['UI', 'API', 'Mobile'],
    toolNames: Object.values(STANDARD_TOOL_IDS),
    showFrameworkFilter: true,
    showToolFilter: true,
    showProjectFilter: true,
  },
};

export default config;
