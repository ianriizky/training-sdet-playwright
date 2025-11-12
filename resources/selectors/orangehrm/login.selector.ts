import { AbstractSelector, type Selector } from '../abstract.selector';

export class LoginSelector extends AbstractSelector {
  protected readonly selector = {
    usernameField: { selector: 'input[name="username"]' },
    passwordField: { selector: 'input[name="password"]' },
    loginButton: { selector: 'button[type="submit"]' },
    errorMessage: { selector: '.oxd-alert-content-text' },
    requiredErrorMessages: { selector: '.oxd-input-field-error-message' },
    userDropdown: { selector: '.oxd-userdropdown-name' },
    logoutMenuItem: { selector: '[role="menuitem"]' },
  } satisfies Selector;

  get usernameField() {
    return this.page.locator(this.selector.usernameField.selector);
  }

  get passwordField() {
    return this.page.locator(this.selector.passwordField.selector);
  }

  get loginButton() {
    return this.page.locator(this.selector.loginButton.selector);
  }

  get errorMessage() {
    return this.page.locator(this.selector.errorMessage.selector);
  }

  get requiredErrorMessages() {
    return this.page.locator(this.selector.requiredErrorMessages.selector);
  }

  get userDropdown() {
    return this.page.locator(this.selector.userDropdown.selector);
  }

  get logoutMenuItem() {
    return this.page.locator(this.selector.logoutMenuItem.selector);
  }
}
