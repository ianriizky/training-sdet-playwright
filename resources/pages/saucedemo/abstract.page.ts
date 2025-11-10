import { AbstractPage as BaseAbstract } from '../abstract.page';

import type { Page } from '@playwright/test';

export abstract class AbstractPage extends BaseAbstract {
  constructor(protected override readonly page: Page) {
    super(page, { baseURL: 'https://www.saucedemo.com' });
  }
}
