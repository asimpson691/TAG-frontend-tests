const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

import type { Browser, Page } from "playwright";

setDefaultTimeout(60 * 1000);

let page: Page;
let browser: Browser;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();

});

Given("User navigates to the Browserstack Homepage", async () => {
    await page.goto("https://www.browserstack.com/");
});

When('User clicks on Product Menu', async function () {
    await page.getByRole('button', { name: "Products"}).click();
});

When('User clicks on Pricing Menu', async function () {
    await page.getByRole('link', { name: /^Pricing$/ }).click();
});

Then('It should show Web Testing Product', async function () {
    await page.getByRole('tab', { name: "Web Testing"}).first().click(); // not ideal but two tabs with same name visible
});

Then('It should Display correct Product lists in left Nav', async function () {
    var leftNavProducts = await page.locator('div[id="sidenav__list"]').textContent()
    var productArray = await leftNavProducts.split("\n").map((item) => { return item.trim(); });
    expect(productArray).toEqual(expect.arrayContaining(['Live', 'App Live']));
});

After(async function () {
    await browser.close();
})