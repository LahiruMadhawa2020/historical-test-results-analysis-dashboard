# Sr Link — Cypress TypeScript BDD

**Project:** Sr Link | **Framework:** sr-link-git-module-framework | **Folder:** `cypress-ts-bdd-testing`

## Prerequisites

- Node.js 18+
- Built library at `../../historical-analytics-dashboard`


## Setup

```powershell
cd ..\..\historical-analytics-dashboard
npm install && npm run build
cd ..\sr-link-git-module-framework\cypress-ts-bdd-testing
npm install
```

## Run tests with dashboard

```powershell
npm run analytics:run
```

Copy `.env` values or set `SR_LINK_*` environment variables before running UI tests.
