import { type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class MyRecipesPage {
    page: Page;
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async deleteAllRecipes() {
        // Wait for the My Recipes page to load with either no recipes or some recipes
        // Then delete all existing recipes to ensure a clean state for the test
        while (true)  {
            const locatorA = this.page.getByText("It looks like you don't have any recipes yet.");
            const locatorB = this.page.locator('.recipe-card');
            await expect(locatorA.or(locatorB)).toBeVisible();
        
            if (await locatorA.isVisible()) break;
        
            await this.page.locator('.recipe-card').first().click();
            await this.page.getByRole('button', { name: 'DELETE' }).click();
            await this.page.getByRole('alertdialog', { name: 'Confirm Delete'})
                .getByRole('button', { name: 'DELETE' }).click({ force: true });
        }
    }

    async addNewRecipeBy(method: 'URL') {
        await this.page.locator('ion-fab-button').getByRole('button').click({ force: true });
        await this.page.getByRole('button', { name: 'AUTOFILL RECIPE FROM...' }).click();
        await this.page.getByRole('button', { name: 'Autofill from URL' }).click();

        await expect(this.page.getByRole('heading', { level: 2, name: 'Autofill recipe from URL' })).toBeVisible();

        await this.page.getByRole('textbox', { name: 'Recipe URL' }).fill('https://www.bbcgoodfood.com/recipes/easy-chicken-curry');
        await this.page.getByRole('button', { name: 'OKAY' }).click();
        await this.page.getByRole('button', { name: 'CREATE' }).click();
        
        await expect(this.page.getByRole('heading', { level: 2, name: 'Easy chicken curry'})).toBeVisible();
    }
}