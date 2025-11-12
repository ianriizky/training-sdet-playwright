import { type OrderConfirmationSelector } from '@/resources/selectors/saucedemo/order-confirmation.selector';

import { AbstractLocator } from '../abstract.locator';

export class OrderConfirmationLocator extends AbstractLocator<OrderConfirmationSelector> {
  get confirmationMessage() {
    return this.page.locator(this.selector.confirmationMessage.selector);
  }

  get confirmationText() {
    return this.page.locator(this.selector.confirmationText.selector);
  }

  get backHomeButton() {
    return this.page.locator(this.selector.backHomeButton.selector);
  }

  get ponyExpress() {
    return this.page.locator(this.selector.ponyExpress.selector);
  }
}
