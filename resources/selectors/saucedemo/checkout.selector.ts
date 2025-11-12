import type { Selector } from '@/resources/locators/abstract.locator';

export const checkoutSelector = {
  firstNameInput: { selector: '[data-test="firstName"]' },
  lastNameInput: { selector: '[data-test="lastName"]' },
  postalCodeInput: { selector: '[data-test="postalCode"]' },
  continueButton: { selector: '[data-test="continue"]' },
  cancelButton: { selector: '[data-test="cancel"]' },
  errorMessage: { selector: '[data-test="error"]' },
} satisfies Selector;

export type CheckoutSelector = typeof checkoutSelector;
