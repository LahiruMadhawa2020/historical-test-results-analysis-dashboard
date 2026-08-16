# WK — All-in-One Framework

**Project name:** WK  
**Folder:** `wk-all-in-one-framework`

Newman Postman API tests with historical analytics dashboard. This is the standalone consumer layout — project files live at the repository root of this folder.

## Prerequisites

- Node.js 18 or later
- npm
- Built library at `../historical-analytics-dashboard`

## Step 1 — Build the library (first time only)

```powershell
cd ..\historical-analytics-dashboard
npm install
npm run build
```

## Step 2 — Install this project

```powershell
cd ..\wk-all-in-one-framework
npm install
```

## Step 3 — Run tests and launch the project dashboard

Run Newman, append history, and open the analytics dashboard:

```powershell
npm run analytics:run
```

This will:

1. Execute `collections/jsonplaceholder-crud.postman_collection.json` via Newman
2. Append the run to `.analytics-data/newman/history.json` (tagged as project **WK**)
3. Generate `reports/analytics-dashboard.html`
4. Open the dashboard in your browser (if enabled in `dashboard.config.ts`)

## Step 4 — Regenerate dashboard without re-running tests

If history already exists and you only want to refresh the HTML:

```powershell
npm run analytics:generate
```

Output: `reports/analytics-dashboard.html`

## Other useful commands

```powershell
# Newman only with HTML extra reporter (no historical dashboard)
npm test

# Newman with dashboard wrapper reporter
npm run test:dashboard
```

## Configuration

Edit `dashboard.config.ts` to change:

- Dashboard title (`WK - Historical Analytics Dashboard`)
- Project identity (`project.name: 'WK'`, `frameworkName: 'wk-all-in-one-framework'`)
- Storage limits and Newman options

## View aggregated data (management dashboard)

To see WK runs together with DELL and Sr Link:

```powershell
cd ..\dashboard-for-management
npm install
npm run dashboard:generate
```

Open `reports/management-dashboard.html` and filter by **Project → WK**.
