import { type Page } from '@playwright/test';

import { CreateWishlistModal } from '../modals/createWishlist';
import { WishlistsPage } from './wishlists';

export class Homepage {
    page: Page;
    createWishlistModal: CreateWishlistModal;
    wishlistsPage: WishlistsPage;

    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
        this.createWishlistModal = new CreateWishlistModal(page);
        this.wishlistsPage = new WishlistsPage(page);
    }

    async addHomeToWishlist(wishlist: string, shortSummary: string) {  
        await this.page.getByRole('button', { name: `Add to Wishlist: ${shortSummary}` }).click();
        await this.createWishlistModal.create(wishlist);
        
    }

    async addFirstHomeToWishlist(wishlist: string) {  
        await this.page.getByRole('button', { name: 'Add to Wishlist' }).first().click();
        await this.createWishlistModal.create(wishlist);
    }
}