# historical-analytics-dashboard

[![npm version](https://img.shields.io/npm/v/historical-analytics-dashboard.svg)](https://www.npmjs.com/package/historical-analytics-dashboard)
[![license](https://img.shields.io/npm/l/historical-analytics-dashboard.svg)](https://github.com/publisheswithlahiru91/historical-test-results-analysis-dashboard/blob/master/LICENSE)
[![node](https://img.shields.io/node/v/historical-analytics-dashboard.svg)](https://nodejs.org)

Historical test execution analysis dashboard for Node.js. Import test results from Newman, JUnit XML, Playwright JSON, and Cypress, store execution history over time, and generate self-contained HTML analytics dashboards with interactive filtering and a reset filters button.

## Features

- **Multi-tool support** — Newman, Playwright, Selenium, Cypress, WebdriverIO
- **Multiple import formats** — Newman JSON, JUnit XML, Playwright JSON, Postman collections
- **Historical tracking** — Store execution history over time with configurable retention
- **HTML dashboards** — Self-contained, interactive dashboards with no external dependencies
- **Management dashboards** — Aggregate test data across multiple projects
- **Filesystem & S3 storage** — Read history from local filesystem or AWS S3
- **Filter & reset** — Interactive filters for application type, tool, and project with reset button
- **CLI & programmatic API** — Use via command line or import as a library

## Installation

```bash
npm install historical-analytics-dashboard
```

## Quick Start

### 1. Create a config file

```bash
cp node_modules/historical-analytics-dashboard/dashboard.config.example.ts dashboard.config.ts
```

### 2. Import test results

```bash
# Import Playwright JSON
analytics-dashboard import reports/playwright.json \
  --format playwright-json \
  --tool playwright-ts-tdd \
  --application-type UI \
  --methodology TDD

# Import JUnit XML (Selenium, TestNG, etc.)
analytics-dashboard import reports/junit.xml \
  --format junit-xml \
  --tool selenium-java-tdd \
  --application-type UI \
  --methodology TDD

# Import Newman JSON output
analytics-dashboard import reports/newman-run.json \
  --format newman-json \
  --tool newman
```

### 3. Run Newman collection + record history

```bash
analytics-dashboard run collections/my-collection.json \
  --tool newman \
  --config dashboard.config.ts
```

### 4. Generate dashboard

```bash
analytics-dashboard generate --config dashboard.config.ts
```

Opens `reports/analytics-dashboard.html` in your browser.

## CLI Commands

```
analytics-dashboard run <input-file> [options]     # Run Newman collection + record history
analytics-dashboard import <file> [options]         # Import external test results
analytics-dashboard generate [options]              # Generate project dashboard HTML
analytics-dashboard management-generate [options]   # Generate management dashboard HTML
```

### Common Options

| Flag | Description |
|------|-------------|
| `--config, -c <path>` | Path to `dashboard.config.ts` (default: `dashboard.config.ts`) |
| `--tool, -t <id>` | Tool identifier (e.g. `newman`, `playwright-ts-tdd`) |
| `--format, -f <id>` | Input format: `junit-xml`, `playwright-json`, `cypress-mochawesome` |
| `--application-type <type>` | `UI`, `API`, or `Mobile` |
| `--methodology <type>` | `TDD` or `BDD` |
| `--help, -h` | Show help message |

## Programmatic API

```typescript
import {
  // Config loading
  loadConfig,
  loadManagementConfig,
  resolveOutputHtmlPath,

  // Core classes
  Orchestrator,
  DashboardGenerator,
  ManagementDashboardGenerator,
  HistoryLedger,

  // Tool registry
  registry,
  newmanAdapter,

  // Constants & utilities
  STANDARD_TOOL_IDS,
  LEGACY_TOOL_ID_MAP,
  normalizeToolId,

  // Storage utilities
  ensureFrameworkStorage,
  listConfiguredFrameworks,
  resolveFrameworkStorage,
  resolveStorageRoot,

  // Management utilities
  buildManagementFilterOptions,
  collectManagementHistory,

  // Defaults
  DEFAULT_CONFIG,
  CONFIG_FILE_NAMES,
} from 'historical-analytics-dashboard';
```

### Key Exports

| Export | Type | Description |
|--------|------|-------------|
| `loadConfig(options)` | Function | Load and validate a project dashboard config |
| `loadManagementConfig(options)` | Function | Load and validate a management dashboard config |
| `resolveOutputHtmlPath(config, cwd)` | Function | Resolve the output HTML file path |
| `Orchestrator` | Class | Run tools, import results, and manage history |
| `DashboardGenerator` | Class | Generate project-level HTML dashboard |
| `ManagementDashboardGenerator` | Class | Generate cross-project management dashboard |
| `HistoryLedger` | Class | Read/write execution history entries |
| `registry` | Object | Tool adapter registry |
| `newmanAdapter` | Object | Newman tool adapter |
| `STANDARD_TOOL_IDS` | Array | Canonical list of supported tool identifiers |
| `normalizeToolId(id)` | Function | Normalize a tool ID (handles legacy mappings) |
| `ensureFrameworkStorage(config, cwd)` | Function | Ensure framework storage directories exist |
| `listConfiguredFrameworks(config)` | Function | List configured framework tool IDs |
| `resolveFrameworkStorage(config, toolId, cwd)` | Function | Resolve storage paths for a framework |
| `resolveStorageRoot(config, cwd)` | Function | Resolve the storage root directory |
| `buildManagementFilterOptions(sources)` | Function | Build filter options from management sources |
| `collectManagementHistory(sources, cwd)` | Function | Collect history entries from all sources |
| `DEFAULT_CONFIG` | Object | Default dashboard configuration |
| `CONFIG_FILE_NAMES` | Array | Default config file names to search |

## Configuration

### Project Dashboard Config

```typescript
import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'My Project Dashboard',
    theme: 'light',          // 'light' or 'dark'
    openBrowser: true,       // Open dashboard in browser after generation
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
      'playwright-ts-tdd': {
        historyFile: 'history.json',
        resultsDir: 'runs'
      },
      'newman': {
        historyFile: 'history.json',
        resultsDir: 'runs'
      }
    }
  },
  tools: {
    'playwright-ts-tdd': {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1
    },
    'newman': {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1
    }
  },
  importFormats: {
    'postman-collection': { enabled: true },
    'newman-json': { enabled: true },
    'junit-xml': { enabled: true },
    'playwright-json': { enabled: true },
    'cypress-mochawesome': { enabled: true }
  },
  project: {
    id: 'my-project',
    name: 'My Project',
    frameworkName: 'my-framework',
    applicationType: 'UI',    // 'UI', 'API', or 'Mobile'
    methodology: 'TDD'        // 'TDD' or 'BDD'
  },
  filters: {
    applicationTypes: ['UI', 'API', 'Mobile'],
    toolNames: [
      'cypress-bdd', 'cypress-tdd', 'newman',
      'playwright-java-bdd', 'playwright-java-tdd', 'playwright-ts-tdd',
      'selenium-java-bdd', 'selenium-java-tdd',
      'wdio-java-bdd', 'wdio-java-tdd'
    ],
    showFrameworkFilter: true,
    showToolFilter: true,
    showProjectFilter: true
  }
};

export default config;
```

### Management Dashboard Config

The management dashboard aggregates test data from multiple projects using filesystem or S3 storage sources:

```typescript
import type { ManagementDashboardConfigFile } from 'historical-analytics-dashboard';

const config: ManagementDashboardConfigFile = {
  dashboard: {
    title: 'Management Dashboard',
    theme: 'light',
    openBrowser: false,
    output: {
      htmlFile: 'reports/management-dashboard.html'
    },
    thresholds: {
      warningResponseTimeMs: 1000
    }
  },
  management: {
    sources: [
      {
        id: 'my-project-playwright',
        label: 'My Project · Playwright',
        projectName: 'My Project',
        frameworkName: 'my-framework',
        applicationType: 'UI',
        tool: 'playwright-ts-tdd',
        methodology: 'TDD',
        storage: {
          type: 'filesystem',
          rootDir: '../my-project/.analytics-data'
        },
        enabled: true
      },
      {
        id: 'my-api-newman',
        label: 'My API · Newman',
        projectName: 'My API',
        frameworkName: 'my-api-framework',
        applicationType: 'API',
        tool: 'newman',
        methodology: 'TDD',
        storage: {
          type: 'filesystem',
          rootDir: '../my-api/.analytics-data'
        },
        enabled: true
      },
      {
        id: 'remote-s3-source',
        label: 'Remote · Selenium (S3)',
        projectName: 'Remote Project',
        frameworkName: 'selenium-framework',
        applicationType: 'UI',
        tool: 'selenium-java-tdd',
        methodology: 'TDD',
        storage: {
          type: 's3',
          bucket: 'my-test-artifacts',
          prefix: 'selenium-java-tdd',
          region: 'us-east-1'
        },
        enabled: false
      }
    ],
    filters: {
      applicationTypes: ['UI', 'API', 'Mobile'],
      toolNames: [
        'cypress-bdd', 'cypress-tdd', 'newman',
        'playwright-java-bdd', 'playwright-java-tdd', 'playwright-ts-tdd',
        'selenium-java-bdd', 'selenium-java-tdd',
        'wdio-java-bdd', 'wdio-java-tdd'
      ],
      showFrameworkFilter: false,
      showToolFilter: true,
      showProjectFilter: true
    }
  }
};

export default config;
```

## Supported Tools

| Tool ID | Format | Description |
|---------|--------|-------------|
| `newman` | `newman-json` | Newman/Postman collection runs |
| `selenium-java-tdd` | `junit-xml` | Selenium Java TDD tests |
| `selenium-java-bdd` | `junit-xml` | Selenium Java BDD tests |
| `playwright-java-tdd` | `junit-xml` | Playwright Java TDD tests |
| `playwright-java-bdd` | `junit-xml` | Playwright Java BDD tests |
| `playwright-ts-tdd` | `playwright-json` | Playwright TypeScript TDD tests |
| `cypress-tdd` | `junit-xml` | Cypress TDD tests |
| `cypress-bdd` | `junit-xml` | Cypress BDD tests |
| `wdio-java-tdd` | `junit-xml` | WebdriverIO TDD tests |
| `wdio-java-bdd` | `junit-xml` | WebdriverIO BDD tests |

## Input Formats

| Format | Extensions | Description |
|--------|-----------|-------------|
| `newman-json` | `.json` | Newman JSON run output |
| `junit-xml` | `.xml` | JUnit/XUnit XML reports |
| `playwright-json` | `.json` | Playwright JSON report |
| `postman-collection` | `.json` | Postman collection (run via Newman) |
| `cypress-mochawesome` | `.json` | Cypress Mochawesome JSON report |

## Storage Structure

History data is stored in `.analytics-data/` under the configured `rootDir`:

```
.analytics-data/
├── playwright-ts-tdd/
│   ├── history.json          # Execution history entries
│   └── runs/
│       ├── RUN-001.json      # Individual run snapshots
│       └── RUN-002.json
└── newman/
    ├── history.json
    └── runs/
        └── RUN-003.json
```

## Dashboard Features

- **Interactive filters** — Filter by application type, tool, and project
- **Reset filters** — One-click button to clear all active filters
- **Run history timeline** — View execution history over time
- **Request metrics** — Response times, status codes, assertion results
- **Pass/fail statistics** — Aggregated test results with trend indicators
- **Dark/light theme** — Configurable dashboard theme

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  DashboardConfigFile,
  DashboardConfig,
  ManagementDashboardConfigFile,
  ManagementDashboardConfig,
  ManagementSourceConfig,
  ApplicationType,
  TestMethodology,
  RunStatus,
  RunMetric,
  RunSummary,
  AssertionMetric,
  RequestMetric,
  StandardToolId,
  LoadedConfig,
  LoadedManagementConfig,
} from 'historical-analytics-dashboard';
```

## Requirements

- Node.js >= 18
- npm >= 9

## License

MIT
