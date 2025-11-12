import test, { expect, type Page } from '@playwright/test';

import { OrderConfirmationSelector } from '@/resources/selectors/saucedemo/order-confirmation.selector';

import { AbstractPage } from './abstract.page';

export class OrderConfirmationPage extends AbstractPage<OrderConfirmationSelector> {
  constructor(protected override readonly page: Page) {
    super(page, new OrderConfirmationSelector(page));
  }

  async performClickBackHome(): Promise<void> {
    await test.step('Click back to home button', async () => {
      await this.selector.backHomeButton.click();
    });
  }

  async assertHasOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/checkout-complete(\\.html)?$`),
    );
  }

  async assertHasConfirmationMessage(): Promise<void> {
    await test.step('Assert confirmation message is visible', async () => {
      await expect(this.selector.confirmationMessage).toContainText(
        'Thank you for your order',
      );
    });
  }

  async assertHasInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/inventory(\\.html)?$`),
    );
  }
}
