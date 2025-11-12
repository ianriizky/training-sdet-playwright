import { AbstractSelector, type Selector } from '../abstract.selector';

export class OrderConfirmationSelector extends AbstractSelector {
  protected readonly selector = {
    confirmationMessage: { selector: '[data-test="complete-header"]' },
    confirmationText: { selector: '[data-test="complete-text"]' },
    backHomeButton: { selector: '[data-test="back-to-products"]' },
    ponyExpress: { selector: '.pony_express' },
  } satisfies Selector;

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
