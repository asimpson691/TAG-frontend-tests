import { type Page } from '@playwright/test';

export class MainNavigationMenu {
    page: Page;
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async navigateTo(area: string) {
        await this.page.getByRole('button', { name: 'Main navigation menu' }).click();
        await this.page.getByRole('link', { name: area }).click();
    }
}