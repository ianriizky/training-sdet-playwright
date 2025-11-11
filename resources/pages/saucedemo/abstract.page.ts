import env from '@/resources/env';
import type { AbstractLocator } from '@/resources/locators/abstract.locator';

import { AbstractPage as BaseAbstractPage } from '../abstract.page';

import type { Page } from '@playwright/test';

interface Credential {
  username: string;
  password: string;
}

export abstract class AbstractPage<
  TLocator extends AbstractLocator,
> extends BaseAbstractPage<TLocator> {
  constructor(
    protected override readonly page: Page,
    protected override readonly locator: TLocator,
  ) {
    super(page, locator, { baseURL: env.SAUCEDEMO_BASE_URL });
  }

  protected get acceptedCredentials(): Credential[] {
    return [
      {
        username: this.env.SAUCEDEMO_USERNAME_STANDARD_USER,
        password: this.env.SAUCEDEMO_PASSWORD_STANDARD_USER,
      },
      {
        username: this.env.SAUCEDEMO_USERNAME_LOCKED_OUT_USER,
        password: this.env.SAUCEDEMO_PASSWORD_LOCKED_OUT_USER,
      },
      {
        username: this.env.SAUCEDEMO_USERNAME_PROBLEM_USER,
        password: this.env.SAUCEDEMO_PASSWORD_PROBLEM_USER,
      },
      {
        username: this.env.SAUCEDEMO_USERNAME_PERFORMANCE_GLITCH_USER,
        password: this.env.SAUCEDEMO_PASSWORD_PERFORMANCE_GLITCH_USER,
      },
      {
        username: this.env.SAUCEDEMO_USERNAME_ERROR_USER,
        password: this.env.SAUCEDEMO_PASSWORD_ERROR_USER,
      },
      {
        username: this.env.SAUCEDEMO_USERNAME_VISUAL_USER,
        password: this.env.SAUCEDEMO_PASSWORD_VISUAL_USER,
      },
    ];
  }
}
