import { faker } from '@faker-js/faker';
import { expect, type Page } from '@playwright/test';

import env from '../env';

import type { AbstractSelector } from '../selectors/abstract.selector';

interface PageConfig {
  baseURL: string;
}

export abstract class AbstractPage<
  TSelector extends AbstractSelector,
  TConfig extends PageConfig = PageConfig,
> {
  protected readonly env: typeof env;
  protected readonly faker: typeof faker;

  constructor(
    protected readonly page: Page,
    protected readonly selector: TSelector,
    protected readonly config: TConfig,
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
