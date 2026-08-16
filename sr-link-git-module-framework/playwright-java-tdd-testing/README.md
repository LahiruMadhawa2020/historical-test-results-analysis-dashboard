# Sr Link — Playwright Java TDD (UI + API)

**Project:** Sr Link | **Framework:** sr-link-git-module-framework | **Folder:** `playwright-java-tdd-testing`

## Prerequisites

- Node.js 18+
- Built library at `../../historical-analytics-dashboard`
- Java 17 and Maven


## Setup

```powershell
cd ..\..\historical-analytics-dashboard
npm install && npm run build
cd ..\sr-link-git-module-framework\playwright-java-tdd-testing
npm install
mvn -q dependency:resolve
```

## Run tests with dashboard

```powershell
npm run analytics:run:ui
npm run analytics:run:api
```

Copy `.env` values or set `SR_LINK_*` environment variables before running UI tests.
