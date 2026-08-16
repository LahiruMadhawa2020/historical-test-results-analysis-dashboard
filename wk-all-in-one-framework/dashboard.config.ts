import { STANDARD_TOOL_IDS } from 'historical-analytics-dashboard';

const frameworkEntry = {
  historyFile: 'history.json',
  resultsDir: 'runs'
};

const toolIds = [...STANDARD_TOOL_IDS];
const frameworks = Object.fromEntries(toolIds.map((id) => [id, frameworkEntry]));

const standardFilters = {
  applicationTypes: ['UI', 'API', 'Mobile'],
  toolNames: [...STANDARD_TOOL_IDS],
  showFrameworkFilter: false,
  showToolFilter: true,
  showProjectFilter: false
};

const config = {
  dashboard: {
    title: 'WK - Historical Analytics Dashboard',
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
    frameworks
  },
  tools: {
    newman: {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1
    }
  },
  importFormats: {
    'postman-collection': { enabled: true },
    'newman-json': { enabled: false },
    'junit-xml': { enabled: true },
    'playwright-json': { enabled: true },
    'cypress-mochawesome': { enabled: true }
  },
  project: {
    id: 'wk',
    name: 'WK',
    frameworkName: 'wk-all-in-one-framework',
    applicationType: 'API',
    methodology: 'TDD'
  },
  filters: standardFilters
};

export default config;
