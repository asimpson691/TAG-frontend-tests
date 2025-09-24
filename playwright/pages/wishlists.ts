import { type Page, expect } from '@playwright/test';

export class WishlistsPage {
    page: Page;

    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.airbnb.co.uk/wishlists');

        await expect(this.page.getByRole('heading', { name: 'Wishlists', level: 1 })).toBeVisible();
    }

    async deleteWishlist(wishlist: string) {
        if (!(await this.page.getByRole('link', { name: wishlist }).isVisible())) {
            return;
        }

        await this.page.getByRole('link', { name: wishlist }).hover();
        await this.page.getByRole('button', { name: `Delete ${wishlist}` }).click();
        await this.page.getByRole('dialog', { name: 'Delete this wishlist?' }).getByRole('button', { name: 'Delete' }).click();

        await expect(this.page.getByRole('link', { name: wishlist })).not.toBeVisible();
    }

    async checkNumberOfHomesInWishlist(wishlist: string, expected: number) {
        await expect(this.page.getByRole('link', { name: `Wishlist for ${wishlist}, ${expected} saved` })).toBeVisible();
    }
}