import { AbstractSelector } from '../abstract.selector';

export class DashboardSelector extends AbstractSelector {
  getSectionTitle(title: string) {
    return this.page.locator(`text=${title}`);
  }
}
