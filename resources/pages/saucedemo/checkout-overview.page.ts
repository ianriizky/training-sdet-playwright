import test, { expect, type Page } from '@playwright/test';

import { CheckoutOverviewSelector } from '@/resources/selectors/saucedemo/checkout-overview.selector';

import { CartItemsAbstractPage } from './cart-items.abstract.page';

export class CheckoutOverviewPage extends CartItemsAbstractPage<CheckoutOverviewSelector> {
  constructor(protected override readonly page: Page) {
    super(page, new CheckoutOverviewSelector(page));
  }

  async performClickFinish(): Promise<void> {
    await test.step('Click finish button', async () => {
      await this.selector.finishButton.click();
    });
  }

  async performClickCancel(): Promise<void> {
    await test.step('Click cancel button', async () => {
      await this.selector.cancelButton.click();
    });
  }

  async assertTotalPrice(expectedTotal: string): Promise<void> {
    await test.step(`Assert total price is ${expectedTotal}`, async () => {
      const totalText = await this.selector.totalLabel.textContent();
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
