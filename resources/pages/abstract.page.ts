import { expect, type Page } from '@playwright/test';

interface PageConfig {
  baseURL: string;
}

export abstract class AbstractPage {
  constructor(
    protected readonly page: Page,
    protected readonly config: PageConfig,
  ) {}

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.config.baseURL);
  }

  async assertHasHomePage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${this.config.baseURL}/?$`));
  }
}
