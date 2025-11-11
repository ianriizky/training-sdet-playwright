import type { LoginSelector } from '@/resources/selectors/saucedemo/login.selector';

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

  get error() {
    return this.page.locator(this.selector.error.selector);
  }

  get burgerMenuButton() {
    return this.page.locator(this.selector.burgerMenuButton.selector);
  }

  get logoutLink() {
    return this.page.locator(this.selector.logoutLink.selector);
  }
}
