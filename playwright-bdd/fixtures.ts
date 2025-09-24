import { createBdd, test as base } from 'playwright-bdd';

import { Homepage } from './pom/pages/homepage';
import { SigninPage } from './pom/pages/signin'
import { WishlistsPage } from './pom/pages/wishlists';

import { MainNavigationMenu } from './pom/menus/mainNavigation';


export const test = base.extend<{ homepage: Homepage, signinPage: SigninPage, wishlistsPage: WishlistsPage, mainNavigationMenu: MainNavigationMenu }>({
    homepage: async ({ page }, use) => {
        await use(new Homepage(page));
    },
    signinPage: async ({ page }, use) => {
        await use(new SigninPage(page));
    },
    wishlistsPage: async ({ page }, use) => {
        await use(new WishlistsPage(page));
    },
    mainNavigationMenu: async ({ page }, use) => {
        await use(new MainNavigationMenu(page));
    },
});

export const { Given, When, Then } = createBdd(test);