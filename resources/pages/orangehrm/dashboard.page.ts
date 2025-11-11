import test, { expect } from '@playwright/test';

import { DashboardLocator } from '@/resources/locators/orangehrm/dashboard.locator';

import { AbstractPage } from './abstract.page';

import type { Page } from '@playwright/test';

export class DashboardPage extends AbstractPage<DashboardLocator> {
  constructor(protected override readonly page: Page) {
    super(page, new DashboardLocator(page));
  }

  async assertSectionTitlesAreVisible(titles: string[]): Promise<void> {
    await test.step('Verify section titles are visible', async () => {
      for (const title of titles) {
        const sectionElement = this.locator.getSectionTitle(title);

        await expect(sectionElement).toBeVisible();
      }
    });
  }
}
