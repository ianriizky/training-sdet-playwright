import type { Locator, Page } from '@playwright/test';

export type SelectorOptions = {
  selector: Parameters<Page['locator']>[0];
  options?: Parameters<Page['locator']>[1];
};
export type Selector = Record<string, SelectorOptions>;

export abstract class AbstractLocator<TSelector extends Selector = Selector> {
  constructor(
    protected readonly page: Page,
    protected readonly selector: TSelector = {} as TSelector,
  ) {}

  protected getLocatorByDataTest(dataTest: string): Locator {
    return this.page.locator(`[data-test="${dataTest}"]`);
  }

  protected async collectLocatorsFromBaseLocator(
    baseLocator: Locator,
  ): Promise<Locator[]> {
    const elements = await baseLocator.all();
    const locators: Locator[] = [];

    for (const element of elements) {
      const dataTest = await element.getAttribute('data-test');

      if (dataTest) {
        locators.push(this.getLocatorByDataTest(dataTest));
      }
    }

    return locators;
  }
}
