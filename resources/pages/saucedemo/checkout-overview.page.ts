import test, { expect, type Page } from '@playwright/test';

import { CheckoutOverviewLocator } from '@/resources/locators/saucedemo/checkout-overview.locator';
import { type CheckoutOverviewSelector } from '@/resources/selectors/saucedemo/checkout-overview.selector';

import { AbstractPage } from './abstract.page';

export class CheckoutOverviewPage extends AbstractPage<CheckoutOverviewLocator> {
  constructor(
    protected override readonly page: Page,
    protected readonly selector: CheckoutOverviewSelector,
  ) {
    super(page, new CheckoutOverviewLocator(page, selector));
  }

  async performClickFinish(): Promise<void> {
    await test.step('Click finish button', async () => {
      await this.locator.finishButton.click();
    });
  }

  async performClickCancel(): Promise<void> {
    await test.step('Click cancel button', async () => {
      await this.locator.cancelButton.click();
    });
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    await test.step(`Assert checkout overview has ${expectedCount} items`, async () => {
      const count = await this.locator.cartItems.count();
      expect(count).toBe(expectedCount);
    });
  }

  async assertCartItemsPresent(itemNames: string[]): Promise<void> {
    await test.step(`Assert checkout overview contains items: ${itemNames.join(', ')}`, async () => {
      const cartItemNames = await this.locator.cartItemNames.allTextContents();

      for (const itemName of itemNames) {
        expect(cartItemNames).toContain(itemName);
      }
    });
  }

  async assertTotalPrice(expectedTotal: string): Promise<void> {
    await test.step(`Assert total price is ${expectedTotal}`, async () => {
      const totalText = await this.locator.totalLabel.textContent();
      expect(totalText).toContain(expectedTotal);
    });
  }

  async assertHasCheckoutOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/checkout-step-two(\\.html)?$`),
    );
  }

  async assertHasOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/checkout-complete(\\.html)?$`),
    );
  }
}
