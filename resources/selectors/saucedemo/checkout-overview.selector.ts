import type { Selector } from '@/resources/locators/abstract.locator';

export const checkoutOverviewSelector = {
  cartItem: { selector: '[data-test="inventory-item"]' },
  cartItemName: { selector: '[data-test="inventory-item-name"]' },
  cartItemPrice: { selector: '[data-test="inventory-item-price"]' },
  cartItemQuantity: { selector: '[data-test="item-quantity"]' },
  subtotalLabel: { selector: '[data-test="subtotal-label"]' },
  taxLabel: { selector: '[data-test="tax-label"]' },
  totalLabel: { selector: '[data-test="total-label"]' },
  finishButton: { selector: '[data-test="finish"]' },
  cancelButton: { selector: '[data-test="cancel"]' },
} satisfies Selector;

export type CheckoutOverviewSelector = typeof checkoutOverviewSelector;
