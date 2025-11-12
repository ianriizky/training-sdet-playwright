import { AbstractSelector, type Selector } from '../abstract.selector';

export class CheckoutSelector extends AbstractSelector {
  protected readonly selector = {
    firstNameInput: { selector: '[data-test="firstName"]' },
    lastNameInput: { selector: '[data-test="lastName"]' },
    postalCodeInput: { selector: '[data-test="postalCode"]' },
    continueButton: { selector: '[data-test="continue"]' },
    cancelButton: { selector: '[data-test="cancel"]' },
    errorMessage: { selector: '[data-test="error"]' },
  } satisfies Selector;

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
