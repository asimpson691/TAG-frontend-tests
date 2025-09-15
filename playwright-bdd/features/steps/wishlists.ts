import { Given, When, Then } from '../../fixtures';

When('the user adds a property to a new wishlist {string}', async ({ homepage }, wishlist: string) => {
    await homepage.addFirstHomeToWishlist(wishlist);
});

Then('the new property is visible in the wishlist {string}', async ({ mainNavigationMenu, wishlistsPage }, wishlist: string) => {
    await mainNavigationMenu.navigateTo('Wishlists');
    await wishlistsPage.checkNumberOfHomesInWishlist(wishlist, 1);
});
