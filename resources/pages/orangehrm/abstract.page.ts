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
    super(page, locator, { baseURL: env.ORANGEHRM_BASE_URL });
  }

  protected get acceptedCredentials(): Credential[] {
    return [
      {
        username: this.env.ORANGEHRM_USERNAME,
        password: this.env.ORANGEHRM_PASSWORD,
      },
    ];
  }

  protected get randomAcceptedCredential(): Credential {
    return this.faker.helpers.arrayElement(this.acceptedCredentials);
  }
}
