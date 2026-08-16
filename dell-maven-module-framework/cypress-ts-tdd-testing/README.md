# DELL — Cypress TypeScript TDD

**Project:** DELL | **Framework:** dell-maven-module-framework | **Folder:** `cypress-ts-tdd-testing`

## Prerequisites

- Node.js 18+
- Built library at `../../historical-analytics-dashboard`


## Setup

```powershell
cd ..\..\historical-analytics-dashboard
npm install && npm run build
cd ..\dell-maven-module-framework\cypress-ts-tdd-testing
npm install
```

## Run tests with dashboard

```powershell
npm run analytics:run
```

Copy `.env` values or set `DELL_*` environment variables before running UI tests.
