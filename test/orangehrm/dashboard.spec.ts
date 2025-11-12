import { test } from '@playwright/test';

import { DashboardPage } from '@/resources/pages/orangehrm/dashboard.page';
import { LoginPage } from '@/resources/pages/orangehrm/login.page';

test.describe('OrangeHRM - Dashboard', { tag: '@orangehrm' }, () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.performValidLogin();
  });

  test('Ensure these section titles are present in the Dashboard: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location', async () => {
    const sectionTitles = [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location',
    ];

    await dashboardPage.assertSectionTitlesAreVisible(sectionTitles);
  });
});
