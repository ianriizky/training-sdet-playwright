import type { LoginSelector } from '@/resources/selectors/orangehrm/login.selector';

import { AbstractLocator } from '../abstract.locator';

export class LoginLocator extends AbstractLocator<LoginSelector> {
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
