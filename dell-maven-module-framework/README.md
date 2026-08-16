# DELL — Maven Module Framework

**Project name:** DELL  
**Primary Java Maven project:** `dell-maven-module-framework/` (this folder)

This directory is the **parent Maven project** (`packaging: pom`). The four UI automation folders below are **Maven modules** that inherit from the parent `pom.xml`.

## Maven module structure

```
dell-maven-module-framework/              ← Primary Maven parent project (pom.xml)
├── pom.xml
├── playwright-java-bdd-testing/            ← Maven module (Playwright + Cucumber BDD)
├── playwright-java-tdd-testing/          ← Maven module (Playwright + JUnit TDD)
├── selenium-bdd-testing/                 ← Maven module (Selenium + Cucumber BDD)
├── selenium-tdd-testing/                 ← Maven module (Selenium + JUnit TDD)
├── package.json                          ← Newman API testing (separate, not a Maven module)
├── dashboard.config.ts
└── collections/
```

Other sibling folders (`cypress-ts-*`, `wdio-ts-*`, etc.) are **not** Maven modules.

---

## Java Maven modules — quick start

### Prerequisites

- JDK 17+
- Apache Maven 3.9+
- Google Chrome (Selenium modules)
- Playwright browsers (Playwright modules)

### Step 1 — Build all modules from the parent project

```powershell
cd dell-maven-module-framework
mvn clean install
```

### Step 2 — Run tests for one module

```powershell
mvn test -pl playwright-java-tdd-testing
mvn test -pl playwright-java-bdd-testing
mvn test -pl selenium-tdd-testing
mvn test -pl selenium-bdd-testing
```

### Step 3 — Install Playwright browsers (first time only)

```powershell
mvn -pl playwright-java-tdd-testing exec:java -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install chromium"
```

### Environment variables

Set in each module's `.env` or export before running tests:

| Variable | Description |
|---|---|
| `DELL_APPLICATION_URL` | Application under test |
| `DELL_APPLICATION_USERNAME` | Login username |
| `DELL_APPLICATION_PASSWORD` | Login password |
| `DELL_BROWSER` | Browser for Selenium (`chrome`) |
| `DELL_HEADLESS` | `true` or `false` |

---

## Newman API testing (Node.js — unchanged)

The Newman Postman setup at this folder root is independent of Maven.

### Step 1 — Build the analytics library

```powershell
cd ..\historical-analytics-dashboard
npm install
npm run build
```

### Step 2 — Install and run

```powershell
cd ..\dell-maven-module-framework
npm install
npm run analytics:run
```

Output: `reports/analytics-dashboard.html`

Regenerate only:

```powershell
npm run analytics:generate
```

---

## Management dashboard

```powershell
cd ..\dashboard-for-management
npm run dashboard:generate
```

Filter by **Project → DELL** in `reports/management-dashboard.html`.
