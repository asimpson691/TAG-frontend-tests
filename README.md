# TAG-test-framework-examples
This repo aims to provide example projects for various test frameworks

## Table of Contents
1. BDD frameworks  
    1.1. [Native Cucumber](#native-cucumber)  
    1.2. [Playwright with Cucumber](#playwright-with-cucumber)  
    1.3. [Playwright with Playwright-BDD](#playwright-with-playwright-bdd)
2. Webapp Automation frameworks  
    2.1. [Playwright](#playwright)
3. API test frameworks  
    3.1. [Jest with fetch](#jest-with-fetch)  
    3.2. [Jest with supertest](#jest-with-supertest)  
    3.3. [Vitest with fetch](#vitest-with-fetch)
4. Unit and component test frameworks  
    4.1. [Vitest](#vitest)

# BDD frameworks
`NOTES.md` contains some useful information for those of us who aren't familiar with writing BDD scenarios and implementing tests covering them.

## Native Cucumber <a name="native-cucumber"></a>
`/cucumber`  
Example based on [docs 10-minute-tutorial](https://cucumber.io/docs/guides/10-minute-tutorial?lang=javascript), with a simple conversion to Typescript.

## Playwright with Cucumber <a name="playwright-with-cucumber"></a>
`/playwright-with-cucumber`  
Example based on [BrowserStack guide](https://www.browserstack.com/guide/playwright-cucumber), but using Typescript.
Note that this example runs the tests using the Cucumber framework, not Playwright - Playwright is just used as a library. So the Playwright UI, debugging, screenshot, video capture etc. is not available.

## Playwright with Playwright-BDD <a name="playwright-with-playwright-bdd"></a>
`/playwright-bdd`
Whilst Playwright has no native support for BDD tests using the Gherkin syntax, [Playwright-BDD](https://vitalets.github.io/playwright-bdd/#/) looks like the next best thing. Playwright-BDD is essentially a transpiler, converting the Gherkin syntax features and steps into Playwright tests. So once `npx bddgen` is ran, the Playwright UI, reporting etc. can be used as normal.

# Webapp Automation frameworks
## Playwright <a name="playwright"></a>
`/playwright`
As of 2025, this is one of the most popular test automation frameworks for modern web apps (with more weekly downloads than Cypress).

# API test frameworks
## Jest with Fetch <a name="jest-with-fetch"></a>
`/backend-test-frameworks/apiTests/jest/jest-fetch.spec.js`
Node now comes with a native Fetch API, meaning that http libraries such as `axios` (which sometimes have vulnerabilities) are no longer needed.

## Jest with Supertest <a name="jest-with-supertest"></a>
`backend-test-frameworks/apiTests/jest/jest-supertest.spec.js`
[Supertest](https://www.npmjs.com/package/supertest) at first glance adds some syntactic sugar over what [Jest with fetch](#jest-with-fetch) achieves. There may be more supertest though - I haven't delved that deep.

## Vitest with Fetch <a name="vitest-with-fetch"></a>
`/backend-test-frameworks/apiTests/vitest/vitest-fetch.spec.js`
Node now comes with a native Fetch API, meaning that http libraries such as `axios` (which sometimes have vulnerabilities) are no longer needed.

# Unit and Component test frameworks
## Vitest <a name="vitest"></a>
`backend-test-frameworks/tests/vitest`
Incredibly simpler to setup than Jest when working with Typescript and ESM modules - it just works without the finicky config that Jest needs.