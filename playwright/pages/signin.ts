import { type Page, expect } from '@playwright/test';

import { MainNavigationMenu } from '../menus/mainNavigation';

export class SigninPage {
    page: Page;
    mainNavigationMenu: MainNavigationMenu;

    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
        this.mainNavigationMenu = new MainNavigationMenu(page);
    }

    async signin() {
        await this.mainNavigationMenu.navigateTo('Log in or sign up');
        await this.page.getByRole('button', { name: 'Continue with email' }).click();

        await this.page.getByRole('textbox', { name: 'Email' }).fill('faketestuser912@gmail.com');
        await this.page.getByRole('button', { name: 'Continue', "exact": true }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill('blue glass pear!');
        await this.page.getByRole('button', { name: 'Log in' }).click();

        await expect(this.page.getByRole('link', { name: 'Profile' })).toBeVisible();
    }
}