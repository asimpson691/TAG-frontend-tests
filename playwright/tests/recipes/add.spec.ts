import { test } from '@playwright/test';

import { MyRecipesPage } from '../../pages/myrecipes';
import { SigninPage } from '../../pages/signin';

test.beforeEach(async ({ page }) => {
  const signinPage = new SigninPage(page);
  const myRecipesPage = new MyRecipesPage(page);

  await signinPage.signin();
  await myRecipesPage.deleteAllRecipes();
});

test('add a new recipe by URL', async ({ page }) => {
  const myRecipesPage = new MyRecipesPage(page);

  await myRecipesPage.addNewRecipeBy('URL');
});