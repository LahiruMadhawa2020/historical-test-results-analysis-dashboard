# DELL — Playwright TypeScript TDD (UI + API)

**Project:** DELL | **Framework:** dell-maven-module-framework | **Folder:** `playwright-ts-tdd-testing`

## Prerequisites

- Node.js 18+
- Built library at `../../historical-analytics-dashboard`


## Setup

```powershell
cd ..\..\historical-analytics-dashboard
npm install && npm run build
cd ..\dell-maven-module-framework\playwright-ts-tdd-testing
npm install
npx playwright install chromium
```

## Run tests with dashboard

```powershell
npm run analytics:run:ui
npm run analytics:run:api
```

Copy `.env` values or set `DELL_*` environment variables before running UI tests.
