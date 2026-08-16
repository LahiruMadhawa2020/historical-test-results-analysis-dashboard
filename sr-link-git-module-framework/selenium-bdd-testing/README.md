# Sr Link — Selenium Java BDD

**Project:** Sr Link | **Framework:** sr-link-git-module-framework | **Folder:** `selenium-bdd-testing`

## Prerequisites

- Node.js 18+
- Built library at `../../historical-analytics-dashboard`
- Java 17 and Maven


## Setup

```powershell
cd ..\..\historical-analytics-dashboard
npm install && npm run build
cd ..\sr-link-git-module-framework\selenium-bdd-testing
npm install
```

## Run tests with dashboard

```powershell
npm run analytics:run
```

Copy `.env` values or set `SR_LINK_*` environment variables before running UI tests.
