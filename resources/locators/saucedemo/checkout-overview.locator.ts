import { type CheckoutOverviewSelector } from '@/resources/selectors/saucedemo/checkout-overview.selector';

import { AbstractLocator } from '../abstract.locator';

export class CheckoutOverviewLocator extends AbstractLocator<CheckoutOverviewSelector> {
  get cartItems() {
    return this.page.locator(this.selector.cartItem.selector);
  }

  get cartItemNames() {
    return this.page.locator(this.selector.cartItemName.selector);
  }

  get cartItemPrices() {
    return this.page.locator(this.selector.cartItemPrice.selector);
  }

  get cartItemQuantities() {
    return this.page.locator(this.selector.cartItemQuantity.selector);
  }

  get subtotalLabel() {
    return this.page.locator(this.selector.subtotalLabel.selector);
  }

  get taxLabel() {
    return this.page.locator(this.selector.taxLabel.selector);
  }

  get totalLabel() {
    return this.page.locator(this.selector.totalLabel.selector);
  }

  get finishButton() {
    return this.page.locator(this.selector.finishButton.selector);
  }

  get cancelButton() {
    return this.page.locator(this.selector.cancelButton.selector);
  }
}
