import { type Page, expect } from '@playwright/test';

export class CreateWishlistModal {
    page: Page;
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async create(wishlist: string) {  
        const dialog = this.page.getByRole('dialog', { name: 'Name this wishlist'})
        await dialog.getByRole('textbox', { name: 'Name' }).fill(wishlist);
        await dialog.getByRole('button', { name: 'Create' }).click();

        await expect(this.page.getByText(`Saved to ${wishlist}`)).toBeVisible();
    }
}