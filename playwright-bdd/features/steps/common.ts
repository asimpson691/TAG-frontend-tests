import { expect } from '@playwright/test';
import { Given, When, Then } from '../../fixtures';

Given('the user is logged in and has accepted cookies', async ({ page, signinPage }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accept all' }).click();
    await expect(page.getByRole('heading', { name: 'Help us improve your experience'})).not.toBeVisible();
    
    await signinPage.signin();
});

Given('the user is on the homepage and has no wishlists', async ({ page, wishlistsPage }) => {
    await wishlistsPage.navigateViaURL();
    // Not great but we only have one wishlist in the tests so far - ideally we'd have an API call to reset the state
    await wishlistsPage.deleteWishlist("My favourite places");
    
    await page.goto('/');
});