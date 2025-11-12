import { test } from '@playwright/test';

import { LoginPage } from '@/resources/pages/saucedemo/login.page';

test.describe('SauceDemo - Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.navigateToHomePage();
  });

  test('User should be able to Login with valid credentials and verify the correct URL after logged in', async () => {
    await loginPage.performValidLogin();
    await loginPage.assertHasInventoryPage();
  });

  test('User should unable to Login with invalid credentials and verify the "Username and password do not match any user in this service" message appears', async () => {
    await loginPage.performInvalidLogin();
    await loginPage.assertHasErrorLoginUsernamePasswordDontMatch();
  });

  test('User should unable to Login with empty fields and verify the "Username is required" message appears', async () => {
    await loginPage.performClickLoginButton();
    await loginPage.assertHasErrorLoginUsernameRequired();
  });

  test('User should be able to Logout and verify the correct URL after logged out', async () => {
    await loginPage.performValidLogin();
    await loginPage.assertHasInventoryPage();

    await loginPage.performClickLogoutButton();
    await loginPage.assertHasHomePage();
  });
});
