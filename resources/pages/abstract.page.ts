import { faker } from '@faker-js/faker';
import { expect, type Page } from '@playwright/test';

import env from '../env';

import type { AbstractLocator } from '../locators/abstract.locator';

interface PageConfig {
  baseURL: string;
}

export abstract class AbstractPage<TLocator extends AbstractLocator> {
  protected readonly env: typeof env;
  protected readonly faker: typeof faker;

  constructor(
    protected readonly page: Page,
    protected readonly locator: TLocator,
    protected readonly config: PageConfig,
  ) {
    this.env = env;
    this.faker = faker;
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.config.baseURL);
  }

  async assertHasHomePage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${this.config.baseURL}/?$`));
  }
}
