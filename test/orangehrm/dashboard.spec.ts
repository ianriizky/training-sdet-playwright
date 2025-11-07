import { expect, test } from '@playwright/test';

import { acceptedPasswords, acceptedUsernames } from './constant';

test.describe('OrangeHRM - Dashboard', () => {
  test.use({ baseURL: 'https://opensource-demo.orangehrmlive.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');

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
  });

  test('Ensure these section titles are present in the Dashboard: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location', async ({
    page,
  }) => {
    const sectionTitles = [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location',
    ];

    for (const title of sectionTitles) {
      const sectionElement = page.locator(`text=${title}`);
      await expect(sectionElement).toBeVisible();
    }
  });
});
