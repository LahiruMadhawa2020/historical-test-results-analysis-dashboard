# Historical Analytics Dashboard

Publishable npm library that runs test tools (Newman today; UI/Mobile tools later), stores execution history, and generates HTML analytics dashboards.

## Prerequisites

- Node.js 18 or later
- npm

## Build the library

From this directory:

```powershell
npm install
npm run build
```

This compiles TypeScript to `dist/` and copies HTML templates. The `prepare` script runs `build` automatically when the package is installed as a dependency.

## CLI commands

After build, the `analytics-dashboard` binary is available:

```powershell
# Run Newman against a collection, record history, and generate project dashboard
analytics-dashboard run collections/demo.postman_collection.json --config dashboard.config.ts

# Regenerate dashboard HTML from existing history (no new test run)
analytics-dashboard generate --config dashboard.config.ts

# Generate cross-project management dashboard (requires management config)
analytics-dashboard management-generate --config dashboard.config.ts

# Import external result file and regenerate dashboard
analytics-dashboard import results/junit.xml --format junit-xml --config dashboard.config.ts
```

## Configuration

Copy `dashboard.config.example.ts` as a starting point for project-level config:

- `dashboard` — title, theme, output path, browser open behavior
- `storage` — where `.analytics-data` history is stored
- `tools` — enable/configure Newman and future adapters
- `project` — project identity (name, framework, application type) stamped on each run

Management dashboards use a separate config shape with `management.sources` — see `dashboard-for-management/dashboard.config.ts` in the repo.

## Link into a consumer project

In a test project's `package.json`:

```json
{
  "devDependencies": {
    "historical-analytics-dashboard": "file:../historical-analytics-dashboard"
  }
}
```

Then in the consumer project:

```powershell
npm install
```

## Output

| Command | Output |
|---|---|
| `generate` | Project dashboard HTML (default: `reports/analytics-dashboard.html`) |
| `management-generate` | Management dashboard HTML (configured in `dashboard.output.htmlFile`) |

## Development

```powershell
npm run dev
```

Builds the library and starts the CLI entry point.
