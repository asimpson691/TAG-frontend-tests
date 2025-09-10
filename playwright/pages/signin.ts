import { type Page } from '@playwright/test';

export class SigninPage {
    page: Page;
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async signin() {
        await this.page.goto('https://recipesage.com/');
        await this.page.getByRole('button', { name: 'LOG IN' }).first().click({ force: true });
        await this.page.getByRole('textbox', { name: 'Email' }).fill('testuser@fakeexchange192.com');
        await this.page.getByRole('textbox', { name: 'Password' }).fill('blue glass pear');
        await this.page.getByRole('button', { name: 'LOG IN' }).click();
    }
}