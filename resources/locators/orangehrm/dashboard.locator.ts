import { AbstractLocator } from '../abstract.locator';

export class DashboardLocator extends AbstractLocator {
  getSectionTitle(title: string) {
    return this.page.locator(`text=${title}`);
  }
}
