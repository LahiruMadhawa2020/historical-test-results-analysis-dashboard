# playwright-java-tdd-testing

Maven module of **dell-maven-module-framework**.

- **Parent:** `../pom.xml`
- **Tool:** Playwright Java
- **Style:** TDD (JUnit 5)
- **Tests:** `src/test/java/`

```powershell
# From parent project root
mvn test -pl playwright-java-tdd-testing

# Or from this folder
mvn test
```

Install Playwright browsers (first time):

```powershell
mvn exec:java -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install chromium"
```
