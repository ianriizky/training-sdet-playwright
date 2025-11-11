import type { Selector } from '@/resources/locators/abstract.locator';

export const loginSelector = {
  usernameField: { selector: '[data-test="username"]' },
  passwordField: { selector: '[data-test="password"]' },
  loginButton: { selector: '[data-test="login-button"]' },
  error: { selector: '[data-test="error"]' },
  burgerMenuButton: { selector: '#react-burger-menu-btn' },
  logoutLink: { selector: '[data-test="logout-sidebar-link"]' },
} satisfies Selector;

export type LoginSelector = typeof loginSelector;
