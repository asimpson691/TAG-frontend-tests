import { test } from '@playwright/test';

import { FirstVisitCookieModal } from '../../modals/firstVisitCookie';

import { MainNavigationMenu } from '../../menus/mainNavigation';

import { Homepage } from '../../pages/homepage';
import { SigninPage } from '../../pages/signin';
import { WishlistsPage } from '../../pages/wishlists';

const wishlistName = 'First Wishlist';

test.beforeEach(async ({ page }) => {
    const firstVisitCookieModal = new FirstVisitCookieModal(page);
    const signinPage = new SigninPage(page);
    const wishlistsPage = new WishlistsPage(page);
    
    await page.goto('https://www.airbnb.co.uk/');
        
    await firstVisitCookieModal.acceptAll();
    
    await signinPage.signin();
    await wishlistsPage.navigate();
    await wishlistsPage.deleteWishlist(wishlistName);
    
    await page.goto('https://www.airbnb.co.uk/');
});

test('from the homepage add a property to a new wishlist', async ({ page }) => {
    const homepage = new Homepage(page);
    const mainNavigationMenu = new MainNavigationMenu(page);
    const wishlistsPage = new WishlistsPage(page);
    
    await homepage.addFirstHomeToWishlist(wishlistName);
    await mainNavigationMenu.navigateTo('Wishlists');
    await wishlistsPage.checkNumberOfHomesInWishlist(wishlistName, 1);
});
