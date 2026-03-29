import { expect, Page, Locator } from '@playwright/test';

export class ForbesHomePage {
  readonly page: Page;
  readonly url: string = 'https://www.forbes.com/';
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer').first();
  }

  async navigate() {
    // Use commit to prevent network hangs from ad trackers
    await this.page.goto(this.url, { waitUntil: 'commit', timeout: 60000 });
    // Wait for the footer to ensure the page structure is there
    await expect(this.footer).toBeVisible({ timeout: 30000 });
  }

  getFooterLink(linkName: string): Locator {
    return this.footer.getByRole('link', { name: new RegExp('^\\s*' + linkName + '\\s*$|^' + linkName + '$', 'i') }).first();
  }

  getFooterLogo(logoName: string): Locator {
    return this.footer.getByRole('link', { name: new RegExp(logoName, 'i') }).first();
  }
}
