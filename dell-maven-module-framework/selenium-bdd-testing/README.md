# selenium-bdd-testing

Maven module of **dell-maven-module-framework**.

- **Parent:** `../pom.xml`
- **Tool:** Selenium WebDriver
- **Style:** BDD (Cucumber)
- **Tests:** `src/test/resources/features/`, `src/test/java/`

```powershell
# From parent project root
mvn test -pl selenium-bdd-testing

# Or from this folder
mvn test
```

Requires Google Chrome and matching ChromeDriver (managed by Selenium Manager).
