# Dashboard for Management

Cross-project management dashboard aggregating historical test execution from **WK**, **DELL**, and **Sr Link** — one source per **project + tool** (UI and API).

## Prerequisites

- Node.js 18+
- Built library at `../historical-analytics-dashboard`

## Build the library

```powershell
cd ..\historical-analytics-dashboard
npm install
npm run build
```

## Generate history in consumer projects

Each tool writes JUnit XML or JSON reports, then imports via `analytics-dashboard import`:

```powershell
# WK mono-repo — example UI + API
cd ..\wk-all-in-one-framework
npm install
npm run test:ui:selenium-tdd:dashboard
npm run test:api:playwright-java-tdd:dashboard

# DELL — Newman at root
cd ..\dell-maven-module-framework
npm install
npm run analytics:run

# Sr Link — per sibling project
cd ..\sr-link-git-module-framework\postman-api-testing
npm install
npm run analytics:run
```

History lands in each project's `.analytics-data/{toolId}/history.json`.

## Launch management dashboard

```powershell
cd ..\dashboard-for-management
npm install
npm run dashboard:generate
```

Output: `reports/management-dashboard.html`

## Source storage patterns

Each source in `dashboard.config.ts` uses `storage.type`:

### Filesystem (local / Jenkins copy)

Point at a project or a Jenkins staging folder:

```typescript
{
  id: 'wk-selenium-java-tdd',
  label: 'WK · Selenium Java TDD',
  frameworkName: 'wk-all-in-one-framework',
  applicationType: 'UI',
  tool: 'selenium-java-tdd',
  methodology: 'TDD',
  storage: {
    type: 'filesystem',
    rootDir: '../wk-all-in-one-framework/.analytics-data'
  },
  enabled: true
}
```

**Jenkins pattern:** copy each project's `.analytics-data/<tool>` into `dashboard-for-management/.analytics-data/<project>/<tool>` and point `rootDir` at `./.analytics-data/wk` (see disabled `example-jenkins-copy` source).

### S3

```typescript
{
  storage: {
    type: 's3',
    bucket: 'my-test-artifacts',
    prefix: 'wk/selenium-java-tdd',
    region: 'us-east-1'
  }
}
```

Uses `@aws-sdk/client-s3` with standard AWS env credentials. Object key: `{prefix}/{tool}/history.json`.

### HTTP / SharePoint download link

```typescript
{
  storage: {
    type: 'http',
    url: 'https://contoso.sharepoint.com/.../history.json'
  }
}
```

Fetched on each `management-generate` run; cached under `dashboard-for-management/.analytics-cache/`.

## Configured sources (40 enabled + 3 examples)

| Project | Tools | Storage root |
|---|---|---|
| **WK** | 15 (newman + all Java/TS runners) | `../wk-all-in-one-framework/.analytics-data` |
| **DELL** | 7 Java/Newman at root + 6 TS subfolders | Root or `*/.analytics-data` per TS folder |
| **Sr Link** | 12 across 10 sibling projects | Each project's `.analytics-data` |

## Filters

| Filter | Values |
|---|---|
| Application Type | UI, API, Mobile |
| Framework | wk-all-in-one-framework, dell-maven-module-framework, sr-link-git-module-framework |
| Tool | selenium-java-tdd, cypress-tdd, newman, … |
| Project | WK, DELL, Sr Link (from imported run metadata) |

## Refresh after new runs

```powershell
npm run dashboard:generate
```

Missing `history.json` files are skipped silently — sources appear once a tool has imported at least one run.
