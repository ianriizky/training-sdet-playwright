import { sharedSelectors } from '@/resources/selectors/saucedemo/shared-selectors';

import { type Selector } from '../abstract.selector';

import { CartItemsAbstractSelector } from './cart-items.abstract-selector';

export class CheckoutOverviewSelector extends CartItemsAbstractSelector {
  protected readonly selector = {
    ...sharedSelectors,
    subtotalLabel: { selector: '[data-test="subtotal-label"]' },
    taxLabel: { selector: '[data-test="tax-label"]' },
    totalLabel: { selector: '[data-test="total-label"]' },
    finishButton: { selector: '[data-test="finish"]' },
    cancelButton: { selector: '[data-test="cancel"]' },
  } satisfies Selector;

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
