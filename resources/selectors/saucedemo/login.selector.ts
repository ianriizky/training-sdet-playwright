import { AbstractSelector, type Selector } from '../abstract.selector';

export class LoginSelector extends AbstractSelector {
  protected readonly selector = {
    usernameField: { selector: '[data-test="username"]' },
    passwordField: { selector: '[data-test="password"]' },
    loginButton: { selector: '[data-test="login-button"]' },
    error: { selector: '[data-test="error"]' },
    burgerMenuButton: { selector: '#react-burger-menu-btn' },
    logoutLink: { selector: '[data-test="logout-sidebar-link"]' },
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
