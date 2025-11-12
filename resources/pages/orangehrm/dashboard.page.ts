import test, { expect } from '@playwright/test';

import { DashboardSelector } from '@/resources/selectors/orangehrm/dashboard.selector';

import { AbstractPage } from './abstract.page';

import type { Page } from '@playwright/test';

export class DashboardPage extends AbstractPage<DashboardSelector> {
  constructor(protected override readonly page: Page) {
    super(page, new DashboardSelector(page));
  }

  async assertSectionTitlesAreVisible(titles: string[]): Promise<void> {
    await test.step('Verify section titles are visible', async () => {
      for (const title of titles) {
        const sectionElement = this.selector.getSectionTitle(title);

        await expect(sectionElement).toBeVisible();
      }
    });
  }
}
