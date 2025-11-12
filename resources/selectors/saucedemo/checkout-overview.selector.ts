import type { Selector } from '@/resources/locators/abstract.locator';

import { sharedSelectors } from './shared-selectors';

export const checkoutOverviewSelector = {
  ...sharedSelectors,
  subtotalLabel: { selector: '[data-test="subtotal-label"]' },
  taxLabel: { selector: '[data-test="tax-label"]' },
  totalLabel: { selector: '[data-test="total-label"]' },
  finishButton: { selector: '[data-test="finish"]' },
  cancelButton: { selector: '[data-test="cancel"]' },
} satisfies Selector;

export type CheckoutOverviewSelector = typeof checkoutOverviewSelector;
