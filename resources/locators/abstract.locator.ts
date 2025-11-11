import type { Page } from '@playwright/test';

export type Selector = Record<
  string,
  {
    selector: Parameters<Page['locator']>[0];
    options?: Parameters<Page['locator']>[1];
  }
>;

export abstract class AbstractLocator<TSelector extends Selector = Selector> {
  constructor(
    protected readonly page: Page,
    protected readonly selector: TSelector = {} as TSelector,
  ) {}
}
