import { test } from '@playwright/test';

test.describe('SauceDemo', () => {
  test('Login', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // await expect(page).toHaveTitle(/Sauce Labs/);
  });
});
