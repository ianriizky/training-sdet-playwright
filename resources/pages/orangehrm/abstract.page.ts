import env from '@/resources/env';
import type { AbstractSelector } from '@/resources/selectors/abstract.selector';

import { AbstractPage as BaseAbstractPage } from '../abstract.page';

import type { Page } from '@playwright/test';

interface Credential {
  username: string;
  password: string;
}

export abstract class AbstractPage<
  TSelector extends AbstractSelector,
> extends BaseAbstractPage<TSelector> {
  constructor(
    protected override readonly page: Page,
    protected override readonly selector: TSelector,
  ) {
    super(page, selector, { baseURL: env.ORANGEHRM_BASE_URL });
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
