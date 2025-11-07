import { expect, test } from '@playwright/test';

import { acceptedPasswords, acceptedUsernames } from './constant';

test.describe('OrangeHRM - Login', () => {
  test.use({ baseURL: 'https://opensource-demo.orangehrmlive.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
  });

  test('User should be able to Login with valid credentials and verify the correct URL after logged in', async ({
    page,
  }) => {
    await test.step('Fill in credentials', async () => {
      await page
        .getByRole('textbox', { name: 'Username' })
        .fill(acceptedUsernames[0]);
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill(acceptedPasswords[0]);
    });

    await test.step('Click login button', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
    });

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('User should unable to Login with invalid credentials and verify the "Invalid credentials" message appears', async ({
    page,
  }) => {
    await test.step('Fill in invalid credentials', async () => {
      await page
        .getByRole('textbox', { name: 'Username' })
        .fill('invalid_user');
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('invalid_password');
    });

    await test.step('Click login button', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
    });

    const errorMessage = page.locator('.oxd-alert-content-text');
    await expect(errorMessage).toContainText('Invalid credentials');
  });

  test('User should unable to Login with empty fields and verify the "required" message appears', async ({
    page,
  }) => {
    await test.step('Click login button', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
    });

    const errorMessages = await page
      .locator('.oxd-input-field-error-message')
      .all();

    for (const errorMessage of errorMessages) {
      await expect(errorMessage).toContainText('Required');
    }
  });

  test('User should be able to Logout and verify the correct URL after logged out', async ({
    page,
  }) => {
    await test.step('Fill in credentials', async () => {
      await page
        .getByRole('textbox', { name: 'Username' })
        .fill(acceptedUsernames[0]);
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill(acceptedPasswords[0]);
    });

    await test.step('Click login button', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
    });

    await expect(page).toHaveURL(/.*dashboard/);

    await test.step('Click logout button', async () => {
      await page.locator('.oxd-userdropdown-name').click();
      await page.getByRole('menuitem', { name: 'Logout' }).click();
    });

    await expect(page).toHaveURL(/.*auth\/login/);
  });
});
