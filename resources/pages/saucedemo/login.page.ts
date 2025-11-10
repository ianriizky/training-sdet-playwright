import test, { expect } from '@playwright/test';

import { loginSelector } from '@/resources/selectors/saucedemo/login.selector';

import { AbstractPage } from './abstract.page';

export class LoginPage extends AbstractPage {
  protected readonly acceptedUsernames = [
    'standard_user',
    'locked_out_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user',
  ] as const;

  protected readonly acceptedPasswords = ['secret_sauce'] as const;

  get usernameField() {
    return this.page.locator(loginSelector.usernameField);
  }

  get passwordField() {
    return this.page.locator(loginSelector.passwordField);
  }

  get loginButton() {
    return this.page.locator(loginSelector.loginButton);
  }

  get error() {
    return this.page.locator(loginSelector.error);
  }

  get burgerMenuButton() {
    return this.page.locator(loginSelector.burgerMenuButton);
  }

  get logoutLink() {
    return this.page.locator(loginSelector.logoutLink);
  }

  async performFillInValidCredentials(): Promise<void> {
    await test.step('Fill in valid credentials', async () => {
      await this.usernameField.fill(this.acceptedUsernames[0]);
      await this.passwordField.fill(this.acceptedPasswords[0]);
    });
  }

  async performFillInInvalidCredentials(): Promise<void> {
    await test.step('Fill in invalid credentials', async () => {
      await this.usernameField.fill('invalid_user');
      await this.passwordField.fill('invalid_password');
    });
  }

  async performValidLogin(): Promise<void> {
    await this.performFillInValidCredentials();
    await this.performClickLoginButton();
  }

  async performInvalidLogin(): Promise<void> {
    await this.performFillInInvalidCredentials();
    await this.performClickLoginButton();
  }

  async performClickLoginButton(): Promise<void> {
    await test.step('Click login button', async () => {
      await this.loginButton.click();
    });
  }

  async performClickLogoutButton(): Promise<void> {
    await test.step('Click logout button', async () => {
      await this.burgerMenuButton.click();
      await this.logoutLink.click();
    });
  }

  async assertHasInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/inventory(\\.html)?$`),
    );
  }

  async assertHasErrorLoginUsernamePasswordDontMatch(): Promise<void> {
    await expect(this.error).toContainText(
      'Username and password do not match any user in this service',
    );
  }

  async assertHasErrorLoginUsernameRequired(): Promise<void> {
    await expect(this.error).toContainText('Username is required');
  }
}
