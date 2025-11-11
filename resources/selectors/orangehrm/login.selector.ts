import type { Selector } from '@/resources/locators/abstract.locator';

export const loginSelector = {
  usernameField: { selector: 'input[name="username"]' },
  passwordField: { selector: 'input[name="password"]' },
  loginButton: { selector: 'button[type="submit"]' },
  errorMessage: { selector: '.oxd-alert-content-text' },
  requiredErrorMessages: { selector: '.oxd-input-field-error-message' },
  userDropdown: { selector: '.oxd-userdropdown-name' },
  logoutMenuItem: { selector: '[role="menuitem"]' },
} satisfies Selector;

export type LoginSelector = typeof loginSelector;
