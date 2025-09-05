# TAG-test-framework-examples
This repo aims to provide example projects for various test frameworks

## Table of Contents
1. BDD frameworks  
    1.1. [Native Cucumber](#native-cucumber)  
    1.2. [Playwright with Cucumber](#playwright-with-cucumber)  
    1.3. [Playwright with Playwright-BDD](#playwright-with-playwright-bdd)

## Native Cucumber <a name="native-cucumber"></a>
`/cucumber`  
Example based on [docs 10-minute-tutorial](https://cucumber.io/docs/guides/10-minute-tutorial?lang=javascript), with a simple conversion to Typescript.

## Playwright with Cucumber <a name="playwright-with-cucumber"></a>
`/playwright-with-cucumber`  
Example based on [BrowserStack guide](https://www.browserstack.com/guide/playwright-cucumber), but using Typescript.
Advantages:
- Utilises Playwright's page modal and locators (e.g. getByRole)
Disadvantages:
- Unable to use the Playwright UI, debugging, screenshot, video capture etc. due to the actual tests being run by the Cucumber framework

## Playwright with Playwright-BDD <a name="playwright-with-playwright-bdd"></a>
`/playwright-bdd`
Whilst Playwright has no native support for BDD tests using the Gherkin syntax, [Playwright-BDD](https://vitalets.github.io/playwright-bdd/#/) looks like the next best thing.
