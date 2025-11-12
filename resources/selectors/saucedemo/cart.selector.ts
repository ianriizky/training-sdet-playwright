import type { Selector } from '@/resources/locators/abstract.locator';

import { sharedSelectors } from './shared-selectors';

export const cartSelector = {
  ...sharedSelectors,
  continueShoppingButton: { selector: '[data-test="continue-shopping"]' },
  checkoutButton: { selector: '[data-test="checkout"]' },
} satisfies Selector;

export type CartSelector = typeof cartSelector;
