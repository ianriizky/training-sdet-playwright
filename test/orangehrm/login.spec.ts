import { test } from '@playwright/test';

import { LoginPage } from '@/resources/pages/orangehrm/login.page';
import { loginSelector } from '@/resources/selectors/orangehrm/login.selector';

test.describe('OrangeHRM - Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, loginSelector);

    await loginPage.navigateToLoginPage();
  });

  test('User should be able to Login with valid credentials and verify the correct URL after logged in', async () => {
    await loginPage.performValidLogin();
    await loginPage.assertHasDashboardPage();
  });

  test('User should unable to Login with invalid credentials and verify the "Invalid credentials" message appears', async () => {
    await loginPage.performInvalidLogin();
    await loginPage.assertHasErrorLoginInvalidCredentials();
  });

  test('User should unable to Login with empty fields and verify the "required" message appears', async () => {
    await loginPage.performClickLoginButton();
    await loginPage.assertHasErrorLoginRequiredFields();
  });

  test('User should be able to Logout and verify the correct URL after logged out', async () => {
    await loginPage.performValidLogin();
    await loginPage.assertHasDashboardPage();

    await loginPage.performClickLogoutButton();
    await loginPage.assertHasLoginPage();
  });
});
