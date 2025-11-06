import { expect, test } from '@playwright/test';

const acceptedUsernames = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
] as const;
const acceptedPasswords = ['secret_sauce'] as const;

test.describe('SauceDemo', () => {
  test('User should be able to Login with valid credentials and verify the correct URL after logged in', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(acceptedUsernames[0]);
    await page.locator('[data-test="password"]').fill(acceptedPasswords[0]);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory/);
  });

  test('User should unable to Login with invalid credentials and verify the "Username and password do not match any user in this service" message appears', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
  });

  test('User should unable to Login with empty fields and verify the "Username is required" message appears', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Username is required');
  });

  test('User should be able to Logout and verify the correct URL after logged out', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(acceptedUsernames[0]);
    await page.locator('[data-test="password"]').fill(acceptedPasswords[0]);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory/);

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL(/.*\//);
  });
});
