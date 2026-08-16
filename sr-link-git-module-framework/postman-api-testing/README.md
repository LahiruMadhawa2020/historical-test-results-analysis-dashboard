# Sr Link — Git Module Framework

**Project name:** Sr Link  
**Folder:** `sr-link-git-module-framework/postman-api-testing`

Newman Postman API tests in a Git submodule-style layout. The test project lives under `postman-api-testing/` and links to the library two levels up.

## Prerequisites

- Node.js 18 or later
- npm
- Built library at `../../historical-analytics-dashboard`

## Step 1 — Build the library (first time only)

```powershell
cd ..\..\historical-analytics-dashboard
npm install
npm run build
```

## Step 2 — Install this project

```powershell
cd ..\sr-link-git-module-framework\postman-api-testing
npm install
```

## Step 3 — Run tests and launch the project dashboard

Run Newman, record history, and generate the dashboard:

```powershell
npm run analytics:run
```

This will:

1. Execute `collections/jsonplaceholder-crud.postman_collection.json` via Newman
2. Append the run to `.analytics-data/newman/history.json` (tagged as project **Sr Link**)
3. Generate `reports/analytics-dashboard.html`
4. Open the dashboard in your browser (if enabled in `dashboard.config.ts`)

## Step 4 — Regenerate dashboard without re-running tests

```powershell
npm run analytics:generate
```

Output: `reports/analytics-dashboard.html`

## Other useful commands

```powershell
# Newman only with HTML extra reporter
npm test

# Newman with dashboard wrapper reporter
npm run test:dashboard
```

## Configuration

Edit `dashboard.config.ts` to change:

- Dashboard title (`Sr Link - Historical Analytics Dashboard`)
- Project identity (`project.name: 'Sr Link'`, `frameworkName: 'sr-link-git-module-framework'`)
- Newman and storage settings

## View aggregated data (management dashboard)

```powershell
cd ..\..\dashboard-for-management
npm install
npm run dashboard:generate
```

Open `reports/management-dashboard.html` and filter by **Project → Sr Link** or **Framework → sr-link-git-module-framework**.
