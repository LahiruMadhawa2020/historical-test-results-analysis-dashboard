# Historical Test Results Analysis Dashboard

Monorepo demonstrating historical test analytics across three automation framework layouts (WK all-in-one, DELL Maven modules, Sr Link git modules) plus a cross-project management dashboard powered by [`historical-test-results-analysis-dashboard`](historical-analytics-dashboard/).

## Dashboard previews (GitHub Pages)

Pre-built dashboard HTML lives in `docs/` and is published to the `gh-pages` branch for GitHub Pages.

### Live preview links

| Dashboard | URL |
|-----------|-----|
| Landing page | https://LahiruMadhawa2020.github.io/historical-test-results-analysis-dashboard/ |
| WK project dashboard | https://LahiruMadhawa2020.github.io/historical-test-results-analysis-dashboard/wk-dashboard.html |
| DELL project dashboard | https://LahiruMadhawa2020.github.io/historical-test-results-analysis-dashboard/dell-dashboard.html |
| Sr Link project dashboard | https://LahiruMadhawa2020.github.io/historical-test-results-analysis-dashboard/sr-link-dashboard.html |
| Management dashboard | https://LahiruMadhawa2020.github.io/historical-test-results-analysis-dashboard/management-dashboard.html |

> Use the **`github.io`** links above — not the GitHub repo file browser (`github.com/.../blob/...`).

### If you see 404 or blank pages

1. Open [Settings → Pages](https://github.com/LahiruMadhawa2020/historical-test-results-analysis-dashboard/settings/pages) and set **Deploy from a branch** → **`gh-pages`** → **`/ (root)`** → **Save**.
2. Hard-refresh the browser (`Ctrl+F5` / `Cmd+Shift+R`) or try an incognito window.
3. If the repo is **private**, set **Pages visibility** to **Public** (or sign in to GitHub in the same browser).
4. Wait 1–2 minutes after changing Pages settings, then retry the links above.

Verify locally: `node scripts/check-live-pages.mjs` (checks all 5 URLs return HTTP 200 and embedded run data).

## Tool filter standard (10 tools)

Dashboard Tool filters use these canonical ids. **Application Type** (UI / API / Mobile) distinguishes API vs UI runs for the same tool:

- `cypress-bdd`, `cypress-tdd`
- `newman`
- `playwright-java-bdd`, `playwright-java-tdd`
- `playwright-ts-tdd`
- `selenium-java-bdd`, `selenium-java-tdd`
- `wdio-java-bdd`, `wdio-java-tdd`

## Prerequisites

- Node.js 18+
- Java 17+ and Maven (for Java UI/API tests)
- Chrome (for Selenium/Playwright UI runs)
- Optional: Cypress, Playwright browsers, Newman for live runs

## 1. Build the analytics library

```bash
cd historical-analytics-dashboard
npm install
npm run build
```

## 2. Project-wise dashboards (one project at a time)

Each project stores history under its local `.analytics-data/` folder and generates `reports/analytics-dashboard.html`.

### WK (all-in-one)

```bash
cd wk-all-in-one-framework
npm install
npm run analytics:smoke-import-all   # smoke CRUD/UI data for all tools
# or run live tool pipelines, e.g.:
# npm run test:api:playwright-java-tdd:dashboard
# npm run analytics:run                # Newman
npm run analytics:generate
```

Open `wk-all-in-one-framework/reports/analytics-dashboard.html`.

### DELL (Maven parent + TS submodules)

```bash
cd dell-maven-module-framework
npm install
node scripts/smoke-import-all.mjs
# or: npm run test:ui:selenium-tdd:dashboard
```

Open `dell-maven-module-framework/reports/analytics-dashboard.html`.

### Sr Link (git submodule layout)

Each tool lives in its own subfolder with its own `dashboard.config.ts` and `.analytics-data/`.

```bash
cd sr-link-git-module-framework
node scripts/smoke-import-all.mjs
```

Open `sr-link-git-module-framework/reports/analytics-dashboard.html` (unified view aggregating all git modules).

## 3. Management dashboard (all projects)

Aggregates history from WK, DELL, and Sr Link paths configured in [`dashboard-for-management/dashboard.config.ts`](dashboard-for-management/dashboard.config.ts).

```bash
cd dashboard-for-management
npm install
npm run dashboard:generate
```

Open `dashboard-for-management/reports/management-dashboard.html`.

## 4. Regenerate everything locally

From the repository root:

```bash
node scripts/publish-dashboards.mjs
```

This builds the library, smoke-imports all three projects, generates the management dashboard, and copies HTML into `docs/` for GitHub Pages.

## 5. Live test → dashboard flow

1. Run tests for a tool (JUnit XML, Playwright JSON, or Newman).
2. Import results:

   ```bash
   analytics-dashboard import <report-file> \
     --format junit-xml \
     --tool selenium-java-tdd \
     --application-type UI \
     --methodology TDD \
     --config dashboard.config.ts
   ```

3. Generate the HTML dashboard:

   ```bash
   analytics-dashboard generate --config dashboard.config.ts
   ```

API tools use the same `--tool` id as their UI counterpart; set `--application-type API`. API tests emit four CRUD operations (Create, Get, Update, Delete) with assertion details aligned to the Newman collection.

## Project layout

| Folder | Purpose |
|--------|---------|
| `historical-analytics-dashboard/` | Shared npm library + CLI |
| `wk-all-in-one-framework/` | Single-repo multi-tool reference |
| `dell-maven-module-framework/` | Java Maven modules + TS submodules |
| `sr-link-git-module-framework/` | One git module per tool |
| `dashboard-for-management/` | Cross-project management dashboard |
| `docs/` | GitHub Pages static dashboard previews |

## Configuration

- **Project dashboard:** `<project>/dashboard.config.ts` — storage paths, tool ids, filters.
- **Management dashboard:** `dashboard-for-management/dashboard.config.ts` — source roots (filesystem, S3, HTTP examples).

Management sources can point to local `.analytics-data`, Jenkins artifact copies, SharePoint mirrors, or S3 prefixes depending on `storage.type`.
