import { type Page, expect } from '@playwright/test';

export class FirstVisitCookieModal {
    page: Page;
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async acceptAll() {  
        await this.page.getByRole('button', { name: 'Accept all' }).click();

        await expect(this.page.getByRole('heading', { name: 'Help us improve your experience'})).not.toBeVisible();
    }
}