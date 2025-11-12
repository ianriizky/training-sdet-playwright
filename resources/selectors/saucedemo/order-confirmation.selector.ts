import type { Selector } from '@/resources/locators/abstract.locator';

export const orderConfirmationSelector = {
  confirmationMessage: { selector: '[data-test="complete-header"]' },
  confirmationText: { selector: '[data-test="complete-text"]' },
  backHomeButton: { selector: '[data-test="back-to-products"]' },
  ponyExpress: { selector: '.pony_express' },
} satisfies Selector;

export type OrderConfirmationSelector = typeof orderConfirmationSelector;
