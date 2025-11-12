import { type CheckoutSelector } from '@/resources/selectors/saucedemo/checkout.selector';

import { AbstractLocator } from '../abstract.locator';

export class CheckoutLocator extends AbstractLocator<CheckoutSelector> {
  get firstNameInput() {
    return this.page.locator(this.selector.firstNameInput.selector);
  }

  get lastNameInput() {
    return this.page.locator(this.selector.lastNameInput.selector);
  }

  get postalCodeInput() {
    return this.page.locator(this.selector.postalCodeInput.selector);
  }

  get continueButton() {
    return this.page.locator(this.selector.continueButton.selector);
  }

  get cancelButton() {
    return this.page.locator(this.selector.cancelButton.selector);
  }

  get errorMessage() {
    return this.page.locator(this.selector.errorMessage.selector);
  }
}
