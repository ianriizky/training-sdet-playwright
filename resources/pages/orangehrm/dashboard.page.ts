import test, { expect } from '@playwright/test';

import { dashboardSelector } from '@/resources/selectors/orangehrm/dashboard.selector';

import { AbstractPage } from './abstract.page';

export class DashboardPage extends AbstractPage {
  async assertSectionTitlesAreVisible(titles: string[]): Promise<void> {
    await test.step('Verify section titles are visible', async () => {
      for (const title of titles) {
        const sectionElement = this.page.locator(
          dashboardSelector.sectionTitles(title),
        );
        await expect(sectionElement).toBeVisible();
      }
    });
  }
}
